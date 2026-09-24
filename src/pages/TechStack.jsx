import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';

const technologies = [
    "HTML", "CSS", "JavaScript", "ReactJS",
    "Tailwind CSS", "NodeJS", "ExpressJS", "PHP", "MySQL", "PostgreSQL", "GitHub", "Git", "Figma"
];

// Duplicate for seamless loop
const doubledTech = [...technologies, ...technologies];

const BASE_SPEED = 90;       // px per second when the page is still
const SCROLL_BOOST = 0.35;   // extra marquee speed per px/s of page scroll
const MAX_BOOST = 1400;      // cap on that extra speed
const HOVER_SPEED = 0.15;    // speed multiplier while hovered
const MAX_SKEW = 8;          // degrees
const SKEW_PER_VELOCITY = 0.004;

const TechStack = ({ id }) => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Width of one set of names – the distance after which the loop repeats.
        // Re-measured when the track resizes (Claverin loading, viewport changes).
        let loopWidth = track.scrollWidth / 2;
        const resizeObserver = new ResizeObserver(() => {
            loopWidth = track.scrollWidth / 2;
        });
        resizeObserver.observe(track);

        // Only animate while the band is on screen
        let visible = false;
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
        });
        intersectionObserver.observe(section);

        // Hover slows the band down
        let hoverTarget = 1;
        const onEnter = () => { hoverTarget = HOVER_SPEED; };
        const onLeave = () => { hoverTarget = 1; };
        track.addEventListener("mouseenter", onEnter);
        track.addEventListener("mouseleave", onLeave);

        let x = 0;
        let direction = 1;          // 1 = moving left (scrolling down), -1 = moving right (scrolling up)
        let boost = 0;
        let skew = 0;
        let hover = 1;
        let lastScrollY = window.scrollY;

        // Time-based, so the speed is the same on 60Hz and 144Hz screens
        const tick = (_time, deltaMs) => {
            const dt = Math.min(deltaMs, 50) / 1000;
            if (!dt) return;

            // Page scroll velocity (px/s) – Lenis smooths window.scrollY, so this is smooth too
            const scrollY = window.scrollY;
            const velocity = (scrollY - lastScrollY) / dt;
            lastScrollY = scrollY;

            if (!visible || reduceMotion) return;

            // The band follows the last scroll direction and speeds up with scroll speed,
            // then eases back to its base speed once scrolling stops
            if (Math.abs(velocity) > 30) direction = Math.sign(velocity);
            const ease = Math.min(1, dt * 6);
            boost += (Math.min(Math.abs(velocity) * SCROLL_BOOST, MAX_BOOST) - boost) * ease;
            skew += (gsap.utils.clamp(-MAX_SKEW, MAX_SKEW, -velocity * SKEW_PER_VELOCITY) - skew) * ease;
            hover += (hoverTarget - hover) * Math.min(1, dt * 4);

            x -= direction * (BASE_SPEED + boost) * hover * dt;
            x = gsap.utils.wrap(-loopWidth, 0, x);

            track.style.transform = `translate3d(${x}px, 0, 0) skewX(${skew}deg)`;
        };

        gsap.ticker.add(tick);

        return () => {
            gsap.ticker.remove(tick);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            track.removeEventListener("mouseenter", onEnter);
            track.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <main
            id={id}
            ref={sectionRef}
            className="w-full flex flex-col gap-6 md:gap-8 bg-[#322D29] py-12 md:py-16 overflow-hidden"
        >
            {/* Label row */}
            <div className="flex justify-between items-end px-4 md:px-8 xl:px-12 text-[#EFE9E1]/60 font-light tracking-wider text-xs md:text-sm xl:text-base">
                <p>(Tech Stack)</p>
                <p>{technologies.length} tools</p>
            </div>

            {/* Band – edges fade out instead of being cut off */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
            >
                <div
                    ref={trackRef}
                    className="group/stack flex w-max items-center whitespace-nowrap will-change-transform"
                >
                    {doubledTech.map((tech, index) => (
                        <Fragment key={index}>
                            {/* Hovering the band dims every name except the one under the cursor */}
                            <span className="text-[#EFE9E1] text-6xl md:text-8xl xl:text-9xl leading-[1.2] font-claverin px-6 md:px-10 xl:px-12 shrink-0 select-none transition-opacity duration-300 group-hover/stack:opacity-30 hover:!opacity-100">
                                {tech}
                            </span>
                            {/* Separator after every name (including the last) so both halves are identical */}
                            <span aria-hidden="true" className="w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4 rounded-full bg-[#EFE9E1] shrink-0 select-none" />
                        </Fragment>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default TechStack;
