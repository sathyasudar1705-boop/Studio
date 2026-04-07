import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const PACKAGES = [
    {
        id: 'essential',
        name: 'Essential',
        price: '₹15,000',
        duration: '2 Hours',
        images: '15 Professionally Edited Images',
        description: 'A refined session perfect for capturing intimate and beautiful moments with professional editing.'
    },
    {
        id: 'signature',
        name: 'Signature',
        price: '₹35,000',
        duration: '5 Hours',
        images: '40 Professionally Edited Images',
        addons: 'Extra Photographer, Drone, Makeup Artist',
        description: 'An extended session with comprehensive coverage, ensuring every moment is beautifully captured. Premium add-ons available for a fully personalized experience.'
    },
    {
        id: 'bespoke',
        name: 'Bespoke',
        price: 'Custom Pricing',
        duration: 'Full Day',
        images: 'Personalized Experience',
        addons: 'Extra Photographer, Drone, Makeup Artist',
        description: 'A fully tailored experience, crafted around your unique story and vision, with premium attention to detail. Exclusive add-ons enhance your luxury session.'
    },
];

const BookingFlow = ({ photographer, onComplete, onBack }) => {
    const [step, setStep] = useState(1);
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

    const timeslots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
    const disabledDates = ['Mar 21', 'Mar 24'];
    const availableDates = ['Mar 20', 'Mar 22', 'Mar 23', 'Mar 25', 'Mar 26', 'Mar 27', 'Mar 28'];

    if (!photographer) return null;

    const updateData = (key, value) => {
        setBookingData(prev => ({ ...prev, [key]: value }));
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
                            <div className="ub-calendar-header">MARCH 2026</div>
                            <div className="ub-calendar-grid">
                                {availableDates.concat(disabledDates).sort().map(d => {
                                    const isDisabled = disabledDates.includes(d);
                                    const isSelected = bookingData.date === d;
                                    return (
                                        <div
                                            key={d}
                                            className={`ub-cal-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                                            onClick={() => !isDisabled && updateData('date', d)}
                                        >
                                            <span className="ub-cal-num">{d.split(' ')[1]}</span>
                                            <span className="ub-cal-label">MAR</span>
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
                return (
                    <div className="ub-booking-step fadeIn">
                        <div className="ub-step-header">
                            <AccessTimeIcon className="ub-step-icon" />
                            <h3>2. Time & Package</h3>
                        </div>

                        <div className="ub-package-selection">
                            <h4>Choose a Package</h4>
                            <div className="ub-packages-mini-grid">
                                {PACKAGES.map(pkg => (
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
                                            {pkg.addons && <span><strong>Add-ons:</strong> {pkg.addons}</span>}
                                        </div>
                                        <p className="pkg-desc">{pkg.description}</p>
                                    </div>
                                ))}
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
                                    placeholder="Aura Smith"
                                    value={bookingData.name}
                                    onChange={(e) => updateData('name', e.target.value)}
                                />
                            </div>
                            <div className="ub-input-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    className="ub-input-minimal"
                                    placeholder="+91 98765 43210"
                                    value={bookingData.phone}
                                    onChange={(e) => updateData('phone', e.target.value)}
                                />
                            </div>
                            <div className="ub-input-group">
                                <label>Event Location</label>
                                <input
                                    type="text"
                                    className="ub-input-minimal"
                                    placeholder="Venue or Area Name"
                                    value={bookingData.location}
                                    onChange={(e) => updateData('location', e.target.value)}
                                />
                            </div>
                            <div className="ub-input-group">
                                <label>Special Requirements</label>
                                <textarea
                                    className="ub-input-minimal"
                                    placeholder="Any specific requests..."
                                    value={bookingData.requirements}
                                    onChange={(e) => updateData('requirements', e.target.value)}
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
                                <img src={photographer.img} alt="" className="mini-pg-img" />
                                <div className="review-meta">
                                    <span className="review-pg-name">{photographer.name}</span>
                                    <span className="review-pg-cat">{photographer.category} Session</span>
                                </div>
                            </div>
                            <div className="review-divider"></div>
                            <div className="review-details-grid">
                                <div className="review-item"><label>Date:</label><span>{bookingData.date}, 2026</span></div>
                                <div className="review-item"><label>Time:</label><span>{bookingData.time}</span></div>
                                <div className="review-item"><label>Package:</label><span>{bookingData.package.name}</span></div>
                                <div className="review-item"><label>Duration:</label><span>{bookingData.package.duration}</span></div>
                                <div className="review-item"><label>Images:</label><span>{bookingData.package.images}</span></div>
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
                            <div
                                className={`ub-pay-pill ${bookingData.paymentType === 'advance' ? 'active' : ''}`}
                                onClick={() => updateData('paymentType', 'advance')}
                            >
                                <AccountBalanceWalletIcon fontSize="small" />
                                <div>
                                    <span className="pay-title">Pay Advance</span>
                                    <span className="pay-desc">Reserve with 20% (₹{(parseInt(bookingData.package.price.replace(/[^\d]/g, '')) * 0.2).toLocaleString()})</span>
                                </div>
                            </div>
                            <div
                                className={`ub-pay-pill ${bookingData.paymentType === 'full' ? 'active' : ''}`}
                                onClick={() => updateData('paymentType', 'full')}
                            >
                                <CreditCardIcon fontSize="small" />
                                <div>
                                    <span className="pay-title">Full Payment</span>
                                    <span className="pay-desc">Pay {bookingData.package.price} now</span>
                                </div>
                            </div>
                        </div>
                        <div className="ub-payment-methods">
                            <h4>Method</h4>
                            <div className="ub-meth-grid">
                                <div className="ub-meth-box">UPI</div>
                                <div className="ub-meth-box">Card</div>
                                <div className="ub-meth-box">Cash</div>
                            </div>
                        </div>
                        <button className="ub-btn-primary full-width" onClick={() => setStep(6)}>Complete Booking</button>
                    </div>
                );
            case 6:
                return (
                    <div className="ub-booking-success-view fadeIn">
                        <CheckCircleOutlineIcon className="ub-success-icon" />
                        <h2>Booking Confirmed!</h2>
                        <span className="ub-booking-id">ID: LS-8829-2026</span>
                        <p className="ub-success-msg">Your session with {photographer.name} is successfully scheduled.</p>

                        <div className="ub-contact-card-success">
                            <label>Photographer Contact:</label>
                            <span className="contact-info">+91 91234 56789 | evelyn@lensoria.com</span>
                        </div>

                        <div className="ub-success-actions">
                            <button className="ub-btn-primary" onClick={onComplete}>View My Bookings</button>
                            <button className="ub-btn-outline" onClick={onComplete}>Back to Dashboard</button>
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
                {step < 6 && renderStepper()}
            </div>

            <div className="ub-booking-flow-container">
                {renderStep()}
            </div>
        </div>
    );
};

export default BookingFlow;
