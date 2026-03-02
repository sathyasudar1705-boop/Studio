import React from "react";
import {AppBar,Toolbar,Typography,Button,Box,Container,} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} className="navbar">
      <Container maxWidth="xl">
        <Toolbar className="toolbar">

          {/* Logo */}
          <Box
            className="logo-container"
            onClick={() => navigate("/")}
          >
            <CameraAltIcon className="logo-icon" />
            <Typography variant="h6" className="logo-text">
              Lensoria
            </Typography>
          </Box>

          {/* Center Menu */}
          <Box className="nav-menu">
            <Button
              className={`nav-btn ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              className={`nav-btn ${
                location.pathname === "/packages" ? "active" : ""
              }`}
              onClick={() => navigate("/packages")}
            >
              Packages
            </Button>

            <Button
              className={`nav-btn ${
                location.pathname === "/book" ? "active" : ""
              }`}
              onClick={() => navigate("/book")}
            >
              Book a Shoot
            </Button>
          </Box>

          {/* Right Section */}
          <Box className="nav-right">
            <Button
              className={`nav-btn ${
                location.pathname === "/login" ? "active" : ""
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="contained"
              className={`get-started-btn ${
                location.pathname === "/signup" ? "active-btn" : ""
              }`}
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