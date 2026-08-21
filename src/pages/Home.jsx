const Home = ({ id }) => {
  const footerTextStyle =
    "text-center text-[#322D29] font-light leading-tight text-sm md:text-base xl:text-lg";

  return (
    <>
      <main
        id={id}
        className="relative w-full min-h-dvh bg-[#EFE9E1] flex justify-center items-center"
      >
        <section className="flex flex-col justify-center items-center">
          {/* Main title */}
          <div className="inline-block overflow-hidden bg-[#EFE9E1]">
            <h1
              className="text-[2.75rem] sm:text-[5rem] md:text-[5.5rem] xl:text-[8.125rem] font-claverin text-[#322D29] leading-tight tracking-[0.2em] animate-slide-in-up-deep delay-200"
              style={{ transform: 'translateY(400px)' }}
            >
              ALEJANDREI
            </h1>
          </div>

          {/* Subtitle */}
          <div className="inline-block overflow-hidden bg-[#EFE9E1]">
            <p
              className="text-[0.775rem] md:text-[1rem] xl:text-[1.50rem] tracking-wider text-[#322D29] animate-slide-in-up-shallow delay-700"
              style={{ transform: 'translateY(350px)' }}
            >
              Bachelor of Science in Computer Science
            </p>
          </div>
        </section>

        {/* Footer Text */}
        <section className="absolute bottom-6 md:bottom-8 xl:bottom-10 w-full h-auto px-6 md:px-8">
          <div className="relative w-full flex justify-center items-center" style={{ minHeight: '4rem' }}>
            {/* Left item */}
            <div className="absolute left-0 overflow-hidden">
              <p
                className={`${footerTextStyle} animate-slide-in-up-footer delay-footer`}
                style={{ transform: "translateY(250px)" }}
              >
                UI/UX <br /> Design
              </p>
            </div>

            {/* Center item */}
            <div className="absolute left-1/2 -translate-x-1/2 overflow-hidden">
              <p
                className={`${footerTextStyle} animate-slide-in-up-footer delay-footer`}
                style={{ transform: "translateY(250px)" }}
              >
                Full stack <br /> Web Developer
              </p>
            </div>

            {/* Right item */}
            <div className="absolute right-0 overflow-hidden">
              <p
                className={`${footerTextStyle} animate-slide-in-up-footer delay-footer`}
                style={{ transform: "translateY(250px)" }}
              >
                Machine <br /> Learning
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;