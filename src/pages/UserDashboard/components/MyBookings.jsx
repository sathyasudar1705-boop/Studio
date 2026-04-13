import React, { useState, useEffect } from 'react';
import API from '../../../services/api';

const MyBookings = ({ bookings = [], onSelectBooking }) => {
    // Component now receives pre-fetched bookings from parent for consistency
    const sortedBookings = [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

    return (
        <div className="ub-bookings-view fadeIn">
            <div className="ub-section-header-compact">
                <h2 className="ub-section-title">My Bookings</h2>
                <div className="ub-tabs-mini">
                    <span className="active">All</span>
                </div>
            </div>

            <div className="ub-bookings-list">
                {sortedBookings.length > 0 ? (
                    sortedBookings.map(b => (
                        <div key={b._id || b.id} className="ub-booking-list-card" onClick={() => onSelectBooking(b)}>
                            <div className="ub-bk-main">
                                <h3>{b.notes?.split('.')[0] || "Session"}</h3>
                                <p>Booking ID: {(b._id || b.id).substring(0, 8)}</p>
                            </div>
                            <div className="ub-bk-meta">
                                <span className="ub-bk-date">
                                    {new Date(b.bookingDate).toLocaleDateString()}
                                </span>
                                <span className={`ub-status-pill ${b.status?.toLowerCase()}`}>{b.status}</span>
                            </div>
                            <div className="ub-bk-action">
                                <button className="ub-btn-outline" style={{ padding: '8px 20px', fontSize: '10px' }}>View Details</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="ub-no-data">
                        <p>No bookings found. Start by choosing a photographer!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
