import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./PhotographerDashboard.css";

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PhotographerDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [photographer, setPhotographer] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadDashboardData = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                navigate("/photographer-login");
                return;
            }
            
            const profRes = await API.get("/photographers/profile");
            setPhotographer(profRes.data);

            const response = await API.get(`/bookings/photographer/${profRes.data._id}`);
            setBookings(response.data);
        } catch (err) {
            console.error("Dashboard load error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, [navigate]);

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await API.post("/photographers/upload-image", formData);
            alert("Image uploaded successfully to Cloudinary!");
            return res.data.imageUrl;
        } catch (err) {
            console.error("FULL UPLOAD ERROR:", err);
            alert("Upload failed: " + (err.response?.data?.message || err.message));
            return null;
        }
    };

    const navLinks = [
        { id: "dashboard", label: "Dashboard" },
        { id: "portfolio", label: "Portfolio" },
        { id: "calendar", label: "Availability" },
        { id: "messages", label: "Messages" },
        { id: "packages", label: "Packages" },
        { id: "profile", label: "Profile & Settings" },
    ];

    const renderContent = () => {
        if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading dashboard data...</div>;

        switch (activeTab) {
            case "dashboard": return <DashboardView photographer={photographer} bookings={bookings} refreshProfile={loadDashboardData} />;
            case "portfolio": return <PortfolioView photographer={photographer} onUpload={handleFileUpload} refreshProfile={loadDashboardData} />;
            case "calendar": return <AvailabilityView photographer={photographer} refreshProfile={loadDashboardData} />;
            case "messages": return <MessagesView />;
            case "packages": return <PackagesView photographer={photographer} refreshProfile={loadDashboardData} />;
            case "profile": return <ProfileSettingsView photographer={photographer} onLogout={() => { localStorage.clear(); navigate("/"); }} onUpload={handleFileUpload} refreshProfile={loadDashboardData} />;
            default: return <DashboardView photographer={photographer} bookings={bookings} />;
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
            <nav className="ph-top-nav">
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
                    <div className="ph-nav-link logout" onClick={() => { localStorage.clear(); navigate("/"); }}>Logout</div>
                </div>
            </nav>

            <main className="ph-main">
                {renderContent()}
            </main>
        </div>
    );
};

// ── Views ──

