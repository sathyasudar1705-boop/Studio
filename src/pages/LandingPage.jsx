import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";


import LandingBg from "../assets/pexels-jibarofoto-1787220.jpg";
import Wedding1 from "../assets/Wedding_photo.jpg";
import BabyPhoto from "../assets/Baby.jpg";
import ProductPhoto from "../assets/Product.jpg";
import BirthdayPhoto from "../assets/Birthday.jpg";
import TravelPhoto from "../assets/Outdoor_photoshoot.jpg";

const services = [
    {
        id: 1, title: "Wedding Photography",
        tag: "WEDDINGS",
        desc: "Capture every tear, laugh and vow of your most special day with cinematic precision.",
        price: "₹25,000 onwards",
        img: Wedding1,
        gallery: [Wedding1, Wedding1, Wedding1],
        color: "#e8c97a",
    },
    {
        id: 2, title: "Baby Shoot",
        tag: "NEWBORNS",
        desc: "Precious little moments captured softly — milestones your family will treasure forever.",
        price: "₹8,000 onwards",
        img: BabyPhoto,
        gallery: [BabyPhoto, BabyPhoto, BabyPhoto],
        color: "#f4a7c0",
    },
    {
        id: 3, title: "Product Photography",
        tag: "COMMERCIAL",
        desc: "High-impact product images that tell your brand story and drive conversions.",
        price: "₹12,000 onwards",
        img: ProductPhoto,
        gallery: [ProductPhoto, ProductPhoto, ProductPhoto],
        color: "#7ab8e8",
    },
    {
        id: 4, title: "Birthday Celebrations",
        tag: "EVENTS",
        desc: "Fun, vibrant and candid shots that bottle up the joy of your celebration.",
        price: "₹6,000 onwards",
        img: BirthdayPhoto,
        gallery: [BirthdayPhoto, BirthdayPhoto, BirthdayPhoto],
        color: "#a0e87a",
    },
    {
        id: 5, title: "Travel & Outdoor",
        tag: "LIFESTYLE",
        desc: "Adventure, wanderlust and landscapes — beautifully documented as you explore.",
        price: "₹10,000 onwards",
        img: TravelPhoto,
        gallery: [TravelPhoto, TravelPhoto, TravelPhoto],
        color: "#e8a07a",
    },
];

const ServiceModal = ({ service, onClose, onBook }) => (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}><CloseIcon fontSize="small" /></button>

            <div className="modal-gallery">
                {service.gallery.map((img, i) => (
                    <img key={i} src={img} alt={service.title} className="modal-img" />
                ))}
            </div>
            <div className="modal-info">
                <p className="modal-tag">{service.tag}</p>
                <h2 className="modal-title">{service.title}</h2>
                <p className="modal-desc">{service.desc}</p>
                <p className="modal-price" style={{ color: service.color }}>{service.price}</p>
                <button
                    className="modal-book-btn"
                    style={{ background: service.color, color: "#000" }}
                    onClick={onBook}
                >
                    BOOK THIS SESSION
                </button>
            </div>
        </div>
    </div>
);

const LandingPage = () => {
    const navigate = useNavigate();
    const [activeService, setActiveService] = useState(null);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleBook = () => {
        setActiveService(null);
        navigate("/user-login");
    };

    return (
        <div className="landing-root">

            {/* ── Navbar ── */}
            <nav className="landing-navbar">
                <span className="landing-logo">LENSORIA</span>
                <div className="landing-nav-links">
                    <span onClick={() => scrollTo("moments-section")}>Gallery</span>
                    <span onClick={() => scrollTo("moments-section")}>Services</span>
                    <span onClick={() => scrollTo("contact-landing")}>Contact</span>
                </div>
                <div className="landing-nav-auth">
                    <span className="ln-login" onClick={() => navigate("/login")}>Login</span>
                </div>
            </nav>


            {/* ── Hero ── */}
            <div className="landing-hero" style={{ backgroundImage: `url(${LandingBg})` }}>
                <div className="landing-hero-overlay">
                    <p className="landing-eyebrow">PREMIUM PHOTOGRAPHY STUDIO</p>
                    <h1 className="landing-title">Capture Every<br />Perfect Moment</h1>
                    <p className="landing-subtitle">
                        Book award-winning photographers for your most cherished moments.
                    </p>
                    <div className="landing-cta-group">
                        <button className="landing-cta primary-cta" onClick={() => navigate("/user-login")}>
                            Book As Customer
                        </button>
                        <button className="landing-cta secondary-cta" onClick={() => navigate("/photographer-login")}>
                            Join As Photographer
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
