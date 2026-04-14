import Baby from '../assets/Baby.jpg';
import Birthday from '../assets/Birthday.jpg';
import Wedding from '../assets/Wedding_photo.jpg';
import Product from '../assets/cierra-henderson-LWIQp-0_b98-unsplash.jpg';

export const PHOTOGRAPHERS = [
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

export const PACKAGES = [
    { id: 'baby', label: 'Baby Shoot', img: Baby },
    { id: 'travel', label: 'Travel Shoot', img: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg' },
    { id: 'wedding', label: 'Wedding & Elopements', img: Wedding },
    { id: 'product', label: 'Product Shoot', img: Product },
    { id: 'birthday', label: 'Birthday Shoot', img: Birthday },
];

export const MOCK_BOOKINGS = [
    { id: 'BK-001', photographer: 'Evelyn Harper', category: 'Wedding', date: 'Mar 24, 2026', time: '09:00 AM', status: 'Confirmed', price: '₹45,000', location: 'Grand Oak Ballroom' },
    { id: 'BK-002', photographer: 'Julian Cross', category: 'Portrait', date: 'Feb 12, 2026', time: '02:00 PM', status: 'Completed', price: '₹30,000', rating: 5, review: 'Amazing session!' },
    { id: 'BK-003', photographer: 'Marcus Thorne', category: 'Elopement', date: 'Apr 05, 2026', time: '11:00 AM', status: 'Pending', price: '₹50,000' },
    { id: 'BK-004', photographer: 'Clara Vance', category: 'Product', date: 'Mar 20, 2026', time: '10:00 AM', status: 'ShootDay', price: '₹25,000', location: 'Studio 4, Arts District' },
    { id: 'BK-005', photographer: 'Evelyn Harper', category: 'Couple', date: 'Jan 15, 2026', time: '03:00 PM', status: 'Delivered', price: '₹20,000', driveLink: 'https://drive.google.com/lensoria/BK-005' },
];

export const NAV_LINKS = [
    { id: 'home', label: 'Dashboard' },
    { id: 'browse', label: 'Photographers' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'profile', label: 'Profile' },
];
