'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { fadeUp, stagger, cardVariant, scrollRevealViewport } from '@/lib/motionVariants';
import s from './privitty-sdk.module.css';

const CODE_LINES = [
  { text: 'from privitty import PrivittySDK', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: 'p = PrivittySDK(api_key=KEY)', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: '# Register machine identity', color: '#6b8aad' },
  { text: 'machine = p.register_identity({', color: '#e2e8f0' },
  { text: '  "type": "MELIPC",', color: '#b5cea8' },
  { text: '  "name": "osaka-plant-unit4",', color: '#b5cea8' },
  { text: '})', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: '# Issue engineer access via QR', color: '#6b8aad' },
  { text: 'invite = p.create_invite(machine.id, {', color: '#e2e8f0' },
  { text: '  "engineer": "yamamoto@plant.jp",', color: '#b5cea8' },
  { text: '  "expires_in": "8h",', color: '#b5cea8' },
  { text: '})', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: '# Revoke all access instantly', color: '#6b8aad' },
  { text: 'p.panic(machine.id)', color: '#e2e8f0' },
];

function CodeCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), visible === 0 ? 500 : 170);
    return () => clearTimeout(t);
  }, [visible]);
  useEffect(() => {
    if (visible === CODE_LINES.length) {
      const t = setTimeout(() => setVisible(0), 3000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className={s.codeCard}>
      <div className={s.trafficLights}>
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: '#28c840' }} />
      </div>
      <div className={s.codeLines}>
        {CODE_LINES.slice(0, visible).map((line, i) => (
          <motion.div key={i} className={s.codeLine}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.14 }}
            style={{ color: line.color || 'transparent', minHeight: '1.55rem' }}>
            {line.text || '\u00A0'}
          </motion.div>
        ))}
        <span className={s.cursor}>|</span>
      </div>
    </div>
  );
}

function PolicyBuilder() {
  const [duration, setDuration] = useState('8h');
  const [qr, setQr] = useState(false);
  const durations = ['1h', '8h', '24h', '7d'];
  return (
    <div className={s.policyWrap}>
      <div className={s.policyLabel}>Access Policy Builder</div>
      <div className={s.policyField}>
        <span className={s.policyKey}>engineer</span>
        <div className={s.policyChip}>yamamoto@osaka-plant.jp</div>
      </div>
      <div className={s.policyField}>
        <span className={s.policyKey}>expires_in</span>
        <div className={s.durationRow}>
          {durations.map(d => (
            <button key={d} className={`${s.durationBtn} ${duration === d ? s.durationBtnActive : ''}`} onClick={() => setDuration(d)}>{d}</button>
          ))}
        </div>
      </div>
      <div className={s.policyField}>
        <span className={s.policyKey}>qr_invite</span>
        <button className={`${s.toggleSwitch} ${qr ? s.toggleOn : ''}`} onClick={() => setQr(d => !d)}>
          <div className={s.toggleKnob} />
        </button>
      </div>
      <div className={s.policyGenerate}>
        <div className={s.policyCode}>{`{ expires: "${duration}", qr: ${qr} }`}</div>
      </div>
    </div>
  );
}

