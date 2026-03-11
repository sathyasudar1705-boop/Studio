import React, { useState } from "react";
import "./PhotographerDashboard.css";
import DashboardIcon from "@mui/icons-material/GridView";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CollectionsIcon from "@mui/icons-material/Collections";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const UPCOMING_SHOOTS = [
    { id: 1, client: "Sarah Mitchell", service: "Wedding Shoot", date: "March 15, 2026", time: "09:00 AM", status: "CONFIRMED" },
    { id: 2, client: "John Doe", service: "Product Shoot", date: "March 18, 2026", time: "02:00 PM", status: "PENDING" },
    { id: 3, client: "Emily Chen", service: "Baby Shoot", date: "March 22, 2026", time: "10:30 AM", status: "CONFIRMED" },
];

const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    { id: "shoots", label: "Upcoming Shoots", icon: <EventNoteIcon fontSize="small" /> },
    { id: "portfolio", label: "My Portfolio", icon: <CollectionsIcon fontSize="small" /> },
    { id: "availability", label: "Availability", icon: <EventAvailableIcon fontSize="small" /> },
    { id: "profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
];

const PhotographerDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="ph-dashboard-root">
            <aside className="ph-sidebar">
                <div className="ph-logo"><CameraAltIcon style={{ marginRight: '10px' }} />LENSORIA</div>
                <nav className="ph-nav">
                    {NAV_ITEMS.map(item => (
                        <div key={item.id} className={`ph-nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                            {item.icon}<span>{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="ph-nav-item logout" style={{ marginTop: 'auto', color: '#ff4d4d' }}>
                    <LogoutIcon fontSize="small" /><span>Logout</span>
                </div>
            </aside>

            <main className="ph-main">
                <header className="ph-header">
                    <div>
                        <h1>Welcome back, Alex!</h1>
                        <p style={{ color: '#bfbfbf', fontSize: '14px' }}>You have 3 shoots scheduled for this week.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <NotificationsIcon style={{ opacity: 0.6, cursor: 'pointer' }} />
                        <div className="ph-user-profile-badge">
                            <div className="ph-avatar-mini">A</div>
                            <span>Alex Rivera</span>
                        </div>
                    </div>
                </header>

                <div className="ph-grid">
                    <div className="ph-left">
                        <section className="ph-card">
                            <div className="ph-card-title">Upcoming Sessions<span className="view-all-link">View All</span></div>
                            <div className="upcoming-shoots-list">
                                {UPCOMING_SHOOTS.map(shoot => (
                                    <div key={shoot.id} className="upcoming-shoot-item">
                                        <div className="shoot-info">
                                            <h4>{shoot.client}</h4>
                                            <p>{shoot.service} • {shoot.date} at {shoot.time}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <span className="shoot-status-pill">{shoot.status}</span>
                                            <button className="action-btn">Manage</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="ph-card" style={{ padding: '0' }}>
                            <div className="ph-card-title" style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3>Quick Stats</h3>
                            </div>
                            <div className="ph-stats-row">
                                <div className="ph-stat-item">
                                    <h2 className="ph-stat-val">12</h2>
                                    <p className="ph-stat-label">Pending Edits</p>
                                </div>
                                <div className="ph-stat-item">
                                    <h2 className="ph-stat-val">₹45k</h2>
                                    <p className="ph-stat-label">Monthly Earning</p>
                                </div>
                                <div className="ph-stat-item" style={{ border: 'none' }}>
                                    <h2 className="ph-stat-val">4.9</h2>
                                    <p className="ph-stat-label">Rating</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="ph-right">
                        <section className="ph-card">
                            <div className="ph-card-title">Calendar View</div>
                            <div className="ph-calendar-mini">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
                                    <span>MARCH 2026</span>
                                    <div style={{ display: 'flex', gap: '10px' }}><span>⟨</span><span>⟩</span></div>
                                </div>
                                <div className="ph-cal-grid">
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <div key={i} className={`ph-cal-day ${[15, 18, 22].includes(i + 1) ? 'has-shoot' : ''}`}>{i + 1}</div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="ph-card">
                            <div className="ph-card-title">Recent Activity</div>
                            <div className="ph-activity-list">
                                <div className="ph-activity-item">
                                    <div className="activity-dot green" />
                                    <div><p>Payment received from <b>Priya S.</b></p><p className="activity-time">2 hours ago</p></div>
                                </div>
                                <div className="ph-activity-item">
                                    <div className="activity-dot gold" />
                                    <div><p>New booking request for <b>Product Shoot</b></p><p className="activity-time">5 hours ago</p></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PhotographerDashboard;
