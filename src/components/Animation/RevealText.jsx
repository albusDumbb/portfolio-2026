// src/components/RevealText.jsx
import { useInView } from "react-intersection-observer";

/**
 * Wraps text in an overflow-hidden box and slides it up into view once
 * it enters the viewport, using react-intersection-observer — same
 * pattern as the "TURN YOUR IDEAS INTO REALITY" hero text.
 *
 * The backing panel stays fixed the whole time (never animates); only
 * the text itself slides from translate-y-full/opacity-0 to
 * translate-y-0/opacity-100.
 *
 * Props:
 * - as: element type to render the text as (default "div")
 * - maskColor: color of the fixed backing panel, should match the section bg
 * - duration: Tailwind duration class, e.g. "duration-[1800ms]" (default, longer/mas mabagal)
 * - delay: Tailwind delay class, e.g. "delay-[300ms]" — used to stagger multiple RevealText elements
 * - threshold: how much of the element must be visible before triggering (default 0.2)
 * - triggerOnce: whether the animation only ever plays once (default true)
 */
const RevealText = ({
    as: Tag = "div",
    className = "",
    maskColor = "#EFE9E1",
    duration = "duration-[1800ms]",
    delay = "delay-0",
    threshold = 0.2,
    triggerOnce = true,
    children,
}) => {
    const { ref, inView } = useInView({ triggerOnce, threshold });

    return (
        <div ref={ref} className="relative overflow-hidden">
            {/* Fixed backing panel, sits behind the text and never moves */}
            <span
                className="absolute inset-0 z-0"
                style={{ backgroundColor: maskColor }}
            />
            <Tag
                className={`${className} relative z-10 block transition-all ${duration} ${delay} ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
            >
                {children}
            </Tag>
        </div>
    );
};

export default RevealText;