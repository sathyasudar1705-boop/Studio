import React from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./LoginSignup.css";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-page-content">
        <p className="role-page-tag"><CameraAltIcon fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: '8px' }} />LENSORIA STUDIO</p>
        <h1 className="role-page-title">SIGNUP AS</h1>
        <p className="role-page-desc">Choose your role to get started</p>

        <div className="role-cards">
          <div className="role-choice-card" onClick={() => navigate("/user-signup")}>
            <div className="role-choice-icon">
              <PersonIcon fontSize="inherit" />
            </div>
            <h3>CUSTOMER</h3>
            <p>Join as a customer to find and book your favorite photographers</p>
            <button className="role-choice-btn">GET STARTED</button>
          </div>

          <div className="role-choice-card photographer" onClick={() => navigate("/photographer-signup")}>
            <div className="role-choice-icon">
              <CameraAltIcon fontSize="inherit" />
            </div>
            <h3>PHOTOGRAPHER</h3>
            <p>Join as a professional to showcase your work and get bookings</p>
            <button className="role-choice-btn">JOIN NOW</button>
          </div>
        </div>

        <p className="role-page-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;