import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Expertise = ({ id }) => {
    const mainRef = useRef(null);
    const stageRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);

    useEffect(() => {
        // Scope every tween/trigger to this component so cleanup only reverts ours
        const ctx = gsap.context(() => {

            // How far the title + paragraphs are taller than the sticky stage.
            // Uses layout sizes, so the paragraphs' own y/opacity animation doesn't skew it.
            const getOverflow = () => {
                const stage = stageRef.current;
                const styles = getComputedStyle(stage);
                const available = stage.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
                return Math.max(0, contentRef.current.offsetHeight - available);
            };

            // Set initial state for all paragraphs (hidden and moved down)
            gsap.set([firstRef.current, secondRef.current, thirdRef.current], {
                opacity: 0,
                y: 200 // Start 200px below original position
            });

            // Paragraph reveal animations. The stage is sticky from "top top" until
            // "bottom bottom" of the 250vh main, so every reveal happens on screen.
            const reveal = (target, start, end) => {
                gsap.to(target, {
                    opacity: 1,
                    y: 0, // Move to original position
                    duration: 1,
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: `top+=${start}% bottom`,
                        end: `top+=${end}% bottom`,
                        scrub: 0.5
                    }
                });
            };
            reveal(firstRef.current, 35, 40);
            reveal(secondRef.current, 60, 65);
            reveal(thirdRef.current, 80, 85);

            // On screens too short to fit everything, scroll the content up by exactly
            // the overflow while the 2nd and 3rd paragraphs come in, so the last one
            // is fully visible before TechStack arrives. On tall screens this is 0.
            gsap.fromTo(contentRef.current,
                { y: 0 },
                {
                    y: () => -getOverflow(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top+=60% bottom",
                        end: "top+=85% bottom",
                        scrub: 0.5,
                        invalidateOnRefresh: true
                    }
                }
            );

            // Animate header up and fade out when TechStack comes into view
            gsap.to(headerRef.current, {
                y: -300,
                opacity: 0,
                duration: 3,
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "bottom bottom",
                    end: "bottom+=15% bottom",
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
                {/* Sticky stage – stays on screen for the whole section, pushed below the fixed navbar */}
                <div
                    ref={stageRef}
                    className="sticky top-0 w-full h-dvh overflow-hidden px-4 md:px-8 xl:px-2 pt-24 pb-8"
                >
                    <div ref={contentRef} className="flex flex-col gap-8">
                        {/* Title Section */}
                        <section 
                            ref={headerRef}
                            className="font-claverin"
                        >
                            <h1 className="text-[#322D29] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] xl:text-[4.38rem]">AREA OF</h1>
                            <h1 className="text-[#322D29] text-[4rem] sm:text-[5rem] md:text-[7rem] xl:text-[12rem]">EXPERTISE</h1>
                        </section>

                        {/* Paragraph wrapper */}
                        <section className="w-full flex flex-col gap-8">
                            {/* First Paragraph */}
                            <div ref={firstRef} className="w-full flex flex-col xl:flex-row gap-2 xl:gap-0 xl:justify-between">
                                <aside className="h-fit flex items-center gap-4 p-2">
                                    <p className="text-xs md:text-sm xl:text-[1rem] text-[#322D29] opacity-50 font-light">001</p>
                                    <p className="text-base md:text-lg xl:text-[1.5rem] text-[#322D29] font-normal">Full stack Web Development</p>
                                </aside>
                                <aside className="w-full xl:w-[700px] flex items-center gap-4 p-2">
                                    <p className="text-sm md:text-base xl:text-[1rem] text-[#322D29] opacity-50 font-light leading-snug">Full-Stack Web Developer specializing in building responsive, user-friendly, and scalable web applications using HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MySQL, and PostgreSQL. Experienced in developing both frontend interfaces and backend systems, from creating clean and accessible user experiences to designing APIs and managing databases. Dedicated to delivering high-performing, maintainable, and reliable web solutions that provide seamless experiences across devices and platforms.</p>
                                </aside>
                            </div>

                            {/* Second Paragraph */}
                            <div ref={secondRef} className="w-full flex flex-col xl:flex-row gap-2 xl:gap-0 xl:justify-between">
                                <aside className="h-fit flex items-center gap-4 p-2">
                                    <p className="text-xs md:text-sm xl:text-[1rem] text-[#322D29] opacity-50 font-light">002</p>
                                    <p className="text-base md:text-lg xl:text-[1.5rem] text-[#322D29] font-normal">UI/UX Design</p>
                                </aside>
                                <aside className="w-full xl:w-[700px] flex items-center gap-4 p-2">
                                    <p className="text-sm md:text-base xl:text-[1rem] text-[#322D29] opacity-50 font-light leading-snug">UI/UX Designer specializing in crafting intuitive digital products in Figma. I combine design thinking and user research to turn complex ideas into clean, functional, and visually engaging interfaces.</p>
                                </aside>
                            </div>

                            {/* Third Paragraph */}
                            <div ref={thirdRef} className="w-full flex flex-col xl:flex-row gap-2 xl:gap-0 xl:justify-between">
                                <aside className="h-fit flex items-center gap-4 p-2">
                                    <p className="text-xs md:text-sm xl:text-[1rem] text-[#322D29] opacity-50 font-light">003</p>
                                    <p className="text-base md:text-lg xl:text-[1.5rem] text-[#322D29] font-normal">Machine Learning</p>
                                </aside>
                                <aside className="w-full xl:w-[700px] flex items-center gap-4 p-2">
                                    <p className="text-sm md:text-base xl:text-[1rem] text-[#322D29] opacity-50 font-light leading-snug">Machine Learning focused on building intelligent computer vision models using Python. I handle the complete data lifecycle, from data gathering and annotation to preprocessing—to train, evaluate, and deliver accurate, reliable ML solutions.</p>
                                </aside>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Expertise;
