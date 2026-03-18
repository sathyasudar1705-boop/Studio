import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';

const Payments = () => {
    return (
        <div className="ub-payments-view fadeIn">
            <h2 className="ub-section-title">Billing & Invoices</h2>
            
            <div className="ub-payments-summary">
                <div className="ub-stat-card">
                    <h3>₹35,000</h3>
                    <p>Total Spent</p>
                </div>
                <div className="ub-stat-card">
                    <h3>₹8,000</h3>
                    <p>Pending Balance</p>
                </div>
            </div>

            <div className="ub-section-header-compact" style={{ marginTop: '40px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px' }}>Recent Transactions</h3>
            </div>
            
            <div className="ub-transactions-list">
                <div className="ub-transaction-card">
                    <div className="ub-trans-info">
                        <h4>Wedding Session Advance</h4>
                        <p>Evelyn Harper • Mar 01, 2026</p>
                    </div>
                    <div className="ub-trans-amount">
                        <span>₹15,000</span>
                        <span className="ub-status-pill completed">Paid</span>
                    </div>
                    <button className="ub-btn-icon"><DownloadIcon fontSize="small" /></button>
                </div>

                <div className="ub-transaction-card">
                    <div className="ub-trans-info">
                        <h4>Portrait Session Balance</h4>
                        <p>Julian Cross • Feb 15, 2026</p>
                    </div>
                    <div className="ub-trans-amount">
                        <span>₹8,000</span>
                        <span className="ub-status-pill pending">Pending</span>
                    </div>
                    <button className="ub-btn-primary" style={{ padding: '8px 20px', fontSize: '10px' }}>Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default Payments;
