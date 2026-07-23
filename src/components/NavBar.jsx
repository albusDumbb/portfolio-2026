import { useEffect, useRef } from "react";

const NavBar = () => {
  const navbarRef = useRef(null);

  // Scroll listener to add/remove 'scrolled' class
  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click handler for all navbar links
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const lenis = window.lenis;
    if (lenis) {
      // Use Lenis for smooth scrolling
      lenis.scrollTo(targetId);
    } else {
      // Fallback to native smooth scroll
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navbarRef}
      className="navbar-header fixed z-50 flex justify-center"
      style={{
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <nav className="flex w-full justify-between items-center text-[#322D29] transition-all duration-500 font-general-sans">
        {/* HOME */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          HOME
        </a>

        {/* ABOUT */}
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
        >
          ABOUT
        </a>

        {/* Logo – now also an <a> tag to scroll to home */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="font-claverin text-3xl font-semibold"
        >
          A·A
        </a>

        {/* EXPERTISE */}
        <a
          href="#expertise"
          onClick={(e) => handleNavClick(e, '#expertise')}
        >
          EXPERTISE
        </a>

        {/* CONTACTS */}
        <a
          href="#contacts"
          onClick={(e) => handleNavClick(e, '#contacts')}
        >
          CONTACTS
        </a>
      </nav>
    </header>
  );
};

export default NavBar;