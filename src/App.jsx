import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import PhotographerLogin from "./pages/PhotographerLogin";
import UserSignup from "./pages/UserSignup";
import PhotographerSignup from "./pages/PhotographerSignup";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard/index.jsx";
import Booking from "./pages/Booking";
import PhotographerDashboard from "./pages/PhotographerDashboard";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname === "/user-dashboard" || location.pathname === "/photographer-dashboard";

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        {/* Landing selection page */}
        <Route path="/" element={<LandingPage />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <>
              <UserDashboard />
              <Footer />
            </>
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/photographer-dashboard" element={<PhotographerDashboard />} />

        {/* Other Routes */}
        <Route path="/home" element={<><Home /><Footer /></>} />
        <Route path="/login" element={<><Login /><Footer /></>} />
        <Route path="/signup" element={<><Signup /><Footer /></>} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/photographer-login" element={<PhotographerLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/photographer-signup" element={<PhotographerSignup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;