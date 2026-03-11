import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const packages = [
    {
        id: "basic",
        name: "Essential",
        price: "₹8,000",
        features: ["2 Hours Session", "15 Edited Photos", "Single Outfit", "Studio Location"]
    },
    {
        id: "premium",
        name: "Elite",
        price: "₹18,000",
        features: ["4 Hours Session", "40 Edited Photos", "3 Outfit Changes", "Outdoor/Studio", "Makeup Artist Included"]
    },
    {
        id: "deluxe",
        name: "Grand Solo",
        price: "₹35,000",
        features: ["Full Day Session", "80 Edited Photos", "Unlimited Outfits", "Multiple Locations", "Cinematic Reel", "Luxury Photo Album"]
    }
];

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
    const bookedDates = [5, 12, 18, 24];

    const handleNext = () => step < 3 && setStep(step + 1);
    const handleBack = () => step > 1 ? setStep(step - 1) : navigate(-1);

    const isStepValid = () => {
        if (step === 1) return selectedDate && selectedSlot;
        if (step === 2) return selectedPackage;
        return true;
    };

    return (
        <div className="booking-root">
            <div className="booking-container">
                <div className="booking-header">
                    <h1 className="booking-title">Reserve Your Session</h1>
                    <div className="booking-step-indicator">
                        <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>
                            <span className="step-num">1</span> Date & Time
                        </div>
                        <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>
                            <span className="step-num">2</span> Package
                        </div>
                        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
                            <span className="step-num">3</span> Confirm
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="step-content fadeIn">
                        <div className="calendar-card">
                            <div className="calendar-top">
                                <ArrowBackIosIcon style={{ fontSize: 16, cursor: 'pointer', opacity: 0.5 }} />
                                <h3 className="month-name">MARCH 2026</h3>
                                <ArrowForwardIosIcon style={{ fontSize: 16, cursor: 'pointer' }} />
                            </div>
                            <div className="calendar-grid">
                                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(h => (
                                    <div key={h} className="day-header">{h}</div>
                                ))}
                                {daysInMonth.map(d => (
                                    <div
                                        key={d}
                                        className={`day-cell ${bookedDates.includes(d) ? 'disabled' : ''} ${selectedDate === d ? 'selected' : ''}`}
                                        onClick={() => !bookedDates.includes(d) && setSelectedDate(d)}
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>

                            <div className="slot-select">
                                <button
                                    className={`slot-btn ${selectedSlot === 'Morning' ? 'selected' : ''}`}
                                    onClick={() => setSelectedSlot('Morning')}
                                >
                                    Morning (09:00 AM - 01:00 PM)
                                </button>
                                <button
                                    className={`slot-btn ${selectedSlot === 'Evening' ? 'selected' : ''}`}
                                    onClick={() => setSelectedSlot('Evening')}
                                >
                                    Evening (02:00 PM - 06:00 PM)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-content fadeIn">
                        <div className="packages-grid">
                            {packages.map(p => (
                                <div
                                    key={p.id}
                                    className={`package-card ${selectedPackage?.id === p.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedPackage(p)}
                                >
                                    <h3 className="package-name">{p.name}</h3>
                                    <p className="package-price">{p.price}</p>
                                    <ul className="package-features">
                                        {p.features.map((f, i) => <li key={i}>{f}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-content fadeIn" style={{ textAlign: 'center', padding: '40px' }}>
                        <CheckCircleIcon style={{ fontSize: 80, color: '#d4af37', marginBottom: '20px' }} />
                        <h2 style={{ fontFamily: 'var(--font2)', fontSize: '32px', marginBottom: '10px' }}>Almost There!</h2>
                        <p style={{ color: '#bfbfbf', marginBottom: '40px' }}>Review your session details and confirm booking.</p>

                        <div style={{ background: '#151515', padding: '30px', borderRadius: '12px', display: 'inline-block', minWidth: '350px', textAlign: 'left', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
                            <div style={{ marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Service</label>
                                <p style={{ fontSize: '18px', color: '#d4af37' }}>Wedding Shoot</p>
                            </div>
                            <div style={{ marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Date & Time</label>
                                <p style={{ fontSize: '18px' }}>March {selectedDate}, 2026 • {selectedSlot}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.5 }}>Package</label>
                                <p style={{ fontSize: '18px' }}>{selectedPackage?.name} ({selectedPackage?.price})</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="booking-summary-bar">
                    <div className="summary-info">
                        <div className="summary-item">
                            <label>Date</label>
                            <span>{selectedDate ? `March ${selectedDate}` : '-'}</span>
                        </div>
                        <div className="summary-item">
                            <label>Package</label>
                            <span>{selectedPackage ? selectedPackage.name : '-'}</span>
                        </div>
                        <div className="summary-item">
                            <label>Total Price</label>
                            <span>{selectedPackage ? selectedPackage.price : '₹0'}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="secondary-cta" onClick={handleBack} style={{ border: 'none', background: 'rgba(255,255,255,0.05)', padding: '14px 25px', borderRadius: '4px', cursor: 'pointer' }}>
                            {step === 1 ? 'Cancel' : 'Back'}
                        </button>
                        <button
                            className="next-btn"
                            disabled={!isStepValid()}
                            onClick={step === 3 ? () => navigate("/user-dashboard") : handleNext}
                        >
                            {step === 3 ? 'Confirm Booking' : 'Next Step'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
