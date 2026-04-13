import React, { useRef, useState } from 'react';
import './DashboardComponents.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { PACKAGES } from '../../../data/mockData';

const HomeDashboard = ({ user, bookings, onNavigate }) => {
    const scrollRef = useRef(null);
    const [focusedId, setFocusedId] = useState('wedding');

    const stats = [
        { label: "Bookings", count: bookings.length },
        { label: "Upcoming", count: bookings.filter(b => b.status === 'accepted' || b.status === 'confirmed').length },
        { label: "Messages", count: 0 }
    ];

    const scrollCarousel = (dir) => {
        if (!scrollRef.current) return;
        const width = 300;
        scrollRef.current.scrollBy({ left: dir === 'next' ? width : -width, behavior: 'smooth' });
    };

    return (
        <div className="ub-home-dashboard">
            {/* Header Area */}
            <div className="ub-welcome-banner">
                <span className="ub-eyebrow">Welcome back, {user?.name || 'Client'}</span>
                <h1 className="ub-hero-title">Elevate your moments with exceptional photography</h1>
                <p className="ub-hero-subtitle">You have {stats[1].count} upcoming sessions scheduled.</p>
                <div className="ub-home-stats-mini">
                    {stats.map(s => (
                        <div key={s.label} className="ub-h-stat">
                            <span className="h-stat-val">{s.count}</span>
                            <span className="h-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
                <button className="ub-btn-primary" style={{ marginTop: '20px' }} onClick={() => onNavigate('browse')}>
                    Book Photographer
                </button>
            </div>


            {/* Why Choose Us Section */}
            <section className="ub-why-us-section">
                <div className="ub-section-intro">
                    <h2 className="ub-why-us-title">Why Choose Us</h2>
                    <p className="ub-why-us-subtitle">Where excellence meets experience</p>
                </div>
                
                <div className="ub-features-grid">
                    <div className="ub-feature-card">
                        <div className="ub-feature-icon">✦</div>
                        <h3>Curated Talent</h3>
                        <p>Only the finest photographers, selected for their unique style and quality</p>
                    </div>
                    <div className="ub-feature-card">
                        <div className="ub-feature-icon">❈</div>
                        <h3>Exceptional Craftsmanship</h3>
                        <p>Every shot is thoughtfully captured to reflect timeless beauty</p>
                    </div>
                    <div className="ub-feature-card">
                        <div className="ub-feature-icon">❖</div>
                        <h3>Effortless Experience</h3>
                        <p>From discovery to booking, everything is designed for simplicity</p>
                    </div>
                    <div className="ub-feature-card">
                        <div className="ub-feature-icon">❦</div>
                        <h3>Proven Trust</h3>
                        <p>A growing community of happy clients who value quality</p>
                    </div>
                </div>
            </section>
            <section className="ub-packages-section">
                <h2 className="ub-packages-title">CURATED EXPERIENCES</h2>
                <span className="ub-packages-subtitle">Handpicked collections for every milestone</span>
                
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
                                <img src={pkg.img} alt={pkg.label} loading="lazy" />
                                <div className="ub-package-info">
                                    <span className="ub-package-tag">Session</span>
                                    <span className="ub-package-label">{pkg.label}</span>
                                    <button className="ub-package-cta" onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate('browse');
                                    }}>
                                        EXPLORE
                                    </button>
                                </div>
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
