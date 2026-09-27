// src/pages/App.jsx
import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Layout from "./pages/Layout";
import Intro from './components/Intro';

function App() {
  const INTRO_ENABLED = true;
  const [showIntro, setShowIntro] = useState(INTRO_ENABLED);
  const [showApp, setShowApp] = useState(!INTRO_ENABLED);

  // Stable callbacks so Intro's timers aren't restarted when App re-renders
  const handleIntroExitStart = useCallback(() => setShowApp(true), []);
  const handleIntroFinish = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {/* The site mounts underneath as the intro's curtain starts lifting, so the curtain reveals it */}
      {showApp && (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} />
          </Routes>
        </Router>
      )}

      {showIntro && (
        <Intro onExitStart={handleIntroExitStart} onFinish={handleIntroFinish} />
      )}
    </>
  );
}

export default App;