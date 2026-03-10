import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const UserLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <Box className="auth-card">

        <Typography className="auth-brand">LENSORIA STUDIO</Typography>
        <Typography variant="h4" className="auth-title">
          Customer Login
        </Typography>

        <TextField label="Email" fullWidth margin="normal" className="auth-input" />
        <TextField label="Password" type="password" fullWidth margin="normal" className="auth-input" />

        <Button
          className="auth-btn"
          fullWidth
          onClick={() => navigate("/user-dashboard")}
        >
          Login
        </Button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/user-signup")}>Sign Up here</span>
        </p>

        <p className="auth-back" onClick={() => navigate("/")}>
          ← Back to home
        </p>

      </Box>
    </div>
  );
};

export default UserLogin;
