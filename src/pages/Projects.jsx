import { useEffect, useRef, useState } from "react";
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
    link: "https://lspuiptbm.netlify.app/",
  },
  {
    label: "Machine Learning-Based Object Detection...",
    roles: ["Frontend Developer", "Backend Developer", "Machine Learning", "UI/UX Design"],
    year: "2025",
    image: image4,
    link: "",
  },
  {
    label: "Shroomtified",
    roles: ["Frontend Developer", "Backend Developer", "Machine Learning", "UI/UX Design"],
    year: "2025",
    image: image3,
    link: "",
  },
  {
    label: "PESO Career Opportunity Application...",
    roles: ["Frontend Developer", "UI/UX Design"],
    year: "2024",
    image: image2,
    link: "",
  },
];

const Projects = ({ id }) => {
  // Card showing its image because it was tapped (touch screens have no hover)
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

  // Each card's frame wipes open from the bottom as it scrolls into view,
  // then its info row rises in underneath
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(card.querySelector(".project-frame"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
        );
        tl.fromTo(card.querySelector(".project-info"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} id={id} className="w-full min-h-dvh bg-[#EFE9E1] flex flex-col items-center py-6 xl:py-12 px-4 md:px-6 xl:px-4">
      <header>
        <h1 data-cursor="lens" className="font-claverin text-[4.5rem] sm:text-[5rem] md:text-[9rem] xl:text-[16rem] text-[#322D29] leading-none select-none text-center">
          PROJECTS
        </h1>
      </header>

      {/* Staggered grid – the right column sits lower, like a magazine spread.
          Extra bottom padding on xl makes room for the shifted column. */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-x-8 xl:gap-y-16 w-full h-auto xl:pb-48">
        {cards.map((data, index) => {
          const isActive = activeIndex === index;
          const hasLink = Boolean(data.link);
          // Live projects are real links; the rest toggle their image on tap
          const Card = hasLink ? "a" : "div";
          const cardProps = hasLink
            ? { href: data.link, target: "_blank", rel: "noopener noreferrer" }
            : { onClick: () => setActiveIndex(isActive ? null : index) };

          return (
            <Card
              key={data.label}
              {...cardProps}
              data-cursor={hasLink ? "view" : "soon"}
              className={`project-card group block h-fit cursor-pointer ${index % 2 === 1 ? "xl:translate-y-48" : ""}`}
            >
              <div className="project-frame relative h-[280px] sm:h-[350px] md:h-[420px] xl:h-[500px] overflow-hidden rounded-lg bg-[#322D29] shadow-lg group-hover:shadow-2xl transition-shadow duration-700">
                {/* Background image – hidden until hover or active */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out
                    opacity-0 scale-100
                    group-hover:opacity-100 group-hover:scale-110
                    ${isActive ? 'opacity-100 scale-110' : ''}`}
                  style={{ backgroundImage: `url(${data.image})` }}
                />

                {/* Luxury black overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700
                    opacity-0 group-hover:opacity-30
                    ${isActive ? 'opacity-30' : ''}`}
                />

                {/* Centered content – fades out on hover or active */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700
                    group-hover:opacity-0
                    ${isActive ? 'opacity-0' : ''}`}
                >
                  {/* Logo – centered */}
                  <span className="font-claverin text-[#EFE9E1] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide">
                    A·A
                  </span>

                  {/* Hover / Click prompt – top‑left */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 text-[#EFE9E1] text-xs md:text-sm uppercase tracking-widest opacity-40">
                    {/* Show "hover me" on larger screens (≥sm), "CLICK ME" on smaller */}
                    <span className="hidden sm:inline font-general-sans">hover me</span>
                    <span className="sm:hidden font-general-sans">CLICK ME</span>

                    {/* Glowing heartbeat dot */}
                    <span className="relative inline-flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#EFE9E1] animate-heartbeat" />
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#EFE9E1] animate-ping opacity-75" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Info row – number + title + roles on the left, year + link state on the right.
                  A hairline under it draws across on hover. */}
              <div className="project-info relative flex justify-between items-start gap-4 pt-4 pb-4 border-b border-[#322D29]/15">
                <div className="flex items-start gap-3 md:gap-4 min-w-0">
                  <span className="font-general-sans font-light text-[#322D29] text-xs md:text-sm pt-1 md:pt-1.5 shrink-0">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    {/* h3, not p – the global p { font-family } rule in index.css would override font-satoshi */}
                    <h3 className="font-satoshi font-light tracking-[-0.01em] text-[#322D29] text-lg md:text-xl xl:text-2xl leading-snug">{data.label}</h3>
                    <ul className="flex flex-wrap items-center font-general-sans font-light text-[#322D29]/60 text-xs md:text-sm">
                      {data.roles.map((role, j) => (
                        <li key={role} className="flex items-center">
                          {role}
                          {j < data.roles.length - 1 && (
                            <span aria-hidden="true" className="px-1.5 md:px-2 text-[#A68A64]">·</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-general-sans font-light text-[#322D29] text-xs md:text-sm pt-1 md:pt-1.5 tabular-nums">
                  <span>{data.year}</span>
                  {hasLink ? (
                    <span aria-label="Opens live site" className="inline-block transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  ) : (
                    <span className="text-[#322D29]/50">Soon</span>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-px h-px w-full bg-[#322D29] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                />
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
};

export default Projects;
