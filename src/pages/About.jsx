import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../components/Animation/TextReveal";

gsap.registerPlugin(ScrollTrigger);

// Lead statement – revealed word by word. *Asterisks* mark phrases shown in Claverin.
const leadText =
  "I'm a *Full-Stack Web Developer* who turns ideas into modern, scalable, and *user-centered* web applications.";

// Supporting detail – smaller, fades up once the lead has been read
const supportingText =
  "From UI/UX design and API integration to database management and deployment, I work across the full development lifecycle — pairing clean frontend design with robust backend functionality. Beyond the web, I design interfaces in Figma and build computer vision models in Python, so I approach every problem from both the user's side and the data's side. I'm always learning new technologies to build products that are both visually appealing and technically efficient. Above all, I care about the small details that make a product feel effortless to use.";

const About = ({ id }) => {
  const supportRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(supportRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: supportRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, supportRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      id={id}
      className="w-full h-fit bg-[#322D29] flex flex-col items-center gap-10 md:gap-14 py-12 md:pb-20 px-4 md:px-8"
    >
      <h1 data-cursor="lens" className="font-claverin text-[6.5rem] xl:text-[20rem] text-[#EFE9E1] leading-none select-none">
        ABOUT
      </h1>

      <TextReveal className="w-full flex justify-center">
        {leadText}
      </TextReveal>

      <p
        ref={supportRef}
        className="w-full text-center max-md:text-justify text-[#EFE9E1]/60 font-light text-base md:text-lg xl:text-xl leading-relaxed"
      >
        {supportingText}
      </p>
    </main>
  );
};

export default About;
