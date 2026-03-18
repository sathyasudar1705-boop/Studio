import React from 'react';

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
                        <img src={pg.img} alt={pg.name} className="ub-pg-img" />
                        <div className="ub-pg-info">
                            <h3>{pg.name}</h3>
                            <p>{pg.role}</p>
                            <button className="ub-btn-outline" style={{ width: '100%', marginTop: '15px' }} onClick={() => onSelectPhotographer(pg)}>
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
