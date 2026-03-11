import React, { useState } from "react";
import "./PhotographerDashboard.css";
import DashboardIcon from "@mui/icons-material/GridView";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CollectionsIcon from "@mui/icons-material/Collections";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const upcomingShoots = [
    { id: 1, client: "Sarah Mitchell", service: "Wedding Shoot", date: "March 15, 2026", time: "09:00 AM", status: "CONFIRMED" },
    { id: 2, client: "John Doe", service: "Product Shoot", date: "March 18, 2026", time: "02:00 PM", status: "PENDING" },
    { id: 3, client: "Emily Chen", service: "Baby Shoot", date: "March 22, 2026", time: "10:30 AM", status: "CONFIRMED" },
];

const PhotographerDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
        { id: "shoots", label: "Upcoming Shoots", icon: <EventNoteIcon fontSize="small" /> },
        { id: "portfolio", label: "My Portfolio", icon: <CollectionsIcon fontSize="small" /> },
        { id: "availability", label: "Availability", icon: <EventAvailableIcon fontSize="small" /> },
        { id: "profile", label: "Profile", icon: <PersonIcon fontSize="small" /> },
    ];

    return (
        <div className="ph-dashboard-root">
            <aside className="ph-sidebar">
                <div className="ph-logo">LENSORIA</div>
                <nav className="ph-nav">
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`ph-nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="ph-nav-item logout" style={{ marginTop: 'auto', color: '#ff4d4d' }}>
                    <LogoutIcon fontSize="small" />
                    <span>Logout</span>
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
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#151515', padding: '6px 15px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#0b0b0b', fontWeight: 'bold', fontSize: '14px', paddingLeft: '7px' }}>A</div>
                            <span style={{ fontSize: '14px' }}>Alex Rivera</span>
                        </div>
                    </div>
                </header>

                <div className="ph-grid">
                    <div className="ph-left">
                        <section className="ph-card">
                            <div className="ph-card-title">
                                Upcoming Sessions
                                <span style={{ fontSize: '12px', color: '#d4af37', cursor: 'pointer' }}>View All</span>
                            </div>
                            <div className="upcoming-shoots-list">
                                {upcomingShoots.map(shoot => (
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
                            <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ fontFamily: 'var(--font2)', fontSize: '20px' }}>Quick Stats</h3>
                            </div>
                            <div style={{ display: 'flex', padding: '30px' }}>
                                <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h2 style={{ color: '#d4af37' }}>12</h2>
                                    <p style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Pending Edits</p>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h2 style={{ color: '#d4af37' }}>₹45k</h2>
                                    <p style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Monthly Earning</p>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <h2 style={{ color: '#d4af37' }}>4.9</h2>
                                    <p style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Rating</p>
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
                                    <div>
                                        <ArrowBackIosIcon style={{ fontSize: 12 }} /> <ArrowForwardIosIcon style={{ fontSize: 12 }} />
                                    </div>
                                </div>
                                <div className="ph-cal-grid">
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={`ph-cal-day ${[15, 18, 22].includes(i + 1) ? 'has-shoot' : ''}`}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="ph-card">
                            <div className="ph-card-title">Recent Activity</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ fontSize: '13px', display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginTop: '4px' }} />
                                    <div>
                                        <p>Payment received from <b>Priya S.</b></p>
                                        <p style={{ opacity: 0.4, fontSize: '11px' }}>2 hours ago</p>
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#d4af37', borderRadius: '50%', marginTop: '4px' }} />
                                    <div>
                                        <p>New booking request for <b>Product Shoot</b></p>
                                        <p style={{ opacity: 0.4, fontSize: '11px' }}>5 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ArrowBackIosIcon = ({ style }) => <span style={{ ...style, cursor: 'pointer' }}>⟨</span>;
const ArrowForwardIosIcon = ({ style }) => <span style={{ ...style, cursor: 'pointer' }}>⟩</span>;

export default PhotographerDashboard;
