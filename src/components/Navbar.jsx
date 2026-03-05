import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";

import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={0} className="navbar">

      <Container maxWidth="xl">

        <Toolbar className="toolbar">

          {/* Logo */}
          <Box
            className="logo-container"
            onClick={() => navigate("/")}
          >
            <LinkedCameraIcon className="logo-icon" />

            <Typography className="logo">
              Lensoria
            </Typography>
          </Box>


          {/* Center Menu */}
          <Box className="nav-menu">

            <Button
              className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Home
            </Button>

            <Button className="nav-btn">
              Gallery
            </Button>

            <Button className="nav-btn">
              Services
            </Button>

            <Button className="nav-btn">
              Packages
            </Button>

            <Button className="nav-btn">
              Contact
            </Button>

          </Box>


          {/* Right Side */}
          <Box className="nav-right">

            <Button
              className="login-btn nav-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="contained"
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>

          </Box>

        </Toolbar>

      </Container>

    </AppBar>
  );
};

export default Navbar;