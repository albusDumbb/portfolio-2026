const Home = ({ id }) => {
  const metaTextStyle =
    "text-[#322D29] font-light leading-tight text-xs md:text-sm xl:text-base tracking-wider";

  // Big staggered lines: Full Stack leads as the primary role, the other two sit a size down
  const primarySize =
    "text-[clamp(3rem,min(20vw,11dvh),6rem)] md:text-[clamp(3.5rem,min(13vw,22dvh),15rem)]";
  const secondarySize =
    "text-[clamp(2.5rem,min(15vw,7.5dvh),5rem)] md:text-[clamp(2.5rem,min(8vw,14dvh),10rem)]";

  const roles = [
    { index: "01", title: "Full Stack", note: "Web Developer", align: "justify-start", size: primarySize, delay: "0.2s" },
    { index: "02", title: "UI/UX Design", note: "Interfaces & Experience", align: "justify-end", size: secondarySize, delay: "0.35s" },
    { index: "03", title: "Machine Learning", note: "Models & Data", align: "justify-start md:pl-[4vw]", size: secondarySize, delay: "0.5s" },
  ];

  return (
    <main
      id={id}
      className="relative w-full min-h-dvh bg-[#EFE9E1] flex flex-col justify-between px-6 md:px-10 xl:px-12 pt-24 pb-6 md:pb-8 xl:pb-10"
    >
      {/* Top meta row */}
      <section className="flex justify-between items-end gap-4">
        <div className="overflow-hidden">
          <p
            className={`${metaTextStyle} animate-slide-in-up-footer`}
            style={{ transform: "translateY(250px)" }}
          >
            (Portfolio)
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            className={`${metaTextStyle} text-right animate-slide-in-up-footer`}
            style={{ transform: "translateY(250px)" }}
          >
            ©2026
          </p>
        </div>
      </section>

      {/* Roles – large text */}
      <section className="flex flex-col gap-4 md:gap-1 xl:gap-2 py-3">
        {roles.map((role) => (
          <div key={role.index} className={`flex ${role.align}`}>
            <div className="overflow-hidden">
              <div
                className="flex items-start gap-2 md:gap-4 animate-slide-in-up-deep"
                style={{ transform: "translateY(400px)", animationDelay: role.delay }}
              >
                <span className="font-general-sans font-light text-[#322D29] text-xs md:text-sm xl:text-base mt-2 md:mt-4 xl:mt-6 shrink-0">
                  ({role.index})
                </span>
                <div>
                  {/* Top padding in em scales with each line's size, so the reveal mask never clips the tall Claverin glyphs */}
                  <h1 data-cursor="lens" className={`font-claverin uppercase text-[#322D29] leading-none pt-[0.12em] ${role.size}`}>
                    {role.title}
                  </h1>
                  <p className="text-[#322D29]/70 font-light tracking-wider text-xs md:text-sm xl:text-base">
                    {role.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom meta row – name small */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 border-t border-[#322D29]/30 pt-4 items-end">
        <div className="overflow-hidden">
          <p
            className="font-claverin text-[#322D29] text-xs md:text-sm xl:text-base tracking-[0.15em] animate-slide-in-up-footer"
            style={{ transform: "translateY(250px)" }}
          >
            ALEJANDREI APOLO DURAN
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            className={`${metaTextStyle} md:text-center animate-slide-in-up-footer`}
            style={{ transform: "translateY(250px)" }}
          >
            Bachelor of Science in Computer Science
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            className={`${metaTextStyle} md:text-right animate-slide-in-up-footer`}
            style={{ transform: "translateY(250px)" }}
          >
            Scroll to explore ↓
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
