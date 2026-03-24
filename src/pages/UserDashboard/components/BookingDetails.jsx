import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const BookingDetails = ({ booking, onBack }) => {
    const [rating, setRating] = useState(booking?.rating || 0);
    const [review, setReview] = useState(booking?.review || '');

    if (!booking) return null;

    const renderLifecycleContent = () => {
        switch (booking.status) {
            case 'Pending':
                return (
                    <div className="ub-lifecycle-msg pending">
                        <p>Your booking request is being reviewed by the creative. We'll notify you as soon as they accept.</p>
                        <span className="ub-status-badge pending">Awaiting Studio Approval</span>
                    </div>
                );
            case 'ShootDay':
                return (
                    <div className="ub-lifecycle-msg shootday fadeIn">
                        <h3><NotificationsActiveIcon /> It's Shoot Day!</h3>
                        <p>Your session with {booking.photographer} is scheduled for today at {booking.time}.</p>
                        <div className="ub-shoot-reminder">
                            <label>Location Reminder:</label>
                            <span>{booking.location || 'Studio Location'}</span>
                        </div>
                    </div>
                );
            case 'Delivered':
                return (
                    <div className="ub-lifecycle-msg delivery fadeIn">
                        <h3>Your Photos are Ready!</h3>
                        <p>The studio has shared your photos. You can view or download them using the link below.</p>
                        <a href={booking.driveLink} target="_blank" rel="noreferrer" className="ub-link-card">
                            <CloudDownloadIcon />
                            <div>
                                <span>Access Private Gallery</span>
                                <label>drive.google.com/lensoria...</label>
                            </div>
                        </a>
                        <button className="ub-btn-primary" style={{ marginTop: '20px' }} onClick={() => {}}>
                            Mark as Received
                        </button>
                    </div>
                );
            case 'Completed':
                return (
                    <div className="ub-lifecycle-msg completed fadeIn">
                        {!booking.rating ? (
                            <div className="ub-review-form">
                                <h3>Rate your experience</h3>
                                <div className="ub-star-input">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <StarIcon 
                                            key={s} 
                                            className={s <= rating ? 'active' : ''} 
                                            onClick={() => setRating(s)}
                                        />
                                    ))}
                                </div>
                                <textarea 
                                    className="ub-input-minimal" 
                                    placeholder="Write a short review..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button className="ub-btn-primary">Submit Review</button>
                            </div>
                        ) : (
                            <div className="ub-review-display">
                                <label>Your Review:</label>
                                <div className="stars">
                                    {[...Array(booking.rating)].map((_, i) => <StarIcon key={i} fontSize="small" />)}
                                </div>
                                <p>"{booking.review}"</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="ub-booking-details-view fadeIn">
            <button className="ub-btn-back-minimal" onClick={onBack}>
                <ArrowBackIcon fontSize="small" /> {booking.status === 'Completed' ? 'Back to History' : 'Back to Bookings'}
            </button>

            <div className="ub-booking-details-card">
                <div className="ub-bd-header">
                    <div>
                        <h2>{booking.category} Session</h2>
                        <span className="ub-bd-id">ID: {booking.id}</span>
                    </div>
                    <span className={`ub-status-pill ${booking.status.toLowerCase()}`}>{booking.status}</span>
                </div>

                <div className="ub-details-sidebar-grid">
                    <div className="ub-bd-main-info">
                        {renderLifecycleContent()}
                        <div className="ub-section-divider"></div>
                        <div className="ub-bd-info-item">
                            <label>Professional</label>
                            <p>{booking.photographer}</p>
                        </div>
                        <div className="ub-bd-info-item">
                            <label>Appointment</label>
                            <p>{booking.date} at {booking.time}</p>
                        </div>
                        <div className="ub-bd-info-item">
                            <label>Venue</label>
                            <p>{booking.location || 'Studio Location'}</p>
                        </div>
                    </div>

                    <div className="ub-bd-summary-sidebar">
                        <div className="ub-bd-info-item">
                            <label>Total Price</label>
                            <p style={{ fontSize: '24px', fontWeight: '600' }}>{booking.price}</p>
                        </div>
                        <div className="ub-summary-vrow"><label>Package:</label><span>Premium Bundle</span></div>
                        <div className="ub-summary-vrow"><label>Method:</label><span>Advance Paid (UPI)</span></div>
                        <div className="ub-summary-vrow"><label>Balance:</label><span>₹{(parseInt(booking.price.replace(/[^\d]/g, '')) * 0.8).toLocaleString()}</span></div>
                        
                        <div className="ub-bd-actions-stack">
                            <button className="ub-btn-primary full-width">Message Studio</button>
                            {booking.status === 'Pending' && <button className="ub-btn-outline danger full-width">Cancel Request</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
