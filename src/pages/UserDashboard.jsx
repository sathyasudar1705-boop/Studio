import React, { useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import DownloadIcon from "@mui/icons-material/Download";


/* ─── Sub-components ─── */
const WeddingCard = ({ title, image, sizeClass, des }) => (
    <div className={`card-container ${sizeClass}`}>
        <div className="overlay-content">
            <span className="label">BOOK YOUR DATE</span>
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{des}</p>
        </div>
        <img src={image} alt={title} className="bg-image" />
    </div>
);

/* ─── Main Component ─── */
const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    /* ── Data ── */
    const shootStyles = [
        { id: 1, title: "WEDDING PHOTOGRAPHY", img: Wedding1, des: "Capturing every beautiful moment of your special day." },
        { id: 2, title: "BABY SHOOT", img: BabyPhoto, des: "Precious little moments captured beautifully." },
        { id: 3, title: "PRODUCT SHOOTS", img: ProductPhoto, des: "Professional photos that make your products stand out." },
        { id: 4, title: "BIRTHDAY CELEBRATIONS", img: BirthdayPhoto, des: "Making every birthday memory last forever." },
        { id: 5, title: "TRAVEL SHOOTS", img: TravelPhoto, des: "Capturing beautiful destinations and journeys." },
    ];

    const photographers = [
        { id: 1, name: "Alexander Ray", role: "Wedding Specialist", img: Photographer1, rating: 4.9 },
        { id: 2, name: "Elena Sophia", role: "Portrait Artist", img: Photographer2, rating: 4.8 },
        { id: 3, name: "Marcus Vane", role: "Lifestyle Expert", img: Photographer3, rating: 4.7 },
    ];

    const stats = [
        { label: "Total Bookings", value: "12" },
        { label: "Upcoming", value: "3" },
        { label: "Favorites", value: "8" },
        { label: "Hours Shot", value: "45h" },
    ];

    const recentBookings = [
        { id: 1, service: "Wedding Shoot", photographer: "Alexander Ray", date: "Feb 10, 2026", status: "Confirmed", amount: "₹15,000" },
        { id: 2, service: "Baby Portrait", photographer: "Elena Sophia", date: "Feb 15, 2026", status: "Pending", amount: "₹8,000" },
        { id: 3, service: "Fashion Shoot", photographer: "Marcus Vane", date: "Jan 28, 2026", status: "Completed", amount: "₹12,000" },
    ];

    const myPhotos = [
        { id: 1, src: Wedding1, title: "Wedding Day", date: "Feb 10, 2026" },
        { id: 2, src: BabyPhoto, title: "Baby Memories", date: "Feb 15, 2026" },
        { id: 3, src: TravelPhoto, title: "Travel Moments", date: "Jan 20, 2026" },
        { id: 4, src: BirthdayPhoto, title: "Birthday Bash", date: "Jan 28, 2026" },
        { id: 5, src: ProductPhoto, title: "Product Shoot", date: "Dec 10, 2025" },
    ];

    /* ── Sidebar Items ── */
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
        { id: "book", label: "Book a Shoot", icon: <CameraAltIcon fontSize="small" /> },
        { id: "photographers", label: "Photographers", icon: <GroupsIcon fontSize="small" /> },
        { id: "bookings", label: "My Bookings", icon: <CalendarMonthIcon fontSize="small" /> },
        { id: "payments", label: "Payments", icon: <PaymentIcon fontSize="small" /> },
        { id: "photos", label: "My Photos", icon: <PhotoLibraryIcon fontSize="small" /> },
        { id: "profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
    ];

    return (
        <div className="dashboard-container">
            {/* ── Sidebar ── */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <CameraAltIcon className="accent-text" />
                    <span>LENSORIA</span>
                </div>

                <p className="nav-section-label">Menu</p>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}<span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user-info">
                        <img src={Photographer2} alt="User" />
                        <div className="sidebar-user-text">
                            <h5>Sarah Mitchell</h5>
                            <p>CUSTOMER</p>
                        </div>
                    </div>
                    <div className="nav-item logout" onClick={() => alert("Logged out!")}>
                        <LogoutIcon fontSize="small" /><span>Logout</span>
                    </div>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-search">
                        <SearchIcon fontSize="small" />
                        <input type="text" placeholder="Search photographers, styles..." />
                    </div>
                    <div className="header-actions">
                        <NotificationsIcon fontSize="small" className="action-icon" />
                        <div className="user-profile">
                            <img src={Photographer2} alt="User" />
                            <span>Sarah Mitchell</span>
                        </div>
                    </div>
                </header>

                <div className="dashboard-content">

                    {/* ═══ DASHBOARD TAB ═══ */}
                    {activeTab === "dashboard" && (
                        <>
                            <section className="welcome-banner">
                                <div className="banner-text">
                                    <h1>Welcome to Your Photography Dashboard</h1>
                                    <p>Track your bookings, upcoming sessions, and photo delivery updates in one place.</p>
                                </div>
                            </section>


                            <div className="dashboard-content-main">
                                <section className="stats-grid">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="stat-card">
                                            <div className="stat-info">
                                                <h3>{stat.value}</h3>
                                                <p>{stat.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                <section className="payment-summary-section section-card">
                                    <div className="payment-card-wrap">
                                        <div className="payment-header">
                                            <h3>Payment Summary</h3>
                                            <button className="invoice-btn">
                                                <DownloadIcon fontSize="inherit" /> Invoice
                                            </button>
                                        </div>
                                        <div className="payment-grid">
                                            <div className="pay-item">
                                                <label>Total Package</label>
                                                <span className="val">₹25,000</span>
                                            </div>
                                            <div className="pay-item">
                                                <label>Advance Paid</label>
                                                <span className="val paid">₹10,000</span>
                                            </div>
                                            <div className="pay-item highlight">
                                                <label>Balance Due</label>
                                                <span className="val due">₹15,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </>
                    )}

                    {/* ═══ BOOK A SHOOT TAB ═══ */}
                    {activeTab === "book" && (
                        <>
                            <div className="tab-page-header">
                                <h1>Book a Shoot</h1>
                                <p>Choose your style and find the perfect photographer</p>
                            </div>

                            <h2 className="sub-section-title">Choose a Style</h2>
                            <div className="preview-grid">
                                {shootStyles.map(item => (
                                    <WeddingCard key={item.id} {...item} sizeClass="square" image={item.img} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* ═══ PHOTOGRAPHERS TAB ═══ */}
                    {activeTab === "photographers" && (
                        <>
                            <div className="tab-page-header">
                                <h1>Photographers</h1>
                                <p>Browse and book from our talented photography team</p>
                            </div>
                            <div className="photographer-booking-grid">
                                {photographers.map(ph => (
                                    <div key={ph.id} className="photographer-booking-card">
                                        <img src={ph.img} alt={ph.name} className="ph-book-img" />
                                        <div className="ph-book-info">
                                            <h3>{ph.name}</h3>
                                            <p>{ph.role}</p>
                                            <div className="ph-rating">
                                                <StarIcon fontSize="small" style={{ color: "#d4a84b" }} />
                                                <span>{ph.rating}</span>
                                            </div>
                                        </div>
                                        <button className="book-now-btn" onClick={() => setActiveTab("book")}>Book Now</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ═══ MY BOOKINGS TAB ═══ */}
                    {activeTab === "bookings" && (
                        <>
                            <div className="tab-page-header">
                                <h1>My Bookings</h1>
                                <p>Track all your photography sessions</p>
                            </div>
                            <div className="bookings-table-container">
                                <table className="bookings-table full-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Service</th>
                                            <th>Photographer</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.service}</td>
                                                <td>{booking.photographer}</td>
                                                <td>{booking.date}</td>
                                                <td>{booking.amount}</td>
                                                <td><span className={`status-pill ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* ═══ PAYMENTS TAB ═══ */}
                    {activeTab === "payments" && (
                        <>
                            <div className="tab-page-header">
                                <h1>Payments</h1>
                                <p>Manage your payment history and invoices</p>
                            </div>
                            <div className="payments-summary">
                                <div className="payment-stat-card" style={{ borderColor: "#4CAF50" }}>
                                    <p>Total Spent</p>
                                    <h2>₹35,000</h2>
                                </div>
                                <div className="payment-stat-card" style={{ borderColor: "#FF9800" }}>
                                    <p>Pending</p>
                                    <h2>₹8,000</h2>
                                </div>
                                <div className="payment-stat-card" style={{ borderColor: "#2196F3" }}>
                                    <p>Completed</p>
                                    <h2>₹27,000</h2>
                                </div>
                            </div>
                            <div className="bookings-table-container" style={{ marginTop: "1.5rem" }}>
                                <table className="bookings-table full-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Service</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map(b => (
                                            <tr key={b.id}>
                                                <td>INV-00{b.id}</td>
                                                <td>{b.service}</td>
                                                <td>{b.date}</td>
                                                <td>{b.amount}</td>
                                                <td><span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* ═══ MY PHOTOS TAB ═══ */}
                    {activeTab === "photos" && (
                        <>
                            <div className="tab-page-header">
                                <h1>My Photos</h1>
                                <p>All your delivered photo galleries in one place</p>
                            </div>
                            <div className="my-photos-grid">
                                {myPhotos.map(photo => (
                                    <div key={photo.id} className="my-photo-card">
                                        <img src={photo.src} alt={photo.title} />
                                        <div className="my-photo-overlay">
                                            <h4>{photo.title}</h4>
                                            <p>{photo.date}</p>
                                            <button className="mini-book">
                                                <DownloadIcon fontSize="small" /> Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ═══ PROFILE TAB ═══ */}
                    {activeTab === "profile" && (
                        <div className="profile-page">

                            {/* ── Profile Hero ── */}
                            <div className="profile-hero">
                                <div className="profile-hero-bg" />
                                <div className="profile-hero-content">
                                    <div className="profile-avatar-wrap">
                                        <img src={Photographer2} alt="Sarah Mitchell" className="profile-avatar" />
                                        <button className="change-photo-btn"><EditIcon fontSize="small" /></button>
                                    </div>
                                    <div className="profile-hero-info">
                                        <div className="profile-name-row">
                                            <h1>Sarah Mitchell</h1>
                                            <span className="member-badge">⭐ Premium Member</span>
                                        </div>
                                        <p className="profile-tagline">Photography enthusiast &amp; memory collector — based in Chennai, TN</p>
                                        <div className="profile-meta-row">
                                            <span>📧 sarah.mitchell@email.com</span>
                                            <span>📱 +91 98765 43210</span>
                                            <span>📍 Chennai, Tamil Nadu</span>
                                            <span>🗓️ Member since Jan 2025</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="profile-stats-row">
                                    <div className="profile-stat">
                                        <h3>12</h3><p>Total Bookings</p>
                                    </div>
                                    <div className="profile-stat-divider" />
                                    <div className="profile-stat">
                                        <h3>5</h3><p>Shoots Completed</p>
                                    </div>
                                    <div className="profile-stat-divider" />
                                    <div className="profile-stat">
                                        <h3>8</h3><p>Saved Photos</p>
                                    </div>
                                    <div className="profile-stat-divider" />
                                    <div className="profile-stat">
                                        <h3>3</h3><p>Photographers Hired</p>
                                    </div>
                                </div>
                            </div>

                            {/* ── Two Column Layout ── */}
                            <div className="profile-body-grid">

                                {/* Left — Personal Info */}
                                <div className="profile-section-card">
                                    <div className="profile-section-title">
                                        <PersonIcon fontSize="small" />
                                        <h2>Personal Information</h2>
                                    </div>
                                    <div className="profile-fields-grid">
                                        <div className="profile-field">
                                            <label>First Name</label>
                                            <input type="text" defaultValue="Sarah" />
                                        </div>
                                        <div className="profile-field">
                                            <label>Last Name</label>
                                            <input type="text" defaultValue="Mitchell" />
                                        </div>
                                        <div className="profile-field">
                                            <label>Email Address</label>
                                            <input type="email" defaultValue="sarah.mitchell@email.com" />
                                        </div>
                                        <div className="profile-field">
                                            <label>Phone Number</label>
                                            <input type="tel" defaultValue="+91 98765 43210" />
                                        </div>
                                        <div className="profile-field">
                                            <label>Date of Birth</label>
                                            <input type="date" defaultValue="1995-06-14" />
                                        </div>
                                        <div className="profile-field">
                                            <label>Gender</label>
                                            <select className="profile-select">
                                                <option>Female</option>
                                                <option>Male</option>
                                                <option>Prefer not to say</option>
                                            </select>
                                        </div>
                                        <div className="profile-field profile-field-full">
                                            <label>Address</label>
                                            <input type="text" defaultValue="42, Anna Nagar, Chennai" />
                                        </div>
                                        <div className="profile-field">
                                            <label>City</label>
                                            <input type="text" defaultValue="Chennai" />
                                        </div>
                                        <div className="profile-field">
                                            <label>State</label>
                                            <input type="text" defaultValue="Tamil Nadu" />
                                        </div>
                                        <div className="profile-field profile-field-full">
                                            <label>Bio</label>
                                            <textarea className="profile-textarea" defaultValue="I love capturing life's beautiful moments through photography. Always looking for meaningful stories to tell." />
                                        </div>
                                    </div>
                                    <button className="book-now-btn" style={{ marginTop: "1.5rem" }}>Save Changes</button>
                                </div>

                                {/* Right Column */}
                                <div className="profile-right-col">

                                    {/* Preferences */}
                                    <div className="profile-section-card">
                                        <div className="profile-section-title">
                                            <SettingsIcon fontSize="small" />
                                            <h2>Preferences</h2>
                                        </div>
                                        <div className="preference-list">
                                            <div className="preference-item">
                                                <div>
                                                    <h4>Email Notifications</h4>
                                                    <p>Booking confirmations &amp; updates</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider" />
                                                </label>
                                            </div>
                                            <div className="preference-item">
                                                <div>
                                                    <h4>SMS Alerts</h4>
                                                    <p>Session reminders via SMS</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider" />
                                                </label>
                                            </div>
                                            <div className="preference-item">
                                                <div>
                                                    <h4>Promotional Offers</h4>
                                                    <p>Deals and seasonal discounts</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" />
                                                    <span className="toggle-slider" />
                                                </label>
                                            </div>
                                            <div className="preference-item">
                                                <div>
                                                    <h4>Photo Ready Alerts</h4>
                                                    <p>Notify when gallery is ready</p>
                                                </div>
                                                <label className="toggle-switch">
                                                    <input type="checkbox" defaultChecked />
                                                    <span className="toggle-slider" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Membership */}
                                    <div className="profile-section-card membership-card">
                                        <div className="membership-glow" />
                                        <div className="profile-section-title">
                                            <StarIcon fontSize="small" style={{ color: "#d4a84b" }} />
                                            <h2>Membership</h2>
                                        </div>
                                        <div className="membership-info">
                                            <span className="membership-tier">⭐ PREMIUM</span>
                                            <p>Valid until <strong>December 2025</strong></p>
                                            <div className="membership-perks">
                                                <span>✓ Priority Booking</span>
                                                <span>✓ Free Reschedule</span>
                                                <span>✓ HD Downloads</span>
                                                <span>✓ Dedicated Support</span>
                                            </div>
                                        </div>
                                        <button className="renew-btn">Renew Membership</button>
                                    </div>

                                    {/* Danger Zone */}
                                    <div className="profile-section-card danger-card">
                                        <div className="profile-section-title">
                                            <h2>Account Actions</h2>
                                        </div>
                                        <div className="account-actions">
                                            <button className="action-btn change-pass-btn">🔒 Change Password</button>
                                            <button className="action-btn deactivate-btn">⚠️ Deactivate Account</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
