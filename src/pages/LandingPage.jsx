import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";







const testimonials = [
    { name: "Priya Sharma", role: "Wedding Client", text: "The cinematic quality of the photos is just breathtaking. They captured our day perfectly." },
    { name: "Rahul Verma", role: "Product Owner", text: "Professionalism at its best. The product shots significantly boosted our brand image." },
    { name: "Sneha Kapur", role: "Maternity Client", text: "Such a comfortable and luxurious experience. The baby shoot photos are our favorite memories." }
];



const LandingPage = () => {
    const navigate = useNavigate();


    return (
        <div className="landing-root">

            {/* ── Navbar ── */}
            <nav className="landing-navbar">
                <span className="landing-logo">LENSORIA</span>
                <div className="landing-nav-links">
                    <span onClick={() => navigate("/login")}>Login</span>
                    <span onClick={() => scrollTo("contact-landing")}>Contact</span>
                </div>
                <div className="landing-nav-auth">
                    <span className="ln-login" onClick={() => navigate("/login")}>Login</span>
                </div>
            </nav>


            {/* ── Hero ── */}
            <div className="landing-hero">
                <div className="landing-hero-overlay">
                    <h1 className="landing-title">Capture Your Perfect Moments</h1>
                    <p className="landing-subtitle">
                        Professional photography for weddings, birthdays, baby shoots, and more.
                    </p>
                    <div className="landing-cta-group">
                        <button className="landing-cta primary-cta" onClick={() => navigate("/login")}>
                            Book a Shoot
                        </button>
                    </div>
                    <div className="landing-stats">
                        <div className="stat-item"><span className="stat-num">500+</span><span className="stat-label">Happy Clients</span></div>
                        <div className="stat-divider" />
                        <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">Photographers</span></div>
                        <div className="stat-divider" />
                        <div className="stat-item"><span className="stat-num">1200+</span><span className="stat-label">Sessions Done</span></div>
                    </div>
                </div>
            </div>



            {/* ── Testimonials ── */}
            <section className="testimonials-section">
                <div className="section-title-area">
                    <p className="section-eyebrow">CLIENT LOVE</p>
                    <h2 className="section-main-title">TESTIMONIALS</h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <p className="testimonial-text">"{t.text}"</p>
                            <h4 className="testimonial-name">{t.name}</h4>
                            <p className="testimonial-role">{t.role}</p>
                        </div>
                    ))}
                </div>
            </section>




            {/* ── Contact ── */}
            <section id="contact-landing" className="contact-landing">
                <div className="section-title-area">
                    <p className="section-eyebrow">REACH OUT</p>
                    <h2 className="section-main-title">CONTACT US</h2>
                </div>
                <div className="contact-landing-info">
                    <div className="contact-item">
                        <EmailIcon className="contact-icon" />
                        <span>studio@lensoria.com</span>
                    </div>
                    <div className="contact-item">
                        <PhoneIcon className="contact-icon" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="contact-item">
                        <LocationOnIcon className="contact-icon" />
                        <span>Chennai, Tamil Nadu, India</span>
                    </div>
                </div>

            </section>

            <Footer />


        </div>
    );
};

export default LandingPage;
