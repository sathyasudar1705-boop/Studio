import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PhotographerDetails = ({ photographer, onBook, onBack }) => {
    if (!photographer) return null;

    return (
        <div className="ub-pg-details-view fadeIn">
            <button className="ub-btn-back" onClick={onBack}>
                <ArrowBackIcon fontSize="small" /> Back to Explore
            </button>

            <div className="ub-details-header">
                <img src={photographer.profile_pic || photographer.img || "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"} alt={photographer.name} className="ub-details-avatar" />
                <div className="ub-details-info">
                    <h1>{photographer.name}</h1>
                    <p className="ub-details-role">{photographer.category || photographer.role}</p>
                    <div className="ub-details-meta">
                        <span><StarIcon fontSize="small" style={{ color: 'var(--text-main)' }}/> {photographer.rating || "4.8"} ({photographer.reviews || "0"} Reviews)</span>
                        <span>₹{photographer.price?.toLocaleString() || "N/A"}</span>
                        <span>{photographer.city || "Chennai"}</span>
                    </div>
                    <button className="ub-btn-primary" onClick={onBook}>Book Session</button>
                </div>
            </div>

            <div className="ub-section-divider"></div>

            <div className="ub-details-body">
                <div className="ub-details-about">
                    <h2>About The Artist</h2>
                    <p>{photographer.bio || "No biography available yet."}</p>
                    {photographer.camera_model && photographer.camera_model.length > 0 && (
                        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '15px' }}>
                            <b>Equipment:</b> {photographer.camera_model.join(', ')}
                        </p>
                    )}
                </div>

                {photographer.packages && photographer.packages.length > 0 && (
                    <div className="ub-details-packages">
                        <h2>Service Packages</h2>
                        <div className="ub-packages-grid">
                            {photographer.packages.map((pkg, idx) => (
                                <div key={idx} className="ub-package-card">
                                    <div className="ub-pkg-info">
                                        <h3>{pkg.title}</h3>
                                        <div className="ub-pkg-price">₹{pkg.price.toLocaleString()}</div>
                                        <div className="ub-pkg-meta">
                                            <span>{pkg.duration}</span>
                                            <span>{pkg.deliverables}</span>
                                        </div>
                                        <ul className="ub-pkg-features">
                                            {pkg.features.map((feat, fIdx) => (
                                                <li key={fIdx}>{feat}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="ub-btn-pkg-select" onClick={() => onBook(pkg)}>
                                        Select Package
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="ub-details-portfolio">
                    <h2>Recent Works</h2>
                    <div className="ub-portfolio-grid">
                        {photographer.portfolio && photographer.portfolio.length > 0 ? (
                            photographer.portfolio.map((img, i) => (
                                <img key={i} src={img} alt={`Work ${i+1}`} />
                            ))
                        ) : (
                            <p style={{ opacity: 0.5 }}>No portfolio images uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotographerDetails;
