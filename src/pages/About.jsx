import TextReveal from "../components/Animation/TextReveal";

const About = ({ id }) => {
  const paragraphText =
    "I am a Computer Science graduate specializing in frontend web development with a passion for creating clean, responsive, and user-friendly interfaces. I enjoy designing my own UIs and have a strong interest in UI/UX design. Beyond frontend development, I have experience in backend development and applied machine learning in my undergraduate thesis.";

  return (
    <main
      id={id}
      className="w-full h-fit bg-[#322D29] flex flex-col items-center py-12 px-2"
    >
      <h1 className="font-claverin text-[6.5rem] xl:text-[20rem] text-[#EFE9E1] leading-none select-none">
        ABOUT
      </h1>
      <TextReveal className="w-full flex justify-center">
        {paragraphText}
      </TextReveal>
    </main>
  );
};

export default About;