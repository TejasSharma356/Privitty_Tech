const fs = require('fs');

let html = fs.readFileSync('public/framer.html', 'utf8');

// The old navbar is inside <!-- privitty-nav-injected --> ... <!-- end privitty-nav-injected -->
const navRegex = /<!-- privitty-nav-injected -->[\s\S]*<!-- end privitty-nav-injected -->/;

const navbarHTML = `
<!-- privitty-nav-injected -->
<style>
  #privitty-nav-wrap {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  #privitty-nav {
    pointer-events: auto;
    background: rgba(245, 245, 245, 0.80);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 4px 14px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.8);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    border-radius: 999px;
    padding: 0 1.5rem;
    height: 60px;
    display: inline-flex;
    align-items: center;
    gap: 2rem;
    max-width: 900px;
    width: 90%;
  }
  #privitty-nav .pnav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  #privitty-nav .pnav-logo img { width: 32px; height: auto; }
  #privitty-nav .pnav-logo-text { font-weight: 700; font-size: 1.05rem; color: #000; }
  
  #privitty-nav .pnav-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  #privitty-nav .pnav-links li { position: relative; }
  #privitty-nav .pnav-link,
  #privitty-nav .pnav-dropbtn {
    font-size: 0.95rem; font-weight: 600; color: rgba(0,0,0,0.6);
    text-decoration: none; padding: 0.5rem 1rem; border-radius: 99px;
    transition: all 0.2s; background: none; border: none; cursor: pointer;
    display: inline-flex; align-items: center; gap: 0.3rem;
  }
  #privitty-nav .pnav-link:hover, #privitty-nav .pnav-dropbtn:hover {
    color: #000; background: rgba(0,0,0,0.05);
  }
  
  #privitty-nav .pnav-dropdown::before { content: ''; position: absolute; top: -15px; left: 0; right: 0; height: 15px; }
  #privitty-nav .pnav-dropdown {
    display: none; position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
    min-width: 220px; background: rgba(255,255,255,0.95); border: 1px solid rgba(0,0,0,0.09);
    border-radius: 16px; padding: 0.5rem; list-style: none; margin: 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
  #privitty-nav .pnav-links li:hover .pnav-dropdown { display: block; animation: pnavFadeIn 0.16s ease; }
  @keyframes pnavFadeIn { from { opacity: 0; transform: translate(-50%, 6px); } to { opacity: 1; transform: translate(-50%, 0); } }
  
  #privitty-nav .pnav-dropdown a {
    display: block; padding: 0.6rem 1rem; font-size: 0.9rem; font-weight: 600; color: rgba(0,0,0,0.65);
    text-decoration: none; border-radius: 10px; transition: all 0.14s ease;
  }
  #privitty-nav .pnav-dropdown a:hover { background: rgba(0,0,0,0.05); color: #000; }
  
  #privitty-nav .pnav-cta { display: flex; align-items: center; gap: 1rem; margin-left: auto; }
  #privitty-nav .pnav-whitepaper { font-size: 0.9rem; font-weight: 600; color: rgba(0,0,0,0.6); text-decoration: none; }
  #privitty-nav .pnav-whitepaper:hover { color: #000; }
  #privitty-nav .pnav-cta-btn {
    font-size: 0.9rem; font-weight: 600; color: #fff; background: #000; text-decoration: none;
    padding: 0.6rem 1.4rem; border-radius: 99px; transition: all 0.2s;
  }
  #privitty-nav .pnav-cta-btn:hover { background: #222; transform: translateY(-1px); }
  
  #privitty-nav .pnav-hamburger { display: none; }
  #pnav-mobile { display: none; }
</style>

<div id="privitty-nav-wrap">
  <nav id="privitty-nav">
    <a href="/" class="pnav-logo">
      <img src="/images/6zrrns4gy2rcmzxtlb8tl2nz51i.svg" alt="Privitty" />
      <span class="pnav-logo-text">Privitty</span>
    </a>

    <ul class="pnav-links">
      <li>
        <button class="pnav-dropbtn">
          Products <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <ul class="pnav-dropdown">
          <li><a href="/privitty-edge">Privitty Edge</a></li>
          <li><a href="/privitty-sdk">Privitty SDK</a></li>
          <li><a href="/privitty-messenger">Privitty Messenger</a></li>
        </ul>
      </li>
      <li><a href="/solutions" class="pnav-link">How It Works</a></li>
      <li><a href="/about" class="pnav-link">About</a></li>
      <li><a href="/contact" class="pnav-link">Contact</a></li>
    </ul>

    <div class="pnav-cta">
      <a href="/framer.html#whitepaper" class="pnav-whitepaper">Whitepaper</a>
      <a href="/contact" class="pnav-cta-btn">Book a Demo</a>
    </div>
  </nav>
</div>
<!-- end privitty-nav-injected -->
`;

if (navRegex.test(html)) {
  html = html.replace(navRegex, navbarHTML);
} else {
  html = html.replace('<body>', '<body>' + navbarHTML);
}

fs.writeFileSync('public/framer.html', html);
console.log('Updated injected navbar');
