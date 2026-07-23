import { useEffect, useRef } from 'react';

const TechStack = ({ id }) => {
    const technologies = [
        "HTML", "CSS", "JavaScript", "ReactJS", 
        "Tailwind CSS", "PHP", "GitHub", "Git", "Figma"
    ];
    
    // Duplicate for seamless loop
    const doubledTech = [...technologies, ...technologies];
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        let animationId;
        let position = 0;
        const speed = 3; // Adjust speed here

        const scroll = () => {
            position -= speed;
            
            // Reset when first set is complete
            if (Math.abs(position) >= scrollContainer.scrollWidth / 2) {
                position = 0;
            }
            
            scrollContainer.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <main id={id}  className="w-full min-h-auto flex justify-center items-center bg-[#322D29] py-16 overflow-hidden">
            <div className="relative">
                <div 
                    ref={scrollRef}
                    className="flex whitespace-nowrap will-change-transform"
                >
                    {doubledTech.map((tech, index) => (
                        <span 
                            key={index}
                            className="text-[#EFE9E1] text-9xl font-claverin font-medium px-20 select-none"
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