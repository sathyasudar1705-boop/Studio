import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import "./Booking.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PACKAGES = [
    { id: "basic", name: "Essential", price: 8000, priceDisplay: "₹8,000", features: ["2 Hours Session", "15 Edited Photos", "Single Outfit", "Studio Location"] },
    { id: "premium", name: "Elite", price: 18000, priceDisplay: "₹18,000", features: ["4 Hours Session", "40 Edited Photos", "3 Outfit Changes", "Outdoor/Studio", "Makeup Artist Included"] },
    { id: "deluxe", name: "Grand Solo", price: 35000, priceDisplay: "₹35,000", features: ["Full Day Session", "80 Edited Photos", "Unlimited Outfits", "Multiple Locations", "Cinematic Reel", "Luxury Photo Album"] }
];



const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get basic photographer info from navigation state
    const [photographer, setPhotographer] = useState(location.state?.photographer || { id: "default_id", name: "Professional Photographer" });
    const [availablePackages, setAvailablePackages] = useState(PACKAGES);
    const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // Default to April 2026 for consistency

    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Dynamic Month Calculation
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const PADS = Array.from({ length: firstDayIndex }, (_, i) => i);

    const getBlockedDayNumbers = () => {
        if (!photographer.unavailable_dates) return [];
        const prefix = `${year}-${(month + 1).toString().padStart(2, '0')}-`;
        return photographer.unavailable_dates
            .filter(d => d.startsWith(prefix))
            .map(d => parseInt(d.split('-')[2]));
    };

    const blockedDates = getBlockedDayNumbers();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const id = photographer._id || photographer.id;
                if (!id || id === "default_id") return;

                const res = await API.get("/photographers");
                const allPgs = Array.isArray(res.data) ? res.data : res.data.photographers || [];
                const current = allPgs.find(p => (p._id || p.id) === id);
                
                if (current) {
                    setPhotographer(current);
                    if (current.packages && current.packages.length > 0) {
                        const formatted = current.packages.map(p => ({
                            id: p._id || p.id || Math.random(),
                            name: p.title,
                            price: p.price,
                            priceDisplay: `₹${p.price.toLocaleString()}`,
                            duration: p.duration,
                            deliverables: p.deliverables,
                            features: p.features || []
                        }));
                        setAvailablePackages(formatted);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch photographer packages", err);
            }
        };
        fetchDetails();
    }, []);

    const isStepValid = () => {
        if (step === 1) return selectedDate && selectedSlot;
        if (step === 2) return selectedPackage;
        return true;
    };

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) {
                alert("Please log in to book a session.");
                navigate("/user-login");
                return;
            }
            const user = JSON.parse(userStr);
            
            const bookingData = {
                userId: user.id || user._id,
                photographerId: photographer.id || photographer._id,
                bookingDate: `${year}-${(month + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`,
                amount: selectedPackage.price,
                notes: `Package: ${selectedPackage.name}. Slot: ${selectedSlot}`,
                status: "pending"
            };

            await API.post("/bookings", bookingData);
            alert("Booking submitted successfully!");
            navigate("/user-dashboard");
        } catch (err) {
            console.error("Booking error:", err);
            alert(err.response?.data?.message || "Failed to create booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="calendar-card fadeIn">
                        <div className="calendar-top">
                            <ArrowBackIosIcon 
                                style={{ fontSize: 16, cursor: 'pointer' }} 
                                onClick={() => setViewDate(new Date(year, month - 1, 1))} 
                            />
                            <h3>{monthName.toUpperCase()} {year}</h3>
                            <ArrowForwardIosIcon 
                                style={{ fontSize: 16, cursor: 'pointer' }} 
                                onClick={() => setViewDate(new Date(year, month + 1, 1))} 
                            />
                        </div>
                        <div className="calendar-grid">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(h => <div key={h} className="day-header">{h}</div>)}
                            {PADS.map(p => <div key={`pad-${p}`} className="day-cell disabled" style={{ opacity: 0 }}></div>)}
                            {DAYS.map(d => (
                                <div key={d} className={`day-cell ${blockedDates.includes(d) ? 'disabled' : ''} ${selectedDate === d ? 'selected' : ''}`}
                                    onClick={() => !blockedDates.includes(d) && setSelectedDate(d)}>{d}</div>
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
                        {availablePackages.map(p => (
                            <div key={p.id} className={`package-card ${selectedPackage?.id === p.id ? 'selected' : ''}`} onClick={() => setSelectedPackage(p)}>
                                <div className="p-meta">{p.duration || "Standard"} • {p.deliverables || "High Quality"}</div>
                                <h3>{p.name}</h3><p className="package-price">{p.priceDisplay}</p>
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
                            <div><label>Photographer</label><p style={{ color: '#d4af37' }}>{photographer.name}</p></div>
                            <div><label>Date & Time</label><p>{monthName} {selectedDate}, {year} • {selectedSlot}</p></div>
                            <div><label>Package</label><p>{selectedPackage?.name} ({selectedPackage?.priceDisplay})</p></div>
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
                        <div className="summary-item"><label>Date</label><span>{selectedDate ? `${monthName.substring(0,3)} ${selectedDate}` : '-'}</span></div>
                        <div className="summary-item"><label>Package</label><span>{selectedPackage?.name || '-'}</span></div>
                        <div className="summary-item"><label>Total Price</label><span>{selectedPackage?.priceDisplay || '₹0'}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="secondary-cta" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>{step === 1 ? 'Cancel' : 'Back'}</button>
                        <button className="next-btn" disabled={!isStepValid() || loading} onClick={step === 3 ? handleConfirm : () => setStep(step + 1)}>
                            {loading ? 'Processing...' : step === 3 ? 'Confirm Booking' : 'Next Step'}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .p-meta { font-size: 10px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; opacity: 0.8; }
                .confirmation-box { background: #151515; padding: 30px; borderRadius: 12px; display: inline-block; minWidth: 350px; textAlign: left; border: 1px solid rgba(212, 175, 55, 0.1); margin-top: 20px; }
                .confirmation-box div { margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 15px; }
                .confirmation-box label { fontSize: 11px; textTransform: uppercase; opacity: 0.5; }
                .confirmation-box p { fontSize: 18px; margin: 5px 0 0; }
            `}</style>
        </div>
    );
};

export default Booking;
