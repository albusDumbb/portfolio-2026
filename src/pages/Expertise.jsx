import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Expertise = ({ id }) => {
    const mainRef = useRef(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);

    useEffect(() => {
        // Set initial state for all paragraphs (hidden and moved down)
        gsap.set([firstRef.current, secondRef.current, thirdRef.current], { 
            opacity: 0,
            y: 200 // Start 50px below original position
        });

        // Pinned the container 
        ScrollTrigger.create({
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: sectionRef.current,
            pinSpacing: false
        });

        // First paragraph animation 
        gsap.to(firstRef.current, {
            opacity: 1,
            y: 0, // Move to original position
            duration: 1,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top+=35% bottom", 
                end: "top+=40% bottom",   
                scrub: 0.5,             
                toggleActions: "play none none none",
                markers: false
            }
        });

        // Second paragraph animation 
        gsap.to(secondRef.current, {
            opacity: 1,
            y: 0, // Move to original position
            duration: 1,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top+=60% bottom", 
                end: "top+=65% bottom",   
                scrub: 0.5,
                toggleActions: "play none none none",
                markers: false
            }
        });

        // Third paragraph animation 
        gsap.to(thirdRef.current, {
            opacity: 1,
            y: 0, // Move to original position
            duration: 1,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top+=90% bottom", 
                end: "top+=95% bottom",   
                scrub: 0.5,
                toggleActions: "play none none none",
                markers: false
            }
        });

        // Animate header up and fade out when TechStack comes into view
        gsap.to(headerRef.current, {
            y: -300,
            opacity: 0,
            duration: 3,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "bottom bottom",
                end: "bottom+=15% bottom",
                scrub: 0.5,
                toggleActions: "play none none none",
                markers: false
            }
        });

        // Refresh ScrollTrigger on mount
        ScrollTrigger.refresh();

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <main
                id={id} 
                ref={mainRef}
                className="w-full min-h-[235vh] bg-[#EFE9E1] flex flex-col gap-8 px-4 md:px-8 xl:px-2 pt-8 leading-[1.1]"
            >
                {/* Title Section */}
                <section 
                    ref={headerRef}
                    className="sticky top-20 md:top-16 xl:top-10 left-0 font-claverin z-10"
                >
                    <h1 className="text-[#322D29] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] xl:text-[4.38rem]">AREA OF</h1>
                    <h1 className="text-[#322D29] text-[4rem] sm:text-[5rem] md:text-[7rem] xl:text-[12rem]">EXPERTISE</h1>
                </section>

                {/* Paragraph wrapper */}
                <section 
                    className="sticky top-[5vh] left-0 w-full flex flex-col gap-8 justify-center z-0" 
                    ref={sectionRef}
                >
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
            </main>
        </>
    );
};

export default Expertise;