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
                <img src={photographer.img} alt={photographer.name} className="ub-details-avatar" />
                <div className="ub-details-info">
                    <h1>{photographer.name}</h1>
                    <p className="ub-details-role">{photographer.role}</p>
                    <div className="ub-details-meta">
                        <span><StarIcon fontSize="small" style={{ color: 'var(--text-main)' }}/> {photographer.rating} ({photographer.reviews} Reviews)</span>
                        <span>{photographer.price}</span>
                        <span>{photographer.category}</span>
                    </div>
                    <button className="ub-btn-primary" onClick={onBook}>Book Session</button>
                </div>
            </div>

            <div className="ub-section-divider"></div>

            <div className="ub-details-body">
                <div className="ub-details-about">
                    <h2>About The Artist</h2>
                    <p>
                        Specializing in editorial-style portraiture and luxury events, {photographer.name} brings over a decade of experience to capturing life's most precious moments. Every frame is treated as a fine art piece, meticulously composed and edited to ensure timeless elegance.
                    </p>
                    <p>
                        Based in the city, but available globally for destination weddings and editorial commissions. 
                    </p>
                </div>

                <div className="ub-details-portfolio">
                    <h2>Recent Works</h2>
                    <div className="ub-portfolio-grid">
                        <img src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg" alt="Work 1" />
                        <img src="https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg" alt="Work 2" />
                        <img src="https://images.pexels.com/photos/1484799/pexels-photo-1484799.jpeg" alt="Work 3" />
                        <img src="https://images.pexels.com/photos/2553653/pexels-photo-2553653.jpeg" alt="Work 4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotographerDetails;
