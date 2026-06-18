'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { fadeUp, stagger, cardVariant, scrollRevealViewport } from '@/lib/motionVariants';
import s from './solutions.module.css';

/* ─── Step-by-step comparison ─── */
const comparisonRows = [
  {
    aspect: 'How access is granted',
    vpn: 'Network-level — anyone on the subnet can reach everything',
    privitty: 'Identity-level — QR invite creates a verified peer relationship',
  },
  {
    aspect: 'What happens on breach',
    vpn: 'One stolen credential exposes the entire plant network',
    privitty: 'Each channel is independently scoped — breach is isolated',
  },
  {
    aspect: 'File access control',
    vpn: 'None — files are shared with no per-object policy',
    privitty: 'Per-file: view / download / forward / expiry / revoke',
  },
  {
    aspect: 'Session termination',
    vpn: 'Requires IT to revoke at the firewall — slow, manual',
    privitty: 'Panic button clears all sessions in one click, instantly',
  },
  {
    aspect: 'Hardware required',
    vpn: 'Dedicated VPN appliance, ongoing firewall management',
    privitty: '~20 MB Windows service on your existing MELIPC — no appliance',
  },
  {
    aspect: 'Audit trail',
    vpn: 'Network logs only — no per-file or per-engineer record',
    privitty: 'Watchtower logs every identity, every file, every session',
  },
];

/* ─── How It Works steps ─── */
const steps = [
  {
    num: '01',
    icon: '🪪',
    title: 'Machine Gets an Identity',
    body: 'The Privitty Edge is installed on your industrial PC or MELIPC. A cryptographic identity is generated and bound to that machine instance — permanent, unforgeable, and owned by you.',
    tag: 'Machine Identity',
  },
  {
    num: '02',
    icon: '🎫',
    title: 'Engineer Earns Access',
    body: 'An admin issues a QR code or invite link. The engineer scans it — a Securejoin handshake establishes a verified peer relationship. No credential sharing. No open ports. Access by invitation only.',
    tag: 'Human Access',
  },
  {
    num: '03',
    icon: '📂',
    title: 'Data Moves With Its Rules',
    body: 'Files are sent with per-object policy embedded: who can view, download, or forward — and for how long. The machine decrypts and stages. The relay and cloud see nothing. Sovereignty stays at the edge.',
    tag: 'Data Sovereignty',
  },
  {
    num: '04',
    icon: '⚡',
    title: 'Access Expires or Is Revoked',
    body: 'Open SSH, RDP, or VNC sessions through the same E2EE identity channel. When the job is done — or at any moment before — revoke files, close sessions, or hit the panic button. Identity-level control, always.',
    tag: 'True Revoke™',
  },
];

/* ─── Solutions ─── */
const solutions = [
  {
    label: 'OT / Factory Floor',
    title: 'Every Machine, a Verified Identity',
    body: 'Give every PLC, HMI, and edge PC a cryptographic identity — then let authorised engineers connect to it directly over E2EE channels. Transfer programs, open remote engineering sessions, and verify HMI screens without exposing your plant network or opening a single inbound firewall port.',
    usecases: [
      'Encrypted PLC/HMI program transfer (.gxw, backups, recipes)',
      'E2EE RDP/VNC to engineering tools (GX Works, GT Designer)',
      'GT SoftGOT2000 remote HMI access via identity channel tunnel',
      'Outbound-only connectivity — no inbound firewall holes',
      'Watchtower audit of all transfers and sessions',
    ],
    accent: '#000',
  },
  {
    label: 'OEM Integration',
    title: 'Set the Standard for Your Customers',
    body: 'Embed Privitty\'s machine identity and human access layer into your industrial PC or automation platform as an OEM software component. Offer your customers the new standard — branded under your name, governed by your policies, running on your private relay.',
    usecases: [
      'Your-branded operator app for mobile and desktop',
      'Private relay cluster under your infrastructure',
      'Dedicated Watchtower instance with your identity provider',
      'Pre-installed Edge in your factory image or installer bundle',
      'OEM integration guide and security whitepaper included',
    ],
    accent: '#555',
  },
  {
    label: 'Field Engineers',
    title: 'Human Access That Travels With You',
    body: 'Your identity is your access. Authorised engineers deploy program updates, validate commissioning, and monitor HMI screens from any location — on mobile or desktop. Access is channel-scoped, time-limited, and tied to your verified identity.',
    usecases: [
      'Send PLC/HMI packages from your phone or laptop',
      'Open RDP/VNC session to apply programs on MELIPC',
      'Time-bound access — files and sessions expire automatically',
      'One-tap revoke after commissioning is complete',
      'Full session log visible to fleet administrator',
    ],
    accent: '#333',
  },
];

