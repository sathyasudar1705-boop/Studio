import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import API from '../../../services/api';

const BrowsePhotographers = ({ onSelectPhotographer }) => {
    const [photographers, setPhotographers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState('All');
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("fav_photographers");
        return saved ? JSON.parse(saved) : [];
    });

    const isFavorite = (id) => favorites.some(f => (f._id || f.id) === id);

    const toggleFavorite = (pg) => {
        const id = pg._id || pg.id;
        let updated;
        if (isFavorite(id)) {
            updated = favorites.filter(f => (f._id || f.id) !== id);
        } else {
            updated = [...favorites, pg];
        }
        setFavorites(updated);
        localStorage.setItem("fav_photographers", JSON.stringify(updated));
    };

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const response = await API.get("/photographers");
                const data = Array.isArray(response.data) ? response.data : response.data.photographers || [];
                setPhotographers(data);
            } catch (err) {
                console.error("Error fetching photographers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotographers();
    }, []);

    const filtered = photographers.filter(p => {
        const matchesSearch = (p.name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === 'All' || (p.category || "").toLowerCase() === filterCat.toLowerCase();
        return matchesSearch && matchesCat;
    });

    return (
        <div className="ub-browse-photographers">
            <h2 className="ub-section-title">Discover Creatives</h2>
            
            <div className="ub-browse-header">
                <div className="ub-search-bar">
                    <SearchIcon fontSize="small" style={{ color: 'var(--text-dim)' }} />
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="ub-filters">
                    <select className="ub-filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Wedding">Weddings</option>
                        <option value="Portrait">Portraits</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                    <select className="ub-filter-select">
                        <option value="">Sort by Price</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>
                </div>
            </div>

            <div className="ub-pg-grid">
                {loading ? (
                    <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Loading photographers...</p>
                ) : filtered.length > 0 ? (
                    filtered.map(pg => (
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
                                <button 
                                    className={`ub-btn-fav ${isFavorite(pg._id || pg.id) ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(pg); }}
                                >
                                    {isFavorite(pg._id || pg.id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                        No creatives found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowsePhotographers;
