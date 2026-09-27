import { useEffect } from 'react';
import Lenis from 'lenis';

// Components
import NavBar from "../components/NavBar";
import Cursor from "../components/Cursor/Cursor";

// Pages
import Home from "./Home";
import About from "../pages/About";
import Expertise from "./Expertise";
import Contacts from "./Contacts";
import TechStack from './TechStack';
import Projects from './Projects';

const Layout = () => {
  useEffect(() => {
    // Initialize Lenis with heavy momentum settings
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.65,
      // Touch (mobile/tablet): route swipes through Lenis instead of the native
      // fling, with a light weighted feel that still keeps up with the finger.
      // Desktop wheel scrolling is unaffected
      syncTouch: true,
      touchMultiplier: 1.2,
      syncTouchLerp: 0.2,
      touchInertiaExponent: 1.7,
    });

    // Make Lenis instance globally accessible (for NavBar click handlers)
    window.lenis = lenis;

    // Setup the animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      delete window.lenis;  // remove the global reference
    };
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Cursor />
      <NavBar />
      {/* Each section has an id that matches the navbar href */}
      <Home id="home" />
      <About id="about" />
      <Projects id="projects" />
      <TechStack id="techstack" />
      <Expertise id="expertise" />
      <Contacts id="contacts" />
    </main>
  );
};

export default Layout;