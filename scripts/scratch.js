const fs = require('fs');

const html = fs.readFileSync('public/framer.html', 'utf8');
const jsDir = 'public/js';

const allText = html + fs.readdirSync(jsDir).map(file => fs.readFileSync(`${jsDir}/${file}`, 'utf8')).join('\n');

const urls = allText.match(/https:\/\/framerusercontent\.com\/[^\s\"\'\)\\]+/g) || [];
const uniqueUrls = [...new Set(urls)];

uniqueUrls.forEach(u => console.log(u));
