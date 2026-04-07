import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Profile = () => {
    return (
        <div className="ub-profile-page fadeIn">
            {/* Header / Cover Section */}
            <div className="ub-profile-banner">
                <div className="ub-profile-cover-wrap">
                    <img src="https://images.pexels.com/photos/11904557/pexels-photo-11904557.jpeg" alt="Cover" className="ub-profile-cover" />
                    <button className="ub-edit-cover"><CameraAltIcon fontSize="small" /> Edit Cover</button>
                </div>
                <div className="ub-profile-info-bar">
                    <div className="ub-profile-avatar-wrap">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="Aura" className="ub-profile-avatar-large" />
                        <button className="ub-edit-avatar"><CameraAltIcon fontSize="extra-small" /></button>
                    </div>
                    <div className="ub-profile-name-text">
                        <h2>Aura</h2>
                        <p>aura@example.com • Member since 2025</p>
                    </div>
                </div>
            </div>

            {/* Single Column Content Area */}
            <div className="ub-profile-content-card single-column">
                <div className="ub-section-anim">
                    <div className="ub-card-header-premium">
                        <h3>Personal Information</h3>
                        <p>Manage your public details and contact information.</p>
                    </div>
                    
                    <div className="ub-form-grid-premium">
                        <div className="ub-form-group-premium">
                            <label>Full Name</label>
                            <input type="text" className="ub-input-premium" defaultValue="Aura Doe" />
                        </div>
                        <div className="ub-form-group-premium">
                            <label>Display Name</label>
                            <input type="text" className="ub-input-premium" defaultValue="Aura" />
                        </div>
                        <div className="ub-form-group-premium">
                            <label>Email Address</label>
                            <input type="email" className="ub-input-premium" defaultValue="aura@example.com" />
                        </div>
                        <div className="ub-form-group-premium">
                            <label>Phone Number</label>
                            <input type="tel" className="ub-input-premium" defaultValue="+91 98765 43210" />
                        </div>
                        <div className="ub-form-group-premium full-width">
                            <label>Bio</label>
                            <textarea className="ub-input-premium" defaultValue="Photography enthusiast, traveler, and minimal design lover." style={{ minHeight: '100px' }}></textarea>
                        </div>
                        <div className="ub-form-group-premium full-width">
                            <label>Residential Address</label>
                            <input type="text" className="ub-input-premium" defaultValue="123 High Street, Downtown Residency, Chennai" />
                        </div>
                    </div>

                    <div className="ub-form-actions">
                        <button className="ub-btn-secondary-outline">Discard</button>
                        <button className="ub-btn-primary-premium">Save Changes</button>
                    </div>

                    {/* Account Deletion Section */}
                    <div className="ub-danger-zone">
                        <div className="ub-danger-header">
                            <h4>Account Management</h4>
                            <p>Deleting your account is permanent and cannot be undone. All your data will be wiped.</p>
                        </div>
                        <button className="ub-btn-danger">
                            <DeleteForeverIcon fontSize="small" /> Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
