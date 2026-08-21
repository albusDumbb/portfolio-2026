import { MapPin, Phone, Mail, Dot } from "lucide-react";

const Contacts = ({ id }) => {
    const listA = [
        {
            icon: <MapPin size={20}/>,
            label: "Address",
            desc: "Mayondon, Los Banos, Laguna"
        },
        {
            icon: <Phone size={20}/>,
            label: "Contact Number",
            desc: "09623367401"
        },
        {
            icon: <Mail size={20}/>,
            label: "Email",
            desc: "alejandreiduran@gmail.com"
        },
    ]

    const listB = [
        {
            icon: "",
            label: "Messenger",
            desc: "@alejandrei.duran.2024"
        },
        {
            icon: "",
            label: "Facebook",
            desc: "Alejandrei Duran"
        },
        {
            icon: "",
            label: "Instagram",
            desc: "@alejandreiduran"
        },
    ]

    return(
        <>
            <main
                id={id} 
                className="w-full min-h-dvh bg-[#322D29] flex flex-col gap-10 md:gap-12 xl:gap-16 items-center py-12 px-4 md:px-8 xl:px-4"
            >
                <header>
                    <h1 className="font-claverin text-[4.3rem] sm:text-[5rem] md:text-[8.5rem] xl:text-[15rem] text-[#EFE9E1] leading-none select-none text-center">
                        CONTACTS
                    </h1>
                </header>

                <section className="w-full h-auto flex flex-col gap-10 md:gap-12 max-w-2xl xl:max-w-none">
                    {/* Description */}
                    <aside className="flex flex-col gap-4 md:gap-6">
                        <h1 className="font-claverin text-[#EFE9E1] text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] xl:text-[2.25rem] leading-none">
                            Alejandrei Apolo M. Duran
                        </h1>
                        <p className="text-[#EFE9E1] opacity-50 text-base md:text-lg xl:text-[1.25rem] font-extralight">
                            Full-Stack Web Developer specializing in modern web applications, intuitive user experiences, and scalable backend solutions. Passionate about building efficient, user-centered digital products and continuously learning new technologies.
                        </p>
                    </aside>

                    {/* Horizontal Line */}
                    <aside className="w-full h-[1px] rounded-full bg-[#EFE9E1] opacity-50"></aside>

                    {/* Contacts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-0">
                        {/* First Col */}
                        <div className="flex flex-col gap-8">
                            {listA.map((data, index) => (
                                <aside
                                    key={index}
                                    className="flex flex-col "
                                >
                                    <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] font-light flex gap-2 items-center">
                                        <p>{data.icon}</p>
                                        <p>{data.label}</p>
                                    </span>

                                    <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
                                        <p>{data.desc}</p>
                                    </span>
                                </aside>
                            ))}
                        </div>

                        {/* Second Col */}
                        <div className="flex flex-col gap-8">
                            {listB.map((data, index) => (
                                <aside
                                    key={index}
                                    className="flex flex-col "
                                >
                                    <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] font-light">
                                        <p>{data.label}</p>
                                    </span>

                                    <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
                                        <p>{data.desc}</p>
                                    </span>
                                </aside>
                            ))}
                        </div>

                        {/* Third Col */}
                        <aside
                            className="flex flex-col "
                        >
                            <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] font-light">
                                <p>GitHub</p>
                            </span>

                            <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
                                <p>albusDumbb</p>
                            </span>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    )
};

export default Contacts;