const DashboardView = ({ photographer, bookings, refreshProfile }) => {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const stats = [
        { label: "Active Jobs", val: bookings.filter(b => b.status === 'accepted').length, trend: "+12%", isUp: true },
        { label: "New Requests", val: bookings.filter(b => b.status === 'pending').length, trend: "+5%", isUp: true },
        { label: "Profile Views", val: "1.2k", trend: "+18%", isUp: true },
        { label: "Total Earnings", val: `₹${bookings.filter(b => b.status === 'completed').reduce((acc, b) => acc + (b.amount || 0), 0).toLocaleString()}`, trend: "+10%", isUp: true },
    ];

    const handleBookingAction = async (id, status) => {
        try {
            await API.put(`/bookings/${id}/status`, { status });
            refreshProfile();
            if (selectedBooking && selectedBooking._id === id) {
                setSelectedBooking(prev => ({ ...prev, status }));
            }
            alert(`Booking ${status}!`);
        } catch (err) {
            alert("Failed to update booking");
        }
    };

    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <div>
                    <h2 className="ph-page-title">Welcome back, {photographer?.name}</h2>
                    <p className="ph-page-subtitle">Here's a snapshot of your studio's performance.</p>
                </div>
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
                                {s.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ph-row-middle">
                <div className="ph-content-card">
                    <div className="card-header"><h3>Recent Activity</h3></div>
                    <div className="activity-list">
                        {bookings.length > 0 ? bookings.slice(0, 8).map((b, i) => (
                            <div key={i} className="activity-item">
                                <div className="notif-content">
                                    <p>Shoot request on <strong>{new Date(b.bookingDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</strong></p>
                                    <span className="notif-time">{b.customerName || b.userId?.name || "New Client"} • {b.notes?.split('.')[0] || "Custom Package"}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <button 
                                        className="ph-view-details-btn" 
                                        onClick={() => setSelectedBooking(b)}
                                    >
                                        View Details
                                    </button>
                                    
                                    {b.status === 'pending' ? (
                                        <div className="booking-actions">
                                            <button className="bk-btn accept" onClick={() => handleBookingAction(b._id, 'accepted')} title="Accept Request">
                                                <CheckIcon fontSize="inherit" />
                                            </button>
                                            <button className="bk-btn reject" onClick={() => handleBookingAction(b._id, 'rejected')} title="Reject Request">
                                                <CloseIcon fontSize="inherit" />
                                            </button>
                                        </div>
                                    ) : (
                                        <select 
                                            className={`status-select-minimal ${b.status}`}
                                            value={b.status}
                                            onChange={(e) => handleBookingAction(b._id, e.target.value)}
                                        >
                                            <option value="accepted">Accepted</option>
                                            <option value="editing">Editing</option>
                                            <option value="framing">Framing</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        )) : <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No recent bookings yet.</p>}
                    </div>
                </div>
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="ph-modal-overlay" onClick={() => setSelectedBooking(null)}>
                    <div className="ph-details-modal" onClick={e => e.stopPropagation()}>
                        <button className="ph-close-modal" onClick={() => setSelectedBooking(null)}><CloseIcon /></button>
                        
                        <div className="ph-modal-header">
                            <span className="ph-tag">Booking Request</span>
                            <h2>{selectedBooking.customerName || selectedBooking.userId?.name}</h2>
                            <p>{new Date(selectedBooking.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <div className="ph-modal-body">
                            <div className="ph-info-section">
                                <h3>Contact Information</h3>
                                <div className="ph-info-row">
                                    <PersonOutlineOutlinedIcon className="ph-info-icon" />
                                    <span>{selectedBooking.customerName || selectedBooking.userId?.name || 'N/A'}</span>
                                </div>
                                <div className="ph-info-row">
                                    <ChatBubbleOutlineOutlinedIcon className="ph-info-icon" />
                                    <span>{selectedBooking.customerPhone || 'No phone provided'}</span>
                                </div>
                                <div className="ph-info-row">
                                    <NotificationsNoneOutlinedIcon className="ph-info-icon" />
                                    <span>{selectedBooking.userId?.email || 'Check user profile'}</span>
                                </div>
                            </div>

                            <div className="ph-info-section">
                                <h3>Shoot Details</h3>
                                <div className="ph-info-row">
                                    <DashboardOutlinedIcon className="ph-info-icon" />
                                    <span>{selectedBooking.location || 'Location not specified'}</span>
                                </div>
                                <div className="ph-info-row">
                                    <CalendarMonthOutlinedIcon className="ph-info-icon" />
                                    <span>Session Date: {new Date(selectedBooking.bookingDate).toLocaleDateString()}</span>
                                </div>
                                <div className="ph-info-row">
                                    <TrendingUpIcon className="ph-info-icon" />
                                    <span>Total Value: ₹{selectedBooking.amount?.toLocaleString()}</span>
                                </div>
                            </div>

                            {selectedBooking.requirements && (
                                <div className="ph-info-section full">
                                    <h3>Specific Requirements</h3>
                                    <div className="ph-requirements-box">
                                        {selectedBooking.requirements}
                                    </div>
                                </div>
                            )}

                            <div className="ph-info-section full">
                                <h3>Notes / Package Info</h3>
                                <p className="ph-notes-text">{selectedBooking.notes}</p>
                            </div>
                        </div>

                        <div className="ph-modal-footer">
                            <div className="ph-current-status">
                                Current Status: <span className={`status-tag ${selectedBooking.status}`}>{selectedBooking.status}</span>
                            </div>
                            {selectedBooking.status === 'pending' && (
                                <div className="ph-footer-actions">
                                    <button className="ph-btn-reject-large" onClick={() => { handleBookingAction(selectedBooking._id, 'rejected'); setSelectedBooking(null); }}>Reject Offer</button>
                                    <button className="ph-btn-accept-large" onClick={() => { handleBookingAction(selectedBooking._id, 'accepted'); setSelectedBooking(null); }}>Accept Session</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PortfolioView = ({ photographer, onUpload, refreshProfile }) => {
    const [images, setImages] = useState(photographer?.portfolio || []);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef();

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const url = await onUpload(file);
        if (url) {
            setImages(prev => [...prev, url]);
            refreshProfile();
        }
        setUploading(false);
    };

    const removeImg = async (idx) => {
        const updated = images.filter((_, i) => i !== idx);
        await API.put("/photographers/profile", { portfolio: updated });
        setImages(updated);
        refreshProfile();
    };

    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Portfolio Showcase</h2>
                <button className="ph-save-btn" onClick={() => fileRef.current.click()}>
                    {uploading ? "Uploading..." : "Add New Work"}
                </button>
                <input type="file" ref={fileRef} hidden onChange={handleUpload} accept="image/*" />
            </div>
            <div className="ph-portfolio-grid">
                {images.map((img, i) => (
                    <div key={i} className="ph-portfolio-item">
                        <img src={img} alt="" />
                        <div className="ph-portfolio-overlay" onClick={() => removeImg(i)}><DeleteOutlineIcon style={{ color: 'white' }} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const QUICK_TEMPLATES = [
    { title: "Essential Starter", duration: "2 Hours", deliverables: "15 Edited Photos", price: 8000, features: "Single Outfit, Digital Gallery, Studio/Outdoor" },
    { title: "Elite Professional", duration: "4 Hours", deliverables: "40 Edited Photos", price: 18000, features: "3 Outfit Changes, High-End Retouching, Print Credit" },
    { title: "Grand Premiere", duration: "Full Day", deliverables: "Unlimited Photos (80+ Edited)", price: 35000, features: "Cinematic Reel, Luxury Photo Album, Multi-location" }
];

const PackagesView = ({ photographer, refreshProfile }) => {
    const [pkgs, setPkgs] = useState(photographer?.packages || []);
    const [isAdding, setIsAdding] = useState(false);
    const [newPkg, setNewPkg] = useState({ title: "", price: "", duration: "", deliverables: "", features: "" });
    const [activeMenu, setActiveMenu] = useState(null);

    // Close menu when clicking elsewhere
    useEffect(() => {
        const close = () => setActiveMenu(null);
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, []);

    // Sync local state when photographer prop updates
    useEffect(() => {
        setPkgs(photographer?.packages || []);
    }, [photographer]);

    const handleAdd = async () => {
        if (!newPkg.title || !newPkg.price) {
            alert("Please fill in title and price");
            return;
        }
        
        // Always use the latest packages from the prop to prevent overwriting
        const currentPackages = photographer?.packages || [];
        const updated = [...currentPackages, { 
            title: newPkg.title, 
            price: Number(newPkg.price), 
            duration: newPkg.duration,
            deliverables: newPkg.deliverables,
            features: newPkg.features.split(',').map(f => f.trim()).filter(f => f)
        }];

        try {
            await API.put("/photographers/profile", { packages: updated });
            setIsAdding(false);
            setNewPkg({ title: "", price: "", duration: "", deliverables: "", features: "" });
            refreshProfile();
            alert("Package added successfully!");
        } catch (err) {
            alert("Failed to add package: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (index) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        
        const currentPackages = photographer?.packages || [];
        const updated = currentPackages.filter((_, i) => i !== index);
        
        try {
            await API.put("/photographers/profile", { packages: updated });
            refreshProfile();
            alert("Package deleted!");
        } catch (err) {
            alert("Failed to delete package");
        }
    };

    return (
        <div className="ph-view-container fadeIn">
            <div className="ph-page-header">
                <h2 className="ph-page-title">Service Packages</h2>
                <button className="ph-save-btn" onClick={() => setIsAdding(!isAdding)}>{isAdding ? "Cancel" : "Add Package"}</button>
            </div>
            {isAdding && (
                <div className="ph-content-card" style={{ marginBottom: '20px' }}>
                    <div className="pkg-template-row">
                        <span>Quick Templates:</span>
                        {QUICK_TEMPLATES.map((tpl, idx) => (
                            <button key={idx} className="pkg-tpl-chip" onClick={() => setNewPkg({...tpl, price: tpl.price.toString()})}>
                                {tpl.title.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                        <input className="ph-input" placeholder="Package Title" value={newPkg.title} onChange={e => setNewPkg({...newPkg, title: e.target.value})} />
                        <input className="ph-input" placeholder="Price (₹)" type="number" value={newPkg.price} onChange={e => setNewPkg({...newPkg, price: e.target.value})} />
                        <input className="ph-input" placeholder="Duration (e.g., 4 Hours)" value={newPkg.duration} onChange={e => setNewPkg({...newPkg, duration: e.target.value})} />
                        <input className="ph-input" placeholder="Deliverables (e.g., 50 Photos)" value={newPkg.deliverables} onChange={e => setNewPkg({...newPkg, deliverables: e.target.value})} />
                        <input className="ph-input" placeholder="Features (Comma separated)" value={newPkg.features} onChange={e => setNewPkg({...newPkg, features: e.target.value})} style={{ gridColumn: '1/-1' }} />
                    </div>
                    <button className="ph-save-btn" style={{ marginTop: '15px' }} onClick={handleAdd}>Confirm & Add</button>
                </div>
            )}
            <div className="packages-full-grid">
                {pkgs.map((p, i) => (
                    <div key={i} className="package-full-card">
                        <div className="pkg-card-actions" onClick={e => e.stopPropagation()}>
                            <button className="pkg-more-btn" onClick={() => setActiveMenu(activeMenu === i ? null : i)}>
                                <MoreVertIcon fontSize="small" />
                            </button>
                            {activeMenu === i && (
                                <div className="pkg-dropdown">
                                    <div className="pkg-dropdown-item delete" onClick={() => handleDelete(i)}>
                                        <DeleteOutlineIcon fontSize="inherit" /> Delete Package
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="pkg-badge-info">{p.duration || "Standard"} • {p.deliverables || "High Quality"}</div>
                        <h3>{p.title}</h3>
                        <div className="pkg-full-price">₹{p.price?.toLocaleString()}</div>
                        <ul>{p.features?.map((f, fi) => <li key={fi}>{f}</li>)}</ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileSettingsView = ({ photographer, onLogout, onUpload, refreshProfile }) => {
    const [formData, setFormData] = useState({
        name: photographer?.name || "",
        phone: photographer?.phone || "",
        category: photographer?.category || "Wedding",
        bio: photographer?.bio || "",
        price: photographer?.price || 0,
        experience_years: photographer?.experience_years || 0,
        city: photographer?.city || "",
        state: photographer?.state || "",
        camera_model: photographer?.camera_model?.join(', ') || "",
        social_links: {
            instagram: photographer?.social_links?.instagram || "",
            website: photographer?.social_links?.website || ""
        },
        profile_pic: photographer?.profile_pic || photographer?.img || ""
    });

    // Sync local state when photographer prop updates (e.g., after DB load)
    useEffect(() => {
        if (photographer) {
            setFormData({
                name: photographer.name || "",
                phone: photographer.phone || "",
                category: photographer.category || "Wedding",
                bio: photographer.bio || "",
                price: photographer.price || 0,
                experience_years: photographer.experience_years || 0,
                city: photographer.city || "",
                state: photographer.state || "",
                camera_model: photographer.camera_model?.join(', ') || "",
                social_links: {
                    instagram: photographer.social_links?.instagram || "",
                    website: photographer.social_links?.website || ""
                },
                profile_pic: photographer.profile_pic || photographer.img || ""
            });
        }
    }, [photographer]);

    const [saving, setSaving] = useState(false);
    const avatarInput = useRef();

    const updateAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await onUpload(file);
        if (url) {
            console.log("Updating Avatar with URL:", url);
            await API.put("/photographers/profile", { profile_pic: url });
            alert("Avatar updated and saved to Cloudinary!");
            refreshProfile();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = { 
                ...formData, 
                camera_model: formData.camera_model.split(',').map(m => m.trim()).filter(x => x)
            };
            await API.put("/photographers/profile", data);
            alert("Profile updated successfully in database!");
            refreshProfile();
            // Update local storage
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
            }
        } catch (err) {
            alert("Update failed: " + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="ph-view-container fadeIn">
             <div className="ph-row-middle" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
                <div className="ph-content-card">
                    <h3 className="card-title">Professional Profile Details</h3>
                    <form onSubmit={handleSave} style={{ marginTop: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="ph-input-field"><label className="ph-label">Display Name</label><input className="ph-input" name="name" value={formData.name} onChange={handleChange} /></div>
                            <div className="ph-input-field"><label className="ph-label">Phone Number</label><input className="ph-input" name="phone" value={formData.phone} onChange={handleChange} /></div>
                            
                            <div className="ph-input-field">
                                <label className="ph-label">Specialty</label>
                                <select className="ph-input" name="category" value={formData.category} onChange={handleChange}>
                                    <option>Wedding</option>
                                    <option>Portrait</option>
                                    <option>Fashion</option>
                                    <option>Commercial</option>
                                    <option>Event</option>
                                </select>
                            </div>
                            
                            <div className="ph-input-field"><label className="ph-label">Starting Price (₹)</label><input className="ph-input" type="number" name="price" value={formData.price} onChange={handleChange} /></div>
                            
                            <div className="ph-input-field"><label className="ph-label">Experience (Years)</label><input className="ph-input" type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} /></div>
                            <div className="ph-input-field"><label className="ph-label">City</label><input className="ph-input" name="city" value={formData.city} onChange={handleChange} /></div>
                            <div className="ph-input-field"><label className="ph-label">Email (Read-only)</label><input className="ph-input" style={{ opacity: 0.6 }} value={photographer?.email} readOnly /></div>
                            <div className="ph-input-field"><label className="ph-label">Website</label><input className="ph-input" name="social_links.website" value={formData.social_links.website} onChange={handleChange} /></div>
                        </div>

                        <div className="ph-input-field" style={{ marginTop: '20px' }}><label className="ph-label">Instagram Profile URL</label><input className="ph-input" name="social_links.instagram" value={formData.social_links.instagram} onChange={handleChange} placeholder="https://instagram.com/yourprofile" /></div>
                        
                        <div className="ph-input-field" style={{ marginTop: '20px' }}><label className="ph-label">Camera Equipment & Models</label><input className="ph-input" name="camera_model" value={formData.camera_model} onChange={handleChange} placeholder="Sony A7IV, Canon EOS R5..." /></div>
                        <div className="ph-input-field" style={{ marginTop: '20px' }}><label className="ph-label">Studio Bio / Description</label><textarea className="ph-input" style={{ height: '100px', resize: 'none' }} name="bio" value={formData.bio} onChange={handleChange} /></div>
                        
                        <button type="submit" className="ph-save-btn" style={{ marginTop: '30px', width: '200px' }} disabled={saving}>
                            {saving ? "Saving to DB..." : "Update All Details"}
                        </button>
                    </form>
                </div>
                <div className="ph-content-card" style={{ textAlign: 'center' }}>
                    <div className="ph-avatar-large" onClick={() => avatarInput.current.click()}>
                        <img src={photographer?.profile_pic || "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"} alt="" />
                        <div className="avatar-edit-overlay"><CameraAltIcon fontSize="small" /></div>
                        <input type="file" ref={avatarInput} hidden onChange={updateAvatar} accept="image/*" />
                    </div>
                    <h3 style={{ marginBottom: '5px' }}>{photographer?.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>{photographer?.email}</p>
                    <div className="ph-section-divider" style={{ margin: '20px 0' }}></div>
                    <button className="ph-logout-btn" onClick={onLogout} style={{ width: '100%' }}>Logout Session</button>
                    
                    <div style={{ marginTop: '30px', textAlign: 'left' }}>
                        <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Quick Tips</h4>
                        <ul style={{ fontSize: '12px', paddingLeft: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            <li>Complete your bio to attract more clients.</li>
                            <li>List your high-end gear to show professionalism.</li>
                            <li>Upload at least 5 photos to your portfolio.</li>
                        </ul>
                    </div>
                </div>
             </div>
        </div>
    );
};

const AvailabilityView = ({ photographer, refreshProfile }) => {
    const blockedDates = photographer?.unavailable_dates || [];
    const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // Start at April 2026 for demo consistency
    const [syncing, setSyncing] = useState(false);

    // Dynamic Month Data
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const PADS = Array.from({ length: firstDayIndex }, (_, i) => i);

    const toggleDate = async (day) => {
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        let updated;
        if (blockedDates.includes(dateStr)) {
            updated = blockedDates.filter(d => d !== dateStr);
        } else {
            updated = [...blockedDates, dateStr];
        }

        setSyncing(true);
        try {
            await API.put("/photographers/profile", { unavailable_dates: updated });
            refreshProfile();
        } catch (err) {
            alert("Failed to update availability");
        } finally {
            setSyncing(false);
        }
    };

    const handleMonthChange = (offset) => {
        setViewDate(new Date(year, month + offset, 1));
    };

    return (
        <div className="ph-view-container fadeIn">
            <div className="planner-layout">
                <div className="planner-main">
                    <div className="ph-page-header">
                        <div>
                            <h2 className="ph-page-title">Studio Planner</h2>
                            <p className="ph-page-subtitle">Your photography schedule for {monthName} {year}</p>
                        </div>
                        <div className="ph-badge-status" style={{ background: syncing ? '#fff7ed' : '#f0fdf4', color: syncing ? '#ea580c' : '#16a34a' }}>
                            {syncing ? "Syncing Workspace..." : "Planner Active"}
                        </div>
                    </div>

                    <div className="ph-content-card planner-card">
                        <div className="ph-calendar-header">
                            <button className="cal-nav-btn" onClick={() => handleMonthChange(-1)}>
                                <ArrowBackIosIcon style={{ fontSize: 16 }} />
                            </button>
                            <h3>{monthName.toUpperCase()} {year}</h3>
                            <button className="cal-nav-btn" onClick={() => handleMonthChange(1)}>
                                <ArrowForwardIosIcon style={{ fontSize: 16 }} />
                            </button>
                        </div>
                        
                        <div className="ph-calendar-grid premium">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(h => (
                                <div key={h} className="ph-day-label">{h}</div>
                            ))}
                            {PADS.map(p => <div key={`pad-${p}`} className="ph-day-cell empty"></div>)}
                            {DAYS.map(d => {
                                const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
                                const isBlocked = blockedDates.includes(dateStr);
                                const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
                                return (
                                    <div 
                                        key={d} 
                                        className={`ph-day-cell premium ${isBlocked ? 'blocked' : 'available'} ${isToday ? 'today' : ''}`}
                                        onClick={() => !syncing && toggleDate(d)}
                                    >
                                        <span className="day-num">{d}</span>
                                        {isBlocked && <div className="day-indicator">Session</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="planner-sidebar">
                    <div className="ph-content-card sidebar-card">
                        <h3>Schedule Status</h3>
                        <div className="status-legend">
                            <div className="legend-item-v2">
                                <div className="swatch available"></div>
                                <div>
                                    <p className="l-title">Available</p>
                                    <p className="l-desc">Open for bookings</p>
                                </div>
                            </div>
                            <div className="legend-item-v2">
                                <div className="swatch booked"></div>
                                <div>
                                    <p className="l-title">Booked / Blocked</p>
                                    <p className="l-desc">Session scheduled or personal block</p>
                                </div>
                            </div>
                        </div>

                        <div className="planner-tip">
                            <TrendingUpIcon fontSize="small" />
                            <p>Tip: Weekends are currently seeing 3x more bookings. Keep your Sunday slots open!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const MessagesView = () => <div style={{ padding: '50px', textAlign: 'center' }}><h3>Messages Coming Soon</h3></div>;

export default PhotographerDashboard;
