import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide navbar on specific functional pages, but keep on landing and others
  const hiddenRoutes = ["/user-dashboard", "/login", "/signup", "/user-login", "/photographer-login", "/user-signup", "/photographer-signup"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Gallery", id: "gallery-section" },
    { label: "Services", id: "services-section" },
    { label: "Photographers", id: "photographers-section" },
    { label: "Contact", id: "contact-section" },
  ];

  return (
    <AppBar position="sticky" elevation={0} className="navbar">
      <Container maxWidth="xl">
        <Toolbar className="toolbar">

          {/* Logo */}
          <Box className="logo-container" onClick={() => handleNavClick("/")}>
            <CenterFocusStrongIcon className="logo-icon" />
            <Typography className="logo">LENSORIA</Typography>
          </Box>

          {/* Desktop Menu - Only show if not on mobile and not on landing page */}
          {!isMobile && location.pathname !== "/" && (
            <Box className="nav-menu">
              {navItems.map((item) => (
                <Button key={item.id} className="nav-btn" onClick={() => scrollTo(item.id)}>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          
          {/* Right Side */}
          <Box className="nav-right">
            {!isMobile && (
              <Button className="login-btn nav-btn" onClick={() => handleNavClick(location.pathname === "/" ? "/login" : "/")}>
                {location.pathname === "/" ? "Login" : "Logout"}
              </Button>
            )}
            
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="menu-icon-btn"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: "mobile-drawer" }}
      >
        <Box className="drawer-header">
          <Typography className="logo">LENSORIA</Typography>
          <IconButton onClick={handleDrawerToggle} className="close-drawer-btn">
            <CloseIcon />
          </IconButton>
        </Box>
        <List className="mobile-nav-list">
          {location.pathname !== "/" && navItems.map((item) => (
            <ListItem button key={item.id} onClick={() => scrollTo(item.id)}>
              <ListItemText primary={item.label} className="mobile-nav-text" />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleNavClick(location.pathname === "/" ? "/login" : "/")}>
            <ListItemText primary={location.pathname === "/" ? "Login" : "Logout"} className="confirm-btn-text" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
