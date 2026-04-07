import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

// Importing all the sections (scaffolded)
import HomeDashboard from './components/HomeDashboard';
import BrowsePhotographers from './components/BrowsePhotographers';
import PhotographerDetails from './components/PhotographerDetails';
import BookingFlow from './components/BookingFlow';
import MyBookings from './components/MyBookings';
import BookingDetails from './components/BookingDetails';
import Favorites from './components/Favorites';
import Messages from './components/Messages';
import Reviews from './components/Reviews';
import Payments from './components/Payments';
import Profile from './components/Profile';
import Settings from './components/Settings';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedPhotographer, setSelectedPhotographer] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <HomeDashboard onNavigate={setActiveTab} />;
            case 'browse': return <BrowsePhotographers onSelectPhotographer={(pg) => { setSelectedPhotographer(pg); setActiveTab('photographer_details'); }} />;
            case 'photographer_details': return <PhotographerDetails photographer={selectedPhotographer} onBook={() => setActiveTab('booking_flow')} onBack={() => setActiveTab('browse')} />;
            case 'booking_flow': return <BookingFlow photographer={selectedPhotographer} onComplete={() => setActiveTab('bookings')} onBack={() => setActiveTab('photographer_details')} />;
            case 'bookings': return <MyBookings onSelectBooking={(b) => { setSelectedBooking(b); setActiveTab('booking_details'); }} />;
            case 'booking_details': return <BookingDetails booking={selectedBooking} onBack={() => setActiveTab('bookings')} />;
            case 'messages': return <Messages />;
            case 'favorites': return <Favorites onSelectPhotographer={(pg) => { setSelectedPhotographer(pg); setActiveTab('photographer_details'); }} />;
            case 'payments': return <Payments />;
            case 'reviews': return <Reviews />;
            case 'profile': return <Profile />;
            case 'settings': return <Settings onLogout={() => navigate('/')} />;
            default: return <HomeDashboard onNavigate={setActiveTab} />;
        }
    };

    const navLinks = [
        { id: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
        { id: 'browse', label: 'Photographers', icon: <SearchOutlinedIcon /> },
        { id: 'bookings', label: 'Bookings', icon: <CalendarTodayOutlinedIcon /> },
        { id: 'messages', label: 'Messages', icon: <ChatBubbleOutlineOutlinedIcon /> },
        { id: 'profile', label: 'Profile', icon: <PersonOutlineOutlinedIcon /> },
    ];

    return (
        <div className="ub-dashboard-root">
            {/* Branding Header */}
            <header className="ub-branding-header">
                <h1 className="ub-brand-title">LENSORIA</h1>
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
