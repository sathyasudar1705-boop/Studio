import React from 'react';

const Profile = () => {
    return (
        <div className="ub-profile-view fadeIn">
            <h2 className="ub-section-title">Personal Information</h2>
            
            <div className="ub-card" style={{ maxWidth: '800px' }}>
                <div className="ub-profile-header">
                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="Aura" className="ub-profile-avatar" />
                    <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '5px' }}>Aura</h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>Member since 2025</p>
                    </div>
                </div>

                <div className="ub-section-divider"></div>

                <div className="ub-form-grid">
                    <div className="ub-form-group">
                        <label>First Name</label>
                        <input type="text" className="ub-input" defaultValue="Aura" />
                    </div>
                    <div className="ub-form-group">
                        <label>Last Name</label>
                        <input type="text" className="ub-input" defaultValue="Doe" />
                    </div>
                    <div className="ub-form-group full-width">
                        <label>Email Address</label>
                        <input type="email" className="ub-input" defaultValue="aura@example.com" />
                    </div>
                    <div className="ub-form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="ub-input" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="ub-form-group full-width">
                        <label>Billing Address</label>
                        <textarea className="ub-input" defaultValue="123 High Street, Downtown Residency" style={{ height: '80px', resize: 'none' }}></textarea>
                    </div>
                </div>

                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="ub-btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
