import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PhotographerDashboard.css";

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const PhotographerDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();

    const navLinks = [
        { id: "dashboard", label: "Dashboard", icon: <DashboardOutlinedIcon fontSize="small" /> },
        { id: "calendar", label: "Availability", icon: <CalendarMonthOutlinedIcon fontSize="small" /> },
        { id: "messages", label: "Messages", icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" /> },
        { id: "packages", label: "Packages", icon: <CollectionsOutlinedIcon fontSize="small" /> },
        { id: "profile", label: "Profile & Settings", icon: <PersonOutlineOutlinedIcon fontSize="small" /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardView />;
            case "calendar":
                return <AvailabilityView />;
            case "messages":
                return <MessagesView />;
            case "packages":
                return <PackagesView />;
            case "profile":
                return <ProfileSettingsView onLogout={() => navigate("/")} />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="ph-dashboard-root">
            {/* Branding Header */}
            <header className="ph-branding-header">
                <div className="ph-brand-left">
                    <CameraAltIcon />
                    <h1 className="ph-brand-title">LENSORIA</h1>
                </div>
            </header>

            {/* Top Navigation */}
            <nav className="ph-top-nav" style={{ justifyContent: 'center' }}>
                <div className="ph-nav-links">
                    {navLinks.map((link) => (
                        <div
                            key={link.id}
                            className={`ph-nav-link ${activeTab === link.id ? "active" : ""}`}
                            onClick={() => setActiveTab(link.id)}
                        >
                            {link.label}
                        </div>
                    ))}
                    <div className="ph-nav-link logout" onClick={() => navigate("/")}>Logout</div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="ph-main">
                {renderContent()}
            </main>
        </div>
    );
};

// ── Dashboard View ──
const DashboardView = () => {
    const stats = [
        { label: "Total Revenue", val: "₹1,42,000", trend: "+12.5%", isUp: true },
        { label: "Active Sessions", val: "8", trend: "+2", isUp: true },
        { label: "New Messages", val: "5", trend: "-1", isUp: false },
        { label: "Profile Views", val: "1,240", trend: "+18%", isUp: true },
    ];

    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Welcome back, Evelyn</h2>
                <p className="ph-page-subtitle">Here's what's happening with your studio today.</p>
            </div>

            <div className="ph-stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="ph-stat-card">
                        <div className="stat-card-header">
                            <div className="stat-info">
                                <span>{s.label}</span>
                                <div className="stat-val">{s.val}</div>
                            </div>
                            <div className={`stat-trend ${s.isUp ? 'trend-up' : 'trend-down'}`}>
                                {s.isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                                {s.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ph-row-middle">
                <div className="ph-content-card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Earnings Overview</h3>
                            <span className="card-subtitle">Monthly performance report</span>
                        </div>
                        <MoreVertIcon fontSize="small" style={{ cursor: 'pointer', opacity: 0.5 }} />
                    </div>
                    <div className="chart-mockup">
                        {/* Simplified SVG Chart Mockup */}
                        <svg className="chart-svg" viewBox="0 0 400 200">
                            <path d="M0,180 Q50,150 100,160 T200,100 T300,120 T400,40" fill="none" stroke="var(--accent)" strokeWidth="3" />
                            <circle cx="100" cy="160" r="4" fill="var(--accent)" />
                            <circle cx="200" cy="100" r="4" fill="var(--accent)" />
                            <circle cx="300" cy="120" r="4" fill="var(--accent)" />
                        </svg>
                    </div>
                </div>

                <div className="ph-content-card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Notifications</h3>
                    </div>
                    <div className="notif-list">
                        {[
                            { msg: "New booking request from Aura Doe", time: "2 mins ago" },
                            { msg: "Payment for BK-8820 received", time: "1 hour ago" },
                            { msg: "Julian Cross left a 5-star review", time: "4 hours ago" },
                            { msg: "Reminder: Wedding shoot at 9 AM tomorrow", time: "1 day ago" },
                        ].map((n, i) => (
                            <div key={i} className="notif-item">
                                <div className="notif-icon-circle"><NotificationsNoneOutlinedIcon fontSize="small" /></div>
                                <div className="notif-content">
                                    <p>{n.msg}</p>
                                    <span className="notif-time">{n.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ph-table-wrapper">
                <div className="ph-content-card">
                    <div className="card-header">
                        <h3 className="card-title">Active Booking Requests</h3>
                    </div>
                    <table className="ph-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Category</th>
                                <th>Date & Time</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Aura Doe", cat: "Wedding", date: "Mar 24, 2026", time: "09:00 AM", val: "₹45,000" },
                                { name: "Mark Wilson", cat: "Portrait", date: "Mar 28, 2026", time: "11:00 AM", val: "₹12,000" },
                                { name: "Sarah J.", cat: "Commercial", date: "Apr 02, 2026", time: "02:00 PM", val: "₹30,000" },
                            ].map((r, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="client-cell">
                                            <img src={`https://i.pravatar.cc/150?u=${r.name}`} alt="" />
                                            <span>{r.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="type-pill">{r.cat}</span></td>
                                    <td>{r.date} at {r.time}</td>
                                    <td><b>{r.val}</b></td>
                                    <td>
                                        <div className="action-btns">
                                            <div className="btn-icon-action" style={{ color: '#10B981' }}><CheckIcon fontSize="small" /></div>
                                            <div className="btn-icon-action" style={{ color: '#EF4444' }}><CloseIcon fontSize="small" /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// ── Availability View ──
const AvailabilityView = () => {
    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Manage Availability</h2>
                <p className="ph-page-subtitle">Set your working days and schedule major events.</p>
            </div>
            <div className="ph-content-card">
                <div className="cal-header">
                    <h3>MARCH 2026</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div className="cal-nav-btn">‹</div>
                        <div className="cal-nav-btn">›</div>
                    </div>
                </div>
                <div className="cal-grid">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <div key={d} className="cal-day-header">{d}</div>
                    ))}
                    {[...Array(35)].map((_, i) => {
                        const dayNum = i - 2; // Offset for Mar 2026 starting on Sunday
                        const isValid = dayNum > 0 && dayNum <= 31;
                        return (
                            <div key={i} className={`cal-cell ${!isValid ? 'empty' : ''} ${dayNum === 24 ? 'today' : ''} ${[5, 12, 19].includes(dayNum) ? 'has-event' : ''}`}>
                                {isValid && (
                                    <>
                                        <span className="cal-day-num">{dayNum}</span>
                                        {[5, 12, 19].includes(dayNum) && <span className="cal-event-tag">Shoot Scheduled</span>}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ── Messages View ──
const MessagesView = () => {
    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Client Conversations</h2>
                <p className="ph-page-subtitle">Communicate with your clients directly.</p>
            </div>
            <div className="messages-layout">
                <div className="chat-list-panel">
                    <div className="chat-list-header">
                        <input type="text" placeholder="Search chats..." style={{ width: '100%', padding: '10px', background: 'var(--bg-alt)', border: '1px solid var(--border)' }} />
                    </div>
                    {[
                        { name: "Aura Doe", last: "I sent the advance payment.", time: "10m", unread: 2 },
                        { name: "Mark Wilson", last: "See you on the 28th!", time: "2h", unread: 0 },
                        { name: "Julian Cross", last: "Hi, let's discuss the edit style.", time: "1d", unread: 0 },
                    ].map((c, i) => (
                        <div key={i} className={`chat-list-item ${i === 0 ? 'active' : ''}`}>
                            <img src={`https://i.pravatar.cc/150?u=${c.name}`} alt="" className="chat-avatar" />
                            <div className="chat-list-info">
                                <div className="chat-list-top">
                                    <span className="chat-name">{c.name}</span>
                                    <span className="chat-time">{c.time}</span>
                                </div>
                                <div className="chat-list-top">
                                    <span className="chat-preview">{c.last}</span>
                                    {c.unread > 0 && <span className="chat-unread">{c.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-window-panel">
                    <div className="chat-window-header">
                        <img src="https://i.pravatar.cc/150?u=Aura" alt="" className="chat-avatar" />
                        <div>
                            <h4>Aura Doe</h4>
                            <span className="chat-online">Online</span>
                        </div>
                    </div>
                    <div className="chat-messages">
                        <div className="chat-bubble received">
                            Hello! I noticed your portfolio and would love to book a wedding session.
                            <span className="bubble-time">09:45 AM</span>
                        </div>
                        <div className="chat-bubble sent">
                            Hello Aura! I'd be honored to capture your special day. Which date are you looking at?
                            <span className="bubble-time">10:02 AM</span>
                        </div>
                        <div className="chat-bubble received">
                            March 24th, 2026. I just sent the advance payment through the portal.
                            <span className="bubble-time">10:15 AM</span>
                        </div>
                    </div>
                    <div className="chat-input-bar">
                        <input type="text" placeholder="Write a message..." />
                        <button className="send-btn"><SendIcon fontSize="small" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Packages View ──
const PackagesView = () => {
    const pkgs = [
        { title: "Standard Wedding", price: "₹45,000", desc: "8 Hours, 2 Photographers, 100 Retouched Images", popular: true },
        { title: "Personal Portrait", price: "₹12,000", desc: "2 Hours, 1 Photographer, 15 Retouched Images", popular: false },
        { title: "Luxury Elopement", price: "₹65,000", desc: "Full Day, Cinematic Video + Photo Elite", popular: false },
    ];

    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className="ph-page-title">Service Packages</h2>
                        <p className="ph-page-subtitle">Configure the offerings visible to your clients.</p>
                    </div>
                    <button className="btn-icon-action" style={{ width: 'auto', padding: '10px 25px', gap: '10px' }}>
                        <AddIcon fontSize="small" /> Add Package
                    </button>
                </div>
            </div>

            <div className="packages-full-grid">
                {pkgs.map((p, i) => (
                    <div key={i} className="package-full-card">
                        {p.popular && <div className="popular-badge">MOST BOOKED</div>}
                        <h4 className="pkg-full-title">{p.title}</h4>
                        <p className="pkg-full-details">{p.desc}</p>
                        <div className="pkg-full-price">{p.price}</div>
                        <div className="pkg-full-actions">
                            <button className="pkg-edit-btn"><EditOutlinedIcon fontSize="inherit" /> Edit</button>
                            <button className="pkg-delete-btn"><DeleteOutlineIcon fontSize="inherit" /> Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ── Combined Profile & Settings View ──
const ProfileSettingsView = ({ onLogout }) => {
    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Profile & Studio Settings</h2>
                <p className="ph-page-subtitle">Manage your professional presence and account security here.</p>
            </div>

            <div className="ph-row-middle" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
                <div className="ph-content-card">
                    <div className="card-header">
                        <h3 className="card-title">Professional Information</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '10px' }}>
                        <div className="ph-input-field">
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Studio Display Name</label>
                            <input type="text" style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px' }} defaultValue="Evelyn Harper Studio" />
                        </div>
                        <div className="ph-input-field">
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Primary Specialty</label>
                            <input type="text" style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px' }} defaultValue="Editorial Weddings" />
                        </div>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Professional Bio</label>
                        <textarea style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px', minHeight: '120px', lineHeight: '1.6' }} defaultValue="Specializing in editorial-style portraiture and luxury events, Evelyn brings over a decade of experience to capturing life's most precious moments. Every frame is treated as a fine art piece, meticulously composed and edited to ensure timeless elegance." />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '25px' }}>
                        <div className="ph-input-field">
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Email Address</label>
                            <input type="email" style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px' }} defaultValue="evelyn@lensoria.com" />
                        </div>
                        <div className="ph-input-field">
                            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                            <input type="tel" style={{ width: '100%', padding: '14px', border: '1px solid var(--border)', background: 'var(--bg-alt)', fontSize: '14px' }} defaultValue="+91 91234 56789" />
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <button className="ph-nav-link" style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '15px 40px', fontWeight: '600' }}>Save All Changes</button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="ph-content-card">
                        <h3 className="card-title">Gallery & Branding</h3>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--bg-alt)', margin: '0 auto 20px', overflow: 'hidden', border: '2px solid var(--border)', position: 'relative' }}>
                                <img src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg" alt="Evelyn" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <button className="btn-icon-action" style={{ width: 'auto', padding: '8px 20px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CameraAltIcon fontSize="small" /> Update Photo
                            </button>
                        </div>
                        <div style={{ marginTop: '30px' }}>
                            <label style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Portfolio Highlights</label>
                            <div className="portfolio-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="portfolio-img" style={{ aspectRatio: '1/1', background: 'var(--bg-alt)' }}>
                                        <img src={`https://images.pexels.com/photos/${1036622 + (i*10)}/pexels-photo-${1036622 + (i*10)}.jpeg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PhotographerDashboard;
