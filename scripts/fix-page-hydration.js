const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Check if already modified
if (!content.includes("'use client'")) {
  // Prepend use client and hooks
  content = "'use client';\nimport { useEffect, useState } from 'react';\n" + content;
  
  // Replace the component body
  content = content.replace(/export default function Home\(\) \{[\s\S]*?return \(/, `export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ minHeight: '100vh', background: 'var(--token-4f00a517-d75a-4557-9433-caf4536a911d, rgb(245, 245, 245))' }} />;

  return (`);
  
  fs.writeFileSync('src/app/page.tsx', content);
  console.log("Successfully updated page.tsx for hydration fix.");
} else {
  console.log("Already updated page.tsx.");
}
