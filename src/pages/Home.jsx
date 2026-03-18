import React from "react";
import "./Home.css";
import MainPhoto from "../assets/pexels-jibarofoto-1787220.jpg";
import Wedding1 from "../assets/Wedding_photo.jpg";
import BabyPhoto from "../assets/Baby.jpg";
import ProductPhoto from "../assets/Product.jpg";
import BirthdayPhoto from "../assets/Birthday.jpg";
import TravelPhoto from "../assets/Outdoor_photoshoot.jpg";
import Photographer1 from "../assets/ph1.png";
import Photographer2 from "../assets/ph2.png";
import Photographer3 from "../assets/ph3.png";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";

const WEDDING_DATA = [
    { id: 1, title: "WEDDING PHOTOGRAPHY", date: "BOOK NOW", size: "portrait", img: Wedding1, des: "Capturing every beautiful moment of your special day." },
    { id: 2, title: "BABY SHOOT", date: "22 JAN 2026", size: "square", img: BabyPhoto, des: "Precious little moments captured beautifully." },
    { id: 3, title: "CREATIVE PRODUCT SHOOTS", date: "25 JAN 2026", size: "square", img: ProductPhoto, des: "Professional photos that make your products stand out." },
    { id: 4, title: "BIRTHDAY CELEBRATIONS", date: "28 JAN 2026", size: "square", img: BirthdayPhoto, des: "Making every birthday memory last forever." },
    { id: 5, title: "TRAVEL & OUTDOOR SHOOTS", date: "30 JAN 2026", size: "square", img: TravelPhoto, des: "Capturing beautiful destinations and journeys." },
];

const PHOTOGRAPHERS = [
    { id: 1, name: "Alexander Ray", role: "Wedding Specialist", img: Photographer1 },
    { id: 2, name: "Elena Sophia", role: "Portrait Artist", img: Photographer2 },
    { id: 3, name: "Marcus Vane", role: "Lifestyle Expert", img: Photographer3 },
];

const WeddingCard = ({ title, date, img, sizeClass, des }) => (
    <div className={`card-container ${sizeClass}`}>
        <div className="overlay-content">
            <span className="label">BOOK YOUR DATE</span>
            <h2 className="card-title">{title}</h2>
            <a href="#" className="book-box">{date}</a>
            <p className="card-description">{des}</p>
        </div>
        <img src={img} alt={title} className="bg-image" />
    </div>
);

const PhotographerCard = ({ name, role, img }) => (
    <div className="photographer-card">
        <div className="ph-img-container"><img src={img} alt={name} className="ph-image" /></div>
        <div className="ph-info">
            <h4 className="ph-name">{name}</h4>
            <p className="ph-role">{role}</p>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero" style={{ backgroundImage: `url(${MainPhoto})` }}>
                <div className="hero-content">
                    <p className="small-text"><CameraOutlinedIcon fontSize="inherit" style={{ verticalAlign: 'middle', marginRight: '8px' }} />LENSORIA</p>
                    <h1 className="hero-title">VISUAL <br /> STORIES</h1>
                    <p className="hero-subtitle">Every picture tells a beautiful story</p>
                </div>
            </div>

            <div className="gallery-wrapper">
                <div className="section-title-area">
                    <p className="section-subtitle">OUR PORTFOLIO</p>
                    <h3 className="section-header">MOMENTS WE CAPTURE</h3>
                </div>
                <div className="gallery-grid">
                    <div className="left-grid">
                        {WEDDING_DATA.filter(item => item.size === "square").map(item => (
                            <WeddingCard key={item.id} {...item} sizeClass="square" />
                        ))}
                    </div>
                    <div className="right-grid">
                        {WEDDING_DATA.filter(item => item.size === "portrait").map(item => (
                            <WeddingCard key={item.id} {...item} sizeClass="portrait" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="photographers-wrapper">
                <div className="section-title-area">
                    <p className="section-subtitle">MEET THE TEAM</p>
                    <h3 className="section-header">EXPERT PHOTOGRAPHERS</h3>
                </div>
                <div className="photographers-grid">
                    {PHOTOGRAPHERS.map(ph => <PhotographerCard key={ph.id} {...ph} />)}
                </div>
            </div>
        </div>
    );
};

export default Home;
