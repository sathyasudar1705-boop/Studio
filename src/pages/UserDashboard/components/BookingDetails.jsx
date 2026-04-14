import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const BookingDetails = ({ booking, onBack }) => {
    const [rating, setRating] = useState(booking?.rating || 0);
    const [review, setReview] = useState(booking?.review || '');

    if (!booking) return null;

    const photographer = booking.photographerId;
    const dateObj = new Date(booking.bookingDate);
    
    const renderLifecycleContent = () => {
        const lowerStatus = booking.status?.toLowerCase();
        
        // Progress helper
        const stages = ['accepted', 'editing', 'framing', 'delivered', 'completed'];
        const currentStageIdx = stages.indexOf(lowerStatus);
        
        const ProgressIndicator = () => (
            <div className="ub-project-progress">
                {stages.map((s, i) => (
                    <div key={s} className={`ub-prog-step ${i <= currentStageIdx ? 'active' : ''}`}>
                        <div className="ub-prog-dot"></div>
                        <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                    </div>
                ))}
            </div>
        );

        switch (lowerStatus) {
            case 'pending':
                return (
                    <div className="ub-lifecycle-msg pending">
                        <p>Your booking request is being reviewed by {photographer?.name || 'the creative'}. We'll notify you as soon as they respond.</p>
                        <span className="ub-status-badge pending">Awaiting Studio Approval</span>
                    </div>
                );
            case 'accepted':
            case 'confirmed':
            case 'editing':
            case 'framing':
            case 'delivered':
                return (
                    <div className="ub-lifecycle-msg progress-view fadeIn">
                        <h3>Project Progress</h3>
                        <ProgressIndicator />
                        <div className="ub-status-description">
                            {lowerStatus === 'accepted' && <p>The session is confirmed. We're getting ready for the shoot!</p>}
                            {lowerStatus === 'editing' && <p>Your photos are in the lab being professionally color-graded and retouched.</p>}
                            {lowerStatus === 'framing' && <p>Post-production is done! We're now preparing the final crops and frames.</p>}
                            {lowerStatus === 'delivered' && <p>Great news! Your digital gallery is ready for download.</p>}
                        </div>
                    </div>
                );
            case 'completed':
                return (
                    // ... (rest of the completed logic stays similar but we can wrap it)
                    <div className="ub-lifecycle-msg completed fadeIn">
                        <ProgressIndicator />
                        {!booking.rating ? (
                            <div className="ub-review-form" style={{ marginTop: '30px' }}>
                                <h3>Rate your experience with {photographer?.name}</h3>
                                <div className="ub-star-input">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <StarIcon key={s} className={s <= rating ? 'active' : ''} onClick={() => setRating(s)} />
                                    ))}
                                </div>
                                <textarea 
                                    className="ub-input-minimal" 
                                    placeholder="How was the session?"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button className="ub-btn-primary">Submit Review</button>
                            </div>
                        ) : (
                            <div className="ub-review-display" style={{ marginTop: '30px' }}>
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
                <ArrowBackIcon fontSize="small" /> Back to Bookings
            </button>

            <div className="ub-booking-details-card">
                <div className="ub-bd-header">
                    <div>
                        <h2>Session Details</h2>
                        <span className="ub-bd-id">ID: {(booking._id || booking.id).substring(0, 8)}</span>
                    </div>
                    <span className={`ub-status-pill ${booking.status?.toLowerCase()}`}>{booking.status}</span>
                </div>

                <div className="ub-details-sidebar-grid">
                    <div className="ub-bd-main-info">
                        {renderLifecycleContent()}
                        <div className="ub-section-divider"></div>
                        <div className="ub-bd-brief-grid">
                            <div className="ub-bd-brief-item">
                                <label>Artist</label>
                                <span>{photographer?.name || 'Studio Artist'}</span>
                            </div>
                            <div className="ub-bd-brief-item">
                                <label>Schedule</label>
                                <span>{dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="ub-bd-brief-item">
                                <label>Location</label>
                                <span>{booking.location || 'Studio Location'}</span>
                            </div>
                        </div>

                        <div className="ub-section-divider"></div>

                        <div className="ub-bd-info-item">
                            <label>Session Intent & Instructions</label>
                            <p style={{ fontSize: '14px', color: 'var(--text-main)', margin: '10px 0' }}>{booking.notes}</p>
                            {booking.requirements && (
                                <p className="ub-special-note">
                                    <strong>Client Request:</strong> {booking.requirements}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="ub-bd-summary-sidebar">
                        <div className="ub-bd-info-item">
                            <label>Service Total</label>
                            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>₹{booking.amount?.toLocaleString()}</p>
                        </div>
                        <div className="ub-summary-vrow"><label>Payment Method</label><span>Advance Secure</span></div>
                        <div className="ub-summary-vrow"><label>Balance Due</label><span style={{ color: 'var(--accent)', fontWeight: '700' }}>₹{(booking.amount ? booking.amount * 0.8 : 0).toLocaleString()}</span></div>
                        
                        <div className="ub-bd-actions-stack">
                            <button className="ub-btn-primary full-width">Help / Support</button>
                            {booking.status?.toLowerCase() === 'pending' && <button className="ub-btn-outline danger full-width">Cancel Request</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
