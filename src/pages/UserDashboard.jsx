import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Wedding1 from "../assets/Wedding_photo.jpg";
import BabyPhoto from "../assets/Baby.jpg";
import ProductPhoto from "../assets/Product.jpg";
import BirthdayPhoto from "../assets/Birthday.jpg";
import TravelPhoto from "../assets/Outdoor_photoshoot.jpg";
import Photographer1 from "../assets/ph1.png";
import Photographer2 from "../assets/ph2.png";
import Photographer3 from "../assets/ph3.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/* ─── Static Data ─── */
const SHOOT_STYLES = [
    { id: 1, title: "WEDDING PHOTOGRAPHY", img: Wedding1, des: "Capturing every beautiful moment of your special day." },
    { id: 2, title: "BABY SHOOT", img: BabyPhoto, des: "Precious little moments captured beautifully." },
    { id: 3, title: "PRODUCT SHOOTS", img: ProductPhoto, des: "Professional photos that make your products stand out." },
    { id: 4, title: "BIRTHDAY CELEBRATIONS", img: BirthdayPhoto, des: "Making every birthday memory last forever." },
    { id: 5, title: "TRAVEL SHOOTS", img: TravelPhoto, des: "Capturing beautiful destinations and journeys." },
];

const PHOTOGRAPHERS = [
    { 
        id: 1, 
        name: "Alexander Ray", 
        role: "Wedding Specialist", 
        img: Photographer1, 
        rating: 4.9,
        camera: "Canon EOS R5",
        experience: "8 Years",
        samples: [Wedding1, TravelPhoto, ProductPhoto, BirthdayPhoto]
    },
    { 
        id: 2, 
        name: "Elena Sophia", 
        role: "Portrait Artist", 
        img: Photographer2, 
        rating: 4.8,
        camera: "Sony A7R IV",
        experience: "5 Years",
        samples: [BabyPhoto, Wedding1, BirthdayPhoto, TravelPhoto]
    },
    { 
        id: 3, 
        name: "Marcus Vane", 
        role: "Lifestyle Expert", 
        img: Photographer3, 
        rating: 4.7,
        camera: "Nikon Z9",
        experience: "6 Years",
        samples: [ProductPhoto, TravelPhoto, BabyPhoto, Wedding1]
    },
];

const STATS = [
    { label: "Total Bookings", value: "12" },
    { label: "Upcoming", value: "3" },
    { label: "Favorites", value: "8" },
    { label: "Hours Shot", value: "45h" },
];

const RECENT_BOOKINGS = [
    { id: 1, service: "Wedding Shoot", photographer: "Alexander Ray", date: "Feb 10, 2026", status: "Confirmed", amount: "₹15,000" },
    { id: 2, service: "Baby Portrait", photographer: "Elena Sophia", date: "Feb 15, 2026", status: "Pending", amount: "₹8,000" },
    { id: 3, service: "Fashion Shoot", photographer: "Marcus Vane", date: "Jan 28, 2026", status: "Completed", amount: "₹12,000" },
];

const MY_PHOTOS = [
    { id: 1, src: Wedding1, title: "Wedding Day", date: "Feb 10, 2026" },
    { id: 2, src: BabyPhoto, title: "Baby Memories", date: "Feb 15, 2026" },
    { id: 3, src: TravelPhoto, title: "Travel Moments", date: "Jan 20, 2026" },
    { id: 4, src: BirthdayPhoto, title: "Birthday Bash", date: "Jan 28, 2026" },
    { id: 5, src: ProductPhoto, title: "Product Shoot", date: "Dec 10, 2025" },
];

const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    { id: "book", label: "Book a Shoot", icon: <CameraAltIcon fontSize="small" /> },
    { id: "photographers", label: "Photographers", icon: <GroupsIcon fontSize="small" /> },
    { id: "bookings", label: "My Bookings", icon: <CalendarMonthIcon fontSize="small" /> },
    { id: "payments", label: "Payments", icon: <PaymentIcon fontSize="small" /> },
    { id: "photos", label: "My Photos", icon: <PhotoLibraryIcon fontSize="small" /> },
    { id: "profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
];

