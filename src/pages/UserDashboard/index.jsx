import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import './DashboardLayout.css';

// Importing all the sections (scaffolded)
import HomeDashboard from './components/HomeDashboard';
import BrowsePhotographers from './components/BrowsePhotographers';
import PhotographerDetails from './components/PhotographerDetails';
import BookingFlow from './components/BookingFlow';
import MyBookings from './components/MyBookings';
import BookingDetails from './components/BookingDetails';
import Favorites from './components/Favorites';
import Reviews from './components/Reviews';
import Payments from './components/Payments';
import Profile from './components/Profile';
import Settings from './components/Settings';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';


const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedPhotographer, setSelectedPhotographer] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUserData = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                navigate("/user-login");
                return;
            }
            const localData = JSON.parse(userStr);
            const userId = localData.id || localData._id;

            // Fetch fresh user data from server
            const userRes = await API.get(`/users/profile/${userId}`);
            const freshUser = userRes.data;
            
            setUser(freshUser);
            // Sync local storage with fresh data
            localStorage.setItem("user", JSON.stringify(freshUser));

            const bookRes = await API.get(`/bookings/user/${userId}`);
            setBookings(Array.isArray(bookRes.data) ? bookRes.data : []);
        } catch (err) {
            console.error("Dashboard load error:", err);
            // Fallback to local storage if API fails
            const userStr = localStorage.getItem("user");
            if (userStr) setUser(JSON.parse(userStr));
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        loadUserData();
    }, [navigate]);


    const renderContent = () => {
        if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Portal...</div>;

        switch (activeTab) {
            case 'home': return <HomeDashboard user={user} bookings={bookings} onNavigate={setActiveTab} />;
            case 'browse': return <BrowsePhotographers onSelectPhotographer={(pg) => { setSelectedPhotographer(pg); setActiveTab('photographer_details'); }} />;
            case 'photographer_details': 
                if (!selectedPhotographer) { setActiveTab('browse'); return null; }
                return <PhotographerDetails photographer={selectedPhotographer} onBook={(pkg) => { setSelectedPackage(pkg); setActiveTab('booking_flow'); }} onBack={() => setActiveTab('browse')} />;
            case 'booking_flow': return <BookingFlow photographer={selectedPhotographer} selectedPackage={selectedPackage} onComplete={() => { loadUserData(); setActiveTab('bookings'); setSelectedPackage(null); }} onBack={() => setActiveTab('photographer_details')} />;
            case 'bookings': return <MyBookings bookings={bookings} onSelectBooking={(b) => { setSelectedBooking(b); setActiveTab('booking_details'); }} />;
            case 'booking_details': return <BookingDetails booking={selectedBooking} onBack={() => setActiveTab('bookings')} />;
            case 'favorites': return <Favorites onSelectPhotographer={(pg) => { setSelectedPhotographer(pg); setActiveTab('photographer_details'); }} />;
            case 'payments': return <Payments />;
            case 'reviews': return <Reviews />;
            case 'profile': return <Profile user={user} onUpdate={loadUserData} />;
            case 'settings': return <Settings onLogout={() => { localStorage.clear(); navigate('/'); }} />;
            default: return <HomeDashboard user={user} bookings={bookings} onNavigate={setActiveTab} />;
        }
    };

    const navLinks = [
        { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
        { id: 'browse', label: 'Photographers', icon: <SearchOutlinedIcon /> },
        { id: 'bookings', label: 'Bookings', icon: <CalendarTodayOutlinedIcon /> },
        { id: 'profile', label: 'Profile', icon: <PersonOutlineOutlinedIcon /> },
    ];

    return (
        <div className="ub-dashboard-root">
            {/* Branding Header */}
            <header className="ub-branding-header">
                <div className="ub-header-left">
                    {/* Spacer to keep title centered */}
                </div>
                <h1 className="ub-brand-title">
                    <CenterFocusStrongIcon sx={{ fontSize: 24, verticalAlign: 'middle', marginRight: '10px', color: 'var(--accent)' }} />
                    LENSORIA
                </h1>
                <div className="ub-header-right">
                    <button className="ub-logout-btn" onClick={handleLogout}>
                        <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
                        <span>Logout</span>
                    </button>
                </div>
            </header>


            {/* Desktop Top Navigation */}
            <nav className="ub-top-nav">
                <div className="ub-nav-container">
                    <div className="ub-nav-links">
                        {navLinks.map(link => (
                            <span 
                                key={link.id} 
                                className={`ub-nav-item ${activeTab === link.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(link.id)}
                            >
                                {link.label}
                            </span>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="ub-main-content">
                <div className="ub-content-container">
                    {renderContent()}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="ub-bottom-nav">
                {navLinks.map(link => (
                    <div 
                        key={link.id} 
                        className={`ub-mobile-nav-item ${activeTab === link.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(link.id)}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default UserDashboard;
