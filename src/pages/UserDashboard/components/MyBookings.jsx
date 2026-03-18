import React from 'react';

const MOCK_BOOKINGS = [
    { id: 'BK-001', photographer: 'Evelyn Harper', category: 'Wedding', date: 'Mar 24, 2026', time: '09:00 AM', status: 'Confirmed', price: '₹45,000' },
    { id: 'BK-002', photographer: 'Julian Cross', category: 'Portrait', date: 'Feb 12, 2026', time: '02:00 PM', status: 'Completed', price: '₹30,000' },
    { id: 'BK-003', photographer: 'Marcus Thorne', category: 'Elopement', date: 'Apr 05, 2026', time: '11:00 AM', status: 'Pending', price: '₹50,000' }
];

const MyBookings = ({ onSelectBooking }) => {
    return (
        <div className="ub-bookings-view fadeIn">
            <div className="ub-section-header-compact">
                <h2 className="ub-section-title">My Bookings</h2>
                <div className="ub-tabs-mini">
                    <span className="active">All</span>
                    <span>Upcoming</span>
                    <span>Past</span>
                </div>
            </div>

            <div className="ub-bookings-list">
                {MOCK_BOOKINGS.map(b => (
                    <div key={b.id} className="ub-booking-list-card" onClick={() => onSelectBooking(b)}>
                        <div className="ub-bk-main">
                            <h3>{b.category} Session</h3>
                            <p>with {b.photographer}</p>
                        </div>
                        <div className="ub-bk-meta">
                            <span className="ub-bk-date">{b.date} • {b.time}</span>
                            <span className={`ub-status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                        </div>
                        <div className="ub-bk-action">
                            <button className="ub-btn-outline" style={{ padding: '8px 20px', fontSize: '10px' }}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
