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
    if (!photographer) return null;

    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        package: null,
        name: '',
        phone: '',
        location: '',
        requirements: ''
    });

    useEffect(() => {
        if (selectedPackage) {
            setBookingData(prev => ({
                ...prev,
                package: {
                    id: selectedPackage._id || Math.random().toString(),
                    title: selectedPackage.title || "Standard Session",
                    price: `₹${(selectedPackage.price || 0).toLocaleString()}`
                }
            }));
        }
    }, [selectedPackage]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateData = (key, value) => {
        setBookingData(prev => ({ ...prev, [key]: value }));
    };

    const submitBooking = async (e) => {
        e.preventDefault();
        if (!bookingData.date || !bookingData.time || !bookingData.package) {
            alert("Please select date, time and package");
            return;
        }

        setIsSubmitting(true);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            // Simple date formatting
            const payload = {
                userId: user.id || user._id,
                photographerId: photographer._id || photographer.id,
                bookingDate: bookingData.date, // Native date input gives YYYY-MM-DD
                amount: parseInt(bookingData.package.price.replace(/[^\d]/g, '')),
                customerName: bookingData.name || user.name,
                customerPhone: bookingData.phone,
                location: bookingData.location,
                requirements: bookingData.requirements,
                notes: `Package: ${bookingData.package.name}. Time: ${bookingData.time}.`,
                status: "pending"
            };

            await API.post("/bookings", payload);
            setStep(2); // Move to success step
        } catch (err) {
            alert("Booking failed: " + (err.response?.data?.message || err.message));
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
        if (step === 2) {
            return (
                <div className="ub-booking-success-view fadeIn">
                    <CheckCircleOutlineIcon className="ub-success-icon" />
                    <h2>Booking Requested!</h2>
                    <p className="ub-success-msg">Your session request has been sent to {photographer.name}. Check your bookings page for updates.</p>
                    <button className="ub-btn-primary" onClick={onComplete}>View My Bookings</button>
                </div>
            );
        }

        const availablePackages = (photographer.packages && photographer.packages.length > 0)
            ? photographer.packages
            : [];

        return (
            <div className="ub-booking-simple-form fadeIn">
                <div className="ub-form-header">
                    <div className="ub-step-indicator-mini">Step 01 of 01: Reservation</div>
                    <h3>Reserve Your Session</h3>
                    <p className="ub-artist-tag">Collaborating with <span>{photographer.name}</span></p>
                </div>

                <form onSubmit={submitBooking}>
                    <div className="ub-form-row">
                        <div className="ub-input-group">
                            <label>Pick a Date</label>
                            <input 
                                type="date" 
                                className="ub-input-minimal" 
                                required 
                                value={bookingData.date}
                                onChange={(e) => updateData('date', e.target.value)}
                            />
                        </div>
                        <div className="ub-input-group">
                            <label>Pick a Time</label>
                            <input 
                                type="time" 
                                className="ub-input-minimal" 
                                required 
                                value={bookingData.time}
                                onChange={(e) => updateData('time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ub-input-group">
                        <label>Select Service Package</label>
                        <select 
                            className="ub-input-minimal" 
                            required 
                            value={bookingData.package?.title || ''}
                            onChange={(e) => {
                                const pkg = availablePackages.find(p => p.title === e.target.value) || 
                                          (e.target.value === "Standard Session" ? { title: "Standard Session", price: parseInt((photographer.price || "5000").toString().replace(/[^\d]/g, '')) } : null);
                                updateData('package', pkg ? { ...pkg, name: pkg.title, price: `₹${(pkg.price || 0).toLocaleString()}` } : null);
                            }}
                        >
                            <option value="">-- Choose from Artist's Offerings --</option>
                            {availablePackages.length > 0 ? (
                                availablePackages.map(p => (
                                    <option key={p._id || p.title} value={p.title}>{p.title} - ₹{p.price?.toLocaleString()}</option>
                                ))
                            ) : (
                                <option value="Standard Session">Standard Session - ₹{(photographer.price || "5,000").toLocaleString()}</option>
                            )}
                        </select>
                    </div>

                    <div className="ub-form-row">
                        <div className="ub-input-group">
                            <label>Phone Number</label>
                            <input 
                                type="tel" 
                                className="ub-input-minimal" 
                                placeholder="+91" 
                                required
                                value={bookingData.phone}
                                onChange={(e) => updateData('phone', e.target.value)}
                            />
                        </div>
                        <div className="ub-input-group">
                            <label>Event Location</label>
                            <input 
                                type="text" 
                                className="ub-input-minimal" 
                                placeholder="City/Venue" 
                                required
                                value={bookingData.location}
                                onChange={(e) => updateData('location', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="ub-input-group">
                        <label>Additional Notes (Optional)</label>
                        <textarea 
                            className="ub-input-minimal" 
                            placeholder="Tell us about your event..."
                            value={bookingData.requirements}
                            onChange={(e) => updateData('requirements', e.target.value)}
                        />
                    </div>

                    <button type="submit" className="ub-btn-primary full-width" disabled={isSubmitting}>
                        {isSubmitting ? "Sending Request..." : "Request Booking"}
                    </button>
                </form>
            </div>
        );
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
