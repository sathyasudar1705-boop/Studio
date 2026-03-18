import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HighQualityIcon from "@mui/icons-material/HighQuality";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";

// Simplified Landing Page - Arrays removed for easier reading

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-root">
            {/* The global Navbar is used here */}

            {/* Hero Section */}
            <div className="landing-hero">
                <div className="landing-hero-overlay">
                    <h1 className="landing-title">Where Every Moment Becomes Art</h1>
                    <p className="landing-subtitle">Curated photography experiences designed to capture your story with sophistication</p>
                    <button className="landing-cta primary-cta" onClick={() => navigate("/login")}>Reserve Your Session</button>
                    <div className="landing-stats">
                        <div className="stat-item"><span className="stat-num">500+</span><span className="stat-label">Satisfied Clients</span></div>
                        <div className="stat-divider" />
                        <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">Handpicked Photographers</span></div>
                        <div className="stat-divider" />
                        <div className="stat-item"><span className="stat-num">1200+</span><span className="stat-label">Stories Captured</span></div>
                    </div>
                </div>
            </div>

            {/* Section 1: How It Works */}
            <section className="how-it-works">
                <div className="section-title-area">
                    <p className="section-eyebrow">COORDINATION</p>
                    <h2 className="section-main-title">HOW IT WORKS</h2>
                </div>
                <div className="steps-container">
                    {/* Step 1 */}
                    <div className="step-card">
                        <div className="step-icon-wrapper"><SearchIcon className="step-icon" /></div>
                        <h4 className="step-title">Discover Photographers</h4>
                        <p className="step-desc">Browse through our elite roster of visual storytellers.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card">
                        <div className="step-icon-wrapper"><CalendarTodayIcon className="step-icon" /></div>
                        <h4 className="step-title">Choose Your Date</h4>
                        <p className="step-desc">Select the perfect timing for your bespoke session.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card">
                        <div className="step-icon-wrapper"><TaskAltIcon className="step-icon" /></div>
                        <h4 className="step-title">Book & Relax</h4>
                        <p className="step-desc">Secure your reservation and let us handle the artistic details.</p>
                    </div>
                </div>
            </section>

            {/* Section 2: Why Choose Us */}
            <section className="why-choose-us">
                <div className="section-title-area">
                    <p className="section-eyebrow">DIFFERENCE</p>
                    <h2 className="section-main-title">WHY CHOOSE US</h2>
                </div>
                <div className="features-grid">
                    {/* Feature 1 */}
                    <div className="feature-card">
                        <div className="feature-icon-wrapper"><WorkspacePremiumIcon className="feature-icon" /></div>
                        <h4 className="feature-title">Handpicked Professionals</h4>
                        <p className="feature-desc">Only the top 1% of photographers join our exclusive platform.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-card">
                        <div className="feature-icon-wrapper"><HighQualityIcon className="feature-icon" /></div>
                        <h4 className="feature-title">Premium Quality</h4>
                        <p className="feature-desc">High-end post-processing and cinematic delivery for every shot.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-card">
                        <div className="feature-icon-wrapper"><FlashOnIcon className="feature-icon" /></div>
                        <h4 className="feature-title">Easy Booking</h4>
                        <p className="feature-desc">A seamless, intuitive interface designed for modern luxury.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="feature-card">
                        <div className="feature-icon-wrapper"><GroupsIcon className="feature-icon" /></div>
                        <h4 className="feature-title">Trusted by 500+ Clients</h4>
                        <p className="feature-desc">Delivering exceptional visual experiences across the globe.</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Testimonials */}
            <section className="testimonials-section">
                <div className="section-title-area">
                    <p className="section-eyebrow">CLIENT LOVE</p>
                    <h2 className="section-main-title">TESTIMONIALS</h2>
                </div>
                <div className="testimonials-grid-new">
                    {/* Testimonial 1 */}
                    <div className="testimonial-card-new">
                        <div className="stars">
                            <StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" />
                        </div>
                        <p className="testimonial-text">"The cinematic quality of the photos is just breathtaking. They captured our day with such sophistication."</p>
                        <div className="testimonial-footer">
                            <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" alt="Priya Sharma" className="testimonial-img" />
                            <div className="testimonial-info">
                                <h4 className="testimonial-name">Priya Sharma</h4>
                                <p className="testimonial-role">Wedding Client</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="testimonial-card-new">
                        <div className="stars">
                            <StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" />
                        </div>
                        <p className="testimonial-text">"Professionalism at its best. The product shots significantly boosted our brand image."</p>
                        <div className="testimonial-footer">
                            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="Rahul Verma" className="testimonial-img" />
                            <div className="testimonial-info">
                                <h4 className="testimonial-name">Rahul Verma</h4>
                                <p className="testimonial-role">Product Owner</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="testimonial-card-new">
                        <div className="stars">
                            <StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" /><StarIcon className="star-icon" />
                        </div>
                        <p className="testimonial-text">"Such a comfortable and luxurious experience. The baby shoot photos are our favorite memories."</p>
                        <div className="testimonial-footer">
                            <img src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg" alt="Sneha Kapur" className="testimonial-img" />
                            <div className="testimonial-info">
                                <h4 className="testimonial-name">Sneha Kapur</h4>
                                <p className="testimonial-role">Maternity Client</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Contact Section */}
            <section id="contact-landing" className="contact-landing">
                <div className="section-title-area">
                    <p className="section-eyebrow">REACH OUT</p>
                    <h2 className="section-main-title">CONTACT US</h2>
                </div>
                <div className="contact-landing-info">
                    <div className="contact-item"><EmailIcon className="contact-icon" /><span>studio@lensoria.com</span></div>
                    <div className="contact-item"><PhoneIcon className="contact-icon" /><span>+91 98765 43210</span></div>
                    <div className="contact-item"><LocationOnIcon className="contact-icon" /><span>Chennai, Tamil Nadu, India</span></div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
