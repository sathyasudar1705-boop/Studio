import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./Auth.css";

const UserLogin = () => {
  return (
    <div className="auth-bg">

      <Box className="auth-card">

        <Typography variant="h4" className="auth-title">
          Customer Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          className="auth-input"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          className="auth-input"
        />

        <Button className="auth-btn" fullWidth>
          Login
        </Button>

      </Box>

    </div>
  );
};

export default UserLogin;