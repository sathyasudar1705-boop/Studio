import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 style={{ padding: "40px" }}>Home Page</h1>} />
        <Route path="/packages" element={<h1 style={{ padding: "40px" }}>Packages Page</h1>} />
        <Route path="/book" element={<h1 style={{ padding: "40px" }}>Book a Shoot</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      </Router>
  );
}

export default App;