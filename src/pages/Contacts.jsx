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
                className="w-full min-h-screen bg-[#322D29] flex flex-col gap-16 items-center py-12 px-4"
            >
                <header>
                    <h1 className="font-claverin text-[15rem] text-[#EFE9E1] leading-none select-none">CONTACTS</h1>
                </header>

                <section className="w-full h-auto flex flex-col gap-12">
                    {/* Description */}
                    <aside className="flex flex-col gap-6">
                        <h1 className="font-claverin text-[#EFE9E1] text-[2.25rem] leading-none">Alejandrei Apolo M. Duran</h1>
                        <p className="text-[#EFE9E1] opacity-50 text-[1.25rem] font-extralight">Frontend Web Developer specializing in responsive web applications, intuitive UI/UX design, and modern web technologies. Experienced in machine learning with a focus on computer vision through academic research.</p>
                    </aside>

                    {/* Horizontal Line */}
                    <aside className="w-full h-[1px] rounded-full bg-[#EFE9E1] opacity-50"></aside>

                    {/* Contacts */}
                    <div className="grid grid-cols-3">
                        {/* First Col */}
                        <div className="flex flex-col gap-8">
                            {listA.map((data, index) => (
                                <aside
                                    key={index}
                                    className="flex flex-col "
                                >
                                    <span className="text-[#EFE9E1] text-[1rem] font-light flex gap-2 items-center">
                                        <p>{data.icon}</p>
                                        <p>{data.label}</p>
                                    </span>

                                    <span className="text-[#EFE9E1] text-[1rem] opacity-50 font-light">
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
                                    <span className="text-[#EFE9E1] text-[1rem] font-light">
                                        <p>{data.label}</p>
                                    </span>

                                    <span className="text-[#EFE9E1] text-[1rem] opacity-50 font-light">
                                        <p>{data.desc}</p>
                                    </span>
                                </aside>
                            ))}
                        </div>

                        {/* Third Col */}
                        <aside
                            className="flex flex-col "
                        >
                            <span className="text-[#EFE9E1] text-[1rem] font-light">
                                <p>GitHub</p>
                            </span>

                            <span className="text-[#EFE9E1] text-[1rem] opacity-50 font-light">
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