import { Fragment, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  // Memoized so re-renders don't hand the effect a new array and re-run it
  const words = useMemo(() => children.split(" "), [children]);

  useEffect(() => {
    if (!ref.current) return;

    // Scope the timeline + ScrollTrigger to this component so cleanup only reverts ours
    const ctx = gsap.context(() => {
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

    }, ref);

    // Only revert this component's animation (killing every ScrollTrigger here
    // also wiped out other sections' animations, e.g. Expertise)
    return () => ctx.revert();
  }, [words]);

  return (
    <div ref={ref} className={className}>
      {/* Mobile (below md): flowing text so it can be justified – straight left and right edges.
          md and up: the original centered flex layout. */}
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 text-center max-md:block max-md:text-justify max-md:leading-[1.7] text-[1.5rem] xl:text-[2.19rem] font-extralight text-[#EFE9E1]">
        {words.map((word, index) => (
          <Fragment key={index}>
            <span
              className="word inline-block"
              style={{
                filter: "blur(12px)",
                opacity: 0,
              }}
            >
              {word}
              {/* Fixed word spacing for the flex layout; hidden on mobile, where the real space below is stretched to justify */}
              {index < words.length - 1 && <span className="max-md:hidden">{" "}</span>}
            </span>
            {/* Real space between words – what the browser stretches when justifying (ignored by the flex layout) */}
            {index < words.length - 1 && " "}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TextReveal;