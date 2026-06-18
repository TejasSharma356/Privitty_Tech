'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { fadeUp, stagger, cardVariant, scrollRevealViewport } from '@/lib/motionVariants';
import styles from './about.module.css';

const principles = [
  {
    title: 'Identity is the Perimeter',
    body: 'Every other solution asks "are you on the network?" Privitty asks "are you who you say you are?" — and so does every machine. When identity is the foundation, the network stops being the perimeter.',
  },
  {
    title: 'Access by Invitation Only',
    body: 'Channels are created by QR code or unique invite link. No credential sharing. No open ports. Access flows from verified identity, not network membership — for both engineers and machines.',
  },
  {
    title: 'Human Access Expires. Machine Identity Persists.',
    body: 'When you revoke a human\'s access, files become cryptographically inaccessible wherever they are. The machine\'s identity and audit record remain. The panic button clears all human access simultaneously.',
  },
  {
    title: 'OEM Sovereignty Over the Identity Layer',
    body: 'Enterprise and OEM deployments run a private relay and dedicated Watchtower under their own domain — not a shared Privitty cloud. Your machine identities and access records are yours.',
  },
];

const products = [
  {
    title: 'Privitty Edge',
    body: 'The machine identity and human access layer for industrial PCs, MELIPCs, PLCs and HMIs. Software only. ~20 MB. No hardware.',
    href: '/privitty-edge',
    cta: 'Explore Edge →',
  },
  {
    title: 'Privitty SDK',
    body: 'Embed Privitty\'s identity and access control stack directly into your OEM product or industrial application with a minimal API.',
    href: '/privitty-sdk',
    cta: 'Explore SDK →',
  },
  {
    title: 'Privitty Messenger',
    body: 'Secure operational communications between field engineers, control room operators, and external contractors. True Revoke™ on every message and file.',
    href: '/privitty-messenger',
    cta: 'Explore Messenger →',
  },
];

const revokeItems = [
  { file: 'PLC_Firmware_v3.1.gxw', sub: 'Access revoked · Yamamoto · 14:32 UTC' },
  { file: 'Turbine_Specs_Rev4.pdf', sub: 'Access revoked · Contractor · 09:15 UTC' },
  { file: 'SCADA_Config_Q3.export', sub: 'Access revoked · OEM Partner · 11:47 UTC' },
];

export default function About() {
  return (
    <div className={styles.page}>
      <video autoPlay loop muted playsInline className={styles.videoBg}>
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <div className={styles.pageContent}>

        {/* Hero */}
        <motion.div className={styles.hero} initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className={styles.eyebrow}>About Privitty</motion.span>
          <motion.h1 variants={fadeUp} className={styles.title}>A New Standard for Machine Identity and Human Access</motion.h1>
          <motion.p variants={fadeUp} className={styles.subtitle}>
            Privitty gives every machine a cryptographic identity and every engineer a verified, revokable channel. No VPN. No firewall rules. No hardware. Just trust between the identities that matter.
          </motion.p>
        </motion.div>



        {/* Principles */}
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <motion.div className={styles.sectionCenter} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={styles.sectionLabel}>What We Stand For</motion.span>
            <motion.h2 variants={fadeUp} className={styles.sectionTitle}>Identity First. Access Second. Sovereignty Always.</motion.h2>
          </motion.div>
          <div className={styles.cardGrid}>
            {principles.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i)}
              >
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <motion.div className={styles.sectionCenter} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={styles.sectionLabel}>The Platform</motion.span>
            <motion.h2 variants={fadeUp} className={styles.sectionTitle}>One Identity Layer. Every OT Topology.</motion.h2>
            <motion.p variants={fadeUp} className={styles.sectionSubtitle}>
              Whether you need to deploy machine identity at the edge, embed it in your OEM product, or protect operational communications — Privitty has a deployment that fits your workflow.
            </motion.p>
          </motion.div>
          <div className={styles.cardGrid}>
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.card}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i + 4)}
              >
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link href={p.href} className={styles.cardLink}>{p.cta}</Link>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