function IntegrationsCard() {
  const icons = [
    { label: 'MELIPC', icon: '🏭' }, { label: 'GX Works', icon: '⚙️' }, { label: 'OPC-UA', icon: '📡' },
    { label: 'MQTT', icon: '🔗' }, { label: 'MODBUS', icon: '⚡' }, { label: 'Python', icon: '🐍' },
    { label: 'Windows', icon: '🖥️' }, { label: 'REST', icon: '🌐' }, { label: 'SSH/RDP', icon: '🔒' },
  ];
  return (
    <div className={s.integrationsWrap}>
      {icons.map((ic, i) => (
        <motion.div key={ic.label} className={s.integrationIcon}
          initial={{ opacity: 0, scale: 0.65 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 100, damping: 14 }}
          whileHover={{ scale: 1.1, y: -2 }}>
          <span style={{ fontSize: '1.8rem' }}>{ic.icon}</span>
          <span className={s.integrationLabel}>{ic.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function IdentityCountCard() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={s.oneCallWrap}>
      <div className={s.oneCallNumber}>
        <AnimatePresence mode="wait">
          <motion.span key={count} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} transition={{ duration: 0.22 }}>
            {count.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className={s.oneCallSub}>Machine identities provisioned</div>
      <div className={s.oneCallCode}>p.register_identity(config)</div>
    </div>
  );
}

const steps = [
  { n: '01', title: 'Install Edge', body: 'pip install privitty or deploy the ~20 MB Windows installer on any MELIPC or industrial PC.', tag: 'Software Only' },
  { n: '02', title: 'Bind Identity', body: 'p.register_identity(config) — generates a cryptographic identity bound to that machine instance.', tag: 'Machine' },
  { n: '03', title: 'Issue Access', body: 'p.create_invite() — QR code or link. Engineer scans, Securejoin handshake, access established.', tag: 'Human' },
  { n: '04', title: 'Revoke Instantly', body: 'p.panic(machine.id) — all human access across every channel cleared. Full Watchtower audit entry.', tag: 'Panic' },
];

export default function PrivittySDK() {
  return (
    <div className={s.page}>
      <video autoPlay loop muted playsInline className={s.videoBg}>
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <div className={s.pageContent}>

        {/* Hero */}
        <motion.div className={s.hero} initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className={s.eyebrow}>Privitty SDK · For Developers & OEMs</motion.span>
          <motion.h1 variants={fadeUp} className={s.title}>Embed Machine Identity Into Any Industrial Product</motion.h1>
          <motion.p variants={fadeUp} className={s.subtitle}>
            Add Privitty's full machine identity and human access control stack to your OEM product or industrial application. Drop-in compatible. No hardware required.
          </motion.p>
          <motion.div variants={fadeUp} className={s.heroActions}>
            <Link href="/contact" className={s.btnPrimary}>Get API Access</Link>
            <a href="http://docs.edge.privittytech.com" target="_blank" rel="noopener noreferrer" className={s.btnSecondary}>Read the Docs →</a>
          </motion.div>
        </motion.div>

        {/* Row 1: Code + Policy */}
        <section className={s.section}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>SDK Capabilities</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Machine Identity and Human Access, Out of the Box</motion.h2>
          </motion.div>
          <div className={s.bentoRow2}>
            {[
              { tag: 'SDK Integration', title: 'Five Lines to Machine Identity', body: 'Register a machine identity, issue engineer access, and trigger panic revoke — with a minimal Python, Node.js, or C++ API.', comp: <CodeCard /> },
              { tag: 'Access Policies', title: 'Identity-as-Code Governance', body: 'Define time limits, QR invite control, and session scoping programmatically. No vendor portal required.', comp: <PolicyBuilder /> },
            ].map((card, i) => (
              <motion.div key={card.tag} className={s.bentoCard} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i)}>
                <div className={s.cardTopText}>
                  <div className={s.cardTag}>{card.tag}</div>
                  <h3 className={s.cardTitle}>{card.title}</h3>
                  <p className={s.cardBody}>{card.body}</p>
                </div>
                {card.comp}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Row 2: Integrations + Counter */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.bentoRow3}>
            {[
              { tag: 'Platform Support', title: 'Works Across Every OT Stack', body: 'SDK available for Windows, MELIPC, MQTT, OPC-UA, Modbus, and all major OT protocols — one consistent API across all targets.', comp: <IntegrationsCard />, wide: true },
              { tag: 'Identity Registry', title: 'Every Machine, Provisioned', body: 'Programmatic machine identity provisioning for your entire fleet.', comp: <IdentityCountCard />, wide: false },
            ].map((card, i) => (
              <motion.div key={card.tag} className={`${s.bentoCard} ${card.wide ? s.bentoSpan2 : ''}`}
                initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i + 2)}>
                <div className={s.cardTopText}>
                  <div className={s.cardTag}>{card.tag}</div>
                  <h3 className={s.cardTitle}>{card.title}</h3>
                  <p className={s.cardBody}>{card.body}</p>
                </div>
                {card.comp}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process steps */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Integration Flow</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Four Steps to Machine Identity Sovereignty</motion.h2>
          </motion.div>
          <div className={s.processGrid}>
            {steps.map((step, i) => (
              <motion.div key={step.n} className={s.processCard}
                initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i + 4)}>
                <div className={s.processTag}>{step.tag}</div>
                <div className={s.processNumber}>{step.n}</div>
                <h3 className={s.processTitle}>{step.title}</h3>
                <code className={s.processBody}>{step.body}</code>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
