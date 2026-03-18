import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import "./Auth.css";

const UserSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <Box className="auth-card">
        <Typography className="auth-brand">
          <CameraOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          LENSORIA STUDIO
        </Typography>
        <Typography variant="h4" className="auth-title">Customer Signup</Typography>

        <TextField label="Full Name" fullWidth margin="normal" className="auth-input" />
        <TextField label="Email" fullWidth margin="normal" className="auth-input" />
        <TextField label="Password" type="password" fullWidth margin="normal" className="auth-input" />

        <Button variant="contained" fullWidth className="auth-btn" onClick={() => navigate("/user-dashboard")}>
          Create Account
        </Button>

        <p className="auth-switch">Already have an account? <span onClick={() => navigate("/user-login")}>Login here</span></p>
        <p className="auth-back" onClick={() => navigate("/")}>← Back to home</p>
      </Box>
    </div>
  );
};

export default UserSignup;