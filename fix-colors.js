const fs = require('fs');
const path = require('path');

const cssFiles = [
    'src/pages/UserDashboard.css',
    'src/pages/PhotographerDashboard.css',
    'src/pages/Home.css',
    'src/pages/PhotographerDashboard.jsx',
    'src/pages/UserDashboard.jsx'
];

const replacements = [
    { regex: /#1A123D/gi, replace: 'var(--bg-sidebar)' },
    { regex: /#ffffff/gi, replace: 'var(--bg-card)' }, // Need to be careful here
    { regex: /color:\s*#fff;/g, replace: 'color: var(--text-on-accent);' },
    { regex: /color:\s*#000;/g, replace: 'color: var(--text-main);' },
    { regex: /color:\s*#4CAF50;/gi, replace: 'color: var(--color-mint);' },
    { regex: /color:\s*#f44336/gi, replace: 'color: var(--color-red)' },
    { regex: /border-color:\s*#f44336/gi, replace: 'border-color: var(--color-red)' },
    { regex: /color:\s*#2196F3;/gi, replace: 'color: var(--color-teal);' },
    { regex: /color:\s*#FF9800;/gi, replace: 'color: var(--color-mustard);' },
    { regex: /rgba\(33, 150, 243, 0\.1\)/g, replace: 'rgba(25, 159, 168, 0.1)' },
    { regex: /rgba\(255, 152, 0, 0\.1\)/g, replace: 'rgba(244, 160, 32, 0.1)' },
    { regex: /rgba\(76, 175, 80, 0\.1\)/g, replace: 'rgba(149, 213, 196, 0.1)' },
    { regex: /#d4af37/gi, replace: 'var(--color-mustard)' },
    { regex: /#f6d776/gi, replace: 'var(--color-cream)' },
    { regex: /#ff4d4d/gi, replace: 'var(--color-red)' },
    { regex: /#d4a84b/gi, replace: 'var(--color-mustard)' }
];

cssFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        replacements.forEach(entry => {
            content = content.replace(entry.regex, entry.replace);
        });
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
