import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../assets/images/IPTBM-PHOTO.png";
import image2 from "../assets/images/PESO-PHOTO.png";
import image3 from "../assets/images/SHROOMTIFIED-PHOTO.jpg";
import image4 from "../assets/images/THESIS-PHOTO.png";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    label: "DOST-PCAARRD-IPTBM-LB Data Hub",
    roles: ["Frontend Developer", "UI/UX Design"],
    year: "2026",
    image: image1,
    tone: "#322D29",
    link: "https://lspuiptbm.netlify.app/",
  },
  {
    label: "Machine Learning-Based Object Detection",
    roles: ["Frontend Developer", "Backend Developer", "Machine Learning", "UI/UX Design"],
    year: "2025",
    image: image4,
    tone: "#D9CEBF",
    link: "",
  },
  {
    label: "Shroomtified",
    roles: ["Frontend Developer", "Backend Developer", "Machine Learning", "UI/UX Design"],
    year: "2025",
    image: image3,
    tone: "#8A7968",
    link: "",
  },
  {
    label: "PESO Career Opportunity Application",
    roles: ["Frontend Developer", "UI/UX Design"],
    year: "2024",
    image: image2,
    tone: "#5B5047",
    link: "",
  },
];

// Scroll distance per project, as a fraction of the viewport height
const STEP = 0.28;

const ROLL = { duration: 0.9, ease: "power4.inOut" };

// Every project's text sits in the same grid cell, so the slot is as tall as the
// tallest entry and entries can roll past each other without layout shifts
const Stack = ({ className = "", children }) => (
  <div className={`grid [&>*]:[grid-area:1/1] ${className}`}>{children}</div>
);

// One rolling line: an overflow mask with the text inside it
const Line = ({ children, className = "" }) => (
  <span className="block overflow-hidden">
    <span className={`roll block ${className}`}>{children}</span>
  </span>
);

