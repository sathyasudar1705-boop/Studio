import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PACKAGES = [
    { id: "basic", name: "Essential", price: "₹8,000", features: ["2 Hours Session", "15 Edited Photos", "Single Outfit", "Studio Location"] },
    { id: "premium", name: "Elite", price: "₹18,000", features: ["4 Hours Session", "40 Edited Photos", "3 Outfit Changes", "Outdoor/Studio", "Makeup Artist Included"] },
    { id: "deluxe", name: "Grand Solo", price: "₹35,000", features: ["Full Day Session", "80 Edited Photos", "Unlimited Outfits", "Multiple Locations", "Cinematic Reel", "Luxury Photo Album"] }
];

const BOOKED_DATES = [5, 12, 18, 24];
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

const Booking = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const isStepValid = () => {
        if (step === 1) return selectedDate && selectedSlot;
        if (step === 2) return selectedPackage;
        return true;
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="calendar-card fadeIn">
                        <div className="calendar-top">
                            <ArrowBackIosIcon style={{ fontSize: 16, opacity: 0.5 }} />
                            <h3>MARCH 2026</h3>
                            <ArrowForwardIosIcon style={{ fontSize: 16 }} />
                        </div>
                        <div className="calendar-grid">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(h => <div key={h} className="day-header">{h}</div>)}
                            {DAYS.map(d => (
                                <div key={d} className={`day-cell ${BOOKED_DATES.includes(d) ? 'disabled' : ''} ${selectedDate === d ? 'selected' : ''}`}
                                    onClick={() => !BOOKED_DATES.includes(d) && setSelectedDate(d)}>{d}</div>
                            ))}
                        </div>
                        <div className="slot-select">
                            {['Morning', 'Evening'].map(slot => (
                                <button key={slot} className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`} onClick={() => setSelectedSlot(slot)}>
                                    {slot === 'Morning' ? 'Morning (09:00 AM - 01:00 PM)' : 'Evening (02:00 PM - 06:00 PM)'}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="packages-grid fadeIn">
                        {PACKAGES.map(p => (
                            <div key={p.id} className={`package-card ${selectedPackage?.id === p.id ? 'selected' : ''}`} onClick={() => setSelectedPackage(p)}>
                                <h3>{p.name}</h3><p className="package-price">{p.price}</p>
                                <ul className="package-features">{p.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div className="step-content fadeIn" style={{ textAlign: 'center', padding: '40px' }}>
                        <CheckCircleIcon style={{ fontSize: 80, color: '#d4af37', marginBottom: '20px' }} />
                        <h2>Almost There!</h2><p>Review your session details and confirm booking.</p>
                        <div className="confirmation-box">
                            <div><label>Service</label><p style={{ color: '#d4af37' }}>Wedding Shoot</p></div>
                            <div><label>Date & Time</label><p>March {selectedDate}, 2026 • {selectedSlot}</p></div>
                            <div><label>Package</label><p>{selectedPackage?.name} ({selectedPackage?.price})</p></div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="booking-root">
            <div className="booking-container">
                <div className="booking-header">
                    <h1 className="booking-title">Reserve Your Session</h1>
                    <div className="booking-step-indicator">
                        {['Date & Time', 'Package', 'Confirm'].map((label, i) => (
                            <div key={i} className={`step-dot ${step >= i + 1 ? 'active' : ''}`}><span className="step-num">{i + 1}</span> {label}</div>
                        ))}
                    </div>
                </div>

                <div className="step-content">{renderStep()}</div>

                <div className="booking-summary-bar">
                    <div className="summary-info">
                        <div className="summary-item"><label>Date</label><span>{selectedDate ? `March ${selectedDate}` : '-'}</span></div>
                        <div className="summary-item"><label>Package</label><span>{selectedPackage?.name || '-'}</span></div>
                        <div className="summary-item"><label>Total Price</label><span>{selectedPackage?.price || '₹0'}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="secondary-cta" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>{step === 1 ? 'Cancel' : 'Back'}</button>
                        <button className="next-btn" disabled={!isStepValid()} onClick={step === 3 ? () => navigate("/user-dashboard") : () => setStep(step + 1)}>
                            {step === 3 ? 'Confirm Booking' : 'Next Step'}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .confirmation-box { background: #151515; padding: 30px; borderRadius: 12px; display: inline-block; minWidth: 350px; textAlign: left; border: 1px solid rgba(212, 175, 55, 0.1); margin-top: 20px; }
                .confirmation-box div { margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; }
                .confirmation-box label { fontSize: 11px; textTransform: uppercase; opacity: 0.5; }
                .confirmation-box p { fontSize: 18px; margin: 5px 0 0; }
            `}</style>
        </div>
    );
};

export default Booking;
