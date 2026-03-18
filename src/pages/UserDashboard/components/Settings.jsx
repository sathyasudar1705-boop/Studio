import React from 'react';

const Settings = ({ onLogout }) => {
    return (
        <div className="ub-settings-view fadeIn">
            <h2 className="ub-section-title">Account Settings</h2>
            
            <div className="ub-card" style={{ maxWidth: '600px', marginBottom: '30px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '20px' }}>Security</h3>
                <div className="ub-form-group full-width">
                    <label>Current Password</label>
                    <input type="password" className="ub-input" />
                </div>
                <div className="ub-form-group full-width">
                    <label>New Password</label>
                    <input type="password" className="ub-input" />
                </div>
                <button className="ub-btn-outline" style={{ marginTop: '10px' }}>Update Password</button>
            </div>

            <div className="ub-card" style={{ maxWidth: '600px', marginBottom: '30px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '20px' }}>Notifications</h3>
                <div className="ub-toggle-row">
                    <span>Email Notifications for Bookings</span>
                    <input type="checkbox" defaultChecked />
                </div>
                <div className="ub-section-divider" style={{ margin: '15px 0' }}></div>
                <div className="ub-toggle-row">
                    <span>SMS Alerts for Messages</span>
                    <input type="checkbox" defaultChecked />
                </div>
            </div>

            <div className="ub-card" style={{ maxWidth: '600px', borderColor: 'rgba(255,0,0,0.1)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '20px', color: '#c0392b' }}>Danger Zone</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '20px' }}>Once you delete your account, there is no going back. Please be certain.</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button className="ub-btn-outline" onClick={onLogout}>Sign Out</button>
                    <button className="ub-btn-primary" style={{ background: '#c0392b', borderColor: '#c0392b' }}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
