import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookingDetails = ({ booking, onBack }) => {
    if (!booking) return null;

    return (
        <div className="ub-booking-details-view fadeIn">
            <button className="ub-btn-back" onClick={onBack}>
                <ArrowBackIcon fontSize="small" /> Back to Bookings
            </button>

            <div className="ub-booking-details-card">
                <div className="ub-bd-header">
                    <h2>{booking.category} Session</h2>
                    <span className={`ub-status-pill ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>

                <div className="ub-section-divider"></div>

                <div className="ub-bd-info-grid">
                    <div className="ub-bd-info-item">
                        <label>Booking ID</label>
                        <p>{booking.id}</p>
                    </div>
                    <div className="ub-bd-info-item">
                        <label>Creative</label>
                        <p>{booking.photographer}</p>
                    </div>
                    <div className="ub-bd-info-item">
                        <label>Date & Time</label>
                        <p>{booking.date} at {booking.time}</p>
                    </div>
                    <div className="ub-bd-info-item">
                        <label>Total Price</label>
                        <p>{booking.price}</p>
                    </div>
                    <div className="ub-bd-info-item">
                        <label>Location</label>
                        <p>123 High Street, Downtown Studio</p>
                    </div>
                    <div className="ub-bd-info-item">
                        <label>Payment Status</label>
                        <p>Advance Paid</p>
                    </div>
                </div>

                <div className="ub-section-divider"></div>

                <div className="ub-bd-actions">
                    <button className="ub-btn-primary">Contact Creative</button>
                    {booking.status !== 'Completed' && (
                        <button className="ub-btn-outline danger">Cancel Booking</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
