import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import Home from "./pages/Home";
// import About from "./pages/About";
import Coins from "./pages/Coins";
import CoinDetails from "./pages/CoinDetails";
import Exchanges from "./pages/Exchanges";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="*" element={<h1>NotFound</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
