import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";

import "./Login.css";

const Login = () => {
  return (
    <Box className="login-bg">
      <Container maxWidth="sm">
        <Paper elevation={10} className="login-card">

          <Typography variant="h4" className="login-title">
            Sign In
          </Typography>

          <Typography className="login-subtitle">
            Welcome back to Lensoria
          </Typography>

          {/* Email Field */}
          <Typography className="label">Email Address *</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="you@example.com"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#c084fc" }} />
                </InputAdornment>
              ),
              className: "input-field",
            }}
          />

          {/* Password Field */}
          <Typography className="label">Password *</Typography>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            placeholder="Enter password"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#c084fc" }} />
                </InputAdornment>
              ),
              className: "input-field",
            }}
          />

          {/* Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            className="signin-btn"
            startIcon={<LoginIcon />}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>

          {/* Signup Text */}
          <Typography className="signup-text" sx={{ mt: 2 }}>
            Don't have an account? <span onClick={() => window.location.href = "/signup"}>Sign up</span>
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};

export default Login;