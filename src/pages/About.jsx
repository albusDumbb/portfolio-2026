import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../components/Animation/TextReveal";

gsap.registerPlugin(ScrollTrigger);

// Lead statement – revealed word by word, sticky on the left while the details scroll by
const leadText =
  "I'm a Full-Stack Web Developer who turns ideas into modern, scalable, and user-centered web applications.";

// Supporting detail – short labeled chunks instead of one long paragraph
const details = [
  {
    label: "What I do",
    text: "I work across the full development lifecycle — UI/UX design, API integration, database management, and deployment — pairing clean frontend design with robust backend functionality.",
  },
  {
    label: "Beyond the web",
    text: "I design interfaces in Figma and build computer vision models in Python, so I approach every problem from both the user's side and the data's side.",
  },
  {
    label: "How I work",
    text: "I'm always learning new technologies to build products that are both visually appealing and technically efficient — and I care about the small details that make a product feel effortless to use.",
  },
];

const facts = ["Based in the Philippines", "Full-Stack Developer", "Open to work"];

const About = ({ id }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each chunk: its divider draws in from the left, then the content rises in
      gsap.utils.toArray("[data-detail]").forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(el.querySelector("[data-rule]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
        ).fromTo(el.querySelector("[data-body]"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          "-=0.7"
        );
      });

      gsap.fromTo("[data-facts]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-facts]",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      id={id}
      className="w-full h-fit bg-[#322D29] flex flex-col items-center gap-10 md:gap-14 py-12 md:pb-20 px-4 md:px-8 xl:px-16"
    >
      <h1 data-cursor="lens" className="font-claverin text-[6.5rem] xl:text-[20rem] text-[#EFE9E1] leading-none select-none">
        ABOUT
      </h1>

      {/* Editorial split – lead (left, sticky on desktop), details (right). Stacks on mobile */}
      <div className="w-full grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 xl:gap-24 items-start">
        <div className="md:sticky md:top-28">
          <TextReveal
            alignClassName="justify-start text-left"
            textClassName="font-general-sans text-[1.75rem] md:text-[2.25rem] xl:text-[3rem] leading-tight font-extralight text-[#EFE9E1]"
          >
            {leadText}
          </TextReveal>
        </div>

        <ol className="flex flex-col">
          {details.map((item, i) => (
            <li key={item.label} data-detail className="flex flex-col">
              <span data-rule className="block h-px w-full bg-[#EFE9E1]/25 origin-left" />
              <div data-body className="flex flex-col gap-3 md:gap-4 py-8 md:py-10 xl:py-12">
                {/* span, not p – the global p { font-family } rule would override font-claverin */}
                <span className="flex items-baseline gap-3 text-[#EFE9E1]">
                  <span className="font-claverin text-base md:text-lg">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <span className="font-satoshi font-light tracking-[-0.02em] text-[1.5rem] md:text-[1.75rem] xl:text-[2rem] leading-tight">
                    {item.label}
                  </span>
                </span>
                <p className="text-[#EFE9E1]/60 font-light text-base md:text-lg leading-relaxed max-md:text-justify">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Quick facts row */}
      <div data-facts className="w-full border-t border-[#EFE9E1]/25 pt-5 md:pt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 font-general-sans text-xs md:text-sm uppercase tracking-[0.15em] text-[#EFE9E1]/50">
        {facts.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>
    </main>
  );
};

export default About;
