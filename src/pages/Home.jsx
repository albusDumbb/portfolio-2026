const Home = ({ id }) => {
    const footerTextStyle = "text-center text-[#322D29] font-light leading-tight text-sm md:text-base xl:text-lg"

    return(
        <>
            <main
                id={id} 
                className="relative w-full min-h-dvh bg-[#EFE9E1] flex justify-center items-center px-4"
            >
                <section className="text-center">
                    <h1 className="text-[3.4rem] sm:text-[5rem] md:text-[5.5rem] xl:text-[8.125rem] font-claverin tracking-wide text-[#322D29] leading-tight">
                        ALEJANDREI
                    </h1>
                    <h2 className="text-[0.875rem] md:text-[1rem] xl:text-[1.25rem] font-claverin tracking-wide text-[#322D29]">
                        Bachelor of Science in Computer Science
                    </h2>
                </section>

                <section className="absolute bottom-6 md:bottom-8 xl:bottom-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-4 sm:gap-0 w-full h-auto px-6 md:px-8">
                    <p className={footerTextStyle}>UI/UX <br className="hidden sm:block" /> Design</p>
                    <p className={footerTextStyle}>Frontend <br className="hidden sm:block" /> Web Developer</p>
                    <p className={footerTextStyle}>Machine <br className="hidden sm:block" /> Learning</p>
                </section>
            </main>
        </>
    )
};

export default Home;