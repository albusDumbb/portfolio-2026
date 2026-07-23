const Home = ({ id }) => {
  const footerTextStyle =
    "text-center text-[#322D29] font-light leading-tight text-sm md:text-base xl:text-lg";

  return (
    <>
      <style>{`
        /* --- Main & subtitle slide-up --- */
        @keyframes slideInUpShallow {
          from { transform: translateY(350px); }
          to { transform: translateY(0); }
        }
        .animate-slide-in-up-shallow {
          animation: slideInUpShallow 1s ease-out forwards;
        }

        @keyframes slideInUpDeep {
          from { transform: translateY(400px); }
          to { transform: translateY(0); }
        }
        .animate-slide-in-up-deep {
          animation: slideInUpDeep 1s ease-out forwards;
        }

        /* Delays for title and subtitle */
        .delay-200 { animation-delay: 0.2s; }   /* added back – main title first */
        .delay-700 { animation-delay: 0.3s; }   /* Bachelor appears after */

        /* --- Footer slide-out animations (with opacity) --- */
        @keyframes slideLeft {
          from { left: 50%; transform: translateX(-50%); opacity: 0; }
          to   { left: 0; transform: translateX(0); opacity: 1; }
        }
        @keyframes slideCenter {
          from { left: 50%; transform: translateX(-50%); opacity: 0; }
          to   { left: 50%; transform: translateX(-50%); opacity: 1; }
        }
        @keyframes slideRight {
          from { left: 50%; transform: translateX(-50%); opacity: 0; }
          to   { left: 100%; transform: translateX(-100%); opacity: 1; }
        }

        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
        }
        .animate-slide-center {
          animation: slideCenter 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
        }

        /* Footer delay – starts after Bachelor (0.3s delay + 1s duration = 1.3s) */
        .delay-footer {
          animation-delay: 1.3s;
        }

        /* Initial state: hidden and centered */
        .footer-item-start {
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
        }
      `}</style>

      <main
        id={id}
        className="relative w-full min-h-dvh bg-[#EFE9E1] flex justify-center items-center px-4"
      >
        <section className="flex flex-col justify-center items-center">
          {/* Main title */}
          <div className="inline-block overflow-hidden bg-[#EFE9E1]">
            <h1
              className="text-[3.4rem] sm:text-[5rem] md:text-[5.5rem] xl:text-[8.125rem] font-claverin tracking-wide text-[#322D29] leading-tight animate-slide-in-up-deep delay-200"
              style={{ transform: 'translateY(400px)' }}
            >
              ALEJANDREI
            </h1>
          </div>

          {/* Subtitle */}
          <div className="inline-block overflow-hidden bg-[#EFE9E1]">
            <h2
              className="text-[0.875rem] md:text-[1rem] xl:text-[1.25rem] font-claverin tracking-wide text-[#322D29] animate-slide-in-up-shallow delay-700"
              style={{ transform: 'translateY(350px)' }}
            >
              Bachelor of Science in Computer Science
            </h2>
          </div>
        </section>

        {/* Footer with three items sliding from center */}
        <section className="absolute bottom-6 md:bottom-8 xl:bottom-10 w-full h-auto px-6 md:px-8">
          <div className="relative w-full flex justify-center items-center" style={{ minHeight: '4rem' }}>
            {/* Left item */}
            <p
              className={`${footerTextStyle} absolute footer-item-start animate-slide-left delay-footer`}
            >
              UI/UX <br className="hidden sm:block" /> Design
            </p>

            {/* Center item */}
            <p
              className={`${footerTextStyle} absolute footer-item-start animate-slide-center delay-footer`}
            >
              Frontend <br className="hidden sm:block" /> Web Developer
            </p>

            {/* Right item */}
            <p
              className={`${footerTextStyle} absolute footer-item-start animate-slide-right delay-footer`}
            >
              Machine <br className="hidden sm:block" /> Learning
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;