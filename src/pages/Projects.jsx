// Projects.jsx
import image1 from "../assets/images/IPTBM-PHOTO.png";
import image2 from "../assets/images/PESO-PHOTO.png";
import image3 from "../assets/images/SHROOMTIFIED-PHOTO.jpg";
import image4 from "../assets/images/THESIS-PHOTO.png";

const Projects = ({ id }) => {
  const cards = [
    {
      label: "DOST-PCAARRD-IPTBM-LB Data Hub",
      role: "Frontend Developer and UI/UX Design",
      image: image1,
    },
    {
      label: "Machine Learning-Based Object Detection of Epiphyte Plants, Parasitic Plants, and Host Trees.",
      role: "Frontend Developer, Backend developer, Machine Learning, and UI/UX Design",
      image: image2,
    },
    {
      label: "Shroomtified",
      role: "Frontend Developer, Backend developer, Machine Learning, and UI/UX Design",
      image: image3,
    },
    {
      label: "PESO Career Opportunity Application: Facilitating Job Opportunities and Skill Development",
      role: "Frontend Developer & UI/UX Design",
      image: image4,
    },
  ];

  return (
    <main id={id} className="w-full min-h-dvh bg-[#EFE9E1] flex flex-col items-center py-6 xl:py-12 px-4 md:px-6 xl:px-4">
      <header>
        <h1 className="font-claverin text-[4.5rem] sm:text-[5rem] md:text-[9rem] xl:text-[16rem] text-[#322D29] leading-none select-none text-center">
          PROJECTS
        </h1>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-2 w-full h-auto">
        {cards.map((data, index) => (
          <div key={index} className="h-fit">
            <div className="group relative h-[280px] sm:h-[350px] md:h-[420px] xl:h-[500px] overflow-hidden rounded-lg bg-[#322D29] shadow-lg hover:shadow-2xl transition-shadow duration-700 cursor-pointer">
              {/* Background image – hidden until hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110"
                style={{ backgroundImage: `url(${data.image})` }}
              />
              {/* Luxury black overlay */}
              <div className="absolute inset-0 bg-black transition-opacity duration-700 opacity-0 group-hover:opacity-30" />

              {/* Centered content – fades out on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 group-hover:opacity-0">
                {/* Logo – centered */}
                <span className="font-claverin text-[#EFE9E1] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide">
                  A·A
                </span>

                {/* Hover prompt – top‑left, dot on the right */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 text-[#EFE9E1] text-xs md:text-sm uppercase tracking-widest opacity-40">
                  <span className="font-general-sans">hover me</span>
                  {/* Glowing heartbeat dot */}
                  <span className="relative inline-flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#EFE9E1] animate-heartbeat" />
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#EFE9E1] animate-ping opacity-75" />
                  </span>
                </div>
              </div>
            </div>

            <aside className="flex flex-col py-4">
              <p className="text-[#322D29] text-base md:text-lg xl:text-xl font-normal">{data.label}</p>
              <p className="text-[#322D29] opacity-50 text-sm md:text-base font-light">{data.role}</p>
            </aside>
          </div>
        ))}
      </section>

      {/* Heartbeat animation */}
      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(0.75);
            opacity: 0.6;
          }
          14% {
            transform: scale(1.3);
            opacity: 1;
          }
          28% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          42% {
            transform: scale(1.2);
            opacity: 1;
          }
          70% {
            transform: scale(0.75);
            opacity: 0.6;
          }
        }

        .animate-heartbeat {
          animation: heartbeat 1.8s ease-in-out infinite;
          box-shadow: 0 0 12px 4px rgba(239, 233, 225, 0.3);
        }
      `}</style>
    </main>
  );
};

export default Projects;