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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on landing page, dashboard (uses sidebar) and auth pages
  const hiddenRoutes = ["/", "/user-dashboard", "/login", "/signup", "/user-login", "/photographer-login", "/user-signup", "/photographer-signup"];
  if (hiddenRoutes.includes(location.pathname)) return null;


  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Container maxWidth="xl">
        <Toolbar className="toolbar">

          {/* Logo */}
          <Box className="logo-container" onClick={() => navigate("/user-dashboard")}>
            <CameraAltIcon className="logo-icon" />
            <Typography className="logo">LENSORIA</Typography>
          </Box>

          {/* Center Menu */}
          <Box className="nav-menu">
            <Button className="nav-btn" onClick={() => scrollTo("gallery-section")}>Gallery</Button>
            <Button className="nav-btn" onClick={() => scrollTo("services-section")}>Services</Button>
            <Button className="nav-btn" onClick={() => scrollTo("photographers-section")}>Photographers</Button>
            <Button className="nav-btn" onClick={() => scrollTo("contact-section")}>Contact</Button>
          </Box>

          {/* Right Side */}
          <Box className="nav-right">
            <Button className="login-btn nav-btn" onClick={() => navigate("/")}>
              Logout
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