const WeddingCard = ({ title, img, des }) => (
    <div className="card-container square">
        <div className="overlay-content">
            <span className="label">BOOK YOUR DATE</span>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{des}</p>
        </div>
        <img src={img} alt={title} className="bg-image" />
    </div>
);

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [selectedPg, setSelectedPg] = useState(null);
    const [bookingStep, setBookingStep] = useState(0); // 0: Profile, 1: Calendar, 2: Category, 3: Success
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const navigate = useNavigate();

    const handlePgSelect = (pg) => {
        setSelectedPg(pg);
        setBookingStep(0);
        setActiveTab("photographer-detail");
    };

    const nextStep = () => setBookingStep(prev => prev + 1);
    const prevStep = () => {
        if (bookingStep === 0) {
            setActiveTab("photographers");
            setSelectedPg(null);
        } else {
            setBookingStep(prev => prev - 1);
        }
    };

    const renderBookingFlow = () => {
        if (!selectedPg) return null;

        switch (bookingStep) {
            case 0: // Profile
                return (
                    <div className="profile-detail-view fadeIn">
                        <div className="detail-header">
                            <button className="back-btn-minimal" onClick={prevStep}><ArrowBackIcon /> Back</button>
                        </div>
                        <div className="pg-profile-main">
                            <div className="pg-profile-header">
                                <img src={selectedPg.img} alt={selectedPg.name} className="pg-large-avatar" />
                                <div className="pg-header-info">
                                    <h1>{selectedPg.name}</h1>
                                    <p className="pg-role-tag">{selectedPg.role}</p>
                                    <div className="pg-stats-mini">
                                        <div className="mini-stat"><StarIcon fontSize="inherit" style={{color: '#d4a84b'}} /> <span>{selectedPg.rating} Rating</span></div>
                                        <div className="mini-stat"><CameraAltIcon fontSize="inherit" /> <span>{selectedPg.camera}</span></div>
                                        <div className="mini-stat"><VerifiedIcon fontSize="inherit" /> <span>{selectedPg.experience} Exp</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="pg-samples-section">
                                <h3>Sample Gallery</h3>
                                <div className="samples-grid">
                                    {selectedPg.samples.map((s, i) => <img key={i} src={s} alt="Sample" className="sample-img" />)}
                                </div>
                            </div>

                            <div className="booking-action-bar">
                                <button className="book-now-main-btn" onClick={nextStep}>Book Now</button>
                            </div>
                        </div>
                    </div>
                );
            case 1: // Calendar
                return (
                    <div className="booking-step-view fadeIn">
                        <div className="detail-header">
                            <button className="back-btn-minimal" onClick={prevStep}><ArrowBackIcon /> Back</button>
                            <h2>Select Date</h2>
                        </div>
                        <div className="calendar-placeholder">
                            <p>Choose your preferred date for the shoot</p>
                            <div className="simple-date-grid">
                                {["March 15", "March 16", "March 17", "March 18", "March 19", "March 20"].map(date => (
                                    <div 
                                        key={date} 
                                        className={`date-pill ${selectedDate === date ? 'active' : ''}`}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        {date}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="booking-action-bar">
                            <button className="book-now-main-btn" disabled={!selectedDate} onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            case 2: // Category
                return (
                    <div className="booking-step-view fadeIn">
                        <div className="detail-header">
                            <button className="back-btn-minimal" onClick={prevStep}><ArrowBackIcon /> Back</button>
                            <h2>Select Category</h2>
                        </div>
                        <div className="category-select-grid">
                            {SHOOT_STYLES.map(style => (
                                <div 
                                    key={style.id} 
                                    className={`cat-choice-card ${selectedCategory === style.title ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(style.title)}
                                >
                                    <img src={style.img} alt={style.title} />
                                    <span>{style.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="booking-action-bar">
                            <button className="book-now-main-btn" disabled={!selectedCategory} onClick={nextStep}>Confirm Booking</button>
                        </div>
                    </div>
                );
            case 3: // Success
                return (
                    <div className="booking-success-view fadeIn">
                        <CheckCircleIcon style={{fontSize: '80px', color: '#4CAF50', marginBottom: '20px'}} />
                        <h1>Booking Confirmed!</h1>
                        <p>Your {selectedCategory} with {selectedPg.name} is scheduled for {selectedDate}, 2026.</p>
                        <button className="book-now-main-btn" onClick={() => setActiveTab("bookings")}>View My Bookings</button>
                    </div>
                );
            default: return null;
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="dashboard-content-main">
                        <section className="welcome-banner">
                            <div className="banner-text">
                                <h1>Welcome back, Sarah!</h1>
                                <p>Capture your luxury wedding session in just 5 days. Our team is ready.</p>
                            </div>
                        </section>
                        <section className="stats-grid">
                            {STATS.map((stat, i) => (
                                <div key={i} className="stat-card">
                                    <div className="stat-info"><h3>{stat.value}</h3><p>{stat.label}</p></div>
                                </div>
                            ))}
                        </section>
                        <section className="payment-summary-section section-card">
                            <div className="payment-header">
                                <h3>Last Payment</h3>
                                <button className="invoice-btn"><DownloadIcon fontSize="inherit" /> Invoice</button>
                            </div>
                            <div className="payment-grid">
                                <div className="pay-item"><label>Wedding Package</label><span className="val paid">₹10,000 Paid</span></div>
                                <div className="pay-item highlight"><label>Balance Due</label><span className="val due">₹15,000</span></div>
                            </div>
                        </section>
                    </div>
                );
            case "book":
                return (
                    <div className="tab-page-container fadeIn">
                        <div className="tab-page-header">
                            <h1>Book a Shoot</h1>
                            <p>Premium photography styles tailored for you</p>
                        </div>
                        <div className="preview-grid">
                            {SHOOT_STYLES.map(style => <WeddingCard key={style.id} {...style} />)}
                        </div>
                    </div>
                );
            case "photographers":
                return (
                    <div className="tab-page-container fadeIn">
                        <div className="tab-page-header"><h1>Our Experts</h1><p>Award winning professionals</p></div>
                        <div className="photographer-booking-grid">
                            {PHOTOGRAPHERS.map(ph => (
                                <div key={ph.id} className="photographer-booking-card" onClick={() => handlePgSelect(ph)}>
                                    <img src={ph.img} alt={ph.name} className="ph-book-img" />
                                    <div className="ph-book-info">
                                        <h3>{ph.name}</h3><p>{ph.role}</p>
                                        <div className="ph-rating"><StarIcon fontSize="small" /><span>{ph.rating}</span></div>
                                    </div>
                                    <button className="book-now-btn">View Profile</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "photographer-detail":
                return renderBookingFlow();
            case "bookings":
                return (
                    <div className="tab-page-container fadeIn">
                        <div className="tab-page-header"><h1>Reservations</h1><p>Your upcoming and past sessions</p></div>
                        <table className="bookings-table">
                            <thead><tr><th>Service</th><th>Pro</th><th>Date</th><th>Status</th></tr></thead>
                            <tbody>
                                {RECENT_BOOKINGS.map(b => (
                                    <tr key={b.id}>
                                        <td>{b.service}</td><td>{b.photographer}</td><td>{b.date}</td>
                                        <td><span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span></td>
                                    </tr>
                                ))}
                                {selectedDate && (
                                    <tr>
                                        <td>{selectedCategory}</td><td>{selectedPg?.name}</td><td>{selectedDate}, 2026</td>
                                        <td><span className="status-pill confirmed">Confirmed</span></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            case "payments":
                return (
                    <div className="tab-page-container fadeIn">
                        <div className="tab-page-header"><h1>Billing</h1><p>Invoices and payment history</p></div>
                        <div className="payments-summary">
                            <div className="payment-stat-card"><p>Total Spent</p><h2>₹35k</h2></div>
                            <div className="payment-stat-card"><p>Pending</p><h2>₹8k</h2></div>
                        </div>
                    </div>
                );
            case "photos":
                return (
                    <div className="tab-page-container fadeIn">
                        <div className="tab-page-header"><h1>Gallery</h1><p>Your delivered masterpieces</p></div>
                        <div className="my-photos-grid">
                            {MY_PHOTOS.map(p => (
                                <div key={p.id} className="my-photo-card">
                                    <img src={p.src} alt={p.title} />
                                    <div className="my-photo-overlay">
                                        <h4>{p.title}</h4><p>{p.date}</p>
                                        <button className="mini-book"><DownloadIcon fontSize="small" /> Get</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "profile":
                return (
                    <div className="profile-page fadeIn">
                        <div className="profile-hero">
                            <div className="profile-hero-bg" />
                            <div className="profile-hero-content">
                                <div className="profile-avatar-wrap">
                                    <img src={Photographer2} alt="User" className="profile-avatar" />
                                    <button className="change-photo-btn"><EditIcon fontSize="small" /></button>
                                </div>
                                <div className="profile-hero-info">
                                    <div className="profile-name-row">
                                        <h1>Sarah Mitchell</h1>
                                        <span className="member-badge"><VerifiedIcon fontSize="inherit" style={{ marginRight: '4px' }} /> Premium</span>
                                    </div>
                                    <div className="profile-meta-row">
                                        <span><EmailIcon fontSize="inherit" /> sarah.m@email.com</span>
                                        <span><PhoneIcon fontSize="inherit" /> +91 98765 43210</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-body-grid">
                            <div className="profile-section-card">
                                <div className="profile-section-title"><PersonIcon fontSize="small" /><h2>Personal</h2></div>
                                <div className="profile-fields-grid">
                                    <div className="profile-field"><label>First Name</label><input type="text" defaultValue="Sarah" /></div>
                                    <div className="profile-field"><label>Last Name</label><input type="text" defaultValue="Mitchell" /></div>
                                    <div className="profile-field-full profile-field"><label>Email</label><input type="email" defaultValue="sarah.m@email.com" /></div>
                                    <div className="profile-field-full profile-field"><label>Bio</label><textarea className="profile-textarea" defaultValue="Lover of light and shadows." /></div>
                                </div>
                                <button className="book-now-btn" style={{ margin: "20px 0 0" }}>Save</button>
                            </div>
                            <div className="profile-right-col">
                                <div className="profile-section-card danger-card">
                                    <div className="profile-section-title"><h2>Account</h2></div>
                                    <div className="account-actions">
                                        <button className="action-btn"><LockIcon fontSize="small" /> Password</button>
                                        <button className="action-btn deactivate-btn" onClick={() => navigate("/")}>
                                            <DeleteForeverIcon fontSize="small" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo"><CameraAltIcon /><span>LENSORIA</span></div>
                <nav className="sidebar-nav">
                    {NAV_ITEMS.map(item => (
                        <div key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                            {item.icon}<span>{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="nav-item logout" onClick={() => navigate("/")}><LogoutIcon fontSize="small" /><span>Logout</span></div>
                </div>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-search"><SearchIcon fontSize="small" /><input type="text" placeholder="Search..." /></div>
                    <div className="header-actions">
                        <NotificationsIcon fontSize="small" className="action-icon" />
                        <div className="user-profile" onClick={() => setActiveTab("profile")}>
                            <img src={Photographer2} alt="Avatar" /><span>Sarah</span>
                        </div>
                    </div>
                </header>
                <div className="dashboard-content">{renderContent()}</div>
            </main>
        </div>
    );
};

export default UserDashboard;
