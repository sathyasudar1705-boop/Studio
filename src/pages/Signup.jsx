import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import "./Signup.css";

const Signup = () => {
  const [role, setRole] = useState("user");

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  return (
    <Box className="signup-bg">
      <Container maxWidth="sm">
        <Paper elevation={10} className="signup-card">
          
          <Typography variant="h4" className="signup-title">
            Create Account
          </Typography>

          <Typography className="signup-subtitle">
            Join Lensoria Studio
          </Typography>

          {/* Role Selection */}
          <Typography className="label">Register As</Typography>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            fullWidth
            className="role-toggle"
          >
            <ToggleButton value="user" className="role-btn">
              <PersonIcon sx={{ mr: 1 }} />
              User
            </ToggleButton>

            <ToggleButton value="photographer" className="role-btn">
              <CameraAltIcon sx={{ mr: 1 }} />
              Photographer
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Name */}
          <Typography className="label">Full Name *</Typography>
          <TextField
            fullWidth
            placeholder="Enter your name"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#c084fc" }} />
                </InputAdornment>
              ),
              className: "input-field",
            }}
          />

          {/* Email */}
          <Typography className="label">Email Address *</Typography>
          <TextField
            fullWidth
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

          {/* Password */}
          <Typography className="label">Password *</Typography>
          <TextField
            type="password"
            fullWidth
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

          {/* Signup Button */}
          <Button
            fullWidth
            variant="contained"
            className="signup-btn"
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>

          <Typography className="login-text" sx={{ mt: 2 }}>
            Already have an account? <span onClick={() => window.location.href = "/login"}>Sign In</span>
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;