const Projects = ({ id }) => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const prevRef = useRef(0);

  // Pin the section and give each project an equal slice of scroll distance –
  // the page only moves on once the last project has been shown
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * STEP * cards.length}`,
        pin: true,
        // The parent <main> is flex, where GSAP turns pin spacing off by default
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          setActive((cur) => (cur === i ? cur : i));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hide every entry except the first before paint
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-slide]").forEach((el) => {
        if (el.dataset.slide !== "0") {
          gsap.set(el.querySelectorAll(".roll"), { yPercent: 110 });
          gsap.set(el, { autoAlpha: 0 });
        }
      });
      gsap.utils.toArray("[data-frame]").forEach((el) => {
        if (el.dataset.frame !== "0") gsap.set(el, { autoAlpha: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Roll the outgoing project away and the incoming one in, following the scroll
  // direction (down → content moves up, up → content moves down)
  useEffect(() => {
    const prev = prevRef.current;
    if (prev === active) return;
    prevRef.current = active;
    const dir = active > prev ? 1 : -1;
    const root = sectionRef.current;

    const ctx = gsap.context(() => {
      // Text: every line rolls through its mask, lines staggered like a counter
      root.querySelectorAll("[data-slide]").forEach((el) => {
        const i = Number(el.dataset.slide);
        const lines = el.querySelectorAll(".roll");
        if (i === active) {
          gsap.set(el, { autoAlpha: 1 });
          gsap.fromTo(lines, { yPercent: 110 * dir }, { yPercent: 0, stagger: 0.06, ...ROLL, overwrite: true });
        } else if (i === prev) {
          gsap.to(lines, {
            yPercent: -110 * dir, stagger: 0.04, ...ROLL, overwrite: true,
            onComplete: () => gsap.set(el, { autoAlpha: 0 }),
          });
        } else {
          gsap.killTweensOf(lines);
          gsap.set(el, { autoAlpha: 0 });
        }
      });

      // Image: the backdrop crossfades in place, while the screenshot slides in
      // from the scroll direction and settles at its true size (never upscaled,
      // so it stays sharp); the outgoing one drifts the other way and fades out
      root.querySelectorAll("[data-frame]").forEach((el) => {
        const i = Number(el.dataset.frame);
        const shot = el.querySelector("img");
        if (i === active) {
          gsap.set(el, { zIndex: 2 });
          gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: "power2.out", overwrite: true });
          gsap.fromTo(shot, { yPercent: 14 * dir, scale: 0.96 }, { yPercent: 0, scale: 1, duration: 1.2, ease: "power3.out", overwrite: true });
        } else if (i === prev) {
          gsap.set(el, { zIndex: 1 });
          gsap.to(el, { autoAlpha: 0, duration: 0.9, ease: "power3.inOut", overwrite: true });
          gsap.to(shot, { yPercent: -14 * dir, duration: 0.9, ease: "power3.inOut", overwrite: true });
        } else {
          gsap.killTweensOf([el, shot]);
          gsap.set(el, { autoAlpha: 0, zIndex: 0 });
        }
      });
    }, sectionRef);

    // No revert on cleanup – the tweens must keep their end state between changes
    return () => ctx.kill();
  }, [active]);

  const current = cards[active];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-dvh overflow-hidden bg-[#EFE9E1] text-[#322D29] px-4 md:px-8 xl:px-16 pt-6 pb-6 md:pt-8 md:pb-8 flex flex-col gap-4 md:gap-5"
    >
      {/* Top row – project name (left), counter + year (right) */}
      <header className="flex items-start justify-between gap-6 shrink-0">
        {/* Spacing via flex gap/padding – the global * { margin: 0 } overrides margin utilities */}
        <div className="min-w-0 max-w-[85%] xl:max-w-[70%] flex flex-col gap-2 md:gap-3">
          {/* span, not p – the global p { font-family } rule would override font-claverin */}
          <span className="font-claverin text-base md:text-xl text-[#322D29]">
            (Projects)
          </span>
          <Stack>
            {cards.map((card, i) => (
              <h2
                key={card.label}
                data-slide={i}
                aria-hidden={i !== active}
                className="font-satoshi font-light tracking-[-0.04em] leading-[0.95] text-[clamp(1.9rem,4.2vw,4.75rem)]"
              >
                {/* Split into words so each one rolls on its own */}
                {card.label.split(" ").map((word, w) => (
                  <span key={w} className="inline-block overflow-hidden align-top pb-[0.08em] pr-[0.22em]">
                    <span className="roll inline-block">{word}</span>
                  </span>
                ))}
              </h2>
            ))}
          </Stack>
        </div>

        <div className="shrink-0 text-right font-general-sans text-xs md:text-sm tabular-nums leading-relaxed">
          <Stack className="justify-items-end">
            {cards.map((card, i) => (
              <div key={card.label} data-slide={i} aria-hidden={i !== active}>
                <Line className="text-[#322D29]">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-[#322D29]/40"> / {String(cards.length).padStart(2, "0")}</span>
                </Line>
                <Line className="text-[#322D29]/50">{card.year}</Line>
              </div>
            ))}
          </Stack>
        </div>
      </header>

      {/* Bottom area – roles (left), image (right) */}
      <div className="flex-1 min-h-0 flex flex-col-reverse md:flex-row gap-4 md:gap-8">
        <aside className="md:w-[22%] xl:w-[18%] shrink-0 flex md:flex-col justify-between md:justify-end items-end md:items-start gap-4 md:gap-8">
          {/* Entries sit on the bottom of the slot, so short role lists stay by the scroll hint */}
          <Stack className="[&>*]:self-end">
            {cards.map((card, i) => (
              <ul key={card.label} data-slide={i} aria-hidden={i !== active} className="font-general-sans text-sm md:text-base xl:text-lg leading-snug">
                {card.roles.map((role) => (
                  <li key={role}>
                    <Line>{role}</Line>
                  </li>
                ))}
              </ul>
            ))}
          </Stack>

          <div className="flex flex-col items-end md:items-start gap-3 font-general-sans text-xs md:text-sm shrink-0">
            {current.link ? (
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="group relative inline-flex items-center gap-1.5"
              >
                Visit site
                <span className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-[#322D29] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              </a>
            ) : (
              <span className="text-[#322D29]/40">Coming soon</span>
            )}
            <span className="flex items-center gap-1">
              scroll <span aria-hidden="true">↑↓</span>
            </span>
          </div>
        </aside>

        {/* Image frame – sharp corners, all projects stacked in one frame. Each
            screenshot floats uncropped on its own backdrop tone, shown at or below
            its native size so it never looks stretched */}
        <div
          data-cursor={current.link ? "view" : "soon"}
          className="relative flex-1 min-h-0 overflow-hidden"
          onClick={() => current.link && window.open(current.link, "_blank", "noopener,noreferrer")}
        >
          {cards.map((card, i) => (
            <div
              key={card.label}
              data-frame={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: card.tone }}
            >
              <img
                src={card.image}
                alt={card.label}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-auto h-auto max-w-[86%] max-h-[78%] md:max-w-[78%] md:max-h-[80%] object-contain will-change-transform shadow-[0_40px_80px_-30px_rgba(20,16,13,0.55),0_12px_24px_-12px_rgba(20,16,13,0.35)] [filter:saturate(0.9)_contrast(1.03)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
