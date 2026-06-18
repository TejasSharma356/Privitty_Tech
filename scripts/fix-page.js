const fs = require('fs');
let html = fs.readFileSync('public/framer.html', 'utf8');

// Extract the contents of <body>
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);

if (bodyMatch) {
  let content = bodyMatch[1];
  
  // We MUST keep the script_main.cxczqge5.mjs so Framer animations work,
  // but we can't just put <script> tags inside dangerouslySetInnerHTML.
  // Actually, Next.js hydration error 405 is because we render server and client differently.
  // If we just render a simple div that suppresses hydration warnings, we bypass it.
  
  const out = `
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <div 
        suppressHydrationWarning 
        dangerouslySetInnerHTML={{ __html: ${JSON.stringify(content)} }} 
      />
      <Script src="/js/script_main.cxczqge5.mjs" strategy="lazyOnload" type="module" suppressHydrationWarning />
    </>
  );
}
`;
  fs.writeFileSync('src/app/page.tsx', out);
  console.log('Fixed page.tsx');
} else {
  console.error('No body tag found in framer.html');
}
