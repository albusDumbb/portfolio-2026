import { useEffect } from 'react';
import Lenis from 'lenis';

// Components
import NavBar from "../components/NavBar";

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
      <NavBar />
      {/* Each section has an id that matches the navbar href */}
      <Home id="home" />
      <About id="about" />
      <Expertise id="expertise" />
      <TechStack id="techstack" />
      <Projects id="projects" />
      <Contacts id="contacts" />
    </main>
  );
};

export default Layout;