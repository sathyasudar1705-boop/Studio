const fs = require('fs');
const path = require('path');

const components = [
    'HomeDashboard',
    'BrowsePhotographers',
    'PhotographerDetails',
    'BookingFlow',
    'MyBookings',
    'BookingDetails',
    'Favorites',
    'Messages',
    'Reviews',
    'Payments',
    'Profile',
    'Settings'
];

const dir = path.join(__dirname, 'src', 'pages', 'UserDashboard', 'components');

components.forEach(comp => {
    const fileContent = `import React from 'react';

const ${comp} = (props) => {
    return (
        <div className="ub-card">
            <h2 className="ub-section-title">${comp.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p>This is the placeholder for ${comp}.</p>
        </div>
    );
};

export default ${comp};
`;
    fs.writeFileSync(path.join(dir, `${comp}.jsx`), fileContent);
});

console.log('Scaffolded all components');
