import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, UserRound, Camera, GitBranch } from "lucide-react";

// Local time in Los Baños (Philippines, GMT+8)
const formatLocalTime = () =>
    new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date());

const Contacts = ({ id }) => {
    const [localTime, setLocalTime] = useState(formatLocalTime);

    useEffect(() => {
        const timer = setInterval(() => setLocalTime(formatLocalTime()), 15000);
        return () => clearInterval(timer);
    }, []);

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
            icon: <MessageCircle size={20}/>,
            label: "Messenger",
            desc: "@alejandrei.duran.2024"
        },
        {
            icon: <UserRound size={20}/>,
            label: "Facebook",
            desc: "Alejandrei Duran"
        },
        {
            icon: <Camera size={20}/>,
            label: "Instagram",
            desc: "@alejandreiduran"
        },
    ]

    return(
        <>
            <main
                id={id} 
                className="w-full min-h-dvh bg-[#322D29] flex flex-col gap-10 md:gap-12 xl:gap-16 items-center pt-12 pb-6 md:pb-8 px-4 md:px-8 xl:px-4"
            >
                <header>
                    <h2 data-cursor="lens" className="font-claverin text-[4.3rem] sm:text-[5rem] md:text-[8.5rem] xl:text-[15rem] text-[#EFE9E1] leading-none select-none text-center">
                        CONTACTS
                    </h2>
                </header>

                {/* flex-1 pushes the footer to the bottom of the section */}
                <section className="w-full flex-1 flex flex-col gap-10 md:gap-12 max-w-2xl xl:max-w-none">
                    {/* Description */}
                    <aside className="flex flex-col gap-4 md:gap-6">
                        <p className="font-claverin text-[#EFE9E1] text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] xl:text-[2.25rem] leading-none">
                            Alejandrei Apolo M. Duran
                        </p>
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

                                    <span data-cursor="text" className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
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
                                    <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] font-light flex gap-2 items-center">
                                        <p>{data.icon}</p>
                                        <p>{data.label}</p>
                                    </span>

                                    <span data-cursor="text" className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
                                        <p>{data.desc}</p>
                                    </span>
                                </aside>
                            ))}
                        </div>

                        {/* Third Col */}
                        <aside
                            className="flex flex-col "
                        >
                            <span className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] font-light flex gap-2 items-center">
                                <p><GitBranch size={20}/></p>
                                <p>GitHub</p>
                            </span>

                            <span data-cursor="text" className="text-[#EFE9E1] text-[0.9rem] md:text-[1rem] opacity-50 font-light">
                                <p>albusDumbb</p>
                            </span>
                        </aside>
                    </div>
                </section>

                {/* Footer – name in Claverin like a signature, live local time, availability */}
                <footer className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-2 pt-6 border-t border-[#EFE9E1]/50 text-[#EFE9E1]/60 font-general-sans font-light tracking-wider text-xs md:text-sm">
                    <span>
                        © 2026 <span className="font-claverin text-[#EFE9E1]/80 text-sm md:text-base tracking-wide">Alejandrei Apolo Duran</span>
                    </span>
                    <span className="tabular-nums">Los Baños, PH — {localTime} (GMT+8)</span>
                    <span className="flex items-center gap-2">
                        <span className="relative inline-flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A68A64] animate-ping opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A68A64]" />
                        </span>
                        Available for work
                    </span>
                </footer>
            </main>
        </>
    )
};

export default Contacts;