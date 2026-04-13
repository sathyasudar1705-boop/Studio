import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import API from '../../../services/api';

const BookingFlow = ({ photographer, selectedPackage, onComplete, onBack }) => {
    const [step, setStep] = useState(1);
    const [viewDate, setViewDate] = useState(new Date(2026, 3, 1)); // Default to April 2026 for demo consistency
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        package: null,
        name: '',
        phone: '',
        location: '',
        requirements: '',
        paymentType: 'advance'
    });

    useEffect(() => {
        if (selectedPackage) {
            setBookingData(prev => ({
                ...prev,
                package: {
                    id: selectedPackage._id || Math.random().toString(),
                    name: selectedPackage.title,
                    price: `₹${selectedPackage.price.toLocaleString()}`,
                    duration: selectedPackage.duration,
                    images: selectedPackage.deliverables
                }
            }));
        }
    }, [selectedPackage]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamic Calendar Logic
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthName = viewDate.toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const DAYS = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const PADS = Array.from({ length: firstDayIndex }, (_, i) => i);

    const getBlockedDayNumbers = () => {
        if (!photographer?.unavailable_dates) return [];
        const prefix = `${year}-${(month + 1).toString().padStart(2, '0')}-`;
        return photographer.unavailable_dates
            .filter(d => d.startsWith(prefix))
            .map(d => parseInt(d.split('-')[2]));
    };

    const blockedDates = getBlockedDayNumbers();
    const timeslots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

    if (!photographer) return null;

    const updateData = (key, value) => {
        setBookingData(prev => ({ ...prev, [key]: value }));
    };

    const handleMonthChange = (offset) => {
        setViewDate(new Date(year, month + offset, 1));
        updateData('date', ''); // Clear selected date when month changes
    };

    const submitBooking = async () => {
        setIsSubmitting(true);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${bookingData.date.toString().padStart(2, '0')}`;

            const payload = {
                userId: user.id || user._id,
                photographerId: photographer._id || photographer.id,
                bookingDate: dateStr,
                amount: parseInt(bookingData.package.price.replace(/[^\d]/g, '')),
                customerName: bookingData.name,
                customerPhone: bookingData.phone,
                location: bookingData.location,
                requirements: bookingData.requirements,
                notes: `Package: ${bookingData.package.name}. Time: ${bookingData.time}.`,
                status: "pending"
            };

            await API.post("/bookings", payload);
            setStep(6);
        } catch (err) {
            alert("Failed to submit booking: " + (err.response?.data?.message || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepper = () => (
        <div className="ub-step-indicator">
            {[1, 2, 3, 4, 5, 6].map(s => (
                <div key={s} className={`ub-step-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                    {step > s ? '✓' : s}
                </div>
            ))}
        </div>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <CalendarTodayIcon className="ub-step-icon" />
                            <h3>1. Check Availability</h3>
                        </div>
                        <p className="ub-step-desc">Select a date for your session with {photographer.name}.</p>

                        <div className="ub-calendar-mock">
                            <div className="ub-calendar-header">
                                <button className="ub-mon-nav" onClick={() => handleMonthChange(-1)}><ArrowBackIosIcon fontSize="inherit" /></button>
                                <span>{monthName.toUpperCase()} {year}</span>
                                <button className="ub-mon-nav" onClick={() => handleMonthChange(1)}><ArrowForwardIosIcon fontSize="inherit" /></button>
                            </div>
                            <div className="ub-calendar-grid">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(h => <div key={h} className="ub-cal-header-cell">{h}</div>)}
                                {PADS.map(p => <div key={`pad-${p}`} className="ub-cal-day empty"></div>)}
                                {DAYS.map(d => {
                                    const isBlocked = blockedDates.includes(d);
                                    const isSelected = bookingData.date === d;
                                    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

                                    return (
                                        <div
                                            key={d}
                                            className={`ub-cal-day ${isBlocked ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'is-today' : ''}`}
                                            onClick={() => !isBlocked && updateData('date', d)}
                                        >
                                            <span className="ub-cal-num">{d}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            className="ub-btn-primary full-width"
                            disabled={!bookingData.date}
                            onClick={() => setStep(2)}
                        >
                            Select Date
                        </button>
                    </div>
                );
            case 2:
                // Package Selection (using photographer's real packages or defaults)
                const availablePackages = (photographer.packages && photographer.packages.length > 0)
                    ? photographer.packages.map(p => ({
                        id: p._id || Math.random().toString(),
                        name: p.title || 'Studio Session',
                        price: p.price ? `₹${p.price.toLocaleString()}` : 'Contact for Price',
                        duration: p.duration || 'Flexible',
                        images: p.deliverables || 'N/A',
                        description: p.description || ''
                    }))
                    : [];

                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <AccessTimeIcon className="ub-step-icon" />
                            <h3>2. Time & Package</h3>
                        </div>

                        <div className="ub-package-selection">
                            <h4>Choose a Package</h4>
                            <div className="ub-packages-mini-grid">
                                {availablePackages.length > 0 ? (
                                    availablePackages.map(pkg => (
                                        <div
                                            key={pkg.id}
                                            className={`ub-package-mini-card ${bookingData.package?.id === pkg.id ? 'active' : ''}`}
                                            onClick={() => updateData('package', pkg)}
                                        >
                                            <span className="pkg-name">{pkg.name}</span>
                                            <span className="pkg-price">{pkg.price}</span>
                                            <div className="pkg-specs">
                                                <span><strong>Duration:</strong> {pkg.duration}</span>
                                                <span><strong>Images:</strong> {pkg.images}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="ub-no-packages-msg">
                                        <p>This photographer hasn't set up any specific packages yet. Please contact them directly for custom pricing.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ub-time-selection">
                            <h4>Select Time Slot</h4>
                            <div className="ub-time-grid">
                                {timeslots.map(t => (
                                    <div
                                        key={t}
                                        className={`ub-time-pill ${bookingData.time === t ? 'active' : ''}`}
                                        onClick={() => updateData('time', t)}
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="ub-btn-primary full-width"
                            disabled={!bookingData.time || !bookingData.package}
                            onClick={() => setStep(3)}
                        >
                            Confirm Selections
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <div className="ub-step-icon">✎</div>
                            <h3>3. Enter Details</h3>
                        </div>
                        <div className="ub-form-compact">
                            <div className="ub-input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="ub-input-minimal"
                                    placeholder="Your Name"
                                    value={bookingData.name}
                                    onChange={(e) => updateData('name', e.target.value)}
                                />
                            </div>
                            <div className="ub-input-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="ub-input-minimal"
                                    placeholder="+91 00000 00000"
                                    value={bookingData.phone}
                                    onChange={(e) => updateData('phone', e.target.value)}
                                />
                            </div>
                            <div className="ub-input-group">
                                <label>Event Location</label>
                                <input
                                    type="text"
                                    className="ub-input-minimal"
                                    placeholder="Venue Name"
                                    value={bookingData.location}
                                    onChange={(e) => updateData('location', e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="ub-btn-primary full-width"
                            disabled={!bookingData.name || !bookingData.phone || !bookingData.location}
                            onClick={() => setStep(4)}
                        >
                            Review Booking
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <div className="ub-step-icon">📋</div>
                            <h3>4. Booking Review</h3>
                        </div>
                        <div className="ub-review-vcard">
                            <div className="review-row-main">
                                <img src={photographer.profile_pic || photographer.img} alt="" className="mini-pg-img" />
                                <div className="review-meta">
                                    <span className="review-pg-name">{photographer.name}</span>
                                    <span className="review-pg-cat">{photographer.category} Session</span>
                                </div>
                            </div>
                            <div className="review-divider"></div>
                            <div className="review-details-grid">
                                <div className="review-item"><label>Date:</label><span>{bookingData.date} {monthName} {year}</span></div>
                                <div className="review-item"><label>Time:</label><span>{bookingData.time}</span></div>
                                <div className="review-item"><label>Package:</label><span>{bookingData.package.name}</span></div>
                                <div className="review-item"><label>Location:</label><span>{bookingData.location}</span></div>
                            </div>
                            <div className="review-total">
                                <label>Total Amount</label>
                                <span>{bookingData.package.price}</span>
                            </div>
                        </div>
                        <button className="ub-btn-primary full-width" onClick={() => setStep(5)}>Proceed to Payment</button>
                    </div>
                );
            case 5:
                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <CreditCardIcon className="ub-step-icon" />
                            <h3>5. Secure Payment</h3>
                        </div>
                        <div className="ub-payment-options">
                            <div className={`ub-pay-pill active`}>
                                <AccountBalanceWalletIcon fontSize="small" />
                                <div>
                                    <span className="pay-title">Reserve Studio</span>
                                    <span className="pay-desc">Your request will be sent for approval.</span>
                                </div>
                            </div>
                        </div>
                        <button className="ub-btn-primary full-width" disabled={isSubmitting} onClick={submitBooking}>
                            {isSubmitting ? "Processing..." : "Complete Booking"}
                        </button>
                    </div>
                );
            case 6:
                return (
                    <div className="ub-booking-success-view fadeIn">
                        <CheckCircleOutlineIcon className="ub-success-icon" />
                        <h2>Request Sent!</h2>
                        <p className="ub-success-msg">Your session request has been sent to {photographer.name}. You will be notified once they accept.</p>

                        <div className="ub-success-actions">
                            <button className="ub-btn-primary" onClick={onComplete}>View My Bookings</button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="ub-booking-flow-v2">
            <div className="ub-flow-header">
                <button className="ub-btn-back-minimal" onClick={step === 1 ? onBack : () => setStep(step - 1)}>
                    <ArrowBackIcon fontSize="small" />
                </button>
                {step < 1 && renderStepper()}
            </div>

            <div className="ub-booking-flow-container">
                {renderStep()}
            </div>
        </div>
    );
};

export default BookingFlow;
