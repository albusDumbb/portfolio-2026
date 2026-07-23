import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const words = children.split(" ");

  useEffect(() => {
    if (!ref.current) return;

    const wordElements = ref.current.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",   // when section top hits viewport bottom
        end: "bottom bottom",  // when section bottom hits viewport bottom – reveal completes here
        scrub: 1,              // smooth scrubbing
        // markers: true,      // uncomment for debugging
        toggleActions: "play none none none",
      },
    });

    const totalWords = words.length;
    const durationPerWord = 1 / totalWords;

    wordElements.forEach((el, i) => {
      const startTime = i / totalWords;
      tl.fromTo(
        el,
        { filter: "blur(12px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 0.5,
          duration: durationPerWord,
          ease: "power1.out",
        },
        startTime
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [words]);

  return (
    <div ref={ref} className={className}>
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 text-center text-[1.5rem] xl:text-[2.19rem] font-extralight text-[#EFE9E1]">
        {words.map((word, index) => (
          <span
            key={index}
            className="word inline-block"
            style={{
              filter: "blur(12px)",
              opacity: 0,
            }}
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextReveal;