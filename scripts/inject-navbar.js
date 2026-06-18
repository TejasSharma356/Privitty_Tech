const fs = require('fs');

let html = fs.readFileSync('public/framer.html', 'utf8');

// Check if navbar is already injected
if (html.includes('privitty-nav-injected')) {
  console.log('Navbar already injected.');
  process.exit(0);
}

const navbarHTML = `
<!-- privitty-nav-injected -->
<style>
  #privitty-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: rgba(245, 245, 245, 0.80);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  #privitty-nav .pnav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 68px;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  #privitty-nav .pnav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  #privitty-nav .pnav-logo img {
    width: 36px;
    height: auto;
  }
  #privitty-nav .pnav-logo-text {
    font-weight: 700;
    font-size: 1.05rem;
    color: #000;
    letter-spacing: -0.02em;
  }
  #privitty-nav .pnav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
  }
  #privitty-nav .pnav-links li {
    position: relative;
  }
  #privitty-nav .pnav-link,
  #privitty-nav .pnav-dropbtn {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    text-decoration: none;
    padding: 0.5rem 0.85rem;
    border-radius: 8px;
    transition: all 0.18s ease;
    background: none;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
  }
  #privitty-nav .pnav-link:hover,
  #privitty-nav .pnav-dropbtn:hover {
    color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
  #privitty-nav .pnav-dropdown::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    height: 15px;
    background: transparent;
  }
  #privitty-nav .pnav-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 210px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.09);
    border-radius: 14px;
    padding: 0.5rem;
    list-style: none;
    margin: 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9);
  }
  #privitty-nav .pnav-links li:hover .pnav-dropdown {
    display: block;
    animation: pnavFadeIn 0.16s ease;
  }
  @keyframes pnavFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  #privitty-nav .pnav-dropdown a {
    display: block;
    padding: 0.6rem 0.9rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.14s ease;
  }
  #privitty-nav .pnav-dropdown a:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000;
  }
  #privitty-nav .pnav-cta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
    flex-shrink: 0;
  }
  #privitty-nav .pnav-whitepaper {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.55);
    text-decoration: none;
    transition: color 0.15s;
  }
  #privitty-nav .pnav-whitepaper:hover {
    color: #000;
  }
  #privitty-nav .pnav-cta-btn {
    font-size: 0.88rem;
    font-weight: 600;
    color: #fff;
    background: #000;
    text-decoration: none;
    padding: 0.55rem 1.2rem;
    border-radius: 10px;
    transition: all 0.18s ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15);
  }
  #privitty-nav .pnav-cta-btn:hover {
    background: #222;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2);
  }
  #privitty-nav .pnav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: auto;
  }
  #privitty-nav .pnav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #000;
    border-radius: 2px;
    transition: all 0.25s ease;
  }
  #privitty-nav .pnav-mobile-menu {
    display: none;
    flex-direction: column;
    padding: 1rem 2rem 1.5rem;
    border-top: 1px solid rgba(0,0,0,0.06);
    gap: 0.25rem;
  }
  #privitty-nav .pnav-mobile-menu a {
    font-size: 1rem;
    font-weight: 500;
    color: rgba(0,0,0,0.7);
    text-decoration: none;
    padding: 0.65rem 0.5rem;
    border-radius: 8px;
    transition: all 0.15s;
  }
  #privitty-nav .pnav-mobile-menu a:hover {
    color: #000;
    background: rgba(0,0,0,0.04);
  }
  #privitty-nav .pnav-mobile-cta {
    margin-top: 0.75rem;
    background: #000;
    color: #fff !important;
    text-align: center;
    padding: 0.85rem;
    border-radius: 12px;
    font-weight: 600 !important;
    font-size: 0.95rem !important;
  }
  @media (max-width: 900px) {
    #privitty-nav .pnav-links,
    #privitty-nav .pnav-cta { display: none !important; }
    #privitty-nav .pnav-hamburger { display: flex; }
    #privitty-nav .pnav-mobile-menu.open { display: flex; }
  }
</style>

<nav id="privitty-nav">
  <div class="pnav-inner">
    <a href="/" class="pnav-logo">
      <img src="/images/6zrrns4gy2rcmzxtlb8tl2nz51i.svg" alt="Privitty" />
      <span class="pnav-logo-text">Privitty</span>
    </a>

    <ul class="pnav-links">
      <li>
        <button class="pnav-dropbtn">
          Products
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <ul class="pnav-dropdown">
          <li><a href="/privitty-edge">Privitty Edge (IIoT)</a></li>
          <li><a href="/privitty-sdk">Privitty SDK</a></li>
          <li><a href="/privitty-messenger">Privitty Messenger</a></li>
        </ul>
      </li>
      <li><a href="/about" class="pnav-link">About</a></li>
      <li><a href="/contact" class="pnav-link">Contact</a></li>
    </ul>

    <div class="pnav-cta">
      <a href="/framer.html#whitepaper" class="pnav-whitepaper">Whitepaper</a>
      <a href="/contact" class="pnav-cta-btn">Book a Demo</a>
    </div>

    <button class="pnav-hamburger" id="pnav-ham" onclick="(function(){var m=document.getElementById('pnav-mobile');m.classList.toggle('open');})()" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="pnav-mobile-menu" id="pnav-mobile">
    <a href="/privitty-edge">Privitty Edge</a>
    <a href="/privitty-sdk">Privitty SDK</a>
    <a href="/privitty-messenger">Privitty Messenger</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/contact" class="pnav-mobile-cta">Book a Demo</a>
  </div>
</nav>
<!-- end privitty-nav-injected -->
`;

// Inject right after <body>
html = html.replace('<body>', '<body>' + navbarHTML);

fs.writeFileSync('public/framer.html', html);
console.log('Navbar injected successfully into framer.html!');
