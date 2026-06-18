const fs = require('fs');
const path = require('path');

const cssFiles = [
  'src/app/about/about.module.css',
  'src/app/privitty-messenger/privitty-messenger.module.css',
  'src/app/privitty-sdk/privitty-sdk.module.css',
  'src/app/solutions/solutions.module.css'
];

cssFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let css = fs.readFileSync(file, 'utf8');
  
  // Update .bentoCard padding and remove fixed heights
  css = css.replace(/\.bentoCard\s*{[^}]*}/g, (match) => {
    let m = match.replace(/padding:\s*[^;]+;/, 'padding: 50px;');
    m = m.replace(/height:\s*100%;/g, '');
    m = m.replace(/min-height:\s*[^;]+;/g, '');
    if (!m.includes('padding: 50px')) {
      m = m.replace('{', '{ padding: 50px; ');
    }
    return m;
  });

  // Update card titles
  css = css.replace(/\.cardTitle\s*{[^}]*}/g, (match) => {
    let m = match.replace(/font-size:\s*[^;]+;/, 'font-size: 2rem;');
    if (!m.includes('font-size: 2rem;')) {
      m = m.replace('{', '{ font-size: 2rem; ');
    }
    return m;
  });

  // Update card tags
  css = css.replace(/\.cardTag\s*{[^}]*}/g, (match) => {
    let m = match.replace(/font-size:\s*[^;]+;/, 'font-size: 0.8rem;');
    m = m.replace(/padding:\s*[^;]+;/, 'padding: 0.4rem 1rem;');
    return m;
  });

  // Update card bodies
  css = css.replace(/\.cardBody\s*{[^}]*}/g, (match) => {
    let m = match.replace(/font-size:\s*[^;]+;/, 'font-size: 1.15rem;');
    if (!m.includes('font-size: 1.15rem;')) {
      m = m.replace('{', '{ font-size: 1.15rem; ');
    }
    return m;
  });

  fs.writeFileSync(file, css);
  console.log('Updated ' + file);
});
