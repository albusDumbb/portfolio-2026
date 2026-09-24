// ─────────────────────────────────────────────────────────────
// Custom cursor settings – change the cursor's look and feel here.
// Nothing in Cursor.jsx needs editing to restyle it.
// ─────────────────────────────────────────────────────────────
//
// How elements pick a state: add data-cursor="<state name>" to any element,
// e.g. <a data-cursor="link">. Optional data-cursor-label="Text" overrides the
// state's label for that one element. Add data-magnetic to an element to make it
// pull toward the cursor.
//
// To turn the custom cursor off entirely, set enabled: false.

const cursorConfig = {
    enabled: true,

    // Cursor color – a lighter shade of the brand brown (#322D29), light enough
    // to stay visible over the dark brown sections as well as the cream ones.
    // blendMode "normal" shows the color as-is; "difference" inverts what's underneath.
    // Any state below can override color / blendMode for itself.
    color: "#8C7A68",
    blendMode: "normal",

    // Label text color (inside the circle)
    labelColor: "#EFE9E1",

    // How closely the cursor follows the mouse, in seconds (0 = glued to it)
    followDuration: 0.12,
    followEase: "power3.out",

    // How shape changes animate (hovering something, leaving it)
    morphDuration: 0.45,
    morphEase: "power3.inOut",

    // Squeeze on click (1 = none)
    clickScale: 0.75,

    // Magnetic pull on [data-magnetic] elements (0 = none, 1 = sticks to the cursor).
    // Used by the A·A logo and MENU button. An element can set its own: data-magnetic="0.2".
    magneticStrength: 0.3,

    // How the magnetic drift feels. Longer durations = heavier, slower movement.
    magneticDuration: 1.2,          // following the cursor
    magneticEase: "power3.out",
    magneticReturnDuration: 1.6,    // settling back when the cursor leaves
    magneticReturnEase: "elastic.out(1, 0.6)", // higher 2nd number = less bounce; "power3.out" = none

    // Shapes. "default" is used when the mouse is over nothing special.
    // width/height in px, label optional. radius is a CSS border-radius – keep the
    // same unit across states ("50%" = circle/pill, "0%" = square) so shapes morph smoothly.
    // Optional per state: color, blendMode (override the defaults above), and
    // magnetic – every element using that state drifts toward the cursor by that strength.
    // Keep it small for big text: the pull scales with distance from the element's center.
    states: {
        default: { width: 10, height: 10, radius: "50%" },
        link:    { width: 56, height: 56, radius: "50%" },
        view:    { width: 80, height: 80, radius: "50%", label: "View" },
        soon:    { width: 80, height: 80, radius: "50%", label: "Soon" },
        // Big headings: a cream lens that inverts the letters underneath
        // (a solid brown circle would hide them), and the heading drifts toward the cursor
        lens:    { width: 140, height: 140, radius: "50%", color: "#EFE9E1", blendMode: "difference", magnetic: 0.08 },
        text:    { width: 2, height: 28, radius: "50%" },
    },
};

export default cursorConfig;
