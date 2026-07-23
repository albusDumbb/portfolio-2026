const About = ({ id }) => {
    return(
        <>
            <main
                id={id} 
                className="w-full min-h-screen bg-[#322D29] flex flex-col items-center pt-12 px-2"
            >
                <h1 className="font-claverin text-[20rem] text-[#EFE9E1] leading-none select-none">ABOUT</h1>
                <p className="text-[2.19rem] text-[#EFE9E1] opacity-50 text-center font-extralight">I am a Computer Science graduate specializing in frontend web development with a passion for creating clean, responsive, and user-friendly interfaces. I enjoy designing my own UIs and have a strong interest in UI/UX design. Beyond frontend development, I have experience in backend development and applied machine learning in my undergraduate thesis. </p>
            </main>
        </>
    )
};

export default About;