function ComparisonTable() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className={s.compareWrap}>
      <div className={s.compareHeader}>
        <div className={s.compareCol} />
        <div className={`${s.compareCol} ${s.compareColLabel}`}>Traditional VPN / Firewall</div>
        <div className={`${s.compareCol} ${s.compareColLabelGood}`}>Privitty</div>
      </div>
      {comparisonRows.map((row, i) => (
        <motion.div
          key={row.aspect}
          className={`${s.compareRow} ${hover === i ? s.compareRowHover : ''}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 90, damping: 18 }}
        >
          <div className={s.compareAspect}>{row.aspect}</div>
          <div className={s.compareVpn}>
            <span className={s.crossIcon}>✗</span>
            {row.vpn}
          </div>
          <div className={s.comparePrivitty}>
            <span className={s.checkIcon}>✓</span>
            {row.privitty}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Solutions() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className={s.page}>
      <video autoPlay loop muted playsInline className={s.videoBg}>
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <div className={s.pageContent}>

        {/* Hero */}
        <motion.div className={s.hero} initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className={s.eyebrow}>How It Works · Solutions</motion.span>
          <motion.h1 variants={fadeUp} className={s.title}>Identity First.<br />Access Second.<br />Sovereignty Always.</motion.h1>
          <motion.p variants={fadeUp} className={s.subtitle}>
            Privitty establishes a cryptographic identity for every machine and every engineer before a single byte moves. Access flows from verified trust — not network membership, not credentials, not open ports.
          </motion.p>
          <motion.div variants={fadeUp} className={s.heroActions}>
            <Link href="/contact" className={s.btnPrimary}>Book a Demo</Link>
            <a
              href="https://www.privittytech.com/_files/ugd/7cf04c_9e503f2367aa41c6821514c3cebeef80.pdf"
              target="_blank" rel="noopener noreferrer"
              className={s.btnSecondary}>Read the Whitepaper →</a>
          </motion.div>
        </motion.div>

        {/* How It Works — 4 steps */}
        <section className={s.section}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>How It Works</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Four Steps From Zero Trust to Full Sovereignty</motion.h2>
            <motion.p variants={fadeUp} className={s.sectionSubtitle}>
              Privitty doesn&apos;t change your OT protocols, your hardware, or your network topology. It adds a cryptographic identity layer on top of what you already have.
            </motion.p>
          </motion.div>

          <div className={s.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={`${s.stepCard} ${activeStep === i ? s.stepCardActive : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i)}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                <div className={s.stepTag}>{step.tag}</div>
                <div className={s.stepNum}>{step.num}</div>
                <div className={s.stepIcon}>{step.icon}</div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.p className={s.stepBody}
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}>
                      {step.body}
                    </motion.p>
                  )}
                </AnimatePresence>
                {activeStep !== i && (
                  <p className={s.stepBodyShort}>{step.body.slice(0, 80)}…</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>The Difference</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Why Not Just Use a VPN?</motion.h2>
            <motion.p variants={fadeUp} className={s.sectionSubtitle}>
              VPNs ask &quot;are you on the network?&quot; — Privitty asks &quot;are you who you say you are?&quot; When identity is the foundation, the network stops being the perimeter.
            </motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
            <ComparisonTable />
          </motion.div>
        </section>

        {/* Solutions */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Solutions</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>The New Standard, Deployed Across Your Operation</motion.h2>
            <motion.p variants={fadeUp} className={s.sectionSubtitle}>
              Whether you&apos;re an OEM embedding Privitty into your product, a factory deploying it for field engineers, or a machine builder — machine identity and human access fit the workflow you already have.
            </motion.p>
          </motion.div>
          <div className={s.solutionsGrid}>
            {solutions.map((sol, i) => (
              <motion.div key={sol.label} className={s.solutionCard}
                initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i)}>
                <div className={s.solutionLabel}>{sol.label}</div>
                <h3 className={s.solutionTitle}>{sol.title}</h3>
                <p className={s.solutionBody}>{sol.body}</p>
                <ul className={s.solutionList}>
                  {sol.usecases.map(u => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section className={s.ctaStrip}>
          <motion.div className={s.ctaInner}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className={s.ctaTitle}>Ready to Set the New Standard?</h2>
            <p className={s.ctaBody}>See how Privitty sets the new standard for machine identity and human access — software only, deployed on your existing infrastructure in hours.</p>
            <div className={s.ctaActions}>
              <Link href="/contact" className={s.btnPrimary}>Book a Demo</Link>
              <Link href="/privitty-edge" className={s.btnSecondary}>Explore Privitty Edge →</Link>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
