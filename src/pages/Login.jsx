import React from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import "./LoginSignup.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-page-content">
        <p className="role-page-tag"><CameraOutlinedIcon fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: '8px' }} />LENSORIA STUDIO</p>
        <h1 className="role-page-title">LOGIN AS</h1>
        <p className="role-page-desc">Choose your portal to continue</p>

        <div className="role-cards">
          <div className="role-choice-card" onClick={() => navigate("/user-login")}>
            <div className="role-choice-icon">
              <PersonIcon fontSize="inherit" />
            </div>
            <h3>CUSTOMER</h3>
            <p>Book photography sessions and view your upcoming shoots</p>
            <button className="role-choice-btn">CONTINUE</button>
          </div>

          <div className="role-choice-card photographer" onClick={() => navigate("/photographer-login")}>
            <div className="role-choice-icon">
              <CameraOutlinedIcon fontSize="inherit" />
            </div>
            <h3>PHOTOGRAPHER</h3>
            <p>Manage your assignments and showcase your portfolio</p>
            <button className="role-choice-btn">CONTINUE</button>
          </div>
        </div>

        <p className="role-page-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;