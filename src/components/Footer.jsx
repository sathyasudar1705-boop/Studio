import React from "react";
import { useNavigate } from "react-router-dom";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <CenterFocusStrongIcon className="footer-logo-icon" style={{ fontSize: '24px', marginRight: '8px', color: 'var(--accent)' }} />
            <span className="footer-brand-name">LENSORIA</span>
          </div>
          <p className="footer-tagline">
            Capturing life's most beautiful moments through creative photography.
          </p>
          <div className="footer-socials">
            <FacebookIcon className="social-icon" />
            <InstagramIcon className="social-icon" />
            <YouTubeIcon className="social-icon" />
            <WhatsAppIcon className="social-icon" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <p className="footer-col-title">Quick Links</p>
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/login")}>Login</span>
          <span onClick={() => navigate("/user-login")}>Book Now</span>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <p className="footer-col-title">Contact</p>
          <span>studio@lensoria.com</span>
          <span>+91 98765 43210</span>
          <span>Chennai, Tamil Nadu</span>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Lensoria Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;