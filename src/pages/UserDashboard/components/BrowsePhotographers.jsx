import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';

const PHOTOGRAPHERS = [
    { 
        id: 1, 
        name: "Evelyn Harper", 
        role: "Editorial Wedding Photographer", 
        img: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg", 
        rating: 4.9,
        reviews: 124,
        price: "₹45,000/day",
        category: "Wedding"
    },
    { 
        id: 2, 
        name: "Julian Cross", 
        role: "Luxury Lifestyle & Portrait", 
        img: "https://images.pexels.com/photos/1580274/pexels-photo-1580274.jpeg", 
        rating: 4.8,
        reviews: 89,
        price: "₹30,000/day",
        category: "Portrait"
    },
    { 
        id: 3, 
        name: "Clara Vance", 
        role: "Commercial & Product Editor", 
        img: "https://images.pexels.com/photos/1484799/pexels-photo-1484799.jpeg", 
        rating: 4.7,
        reviews: 56,
        price: "₹25,000/day",
        category: "Commercial"
    },
    { 
        id: 4, 
        name: "Marcus Thorne", 
        role: "Fine Art & Elopements", 
        img: "https://images.pexels.com/photos/2553653/pexels-photo-2553653.jpeg", 
        rating: 4.9,
        reviews: 210,
        price: "₹50,000/day",
        category: "Wedding"
    }
];

const BrowsePhotographers = ({ onSelectPhotographer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState('All');

    const filtered = PHOTOGRAPHERS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === 'All' || p.category === filterCat;
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
                {filtered.map(pg => (
                    <div key={pg.id} className="ub-pg-card">
                        <img src={pg.img} alt={pg.name} className="ub-pg-img" />
                        <div className="ub-pg-info">
                            <h3>{pg.name}</h3>
                            <p>{pg.role}</p>
                            <div className="ub-pg-meta">
                                <span><StarIcon fontSize="small" style={{ color: 'var(--text-main)' }}/> {pg.rating} ({pg.reviews})</span>
                                <span>{pg.price}</span>
                            </div>
                            <button className="ub-btn-outline" style={{ width: '100%' }} onClick={() => onSelectPhotographer(pg)}>
                                View Portfolio
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                    No creatives found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default BrowsePhotographers;
