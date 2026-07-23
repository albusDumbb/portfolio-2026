// src/pages/App.jsx
import { useState } from 'react';
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

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  // If intro is active, render only the intro
  if (showIntro) {
    return <Intro onFinish={handleIntroFinish} />;
  }

  // Otherwise, render your full app with router
  return (
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
  );
}

export default App;