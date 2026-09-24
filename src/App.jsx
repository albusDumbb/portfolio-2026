// src/pages/App.jsx
import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Contacts from "./pages/Contacts";
import NavBar from "./components/NavBar";
import Intro from './components/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showApp, setShowApp] = useState(false);

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
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="expertise" element={<Expertise />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="navbar" element={<NavBar />} />
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