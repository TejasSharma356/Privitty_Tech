const fs = require('fs');
const html = fs.readFileSync('public/framer.html', 'utf8');
console.log('Injected:', html.includes('privitty-nav-injected'));
console.log('Nav tag found:', html.includes('id="privitty-nav"'));
