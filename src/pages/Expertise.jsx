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
                className="w-full min-h-[200vh] bg-[#EFE9E1] flex flex-col gap-8 px-2 pt-8 leading-[1.1]"
            >
                {/* Title Section */}
                <section 
                    ref={headerRef}
                    className="sticky top-10 left-0 font-claverin z-10"
                >
                    <h1 className="text-[#322D29] text-[4.38rem]">AREA OF</h1>
                    <h1 className="text-[#322D29] text-[12rem]">EXPERTISE</h1>
                </section>

                {/* Paragraph wrapper */}
                <section 
                    className="sticky top-[5vh] left-0 w-full flex flex-col gap-8 justify-center z-0" 
                    ref={sectionRef}
                >
                    {/* First Paragraph */}
                    <div ref={firstRef} className="w-full flex justify-between">
                        <aside className="h-fit flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light">001</p>
                            <p className="text-[1.5rem] text-[#322D29] font-normal">Frontend Web Development</p>
                        </aside>
                        <aside className="w-[700px] flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light leading-snug">As a Frontend Web Developer, I specialize in building responsive, user-friendly, and visually appealing web applications. I focus on creating clean, accessible interfaces with modern web technologies while ensuring a seamless user experience across different devices.</p>
                        </aside>
                    </div>

                    {/* Second Paragraph */}
                    <div ref={secondRef} className="w-full flex justify-between">
                        <aside className="h-fit flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light">002</p>
                            <p className="text-[1.5rem] text-[#322D29] font-normal">Backend Development</p>
                        </aside>
                        <aside className="w-[700px] flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light  leading-snug">As a Backend Developer, I specialize in building robust server-side applications, RESTful APIs, and database management. I focus on creating scalable and secure backend systems that power modern web applications.</p>
                        </aside>
                    </div>

                    {/* Third Paragraph */}
                    <div ref={thirdRef} className="w-full flex justify-between">
                        <aside className="h-fit flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light">003</p>
                            <p className="text-[1.5rem] text-[#322D29] font-normal">UI/UX Design</p>
                        </aside>
                        <aside className="w-[700px] flex items-center gap-4 p-2">
                            <p className="text-[1rem] text-[#322D29] opacity-50 font-light  leading-snug">As a UI/UX Designer, I focus on creating intuitive and engaging user experiences. I combine design thinking with user research to craft interfaces that are both beautiful and functional.</p>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Expertise;