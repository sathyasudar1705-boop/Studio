import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';

const Favorites = ({ onSelectPhotographer }) => {
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("fav_photographers");
        if (saved) {
            setFavs(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="ub-favorites-view fadeIn">
            <h2 className="ub-section-title">Saved Creatives</h2>
            
            <div className="ub-pg-grid">
                {favs.length > 0 ? (
                    favs.map(pg => (
                        <div key={pg._id || pg.id} className="ub-pg-card">
                            <div className="ub-pg-img-container">
                                <img src={pg.profile_pic || pg.img || "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"} alt={pg.name} className="ub-pg-img" />
                                <div className="ub-pg-badge rating">
                                    <StarIcon fontSize="inherit" /> {pg.rating || "4.8"}
                                </div>
                            </div>
                            <div className="ub-pg-info">
                                <div className="ub-pg-header">
                                    <h3>{pg.name}</h3>
                                </div>
                                <p className="ub-pg-role">{pg.category || pg.role || "Artist"}</p>
                                <button className="ub-btn-primary ub-btn-view" onClick={() => onSelectPhotographer(pg)}>
                                    View Portfolio
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                        <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>You haven't saved any photographers yet.</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Heart your favorite artists to see them here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
