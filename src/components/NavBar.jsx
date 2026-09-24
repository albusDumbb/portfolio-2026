import { useEffect, useRef, useState } from "react";

// Curtain + link easing for the menu overlay
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

const scrollToSection = (targetId) => {
  const lenis = window.lenis;
  if (lenis) {
    lenis.scrollTo(targetId);
  } else {
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
  }
};

// Past this scroll position, scrolling down hides the navbar
const HIDE_AFTER = 120;
// Ignore scroll movements smaller than this (trackpad jitter, Lenis easing)
const SCROLL_THRESHOLD = 10;
// Matches the longest .nav-revealing transition in index.css (drop + expand + fade-in)
const REVEAL_DURATION = 1200;

const NavBar = () => {
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [revealing, setRevealing] = useState(false);
  // Section to scroll to once the menu has closed and scrolling is unlocked
  const pendingTarget = useRef(null);
  // Read inside the scroll listener without re-subscribing it
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Scroll listener: pill style once scrolled, hide on scroll down, reveal on scroll up
  useEffect(() => {
    const navbar = navbarRef.current;
    let lastY = window.scrollY;
    let isHidden = false;
    let revealTimer;

    const hide = () => {
      if (isHidden) return;
      isHidden = true;
      clearTimeout(revealTimer);
      setRevealing(false);
      setHidden(true);
    };

    // .nav-revealing swaps in the reveal transition (capsule drops, then expands)
    // just for the reveal, so normal style changes keep their usual timing
    const reveal = () => {
      if (!isHidden) return;
      isHidden = false;
      setHidden(false);
      setRevealing(true);
      clearTimeout(revealTimer);
      revealTimer = setTimeout(() => setRevealing(false), REVEAL_DURATION);
    };

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Near the top, or with the menu open, the navbar always shows
      if (y <= HIDE_AFTER || isOpenRef.current) {
        reveal();
        lastY = y;
        return;
      }

      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;
      if (delta > 0) hide();
      else reveal();
      lastY = y;
    };

    // Keyboard users tabbing into the hidden navbar bring it back
    navbar.addEventListener('focusin', reveal);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(revealTimer);
      navbar.removeEventListener('focusin', reveal);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock scrolling while the menu is open (Lenis drives the scroll, so pause it too)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      window.lenis?.stop();
    } else {
      window.lenis?.start();
      if (pendingTarget.current) {
        scrollToSection(pendingTarget.current);
        pendingTarget.current = null;
      }
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isOpen]);

  // Close the menu with Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Click handler for all navbar links
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (isOpen) {
      // Scrolling is locked while the menu is open – scroll once it has closed
      pendingTarget.current = targetId;
      setIsOpen(false);
    } else {
      scrollToSection(targetId);
    }
  };

  const navLinks = [
    { label: "HOME", id: "#home" },
    { label: "ABOUT", id: "#about" },
    { label: "EXPERTISE", id: "#expertise" },
    { label: "CONTACTS", id: "#contacts" },
  ];

  const textColor = isOpen ? 'text-[#EFE9E1]' : 'text-[#322D29]';
  const lineColor = isOpen ? '#EFE9E1' : '#322D29';

  return (
    <>
      {/* ===== NAVBAR HEADER ===== */}
      <header
        ref={navbarRef}
        className={`navbar-header ${scrolled ? 'scrolled' : ''} ${hidden ? 'nav-hidden' : ''} ${revealing ? 'nav-revealing' : ''} ${isOpen ? 'menu-open' : ''} fixed top-0 left-0 z-50 w-full flex justify-center px-6 py-6 md:px-10 xl:px-12`}
      >
        <nav className="w-full flex justify-between items-center font-general-sans">
          {/* A·A */}
          {/* data-magnetic on the wrapper – the link's own transform is used by its intro animation */}
          <div className="overflow-hidden" data-magnetic>
            <a
              href="#home"
              data-cursor="link"
              onClick={(e) => handleNavClick(e, '#home')}
              className={`navbar-logo block animate-slide-in-up-footer font-claverin text-2xl md:text-3xl font-semibold transition-colors duration-500 ${textColor}`}
            >
              A·A
            </a>
          </div>

          {/* MENU BUTTON – label slides Menu → Close, lines turn into an X */}
          <div className="overflow-hidden" data-magnetic>
            <button
              data-cursor="link"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className={`group flex items-center gap-3 py-1 cursor-pointer animate-slide-in-up-footer transition-colors duration-500 ${textColor}`}
            >
              {/* Both labels share one grid cell, so the box fits the wider word */}
              <span className="hidden md:grid overflow-hidden text-sm xl:text-base tracking-wider leading-[1.25em]">
                <span
                  className="col-start-1 row-start-1 transition-transform duration-500"
                  style={{
                    transform: isOpen ? 'translateY(-100%)' : 'translateY(0)',
                    transitionTimingFunction: EASE,
                  }}
                >
                  MENU
                </span>
                <span
                  className="col-start-1 row-start-1 transition-transform duration-500"
                  style={{
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                    transitionTimingFunction: EASE,
                  }}
                  aria-hidden="true"
                >
                  CLOSE
                </span>
              </span>

              <span className="relative w-8 h-4 flex flex-col justify-between items-end">
                <span
                  className="block h-[1.5px] transition-all duration-500"
                  style={{
                    width: '100%',
                    transform: isOpen ? 'translateY(7.25px) rotate(45deg)' : 'translateY(0)',
                    backgroundColor: lineColor,
                    transitionTimingFunction: EASE,
                  }}
                />
                <span
                  className={`block h-[1.5px] transition-all duration-500 group-hover:w-full ${isOpen ? 'w-full' : 'w-[70%]'}`}
                  style={{
                    transform: isOpen ? 'translateY(-7.25px) rotate(-45deg)' : 'translateY(0)',
                    backgroundColor: lineColor,
                    transitionTimingFunction: EASE,
                  }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== MENU OVERLAY – curtain wipes down, links rise in one by one ===== */}
      <div
        className={`fixed inset-0 z-40 bg-[#322D29] flex flex-col justify-between px-6 md:px-10 xl:px-12 pt-28 pb-6 md:pb-8 xl:pb-10 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          clipPath: isOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
          transition: `clip-path 0.9s ${EASE} ${isOpen ? '0s' : '0.25s'}`,
        }}
        aria-hidden={!isOpen}
      >
        <nav className="group/links flex flex-col gap-1 md:gap-2 my-auto">
          {navLinks.map((link, i) => (
            <div key={link.id} className="overflow-hidden">
              <a
                href={link.id}
                data-cursor="link"
                onClick={(e) => handleNavClick(e, link.id)}
                tabIndex={isOpen ? 0 : -1}
                className="flex items-start gap-3 md:gap-5 w-fit text-[#EFE9E1] transition-opacity duration-300 group-hover/links:opacity-40 hover:!opacity-100"
                style={{
                  transform: isOpen ? 'translateY(0)' : 'translateY(110%)',
                  transition: `transform 0.8s ${EASE} ${isOpen ? 0.35 + i * 0.08 : 0}s, opacity 0.3s`,
                }}
              >
                <span className="font-general-sans font-light text-xs md:text-sm xl:text-base mt-3 md:mt-5 shrink-0">
                  ({String(i + 1).padStart(2, '0')})
                </span>
                {/* Top padding in em keeps the tall Claverin glyphs clear of the mask */}
                <span className="font-claverin leading-none pt-[0.12em] text-[clamp(2.75rem,min(14vw,11dvh),9rem)]">
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </nav>

        {/* Bottom row */}
        <div
          className="flex justify-between items-end gap-4 border-t border-[#EFE9E1]/20 pt-4 text-[#EFE9E1]/70 font-light tracking-wider text-xs md:text-sm xl:text-base"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: `opacity 0.5s ${isOpen ? '0.7s' : '0s'}`,
          }}
        >
          <p>ALEJANDREI APOLO DURAN</p>
          <p>©2026</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
