import { useEffect, useRef } from "react";
import gsap from "gsap";
import cursorConfig from "./cursorConfig";

// Custom cursor – a single shape that follows the mouse and morphs by context.
// All styling lives in cursorConfig.js; elements opt in with data-cursor="<state>".
const Cursor = () => {
    const cursorRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        const config = cursorConfig;
        const cursor = cursorRef.current;
        const label = labelRef.current;

        // Mouse / trackpad only – touch devices keep their normal behavior
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!config.enabled || !finePointer) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const follow = reduceMotion ? 0 : config.followDuration;

        // Hide the native cursor (except in text fields – see index.css)
        document.documentElement.classList.add("has-custom-cursor");

        const ctx = gsap.context(() => {
            gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
            const moveX = gsap.quickTo(cursor, "x", { duration: follow, ease: config.followEase });
            const moveY = gsap.quickTo(cursor, "y", { duration: follow, ease: config.followEase });

            let currentState = null;
            const setState = (name, labelOverride) => {
                const state = config.states[name] || config.states.default;
                const text = labelOverride ?? state.label ?? "";
                if (name === currentState && label.textContent === text) return;
                currentState = name;

                // Blend mode can't animate, so it switches instantly; the color fades
                cursor.style.mixBlendMode = state.blendMode ?? config.blendMode;
                gsap.to(cursor, {
                    width: state.width,
                    height: state.height,
                    borderRadius: state.radius,
                    backgroundColor: state.color ?? config.color,
                    duration: config.morphDuration,
                    ease: config.morphEase,
                    overwrite: "auto",
                });
                label.textContent = text;
                gsap.to(label, { opacity: text ? 1 : 0, duration: 0.25, delay: text ? 0.15 : 0 });
            };
            setState("default");

            let visible = false;
            const onMove = (e) => {
                moveX(e.clientX);
                moveY(e.clientY);
                if (!visible) {
                    visible = true;
                    gsap.set(cursor, { x: e.clientX, y: e.clientY });
                    gsap.to(cursor, { opacity: 1, duration: 0.3 });
                }
            };

            // Pick the state from the nearest [data-cursor] ancestor of whatever is under the mouse
            const onOver = (e) => {
                const target = e.target.closest?.("[data-cursor]");
                setState(target ? target.dataset.cursor : "default", target?.dataset.cursorLabel);
            };

            const onLeaveWindow = () => {
                visible = false;
                gsap.to(cursor, { opacity: 0, duration: 0.3 });
            };
            const onDown = () => gsap.to(cursor, { scale: config.clickScale, duration: 0.15, ease: "power2.out" });
            const onUp = () => gsap.to(cursor, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

            window.addEventListener("mousemove", onMove);
            document.addEventListener("mouseover", onOver);
            document.documentElement.addEventListener("mouseleave", onLeaveWindow);
            window.addEventListener("mousedown", onDown);
            window.addEventListener("mouseup", onUp);

            // Magnetic elements pull toward the cursor, then spring back.
            // An element is magnetic if it (or an ancestor) has data-magnetic (optionally with its own
            // strength, e.g. data-magnetic="0.2"), or if its data-cursor state has a `magnetic` value.
            // Listeners are delegated, so elements added later (e.g. after the intro) still work.
            const findMagnet = (target) => {
                const explicit = target.closest?.("[data-magnetic]");
                if (explicit) {
                    return { el: explicit, strength: parseFloat(explicit.dataset.magnetic) || config.magneticStrength };
                }
                const stateEl = target.closest?.("[data-cursor]");
                const strength = stateEl && config.states[stateEl.dataset.cursor]?.magnetic;
                return strength ? { el: stateEl, strength } : null;
            };

            let magnet = null;
            const release = () => {
                if (magnet) {
                    gsap.to(magnet, {
                        x: 0,
                        y: 0,
                        duration: config.magneticReturnDuration,
                        ease: config.magneticReturnEase,
                        overwrite: "auto",
                    });
                }
                magnet = null;
            };
            const onMagnetMove = (e) => {
                if (reduceMotion) return;
                const found = findMagnet(e.target);
                if (magnet && magnet !== found?.el) release();
                if (!found) return;
                magnet = found.el;
                const rect = magnet.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                gsap.to(magnet, {
                    x: dx * found.strength,
                    y: dy * found.strength,
                    duration: config.magneticDuration,
                    ease: config.magneticEase,
                    overwrite: "auto",
                });
            };
            window.addEventListener("mousemove", onMagnetMove);
            document.documentElement.addEventListener("mouseleave", release);

            return () => {
                window.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseover", onOver);
                document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
                window.removeEventListener("mousedown", onDown);
                window.removeEventListener("mouseup", onUp);
                window.removeEventListener("mousemove", onMagnetMove);
                document.documentElement.removeEventListener("mouseleave", release);
            };
        });

        return () => {
            ctx.revert();
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
            style={{
                opacity: 0,
                // Start round – GSAP can't blend from an unset radius (0px) into a % value
                borderRadius: cursorConfig.states.default.radius,
                backgroundColor: cursorConfig.color,
                mixBlendMode: cursorConfig.blendMode,
            }}
        >
            <span
                ref={labelRef}
                className="font-general-sans font-medium uppercase tracking-[0.15em] text-[0.625rem] select-none"
                style={{ color: cursorConfig.labelColor, opacity: 0 }}
            />
        </div>
    );
};

export default Cursor;
