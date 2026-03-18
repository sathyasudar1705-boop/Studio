import React, { useRef, useState } from 'react';
import './DashboardComponents.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PACKAGES = [
    { id: 'baby', label: 'Baby Shoot', img: 'https://images.pexels.com/photos/325690/pexels-photo-325690.jpeg' },
    { id: 'travel', label: 'Travel Shoot', img: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg' },
    { id: 'wedding', label: 'Wedding & Elopements', img: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg' },
    { id: 'product', label: 'Product Shoot', img: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg' },
    { id: 'birthday', label: 'Birthday Shoot', img: 'https://images.pexels.com/photos/1543762/pexels-photo-1543762.jpeg' },
];

const HomeDashboard = ({ onNavigate }) => {
    const scrollRef = useRef(null);
    const [focusedId, setFocusedId] = useState('wedding');

    const scrollCarousel = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'next' ? 300 : -300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="ub-home-dashboard">
            {/* Header Area */}
            <div className="ub-welcome-banner">
                <span className="ub-eyebrow">Welcome back, Aura</span>
                <h1 className="ub-hero-title">Elevate your moments with exceptional photography</h1>
                <p className="ub-hero-subtitle">Seamless booking. Timeless memories.</p>
                <button className="ub-btn-primary" onClick={() => onNavigate('browse')}>
                    Book Photographer
                </button>
            </div>

            {/* Stats Area */}
            <div className="ub-stats-grid">
                <div className="ub-stat-card">
                    <h3>12</h3>
                    <p>Total Bookings</p>
                </div>
                <div className="ub-stat-card">
                    <h3>3</h3>
                    <p>Upcoming Sessions</p>
                </div>
                <div className="ub-stat-card">
                    <h3>7</h3>
                    <p>Saved Creatives</p>
                </div>
                <div className="ub-stat-card">
                    <h3>24</h3>
                    <p>Gallery Deliveries</p>
                </div>
            </div>

            {/* Packages / Categories Section */}
            <section className="ub-packages-section">
                <h2 className="ub-packages-title">PACKAGES</h2>
                
                <div className="ub-carousel-wrapper">
                    <button className="ub-carousel-btn prev" onClick={() => scrollCarousel('prev')}>
                        <ChevronLeftIcon />
                    </button>

                    <div className="ub-packages-carousel" ref={scrollRef}>
                        {PACKAGES.map((pkg) => (
                            <div 
                                key={pkg.id} 
                                className={`ub-package-card ${focusedId === pkg.id ? 'focus' : ''}`}
                                onClick={() => setFocusedId(pkg.id)}
                            >
                                <img src={pkg.img} alt={pkg.label} />
                                <span className="ub-package-label">{pkg.label}</span>
                                <button className="ub-package-cta" onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate('browse');
                                }}>
                                    GET THE DETAILS
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="ub-carousel-btn next" onClick={() => scrollCarousel('next')}>
                        <ChevronRightIcon />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomeDashboard;
