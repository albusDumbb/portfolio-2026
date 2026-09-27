import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const expertise = [
    {
        index: "01",
        title: "Full Stack Web Development",
        description: "I build responsive, scalable web applications end to end — from clean, accessible interfaces to the APIs and databases behind them — that stay fast and reliable on every device.",
        tags: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "PostgreSQL"],
    },
    {
        index: "02",
        title: "UI/UX Design",
        description: "I design intuitive digital products, using design thinking and user research to turn complex ideas into clean, functional, and visually engaging interfaces.",
        tags: ["Figma", "Design Thinking", "User Research"],
    },
    {
        index: "03",
        title: "Machine Learning",
        description: "I build computer vision models and handle the full data lifecycle — gathering, annotation, and preprocessing — to train, evaluate, and deliver accurate, reliable ML solutions.",
        tags: ["Python", "Computer Vision", "Data Annotation", "Model Training"],
    },
];

// Opacity of the rows that aren't currently active
const DIMMED = 0.25;

const Expertise = ({ id }) => {
    const mainRef = useRef(null);
    const stageRef = useRef(null);
    const contentRef = useRef(null);
    const rowRefs = useRef([]);
    const progressRef = useRef(null);
    const barRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        // Scope every tween/trigger to this component so cleanup only reverts ours
        const ctx = gsap.context(() => {

            // How far the title + rows are taller than the sticky stage.
            // Uses layout sizes, so the rows' own y/opacity animation doesn't skew it.
            const getOverflow = () => {
                const stage = stageRef.current;
                const styles = getComputedStyle(stage);
                const available = stage.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
                return Math.max(0, contentRef.current.offsetHeight - available);
            };

            const rows = rowRefs.current;
            const reveals = mainRef.current.querySelectorAll(".expertise-reveal");
            const hints = progressRef.current.querySelectorAll(".expertise-hint");

            // Text starts hidden below its mask; rows after the first start dimmed
            gsap.set(reveals, { yPercent: 110 });
            gsap.set(rows.slice(1), { opacity: DIMMED });
            gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

            // Timeline layout (in timeline seconds):
            // 0 → INTRO          section scrolls in, rows slide up from their masks
            // INTRO → INTRO + 3  section pinned, one second per row: that row is active, the bar fills
            // The timeline starts at "top 50%" (half a screen before the stage pins) and ends at
            // "bottom bottom" (1.5 screens later), so INTRO = 1 of 4 seconds lines up with the pin.
            const INTRO = 1;
            let activeIndex = 0;

            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top 50%",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true
                },
                onUpdate: () => {
                    const index = Math.min(rows.length - 1, Math.max(0, Math.floor(tl.time() - INTRO)));
                    // Keep the "01 / 03" counter in step with the active row
                    if (index !== activeIndex) {
                        activeIndex = index;
                        counterRef.current.textContent = String(index + 1).padStart(2, "0");
                    }
                }
            });

            // Masked slide-up, staggered number → title → paragraph → next row
            tl.to(reveals, { yPercent: 0, duration: INTRO * 0.8, stagger: 0.06, ease: "power3.out" }, 0);

            // "Scroll" hint + gliding light fade out as the bar starts to fill
            tl.to(hints, { opacity: 0, duration: 0.25 }, INTRO - 0.1);

            // Progress bar fills across the whole active phase
            tl.to(barRef.current, { scaleX: 1, duration: rows.length }, INTRO);

            // Hand the highlight from each row to the next
            rows.slice(1).forEach((row, i) => {
                const at = INTRO + i + 1 - 0.075;
                tl.to(rows[i], { opacity: DIMMED, duration: 0.15 }, at);
                tl.to(row, { opacity: 1, duration: 0.15 }, at);
            });

            // On screens too short to fit everything, scroll the content up by exactly
            // the overflow while rows 2 and 3 are active, so the last one is fully
            // visible before the next section arrives. On tall screens this is 0.
            tl.fromTo(contentRef.current,
                { y: 0 },
                { y: () => -getOverflow(), duration: rows.length - 1 },
                INTRO + 0.5
            );

            // The progress bar is fixed to the viewport, so it can show up as soon as the
            // section starts scrolling in instead of waiting for the stage to pin
            gsap.fromTo(progressRef.current,
                { autoAlpha: 0, y: 16 },
                {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 0.5
                    }
                }
            );

            // Fade the progress bar out as the section leaves, so it never sits over the next section
            gsap.fromTo(progressRef.current, { autoAlpha: 1 }, {
                autoAlpha: 0,
                immediateRender: false,
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "bottom bottom",
                    end: "bottom+=10% bottom",
                    scrub: 0.5
                }
            });

        }, mainRef);

        // Refresh ScrollTrigger on mount, and again once the Claverin title font
        // has loaded (it changes the title height, which moves every trigger)
        ScrollTrigger.refresh();
        document.fonts.ready.then(() => ScrollTrigger.refresh());

        // Cleanup – revert only this component's animations and triggers
        return () => ctx.revert();
    }, []);

    return (
        <>
            <main
                id={id}
                ref={mainRef}
                className="w-full min-h-[250vh] bg-[#EFE9E1] leading-[1.1]"
            >
                {/* Sticky stage – stays on screen for the whole section.
                    Bottom padding keeps the rows clear of the progress bar. */}
                <div
                    ref={stageRef}
                    className="sticky top-0 w-full h-dvh overflow-hidden px-4 md:px-8 xl:px-2 pt-4 pb-10 md:pb-12"
                >
                    <div ref={contentRef} className="flex flex-col gap-8">
                        {/* Title Section */}
                        <section
                            className="font-claverin"
                        >
                            <h2 data-cursor="lens" className="text-[#322D29] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] xl:text-[4.38rem]">AREA OF</h2>
                            <h2 data-cursor="lens" className="text-[#322D29] text-[4rem] sm:text-[5rem] md:text-[7rem] xl:text-[12rem]">EXPERTISE</h2>
                        </section>

                        {/* Rows – each piece of text slides up from its own mask */}
                        <section className="w-full flex flex-col gap-8">
                            {expertise.map((item, i) => (
                                <div
                                    key={item.index}
                                    ref={(el) => (rowRefs.current[i] = el)}
                                    className="w-full flex flex-col xl:flex-row gap-2 xl:gap-0 xl:justify-between"
                                >
                                    {/* Number + Satoshi title – a clean sans so the titles don't echo the Claverin header */}
                                    {/* Number's digits line up with the top of the title's capitals.
                                        The padding is the gap between the title's cap line and its line box,
                                        minus the digits' own gap (measured for each breakpoint's font sizes) */}
                                    <aside className="h-fit flex items-start gap-2 md:gap-2.5 p-2">
                                        <div className="overflow-hidden shrink-0 pt-[5.5px] md:pt-[5.75px] xl:pt-[6.25px]">
                                            <p className="expertise-reveal font-general-sans text-xs md:text-sm xl:text-[1rem] leading-none text-[#322D29] font-light">({item.index})</p>
                                        </div>
                                        <div className="overflow-hidden">
                                            {/* Bottom padding keeps descenders (p, g) clear of the mask */}
                                            <h2 data-cursor="lens" className="expertise-reveal font-satoshi font-light tracking-[-0.01em] leading-tight pb-[0.08em] text-[1.5rem] md:text-[1.875rem] xl:text-[2.125rem] text-[#322D29]">{item.title}</h2>
                                        </div>
                                    </aside>

                                    {/* Description + tags */}
                                    <aside className="w-full xl:w-[700px] flex flex-col gap-3 md:gap-4 p-2">
                                        <div className="overflow-hidden">
                                            <p className="expertise-reveal text-sm md:text-base xl:text-[1rem] text-[#322D29] opacity-50 font-light leading-snug">{item.description}</p>
                                        </div>
                                        <div className="overflow-hidden">
                                            {/* Tags: plain text split by bronze dots. Hovering one draws a hairline
                                                underline under it and fades the others */}
                                            <ul className="expertise-reveal group/tags flex flex-wrap items-center gap-y-1 pb-1 font-general-sans text-sm md:text-base xl:text-[1.0625rem] text-[#322D29]">
                                                {item.tags.map((tag, j) => (
                                                    <li key={tag} className="flex items-center">
                                                        <span className="relative cursor-default transition-opacity duration-300 group-hover/tags:opacity-40 hover:!opacity-100 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)] hover:after:scale-x-100">
                                                            {tag}
                                                        </span>
                                                        {/* Dot trails its item, so a wrapped line never starts with one
                                                            (padding, not margin – the global * { margin: 0 } overrides margin utilities) */}
                                                        {j < item.tags.length - 1 && (
                                                            <span aria-hidden="true" className="px-2 md:px-2.5 text-[#A68A64]">·</span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </aside>
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* Section progress – fixed to the bottom of the screen while Expertise is in view.
                        Counter, then the bar with a live "Scroll" hint until it starts filling.
                        Kept slim (tight padding, leading-none) so it takes as little height as possible.
                        Solid background so rows scrolling in pass cleanly underneath; z-30 keeps it under the navbar menu overlay. */}
                    <div
                        ref={progressRef}
                        className="invisible opacity-0 fixed z-30 inset-x-0 bottom-0 bg-[#EFE9E1] px-4 md:px-8 xl:px-4 pt-2 pb-3 md:pb-4 flex items-center gap-3 md:gap-4 text-[#322D29] font-light text-xs md:text-sm xl:text-base leading-none tracking-wider"
                    >
                        <p className="shrink-0 tabular-nums">
                            <span ref={counterRef}>01</span>
                            <span className="opacity-50"> / {String(expertise.length).padStart(2, "0")}</span>
                        </p>

                        <div className="relative flex-1 h-px bg-[#322D29]/15 overflow-hidden">
                            <div ref={barRef} className="absolute inset-0 bg-[#322D29]" />
                            {/* Gliding light on the empty track */}
                            <div className="expertise-hint absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-[#322D29]/60 to-transparent animate-hint-glide" />
                        </div>

                        <p className="expertise-hint shrink-0 flex items-center gap-1.5 opacity-60">
                            Scroll
                            <span className="inline-block animate-hint-nudge" aria-hidden="true">↓</span>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Expertise;
