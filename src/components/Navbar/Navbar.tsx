'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  {
    label: 'Products',
    dropdown: [
      { label: 'Privitty Edge (IIoT)', href: '/privitty-edge' },
      { label: 'Privitty SDK', href: '/privitty-sdk' },
      { label: 'Privitty Messenger', href: '/privitty-messenger' },
    ],
  },
  { label: 'How It Works', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div style={{ backgroundColor: '#000', borderRadius: '6px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
            <img
              src="/images/privitty-logo-white.png"
              alt="Privitty"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span className={styles.logoText}>Privitty</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((item) =>
            item.dropdown ? (
              <li
                key={item.label}
                className={styles.dropdownParent}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={styles.navBtn}>
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.ul
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {item.dropdown.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`${styles.dropdownLink} ${pathname === sub.href ? styles.active : ''}`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <div className={styles.cta}>
          <Link href="/contact" className={styles.ctaBtn}>
            Book a Demo
          </Link>
          <a
            href="https://www.privittytech.com/_files/ugd/7cf04c_9e503f2367aa41c6821514c3cebeef80.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whitepaperLink}
          >
            Whitepaper
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={mobileOpen ? styles.barOpen : styles.bar} />
          <span className={mobileOpen ? styles.barHidden : styles.bar} />
          <span className={mobileOpen ? styles.barOpen2 : styles.bar} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Link href="/privitty-edge" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Privitty Edge</Link>
            <Link href="/privitty-sdk" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Privitty SDK</Link>
            <Link href="/privitty-messenger" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Privitty Messenger</Link>
            <Link href="/solutions" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>How It Works</Link>
            <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/contact" className={styles.mobileCta} onClick={() => setMobileOpen(false)}>Book a Demo</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
