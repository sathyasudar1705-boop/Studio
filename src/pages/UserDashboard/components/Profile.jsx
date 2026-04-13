import React, { useRef, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import PublicIcon from '@mui/icons-material/Public';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import API from '../../../services/api';

const Profile = ({ user, onUpdate }) => {
    const fileInputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(user?.profile_image || user?.profile_pic || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg");
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        city: user?.city || '',
        phone: user?.phone || ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview local image immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary via Backend
        try {
            setUploading(true);
            const data = new FormData();
            data.append('image', file);

            const response = await API.post(`/users/upload-profile/${user.id || user._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.profile_image) {
                setProfilePic(response.data.profile_image);
                // Update local storage to ensure persistence on reload
                const updatedUser = { ...user, profile_image: response.data.profile_image };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                if (onUpdate) onUpdate(); // Refresh dashboard state
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload profile picture. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await API.put(`/users/profile/${user.id || user._id}`, formData);
            if (response.status === 200) {
                // Sync local storage
                const updatedUser = { ...user, ...formData };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                
                if (onUpdate) onUpdate();
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Profile update error:", err);
            alert("Failed to update profile. " + (err.response?.data?.message || ""));
        }
    };

    return (
        <div className="ub-pg-details-view fadeIn">
            {/* Unified Header Pattern */}
            <div className="ub-details-header">
                <div 
                    className={`ub-details-avatar-wrap ${uploading ? 'uploading' : ''}`} 
                    onClick={handleImageClick}
                >
                    <img 
                        src={profilePic} 
                        alt={user?.name} 
                        className="ub-details-avatar" 
                    />
                    {uploading && (
                        <div className="ub-avatar-loading">
                            <span>Uploading...</span>
                        </div>
                    )}
                    <div className="ub-avatar-edit-overlay">
                        <CameraAltIcon fontSize="extra-small" />
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                </div>
                
                <div className="ub-details-info">
                    <div className="ub-badge-premium">Premium Member</div>
                    <h1>{user?.name || "Lensoria User"}</h1>
                    <p className="ub-details-role">Creative Photography Enthusiast</p>
                    
                    <div className="ub-details-meta">
                        <span><StarIcon fontSize="extra-small" /> Member Grade: Elite</span>
                        <span><PublicIcon fontSize="extra-small" /> {user?.city || "Chennai, IN"}</span>
                        <span><EventAvailableIcon fontSize="extra-small" /> Since 2024</span>
                    </div>
                    
                    <div className="ub-details-actions">
                        <button className="ub-btn-primary" onClick={() => { localStorage.clear(); window.location.href='/'; }}>
                            Logout Session
                        </button>
                    </div>
                </div>
            </div>

            <div className="ub-section-divider"></div>

            <div className="ub-details-body">
                <div className="ub-details-about">
                    <h2>Personal Narrative</h2>
                    <p>{user?.bio || "Every click tells a story. I'm here to find the perfect artist for my next chapter."}</p>
                    
                    <div className="ub-profile-edit-form" style={{ marginTop: '40px' }}>
                        <h3 className="ub-section-sub">Identity Workspace</h3>
                        <div className="ub-form-grid-premium">
                            <div className="ub-form-group-premium">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    className="ub-input-premium" 
                                    name="name"
                                    value={formData.name} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="ub-form-group-premium">
                                <label>Email Address</label>
                                <input type="email" className="ub-input-premium" value={user?.email} readOnly style={{ opacity: 0.6 }} />
                            </div>
                            <div className="ub-form-group-premium">
                                <label>Location</label>
                                <input 
                                    type="text" 
                                    className="ub-input-premium" 
                                    name="city"
                                    value={formData.city} 
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="ub-form-group-premium">
                                <label>Phone</label>
                                <input 
                                    type="tel" 
                                    className="ub-input-premium" 
                                    name="phone"
                                    value={formData.phone} 
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button className="ub-btn-primary" style={{ marginTop: '20px' }} onClick={handleUpdateProfile}>
                            Update Profile
                        </button>
                    </div>
                </div>

                <div className="ub-details-sidebar">
                    <div className="ub-stats-sidebar-card">
                        <h3>Identity Verified</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                            Your account is fully verified. You can book photographers and process payments securely.
                        </p>
                    </div>

                    <div className="ub-danger-zone-v2" style={{ marginTop: '30px' }}>
                        <p>Account Management</p>
                        <button className="ub-btn-danger-minimal"><DeleteForeverIcon fontSize="extra-small" /> Close My Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
