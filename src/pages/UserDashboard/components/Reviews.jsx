import React from 'react';
import StarIcon from '@mui/icons-material/Star';

const Reviews = () => {
    return (
        <div className="ub-reviews-view fadeIn">
            <div className="ub-section-header-compact">
                <h2 className="ub-section-title">My Reviews</h2>
                <button className="ub-btn-primary">Leave a Review</button>
            </div>

            <div className="ub-reviews-list">
                <div className="ub-card">
                    <div className="ub-review-header">
                        <h3>Julian Cross</h3>
                        <div className="ub-rating-stars">
                            {[1,2,3,4,5].map(i => <StarIcon key={i} fontSize="small" style={{ color: 'var(--text-main)' }}/>)}
                        </div>
                    </div>
                    <p className="ub-review-date">Reviewed on Feb 15, 2026</p>
                    <p className="ub-review-text">
                        Julian was absolutely amazing. He captured our portrait session with such elegance. Highly recommend!
                    </p>
                </div>
                
                <div className="ub-card">
                    <div className="ub-review-header">
                        <h3>Marcus Thorne</h3>
                        <div className="ub-rating-stars">
                            {[1,2,3,4,5].map(i => <StarIcon key={i} fontSize="small" style={{ color: 'var(--text-main)' }}/>)}
                        </div>
                    </div>
                    <p className="ub-review-date">Reviewed on Nov 20, 2025</p>
                    <p className="ub-review-text">
                        The fine art approach Marcus took for our elopement was breathtaking. We are so happy with the results.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
