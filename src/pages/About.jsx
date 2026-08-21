import TextReveal from "../components/Animation/TextReveal";

const About = ({ id }) => {
  const paragraphText =
    "I am a Full-Stack Web Developer with a strong foundation in building modern, scalable, and user-centered web applications. I enjoy transforming ideas into intuitive digital experiences by combining clean frontend design with robust backend functionality. With experience across the full development lifecycle—from UI/UX design and API integration to database management and deployment—I am passionate about creating solutions that are both visually appealing and technically efficient. I am continuously learning and exploring new technologies to deliver better products and meaningful user experiences. I enjoy building applications that not only work efficiently but also provide meaningful and intuitive experiences for users.";

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