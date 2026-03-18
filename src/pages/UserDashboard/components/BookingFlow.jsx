import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookingFlow = ({ photographer, onComplete, onBack }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [address, setAddress] = useState('');

    const timeslots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
    
    // Simple calendar dates mock for next few days
    const dates = ['Mar 20', 'Mar 21', 'Mar 22', 'Mar 23', 'Mar 24', 'Mar 25'];

    if (!photographer) return null;

    return (
        <div className="ub-booking-flow fadeIn">
            <button className="ub-btn-back" onClick={step === 1 ? onBack : () => setStep(step - 1)}>
                <ArrowBackIcon fontSize="small" /> Back
            </button>

            <div className="ub-booking-container">
                <h2 className="ub-section-title">Schedule Session</h2>
                <div className="ub-booking-stepper">
                     Step {step} of 3
                </div>

                {step === 1 && (
                    <div className="ub-booking-step">
                        <h3>1. Select Date & Time</h3>
                        <p>When would you like to schedule your session with {photographer.name}?</p>
                        
                        <div className="ub-date-grid">
                            {dates.map(d => (
                                <div 
                                    key={d} 
                                    className={`ub-date-pill ${selectedDate === d ? 'active' : ''}`}
                                    onClick={() => setSelectedDate(d)}
                                >
                                    {d}
                                </div>
                            ))}
                        </div>

                        {selectedDate && (
                            <div className="ub-time-grid fadeIn">
                                {timeslots.map(t => (
                                    <div 
                                        key={t}
                                        className={`ub-time-pill ${selectedTime === t ? 'active' : ''}`}
                                        onClick={() => setSelectedTime(t)}
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        )}

                        <button 
                            className="ub-btn-primary" 
                            disabled={!selectedDate || !selectedTime} 
                            onClick={() => setStep(2)}
                            style={{ marginTop: '30px' }}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="ub-booking-step fadeIn">
                        <h3>2. Location Details</h3>
                        <p>Where will the session take place?</p>
                        <textarea 
                            className="ub-input-address"
                            placeholder="Enter full address or venue details..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button 
                            className="ub-btn-primary" 
                            disabled={!address.trim()} 
                            onClick={() => setStep(3)}
                            style={{ marginTop: '20px' }}
                        >
                            Review Booking
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="ub-booking-step fadeIn">
                        <h3>3. Booking Summary</h3>
                        <div className="ub-summary-card">
                            <div className="ub-summary-row"><label>Creative:</label><span>{photographer.name}</span></div>
                            <div className="ub-summary-row"><label>Category:</label><span>{photographer.category}</span></div>
                            <div className="ub-summary-row"><label>Date & Time:</label><span>{selectedDate}, {selectedTime}</span></div>
                            <div className="ub-summary-row"><label>Location:</label><span>{address}</span></div>
                            <div className="ub-summary-row total"><label>Total Price:</label><span>{photographer.price}</span></div>
                        </div>
                        <button className="ub-btn-primary" onClick={onComplete}>Confirm Booking</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingFlow;
