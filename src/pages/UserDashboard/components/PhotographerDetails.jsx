import React from 'react';
import './DashboardComponents.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

const PhotographerDetails = ({ photographer, onBook, onBack }) => {
    if (!photographer) {
        return (
            <div style={{ padding: '60px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Photographer data could not be loaded.</p>
                <button className="ub-btn-outline" onClick={onBack}>← Back to Explore</button>
            </div>
        );
    }

    const heroImg = photographer.portfolio?.[0] || photographer.profile_pic || photographer.img
        || "https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg";

    return (
        <div className="ub-pg-details-view fadeIn">

            {/* ── Hero Strip ── */}
            <div className="upd-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(247,246,229,0.1) 0%, rgba(247,246,229,1) 100%), url('${heroImg}')` }}>
                <button className="ub-btn-back-minimal" onClick={onBack} style={{ marginBottom: 0 }}>
                    <ArrowBackIcon fontSize="small" /> Explore
                </button>
            </div>

            {/* ── Main Profile Card ── */}
            <div className="upd-profile-card">
                <div className="upd-avatar-col">
                    <img
                        src={photographer.profile_pic || photographer.img || "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"}
                        alt={photographer.name}
                        className="upd-avatar"
                    />
                </div>

                <div className="upd-identity">
                    <span className="upd-category-tag">{photographer.category || "Photographer"}</span>
                    <h1 className="upd-name">{photographer.name}</h1>
                    <div className="upd-location-row">
                        <LocationOnOutlinedIcon fontSize="small" />
                        <span>{photographer.city || "Chennai"}{photographer.state ? `, ${photographer.state}` : ""}</span>
                    </div>
                    <div className="upd-stats-bar">
                        <div className="upd-stat">
                            <strong><StarIcon fontSize="inherit" style={{ marginRight: '4px', verticalAlign: 'middle' }} />{photographer.rating || "4.8"}</strong>
                            <span>Rating</span>
                        </div>
                        <div className="upd-stat-divider" />
                        <div className="upd-stat">
                            <strong>{photographer.experience_years || "3"}+</strong>
                            <span>Years Exp.</span>
                        </div>
                        <div className="upd-stat-divider" />
                        <div className="upd-stat">
                            <strong>₹{photographer.price?.toLocaleString() || "N/A"}</strong>
                            <span>Starting</span>
                        </div>
                        <div className="upd-stat-divider" />
                        <div className="upd-stat">
                            <strong>{photographer.reviews || "12"}</strong>
                            <span>Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="upd-cta-col">
                    <button className="ub-btn-primary upd-book-btn" onClick={() => onBook(null)}>
                        Book This Artist
                    </button>
                    <div className="upd-social-row">
                        {photographer.social_links?.instagram && (
                            <a href={photographer.social_links.instagram} target="_blank" rel="noreferrer" className="upd-social-icon">
                                <InstagramIcon fontSize="small" />
                            </a>
                        )}
                        {photographer.social_links?.website && (
                            <a href={photographer.social_links.website} target="_blank" rel="noreferrer" className="upd-social-icon">
                                <LanguageIcon fontSize="small" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Body Sections ── */}
            <div className="upd-body">

                {/* About */}
                <div className="upd-section">
                    <div className="upd-section-label">About the Artist</div>
                    <p className="upd-bio">{photographer.bio || "This artist has not added a biography yet. Reach out to learn more about their creative vision and photographic style."}</p>

                    {photographer.camera_model?.length > 0 && (
                        <div className="upd-equipment-row">
                            <CameraAltOutlinedIcon fontSize="small" />
                            <span>{photographer.camera_model.join(' · ')}</span>
                        </div>
                    )}
                </div>

                {/* Packages */}
                {photographer.packages?.length > 0 && (
                    <div className="upd-section">
                        <div className="upd-section-label">Service Packages</div>
                        <div className="upd-packages-grid">
                            {photographer.packages.map((pkg, i) => (
                                <div key={i} className="upd-package-card">
                                    <div className="upd-pkg-header">
                                        <WorkspacePremiumOutlinedIcon fontSize="small" />
                                        <h4>{pkg.title}</h4>
                                    </div>
                                    <div className="upd-pkg-price">₹{pkg.price?.toLocaleString()}</div>
                                    <p className="upd-pkg-meta">{pkg.duration} · {pkg.deliverables}</p>
                                    {pkg.features?.length > 0 && (
                                        <ul className="upd-pkg-features">
                                            {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
                                        </ul>
                                    )}
                                    <button className="upd-pkg-book-btn" onClick={() => onBook(pkg)}>
                                        Select Package
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Portfolio */}
                <div className="upd-section">
                    <div className="upd-section-label">Portfolio & Recent Work</div>
                    {photographer.portfolio?.length > 0 ? (
                        <div className="upd-portfolio-masonry">
                            {photographer.portfolio.map((img, i) => (
                                <div key={i} className="upd-portfolio-item">
                                    <img src={img} alt={`Work ${i + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="upd-empty-portfolio">
                            <p>Portfolio images will appear here once the artist uploads their work.</p>
                        </div>
                    )}
                </div>

                {/* Book CTA Footer */}
                <div className="upd-footer-cta">
                    <div>
                        <h3>Ready to create something beautiful?</h3>
                        <p>Book a session with {photographer.name} and bring your vision to life.</p>
                    </div>
                    <button className="ub-btn-primary upd-book-btn" onClick={() => onBook(null)}>
                        Reserve Your Session →
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PhotographerDetails;
