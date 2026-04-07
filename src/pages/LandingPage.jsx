import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { PHOTOGRAPHERS, PACKAGES } from "../data/mockData";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-root">
            {/* ── Hero Section ── */}
            <div className="landing-hero">
                <div className="landing-hero-overlay">
                    <span className="hero-eyebrow">ESTABLISHED 2026</span>
                    <h1 className="landing-title">
                        Memories Defined by <em>Precision</em>
                    </h1>
                    <p className="landing-subtitle">
                        Curated photography experiences designed to capture your story with sophisticated cinematic elegance.
                    </p>

                    {/* Image-Style Search Bar */}
                    <div className="hero-search-wrapper">
                        <div className="search-input-group">
                            <SearchIcon className="search-icon-small" />
                            <input type="text" placeholder="Search for a photographer..." />
                        </div>
                        <div className="search-input-group">
                            <LocationOnIcon className="search-icon-small" />
                            <input type="text" placeholder="Location..." defaultValue="Chennai, India" />
                        </div>
                        <button className="hero-search-btn" onClick={() => navigate("/login")}>
                            Find a Photographer
                        </button>
                    </div>

                    <div className="landing-stats">
                        <div className="stat-item">
                            <span className="stat-num">500+</span>
                            <span className="stat-label">Satisfied Clients</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">50+</span>
                            <span className="stat-label">Handpicked Artists</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">1.2K</span>
                            <span className="stat-label">Stories Captured</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Discover by Specialty ── */}
            <section className="landing-section specialty-section">
                <div className="section-header">
                    <div className="section-titles">
                        <span className="section-eyebrow">DIFFERENCE</span>
                        <h2 className="section-main-title">Discover by Specialty</h2>
                    </div>
                    <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                        Browse all Categories
                    </a>
                </div>

                <div className="specialty-grid">
                    {PACKAGES.map((pkg) => (
                        <div key={pkg.id} className="specialty-card" onClick={() => navigate("/login")}>
                            <img src={pkg.img} alt={pkg.label} />
                            <div className="specialty-overlay">
                                <h4 className="specialty-name">{pkg.label}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Artisans ── */}
            <section className="landing-section" style={{ background: 'var(--bg-alt)' }}>
                <div className="section-header">
                    <div className="section-titles">
                        <span className="section-eyebrow">EXPERT CURATION</span>
                        <h2 className="section-main-title">Featured Artisans</h2>
                    </div>
                    <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>
                        Meet more artists
                    </a>
                </div>

                <div className="artisan-grid">
                    {PHOTOGRAPHERS.slice(0, 3).map((artisan) => (
                        <div key={artisan.id} className="artisan-card">
                            <div className="artisan-img-wrapper">
                                <img src={artisan.img} alt={artisan.name} />
                                <div className="artisan-badge">PREMIUM ARTIST</div>
                            </div>
                            <div className="artisan-content">
                                <div className="artisan-header">
                                    <h3 className="artisan-name">{artisan.name}</h3>
                                    <div className="artisan-rating">
                                        <StarIcon className="rating-star" />
                                        <span>{artisan.rating}</span>
                                    </div>
                                </div>
                                <p className="artisan-role">{artisan.role}</p>
                                <div className="artisan-footer">
                                    <div className="artisan-price">
                                        <span>Starts from</span>
                                        <b>{artisan.price}</b>
                                    </div>
                                    <button className="book-btn-small" onClick={() => navigate("/login")}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Your Journey Section ── */}
            <section className="journey-section">
                <div className="journey-image">
                    <img src="https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg" alt="Photography session" />
                </div>
                <div className="journey-steps">
                    <div className="section-titles">
                        <span className="section-eyebrow">COORDINATION</span>
                        <h2 className="section-main-title">Your journey to Perfect Moments</h2>
                    </div>

                    <div className="journey-step">
                        <span className="step-number">01</span>
                        <div className="step-details">
                            <h4>Discover & Consult</h4>
                            <p>Explore our elite roster and find the artistic style that resonates with your vision. Discuss your ideas directly with the creator.</p>
                        </div>
                    </div>

                    <div className="journey-step">
                        <span className="step-number">02</span>
                        <div className="step-details">
                            <h4>Seamless Reservation</h4>
                            <p>Select your date and customize your package. Our intuitive system handles the logistics so you can focus on the experience.</p>
                        </div>
                    </div>

                    <div className="journey-step">
                        <span className="step-number">03</span>
                        <div className="step-details">
                            <h4>Capturing & Delivery</h4>
                            <p>Enjoy a bespoke session led by top-tier professionals. Receive your curated gallery with hand-finished artistic processing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final Call to Action ── */}
            <section className="final-cta">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Capture Your Next Milestone?</h2>
                    <p style={{ opacity: 0.8, fontSize: '17px', fontWeight: 300, fontFamily: 'var(--font-sans)', lineHeight: 1.7, letterSpacing: '0.3px' }}>
                        Unveil the beauty of your story through our lens. Join the most exclusive community of visual storytellers and creators.
                    </p>
                    <div className="cta-btns">
                        <button className="cta-btn-main" onClick={() => navigate("/signup")}>Register Now</button>
                        <button className="cta-btn-sub" onClick={() => navigate("/signup?type=photographer")}>Join as Artist</button>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
