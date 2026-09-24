// src/components/Intro.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BROWN = '#322D29';
const CREAM = '#EFE9E1';
const BRONZE = '#A68A64';
const EASE = 'power4.inOut'; // close to the site's cubic-bezier(0.76, 0, 0.24, 1)

// Pause (s) once A·A has fully formed, before the curtain lifts
const HOLD = 0.8;

// Never keep visitors waiting longer than this for assets to load (ms)
const MAX_LOAD_WAIT = 6000;

// Resolves once the fonts (Claverin especially) and the page's own assets have loaded
const waitForAssets = () => {
  const fonts = Promise.all([
    document.fonts.load('48px Claverin'),
    document.fonts.ready,
  ]).catch(() => {});
  const page = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_LOAD_WAIT));
  return Promise.race([Promise.all([fonts, page]), timeout]);
};

// Intro sequence (~5.5s when everything is already loaded):
// 1. a bronze dot pulses once
// 2. the two A's unveil outward from the dot, sharpening from a soft blur as they settle
// 3. a hairline + 000→100 counter track real loading progress
// 4. the dark curtain wipes up while A·A flies into the navbar logo's spot
const Intro = ({ onExitStart, onFinish }) => {
  const rootRef = useRef(null);
  const curtainRef = useRef(null);
  const logoRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const html = document.documentElement;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll('.intro-letter');

      const [leftLetter, rightLetter] = letters;

      // ---- Starting state ----
      gsap.set(dotRef.current, { scale: 0 });
      // Each A starts fully clipped on its dot-facing side, soft and slightly enlarged
      gsap.set(leftLetter, { clipPath: 'inset(0% 0% 0% 100%)', transformOrigin: 'right center' });
      gsap.set(rightLetter, { clipPath: 'inset(0% 100% 0% 0%)', transformOrigin: 'left center' });
      gsap.set(letters, { filter: 'blur(10px)', scale: 1.08, opacity: 0 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });

      // ---- 1 + 2: dot pulse, then the A's unveil outward from the dot ----
      // The clip opens from the dot's side outward while each letter sharpens and settles
      const reveal = gsap.timeline();
      reveal
        .to(dotRef.current, { scale: 1.6, duration: 0.5, ease: 'power2.out' })
        .to(dotRef.current, { scale: 1, duration: 0.6, ease: 'power2.inOut' })
        .to(letters, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 2,
          ease: 'power4.inOut',
        }, 0.6)
        .to(letters, {
          filter: 'blur(0px)',
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: 'power3.out',
        }, 0.6)
        // Let the finished A·A rest a moment before the curtain lifts
        .to({}, { duration: HOLD });

      // ---- 3: real loading progress ----
      const progress = { value: 0 };
      const renderProgress = () => {
        // ctx.revert() on unmount re-renders this tween after the counter has left the DOM –
        // bail out instead of throwing (a throw here would take down the whole app)
        if (cancelled || !counterRef.current) return;
        counterRef.current.textContent = String(Math.round(progress.value * 100)).padStart(3, '0');
        gsap.set(barRef.current, { scaleX: progress.value });
      };
      // Creep toward 90% while the reveal plays; the last 10% waits for real loading
      gsap.to(progress, { value: 0.9, duration: reveal.duration(), ease: 'power2.out', onUpdate: renderProgress });

      const revealDone = new Promise((resolve) => reveal.eventCallback('onComplete', resolve));

      Promise.all([revealDone, waitForAssets()]).then(() => {
        if (cancelled) return;
        gsap.to(progress, {
          value: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: renderProgress,
          onComplete: exit,
        });
      });

      // ---- 4: curtain + logo handoff ----
      function exit() {
        if (cancelled) return;

        // Hide the navbar logo (and skip its own slide-in) until our logo lands on it
        html.classList.add('intro-handoff');
        onExitStart?.(); // mounts the site underneath

        // Wait two frames so the site (and the navbar logo) exist and have layout
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (cancelled) return;
          const target = document.querySelector('.navbar-logo');
          const logo = logoRef.current;

          const done = () => {
            html.classList.remove('intro-handoff');
            html.classList.add('intro-done');
            onFinish?.();
          };

          const tl = gsap.timeline({ onComplete: done });
          tl.to(progressRef.current, { opacity: 0, duration: 0.3 }, 0);
          tl.to(curtainRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: reduceMotion ? 0.01 : 1.2,
            ease: EASE,
          }, 0.1);

          if (target && !reduceMotion) {
            const from = logo.getBoundingClientRect();
            const to = target.getBoundingClientRect();
            // Same letter size as the navbar logo
            const scale = parseFloat(getComputedStyle(target).fontSize) /
              parseFloat(getComputedStyle(logo).fontSize);

            // Our dot has more space around it than the navbar's "·", so at navbar size our logo
            // would land wider and the two wouldn't line up during the swap. Tighten the dot's
            // margins during the flight so the landed width matches exactly.
            const dot = dotRef.current;
            const margin = parseFloat(getComputedStyle(dot).marginLeft);
            const extraWidth = from.width - to.width / scale;
            const landedMargin = Math.max(0, margin - extraWidth / 2);

            // Letters and dot shift to the navbar logo's brown together, so they always match
            tl.to(logo, {
              x: to.left + to.width / 2 - (from.left + from.width / 2),
              y: to.top + to.height / 2 - (from.top + from.height / 2),
              scale,
              color: BROWN,
              duration: 1.2,
              ease: EASE,
            }, 0.1);
            tl.to(dot, {
              backgroundColor: BROWN,
              marginLeft: landedMargin,
              marginRight: landedMargin,
              duration: 1.2,
              ease: EASE,
            }, 0.1);

            // Crossfade into the real navbar logo as ours glides into place (not after it stops):
            // the real one fades in (see .intro-done in index.css) while ours fades out on top of it
            tl.add(() => html.classList.replace('intro-handoff', 'intro-done'), 1.0);
            tl.to(logo, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 1.0);
          } else {
            // No navbar on this page (or reduced motion) – just fade the logo out
            tl.to(logo, { opacity: 0, duration: 0.5 }, 0);
          }
        }));
      }
    }, rootRef);

    return () => {
      cancelled = true;
      ctx.revert();
      html.classList.remove('intro-handoff');
    };
  }, [onExitStart, onFinish]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[60] pointer-events-none">
      {/* Dark curtain – wipes upward to reveal the site */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ backgroundColor: BROWN, clipPath: 'inset(0% 0% 0% 0%)' }}
      />

      {/* A · A – each letter unveils outward from the dot; the dot is the middle "·".
          Letters and dot share the same bronze. Top padding keeps Claverin's tall
          glyphs inside the clip. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          ref={logoRef}
          className="font-claverin flex items-center text-6xl md:text-7xl font-bold tracking-tight leading-none"
          style={{ color: BRONZE }}
        >
          <span className="intro-letter block pt-[0.12em]">A</span>
          <span
            ref={dotRef}
            className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
            // Inline margin – the global * { margin: 0 } in index.css cancels margin utilities
            style={{ backgroundColor: BRONZE, marginInline: '0.18em' }}
          />
          <span className="intro-letter block pt-[0.12em]">A</span>
        </h1>
      </div>

      {/* Loading progress – label, counter and a hairline along the bottom */}
      <div
        ref={progressRef}
        className="absolute inset-x-0 bottom-0 px-6 md:px-10 xl:px-12 pb-6 md:pb-8 flex flex-col gap-3"
        style={{ color: CREAM }}
      >
        <div className="flex justify-between items-end font-general-sans font-light tracking-wider text-xs md:text-sm">
          <span className="opacity-60">(Portfolio)</span>
          <span ref={counterRef} className="tabular-nums">000</span>
        </div>
        <div className="relative h-px w-full bg-[#EFE9E1]/15">
          <div ref={barRef} className="absolute inset-0 bg-[#EFE9E1]/80" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
