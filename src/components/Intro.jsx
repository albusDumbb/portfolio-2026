// src/components/Intro.jsx
import { useEffect, useState } from 'react';

const DOT_GAP = 22; // px offset of the left/right dots from center
const PULSE_MS = 3000; // three-dot loading animation duration
const CONVERGE_MS = 550; // outer dots sliding into the center dot
const HOLD_MS = 200; // brief pause once merged into one dot
const SLIDE_MS = 3000; // A letters sliding outward
const REVEAL_MS = 900; // logo stays fully visible before closing
const EXIT_MS = 800; // closing fade/scale transition
const AUTO_DISMISS_MS =
  PULSE_MS + CONVERGE_MS + HOLD_MS + SLIDE_MS + REVEAL_MS + EXIT_MS;

const Intro = ({ onExitStart, onFinish }) => {
  const [phase, setPhase] = useState('dots'); // dots -> converge -> letters -> exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('converge'), PULSE_MS);
    const t2 = setTimeout(
      () => setPhase('letters'),
      PULSE_MS + CONVERGE_MS + HOLD_MS
    );
    const t3 = setTimeout(
      () => {
        setPhase('exit');
        onExitStart?.(); // lets the page mount underneath while the intro fades out
      },
      PULSE_MS + CONVERGE_MS + HOLD_MS + SLIDE_MS + REVEAL_MS
    );
    const t4 = setTimeout(onFinish, AUTO_DISMISS_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onExitStart, onFinish]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#322D29',
        color: '#EFE9E1',
        // Fade the brown backdrop out with the logo so the cream page doesn't pop in
        opacity: phase === 'exit' ? 0 : 1,
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
        transition: `opacity ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <style>{`
        /* Loading wave: each dot rises, brightens and grows in turn, then settles */
        @keyframes dotLoading {
          0%, 60%, 100% { transform: translate(-50%, -50%) translateX(var(--x)) translateY(0) scale(0.75); opacity: 0.3; }
          30% { transform: translate(-50%, -50%) translateX(var(--x)) translateY(-10px) scale(1); opacity: 1; }
        }

        @keyframes convergeLeft {
          0% { transform: translate(-50%, -50%) translateX(-${DOT_GAP}px); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateX(0px); opacity: 0; }
        }

        @keyframes convergeRight {
          0% { transform: translate(-50%, -50%) translateX(${DOT_GAP}px); opacity: 1; }
          100% { transform: translate(-50%, -50%) translateX(0px); opacity: 0; }
        }

        @keyframes centerDotPop {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          60% { transform: translate(-50%, -50%) scale(1.35); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        @keyframes slideOutLeft {
          0% { transform: translateX(0); opacity: 0; }
          100% { transform: translateX(-0.25em); opacity: 1; }
        }

        @keyframes slideOutRight {
          0% { transform: translateX(0); opacity: 0; }
          100% { transform: translateX(0.25em); opacity: 1; }
        }

        @keyframes introExit {
          0% { opacity: 1; filter: blur(0px); transform: scale(1); letter-spacing: normal; }
          100% { opacity: 0; filter: blur(4px); transform: scale(1.04); letter-spacing: 0.04em; }
        }

        .intro-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 9999px;
          background-color: #EFE9E1;
        }

        .intro-dot--pulse {
          width: 10px;
          height: 10px;
          animation: dotLoading 1200ms ease-in-out infinite both;
        }

        .intro-dot--converge-left {
          animation: convergeLeft ${CONVERGE_MS}ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }

        .intro-dot--converge-right {
          animation: convergeRight ${CONVERGE_MS}ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }

        .intro-center-dot {
          width: 10px;
          height: 10px;
        }

        .intro-center-dot--pop {
          animation: centerDotPop 420ms ease-out ${CONVERGE_MS - 150}ms both;
        }

        .intro-letter-left {
          display: inline-block;
          animation: slideOutLeft ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .intro-letter-right {
          display: inline-block;
          animation: slideOutRight ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .intro-exit {
          animation: introExit ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div
        className={`relative flex h-32 w-32 items-center justify-center ${
          phase === 'exit' ? 'intro-exit' : ''
        }`}
      >
        {phase === 'dots' && (
          <>
            <span
              className="intro-dot intro-dot--pulse"
              style={{ '--x': `-${DOT_GAP}px`, animationDelay: '0ms' }}
            />
            <span
              className="intro-dot intro-dot--pulse"
              style={{ '--x': '0px', animationDelay: '160ms' }}
            />
            <span
              className="intro-dot intro-dot--pulse"
              style={{ '--x': `${DOT_GAP}px`, animationDelay: '320ms' }}
            />
          </>
        )}

        {phase === 'converge' && (
          <>
            <span
              className="intro-dot intro-dot--converge-left"
              style={{ width: '10px', height: '10px' }}
            />
            <span
              className="intro-dot intro-center-dot intro-center-dot--pop"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            <span
              className="intro-dot intro-dot--converge-right"
              style={{ width: '10px', height: '10px' }}
            />
          </>
        )}

        {(phase === 'letters' || phase === 'exit') && (
          <div
            className="intro-dot intro-center-dot"
            style={{ transform: 'translate(-50%, -50%)', opacity: 1 }}
          />
        )}

        {(phase === 'letters' || phase === 'exit') && (
          <h1
            className="font-claverin flex items-baseline text-5xl font-bold tracking-tight"
            style={{ color: '#EFE9E1' }}
          >
            <span className="intro-letter-left">A</span>
            <span style={{ visibility: 'hidden' }}>&middot;</span>
            <span className="intro-letter-right">A</span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Intro;