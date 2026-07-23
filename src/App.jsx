import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Contacts from "./pages/Contacts";
import NavBar from "./components/NavBar";

function App() {

  return (
    <>
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
    </>
  )
}

export default App
