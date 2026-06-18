'use client';

import styles from './contact.module.css';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 1,
      delay: 0.2,
    },
  },
};

export default function Contact() {
  return (
    <div className={styles.container}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.videoBg}
      >
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>

      <Navbar />

      <main className={styles.main} style={{ paddingTop: '68px' }}>
        <motion.div 
          className={styles.hero}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className={styles.eyebrow}>Let's Connect</motion.span>
          <motion.h1 variants={itemVariants} className={styles.title}>Contact</motion.h1>
          <motion.p variants={itemVariants} className={styles.subtitle}>
            Have a question, need a demo, or want to explore how Privitty fits your use case? Reach out to us and we'll be happy to discuss secure, decentralized messaging tailored to your needs.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.contentGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className={styles.infoText}>
                <h3>Address</h3>
                <p>Sobha Silicon Oasis, Electronic<br/>City, Bangalore</p>
              </div>
            </div>
            
            <div className={styles.infoBlock}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className={styles.infoText}>
                <h3>Phone</h3>
                <p>+91-9175964875</p>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className={styles.infoText}>
                <h3>Email</h3>
                <p>info@privittytech.com</p>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={styles.iconWrapper}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </div>
              <div className={styles.infoText}>
                <h3>Social Media</h3>
                <div className={styles.socialIconsRow}>
                  <motion.a whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></motion.a>
                  <motion.a whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }} href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className={styles.contactFormWrapper}>
            <div className={styles.contactForm}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4}></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }} 
                  type="submit" 
                  className={styles.submitBtn}
                >
                  Send
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.complianceBadges}>
               <span className={styles.badge}>GDPR</span>
               <span className={styles.badge}>CCPA</span>
               <span className={styles.badge}>DPDP</span>
               <span className={styles.badge}>HIPAA</span>
            </div>
          </div>
          
          <div className={styles.footerLinks}>
            <Link href="#">About</Link>
            <Link href="#">Product</Link>
            <Link href="#">Solutions</Link>
            <Link href="#">Contact</Link>
            <Link href="#" className={styles.whitepaperBtn}>Whitepaper</Link>
          </div>

          <div className={styles.footerContact}>
            <p>Sobha Silicon Oasis,<br/>Electronics City, Bangalore.</p>
            <p>info@privittytech.com</p>
            <Link href="#" className={styles.footerLinkUnderline}>About Privitty</Link>
          </div>

          <div className={styles.footerJobs}>
            <p>We're looking for<br/>talented, passionate<br/>folks to join our team.</p>
            <Link href="#" className={styles.footerLinkUnderline}>Jobs at Privitty</Link>
          </div>
        </div>

        <div className={styles.footerBottomGradient}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.newsletter}
          >
            <div className={styles.newsletterCard}>
              <p>Join Our Newsletter</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Email" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button">Join Now</motion.button>
              </form>
            </div>
          </motion.div>
          
          <div className={styles.footerBottomBar}>
            <p>© 2025 by Privitty</p>
            <div className={styles.socialIconsRow}>
               <Link href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></Link>
               <Link href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></Link>
               <Link href="#"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
