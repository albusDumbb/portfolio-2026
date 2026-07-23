import { useEffect, useRef, useState } from "react";

const NavBar = () => {
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Click handler for all navbar links
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: "HOME", id: "#home" },
    { label: "ABOUT", id: "#about" },
    { label: "EXPERTISE", id: "#expertise" },
    { label: "CONTACTS", id: "#contacts" },
  ];

  return (
    <>
      {/* ===== NAVBAR HEADER ===== */}
      <header
        ref={navbarRef}
        className="navbar-header fixed top-0 left-0 z-50 w-full flex justify-center px-6 py-6 md:px-10 xl:px-12"
        style={{
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* XL DESKTOP NAV */}
        <nav className="hidden xl:flex w-full justify-between items-center text-[#322D29] transition-all duration-500 font-general-sans">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>HOME</a>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>ABOUT</a>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-claverin text-3xl font-semibold"
          >
            A·A
          </a>
          <a href="#expertise" onClick={(e) => handleNavClick(e, '#expertise')}>EXPERTISE</a>
          <a href="#contacts" onClick={(e) => handleNavClick(e, '#contacts')}>CONTACTS</a>
        </nav>

        {/* MOBILE / TABLET NAV */}
        <nav className="flex xl:hidden w-full justify-between items-center font-general-sans relative z-50">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={`font-claverin text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
              isOpen ? 'text-[#EFE9E1]' : 'text-[#322D29]'
            }`}
          >
            A·A
          </a>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="relative w-8 h-4 flex flex-col justify-between items-end"
          >
            <span
              className="block h-[1.5px] transition-all duration-300 ease-in-out"
              style={{
                width: '100%',
                transform: isOpen ? 'translateY(7px)' : 'translateY(0)',
                backgroundColor: isOpen ? '#EFE9E1' : '#322D29',
              }}
            />
            <span
              className="block h-[1.5px] transition-all duration-300 ease-in-out"
              style={{
                width: '100%',
                transform: isOpen ? 'translateY(-7px)' : 'translateY(0)',
                backgroundColor: isOpen ? '#EFE9E1' : '#322D29',
              }}
            />
          </button>
        </nav>
      </header>

      {/* ===== MOBILE / TABLET MENU OVERLAY (MOVED OUTSIDE HEADER) ===== */}
      <div
        className={`xl:hidden fixed inset-0 bg-[#322D29] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out z-40 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.id}
            onClick={(e) => handleNavClick(e, link.id)}
            className="text-2xl md:text-3xl font-general-sans text-[#EFE9E1]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default NavBar;