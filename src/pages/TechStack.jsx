import { useEffect, useRef } from 'react';

const TechStack = ({ id }) => {
    const technologies = [
        "HTML", "CSS", "JavaScript", "ReactJS", 
        "Tailwind CSS", "NodeJS", "ExpressJS", "PHP", "MySQL", "PostgreSQL", "GitHub", "Git", "Figma"
    ];
    
    // Duplicate for seamless loop
    const doubledTech = [...technologies, ...technologies];
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let animationId;
        let position = 0;
        const speed = 4; // smoother

        const totalWidth = scrollContainer.scrollWidth / 2;

        const scroll = () => {
            position -= speed;

            // seamless loop
            if (position <= -totalWidth) {
                position += totalWidth;
            }

            scrollContainer.style.transform = `translate3d(${position}px, 0, 0)`;

            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <main id={id}  className="w-full min-h-auto flex justify-center items-center bg-[#322D29] py-16 overflow-hidden">
            <div className="relative w-full overflow-hidden">
                <div
                    ref={scrollRef}
                    className="flex whitespace-nowrap will-change-transform"
                >
                    {doubledTech.map((tech, index) => (
                        <span
                            key={index}
                            className="text-[#EFE9E1] text-9xl leading-[1.2] font-claverin font-medium px-20 shrink-0 select-none"
                            >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default TechStack;