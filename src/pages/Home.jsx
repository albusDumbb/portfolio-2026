const Home = ({ id }) => {
    const footerTextStyle = "text-center text-[#322D29] font-light leading-tight"

    return(
        <>
            <main
                id={id} 
                className="relative w-full min-h-screen bg-[#EFE9E1] flex justify-center items-center"
            >
                <section className="text-center">
                    <h1 className="text-[8.125rem] font-claverin tracking-wide text-[#322D29]">ALEJANDREI</h1>
                    <h2 className="text-[1.25rem] font-claverin tracking-wide text-[#322D29]">Bachelor of Science in Computer Science</h2>
                </section>

                <section className="absolute bottom-10 flex justify-between w-full h-auto px-8">
                    <p className={footerTextStyle}>UI/UX <br /> Design</p>

                    <p className={footerTextStyle}>Frontend <br /> Web Developer</p>

                    <p className={footerTextStyle}>Machine <br /> Learning</p>
                </section>
            </main>
        </>
    )
};

export default Home;