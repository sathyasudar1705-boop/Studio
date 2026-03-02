import React from "react";
import {Box,Container,Grid,Typography,IconButton,} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import "./Footer.css";

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4}>

          {/* Left Section */}
          <Grid item xs={12} md={4}>
            <Box className="footer-logo">
              <CameraAltIcon sx={{ color: "#a78bfa", mr: 1 }} />
              <Typography variant="h6" className="brand-name">
                LensLux Studio
              </Typography>
            </Box>

            <Typography className="footer-desc">
              We capture your most precious moments with cinematic precision
              and artistic flair. Book your session today and turn memories
              into timeless art.
            </Typography>

            <Box className="social-icons">
              <IconButton className="icon-btn"><FacebookIcon /></IconButton>
              <IconButton className="icon-btn"><InstagramIcon /></IconButton>
              <IconButton className="icon-btn"><YouTubeIcon /></IconButton>
              <IconButton className="icon-btn"><WhatsAppIcon /></IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={2}>
            <Typography className="footer-heading">OUR SERVICES</Typography>
            <Typography className="footer-link">Wedding Shoot</Typography>
            <Typography className="footer-link">Baby Shoot</Typography>
            <Typography className="footer-link">Birthday Shoot</Typography>
            <Typography className="footer-link">Product Shoot</Typography>
            <Typography className="footer-link">Outdoor Shoot</Typography>
            <Typography className="footer-link">Passport Photo</Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography className="footer-heading">QUICK LINKS</Typography>
            <Typography className="footer-link">Home</Typography>
            <Typography className="footer-link">Packages</Typography>
            <Typography className="footer-link">Book a Shoot</Typography>
            <Typography className="footer-link">Login / Register</Typography>
          </Grid>


        </Grid>

        {/* Bottom Section */}
        <Box className="footer-bottom">
          <Typography>
            © 2025 LensLux Studio. All rights reserved.
          </Typography>

          <Box className="bottom-links">
            <Typography>Privacy Policy</Typography>
            <Typography>Terms of Service</Typography>
            <Typography>Cancellation Policy</Typography>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;