import React from 'react';

import { MOCK_BOOKINGS } from '../../../data/mockData';

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
