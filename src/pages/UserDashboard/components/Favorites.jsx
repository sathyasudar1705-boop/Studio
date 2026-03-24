import React from 'react';
import StarIcon from '@mui/icons-material/Star';

const MOCK_FAVS = [
    { 
        id: 1, 
        name: "Clara Vance", 
        role: "Commercial & Product Editor", 
        img: "https://images.pexels.com/photos/1484799/pexels-photo-1484799.jpeg", 
        rating: 4.7
    }
];

const Favorites = ({ onSelectPhotographer }) => {
    return (
        <div className="ub-favorites-view fadeIn">
            <h2 className="ub-section-title">Saved Creatives</h2>
            
            <div className="ub-pg-grid">
                {MOCK_FAVS.map(pg => (
                    <div key={pg.id} className="ub-pg-card">
                        <div className="ub-pg-img-container">
                            <img src={pg.img} alt={pg.name} className="ub-pg-img" />
                            <div className="ub-pg-badge rating">
                                <StarIcon fontSize="inherit" /> {pg.rating}
                            </div>
                        </div>
                        <div className="ub-pg-info">
                            <div className="ub-pg-header">
                                <h3>{pg.name}</h3>
                            </div>
                            <p className="ub-pg-role">{pg.role}</p>
                            <button className="ub-btn-primary ub-btn-view" onClick={() => onSelectPhotographer(pg)}>
                                View Portfolio
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
