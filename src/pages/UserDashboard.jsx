import React from "react";
import "./UserDashboard.css";
import Wedding1 from "../assets/Wedding_photo.jpg";
import BabyPhoto from "../assets/Baby.jpg";
import ProductPhoto from "../assets/Product.jpg";
import BirthdayPhoto from "../assets/Birthday.jpg";
import TravelPhoto from "../assets/Outdoor_photoshoot.jpg";
import Photographer1 from "../assets/ph1.png";
import Photographer2 from "../assets/ph2.png";
import Photographer3 from "../assets/ph3.png";
import LayoutDashboardIcon from "@mui/icons-material/Dashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GridViewIcon from "@mui/icons-material/GridView";



const WeddingCard = ({ title, date, image, sizeClass, des }) => (
    <div className={`card-container ${sizeClass}`}>
        <div className="overlay-content">
            <span className="label">BOOK YOUR DATE</span>
            <h2 className="card-title">{title}</h2>
            <a href="#" className="book-box">{date}</a>
            <p className="card-description">{des}</p>
        </div>
        <img src={image} alt={title} className="bg-image" />
    </div>
);

const PhotographerCard = ({ name, role, image }) => (
    <div className="photographer-card">
        <div className="ph-img-container">
            <img src={image} alt={name} className="ph-image" />
        </div>
        <div className="ph-info">
            <h4 className="ph-name">{name}</h4>
            <p className="ph-role">{role}</p>
            <button className="book-ph-btn">BOOK NOW</button>
        </div>
    </div>
);

const UserDashboard = () => {
    const weddingData = [
        { id: 1, title: "WEDDING PHOTOGRAPHY", date: "BOOK NOW", size: "portrait", img: Wedding1, des: "Capturing every beautiful moment of your special day." },
        { id: 2, title: "BABY SHOOT", date: "22 JAN 2026", size: "square", img: BabyPhoto, des: "Precious little moments captured beautifully." },
        { id: 3, title: "PRODUCT SHOOTS", date: "25 JAN 2026", size: "square", img: ProductPhoto, des: "Professional photos that make your products stand out." },
        { id: 4, title: "BIRTHDAY CELEBRATIONS", date: "28 JAN 2026", size: "square", img: BirthdayPhoto, des: "Making every birthday memory last forever." },
        { id: 5, title: "TRAVEL SHOOTS", date: "30 JAN 2026", size: "square", img: TravelPhoto, des: "Capturing beautiful destinations and journeys." },
    ];

    const photographers = [
        { id: 1, name: "Alexander Ray", role: "Wedding Specialist", img: Photographer1 },
        { id: 2, name: "Elena Sophia", role: "Portrait Artist", img: Photographer2 },
        { id: 3, name: "Marcus Vane", role: "Lifestyle Expert", img: Photographer3 },
    ];

    const stats = [
        { label: "Total Bookings", value: "12", icon: <CheckCircleIcon fontSize="small" />, color: "#4CAF50" },
        { label: "Upcoming", value: "3", icon: <AccessTimeIcon fontSize="small" />, color: "#FF9800" },
        { label: "Favorites", value: "8", icon: <FavoriteIcon fontSize="small" />, color: "#F44336" },
        { label: "Hours Shot", value: "45h", icon: <CameraAltIcon fontSize="small" />, color: "#2196F3" },
    ];


    const recentBookings = [
        { id: 1, service: "Wedding Shoot", photographer: "Alexander Ray", date: "Feb 10, 2026", status: "Confirmed" },
        { id: 2, service: "Baby Portrait", photographer: "Elena Sophia", date: "Feb 15, 2026", status: "Pending" },
        { id: 3, service: "Fashion Shoot", photographer: "Marcus Vane", date: "Jan 28, 2026", status: "Completed" },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <CameraAltIcon className="gold-text" />
                    <span>LENSORIA</span>
                </div>

                <p className="nav-section-label">Menu</p>

                <nav className="sidebar-nav">
                    <div className="nav-item active">
                        <LayoutDashboardIcon fontSize="small" /><span>Dashboard</span>
                    </div>
                    <div className="nav-item">
                        <GridViewIcon fontSize="small" /><span>Explore</span>
                    </div>
                    <div className="nav-item">
                        <CalendarMonthIcon fontSize="small" /><span>Appointments</span>
                    </div>
                    <div className="nav-item">
                        <PersonIcon fontSize="small" /><span>Profile</span>
                    </div>
                    <div className="nav-item">
                        <SettingsIcon fontSize="small" /><span>Settings</span>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user-info">
                        <img src={Photographer2} alt="User" />
                        <div className="sidebar-user-text">
                            <h5>Sarah Mitchell</h5>
                            <p>CUSTOMER</p>
                        </div>
                    </div>
                    <div className="nav-item logout">
                        <LogoutIcon fontSize="small" /><span>Logout</span>
                    </div>
                </div>
            </aside>


            {/* Main Content */}
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
                    <section className="welcome-banner">
                        <div className="banner-text">
                            <h1>Hello, Sarah!</h1>
                            <p>You have 3 upcoming photo sessions this month. Get ready to capture magic!</p>
                        </div>
                        <button className="book-now-btn">Book New Session</button>
                    </section>

                    <section className="stats-grid">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="stat-card">
                                <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div className="stat-info">
                                    <h3>{stat.value}</h3>
                                    <p>{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <div className="content-split-grid">
                        <section className="recent-bookings-section">
                            <div className="section-header-flex">
                                <h2>Recent Bookings</h2>
                                <button className="view-all">View All</button>
                            </div>
                            <div className="bookings-table-container">
                                <table className="bookings-table">
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Photographer</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentBookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.service}</td>
                                                <td>{booking.photographer}</td>
                                                <td>{booking.date}</td>
                                                <td><span className={`status-pill ${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="quick-photographers">
                            <h2>Top Photographers</h2>
                            <div className="mini-ph-list">
                                {photographers.map(ph => (
                                    <div key={ph.id} className="mini-ph-card">
                                        <img src={ph.img} alt={ph.name} />
                                        <div className="mini-ph-info">
                                            <h4>{ph.name}</h4>
                                            <p>{ph.role}</p>
                                        </div>
                                        <button className="mini-book">Book</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section id="gallery-section" className="explore-preview">
                        <div className="section-header-flex">
                            <h2>Explore Styles</h2>
                            <button className="view-all">See Full Gallery</button>
                        </div>
                        <div className="preview-grid">
                            {weddingData.slice(0, 3).map(item => (
                                <WeddingCard key={item.id} {...item} sizeClass="square" image={item.img} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};


export default UserDashboard;
