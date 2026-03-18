import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';

import { PHOTOGRAPHERS } from '../../../data/mockData';

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
