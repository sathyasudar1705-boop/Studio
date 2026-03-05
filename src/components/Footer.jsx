import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";

import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
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

          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box className="footer-logo">

              <LinkedCameraIcon sx={{ color: " #d4a84b", mr: 1 }} />

              <Typography variant="h6" className="brand-name">
                Lensoria
              </Typography>

            </Box>

            <Typography className="footer-desc">
              Lensoria captures life’s most beautiful moments through
              creative photography. From weddings to personal portraits,
              we turn every memory into a timeless visual story.
            </Typography>

            <Box className="social-icons">
              <IconButton className="icon-btn"><FacebookIcon /></IconButton>
              <IconButton className="icon-btn"><InstagramIcon /></IconButton>
              <IconButton className="icon-btn"><YouTubeIcon /></IconButton>
              <IconButton className="icon-btn"><WhatsAppIcon /></IconButton>
            </Box>
          </Grid>

        </Grid>


       

      </Container>
    </Box>
  );
};

export default Footer;