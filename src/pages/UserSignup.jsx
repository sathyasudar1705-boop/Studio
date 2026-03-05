import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./Auth.css";

const UserSignup = () => {
  return (
    <div className="auth-bg">

      <Box className="auth-card">

        <Typography className="auth-title">
          Customer Signup
        </Typography>

        <TextField label="Full Name" fullWidth margin="normal" />

        <TextField label="Email" fullWidth margin="normal" />

        <TextField label="Phone" fullWidth margin="normal" />

        <TextField label="Password" type="password" fullWidth margin="normal" />

        <Button variant="contained" fullWidth className="auth-btn">
          Create Account
        </Button>

      </Box>

    </div>
  );
};

export default UserSignup;