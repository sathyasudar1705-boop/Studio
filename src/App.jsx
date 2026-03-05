import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserLogin from "./pages/UserLogin";
import PhotographerLogin from "./pages/PhotographerLogin";

import UserSignup from "./pages/UserSignup";
import PhotographerSignup from "./pages/PhotographerSignup";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<><Login /><Footer /></>} />
        <Route path="/signup" element={<><Signup /><Footer /></>} />

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/photographer-login" element={<PhotographerLogin />} />

        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/photographer-signup" element={<PhotographerSignup />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;