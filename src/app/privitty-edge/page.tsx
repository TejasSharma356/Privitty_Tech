'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { fadeUp, stagger, cardVariant, scrollRevealViewport } from '@/lib/motionVariants';
import s from './privitty-edge.module.css';

/* ─── OT Flow Diagram — fully dynamic, no fixed widths ─── */
function OTFlowDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(id);
  }, []);

  const packetsA = [0, 50].map(o => ((tick + o) % 100) / 100);
  const packetsB = [0, 50].map(o => ((tick + o + 25) % 100) / 100);

  const nodes = [
    { label: 'PLC / Sensor', sub: 'OT Device', highlight: false, icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )},
    { label: 'Edge Gateway', sub: 'Encrypt & Policy', highlight: true, icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )},
    { label: 'OEM Partner', sub: 'Policy-bound access', highlight: false, icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      </svg>
    )},
  ];

  return (
    <div className={s.flowDiagram}>
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          {/* Wire before this node (except first) */}
          {i > 0 && (
            <div className={s.wireWrap}>
              <div className={s.wire} />
              {(i === 1 ? packetsA : packetsB).map((pos, pi) =>
                pos > 0.02 && pos < 0.98 ? (
                  <div key={pi} className={s.packet} style={{ left: `${pos * 100}%` }} />
                ) : null
              )}
            </div>
          )}
          <div className={s.flowNodeGroup}>
            <div className={`${s.flowNode} ${node.highlight ? s.flowNodeHighlight : ''}`}>
              {node.icon}
            </div>
            <div className={s.flowNodeLabel}>{node.label}</div>
            <div className={s.flowNodeSub}>{node.sub}</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/* ─── Latency Gauge — re-sweeps every time it scrolls into view ─── */
function LatencyGauge() {
  const [angle, setAngle] = useState(-130);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); else setInView(false); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      setAngle(-130);
      const t = setTimeout(() => setAngle(-95), 300);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <div ref={ref} className={s.gaugeWrap}>
      <div className={s.gaugeOuter}>
        <div className={s.gaugeInner}>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className={s.gaugeTick} style={{ transform: `rotate(${-130 + i * 26}deg) translateY(-52px)` }} />
          ))}
          <motion.div className={s.gaugeNeedle}
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 55, damping: 18, delay: inView ? 0.25 : 0 }} />
          <div className={s.gaugeCenter} />
          <div className={s.gaugeLabel}>0.2ms</div>
          <div className={s.gaugeSub}>Encryption latency</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Exposure Demo — VPN vs Privitty Access Scoping ─── */
function ExposureDemo() {
  const [isPrivitty, setIsPrivitty] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setIsPrivitty(p => !p), 3200);
    return () => clearInterval(id);
  }, []);

  const resources = [
    { id: 'Target PLC', icon: '⚙️' },
    { id: 'HMI Panel', icon: '🖥️' },
    { id: 'Admin DB', icon: '🗄️' },
    { id: 'SCADA Core', icon: '🏭' },
  ];

  return (
    <div className={s.exposureWrap}>
      <div className={s.exposureHeader}>
        <div className={s.exposureTitle}>{isPrivitty ? 'Privitty Access' : 'VPN Access'}</div>
        <motion.div className={s.exposureBadge} animate={{ backgroundColor: isPrivitty ? '#22c55e' : '#ef4444', color: '#fff' }}>
          {isPrivitty ? 'Identity-Scoped' : 'Network-Wide'}
        </motion.div>
      </div>
      <div className={s.exposureList}>
        {resources.map((res, i) => {
           // In Privitty, only the target PLC is accessible
           const accessible = isPrivitty ? i === 0 : true;
           return (
             <motion.div key={res.id} className={s.exposureItem}
               animate={{ opacity: accessible ? 1 : 0.4 }}
               transition={{ delay: isPrivitty ? 0 : i * 0.1 }}>
               <div className={s.exposureIcon}>{res.icon}</div>
               <div className={s.exposureName}>{res.id}</div>
               <div className={s.exposureStatus}>
                  {accessible ? <span style={{color: '#22c55e'}}>● Granted</span> : <span>○ Blocked</span>}
               </div>
             </motion.div>
           );
        })}
      </div>
    </div>
  );
}

/* ─── Protocol Stack — live byte-stream animation ─── */
function ProtocolStack() {
  const protos = ['MQTT', 'OPC-UA', 'MODBUS', 'REST'];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % protos.length), 2000);
    return () => clearInterval(id);
  }, [protos.length]);

  return (
    <div style={{ padding: '2rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 2 }}>
        {protos.map((p, i) => (
          <div key={p} style={{ 
            padding: '0.6rem 1rem', 
            background: i === active ? '#000' : 'rgba(255,255,255,0.05)', 
            color: i === active ? '#fff' : '#000',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'all 0.3s'
          }}>
            {p}
          </div>
        ))}
      </div>
      
      {/* Lines and Connections */}
      <div style={{ position: 'absolute', left: '110px', right: '110px', top: '0', bottom: '0', zIndex: 1, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {protos.map((_, i) => {
             // Calculate y position for each protocol node roughly
             const yPos = 30 + (i * 54); 
             return (
               <path 
                 key={i}
                 d={`M 0,${yPos} C 60,${yPos} 80,110 140,110`}
                 fill="none"
                 stroke={i === active ? "#000" : "rgba(0,0,0,0.1)"}
                 strokeWidth={i === active ? "3" : "1.5"}
                 strokeDasharray={i === active ? "4 4" : "none"}
                 style={{ transition: 'all 0.3s' }}
               />
             );
          })}
        </svg>
      </div>

      <div style={{ zIndex: 2, padding: '1rem 1.5rem', background: '#000', color: '#fff', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Privitty<br/>Encryptor</div>
      </div>
    </div>
  );
}

/* ─── Revocation Demo ─── */
function RevocationDemo() {
  const [state, setState] = useState<'live' | 'revoking' | 'revoked'>('live');
  const trigger = () => {
    if (state === 'live') { setState('revoking'); setTimeout(() => setState('revoked'), 1200); }
    else setState('live');
  };
  return (
    <div className={s.revokeWrap}>
      <div className={s.revokeTitle}>Instant Revocation</div>
      <div className={s.revokeDoc}>
        <AnimatePresence mode="wait">
          {state === 'live' && (
            <motion.div key="live" className={s.revokeFile}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>PLC_Firmware_v3.1.gxw</span>
              <div className={s.revokeAccess}>● Access: Active · 30 min</div>
            </motion.div>
          )}
          {state === 'revoking' && (
            <motion.div key="revoking" className={s.revokeFile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div style={{ width: 28, height: 28, border: '2.5px solid rgba(0,0,0,0.12)', borderTopColor: '#000', borderRadius: '50%' }}
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }} />
              <span>Destroying keys…</span>
            </motion.div>
          )}
          {state === 'revoked' && (
            <motion.div key="revoked" className={s.revokeFile}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Keys destroyed</span>
              <div className={s.revokeAccess} style={{ color: '#aaa' }}>● Access: Revoked</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button className={s.revokeBtn} onClick={trigger}>
        {state === 'revoked' ? 'Reset Demo' : 'Revoke Access'}
      </button>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
const processSteps = [
  { n: '01', title: 'Machine Gets an Identity', body: 'The Privitty Edge is installed on your industrial PC or MELIPC. A cryptographic identity is generated and bound to that machine — permanent, unforgeable, owned by you.' },
  { n: '02', title: 'Engineer Earns Access', body: 'An admin issues a QR invite. The engineer scans it — a Securejoin handshake establishes a verified peer relationship. No credential sharing. No open ports. Access by invitation only.' },
  { n: '03', title: 'Data Moves With Its Rules', body: 'Files are sent with per-object policy embedded: who can view, download, or forward — and for how long. The edge decrypts. The relay sees nothing. Sovereignty stays at the machine.' },
];

const bentoCards = [
  { tag: 'OT Identity Flow', title: 'PLC to Partner — Identity-Verified', body: 'Every machine has a cryptographic identity. Every handoff is policy-bound. The relay and cloud see nothing — decryption happens at the edge only.', component: <OTFlowDiagram /> },
  { tag: 'Edge Performance', title: '0.2ms Overhead — Invisible to OT', body: 'Near-zero encryption overhead on edge hardware. Real-time control loops are never interrupted by security processing.', component: <LatencyGauge /> },
  { tag: 'Access Exposure', title: 'VPN vs. Privitty — Side by Side', body: 'VPN: broad network access, one breach exposes everything. Privitty: identity-scoped channels, per-object access control, cryptographic revoke.', component: <ExposureDemo /> },
  { tag: 'Protocol Support', title: 'Live Encryption — No PLC Changes', body: 'MQTT, OPC-UA, MODBUS, REST — all wrapped with cryptographic identity. Watch bytes flow as each protocol is encrypted in real-time.', component: <ProtocolStack /> },
  { tag: 'True Revoke™', title: 'One Click — File Unreadable Everywhere', body: 'Revoke a PLC firmware file or program in real time. The decryption keys are destroyed at every endpoint simultaneously — even if the file was already opened.', component: <RevocationDemo /> },
];

export default function PrivittyEdge() {
  return (
    <div className={s.page}>
      <video autoPlay loop muted playsInline className={s.videoBg}>
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <div className={s.pageContent}>

        {/* Hero */}
        <motion.div className={s.hero} initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className={s.eyebrow}>Privitty Edge · OT Identity Layer</motion.span>
          <motion.h1 variants={fadeUp} className={s.title}>Machine Identity.<br/>Human Access. No VPN.</motion.h1>
          <motion.p variants={fadeUp} className={s.subtitle}>
            Privitty Edge gives every industrial PC, MELIPC and PLC a cryptographic identity — then lets authorised engineers connect to it directly over E2EE channels. No firewall holes. No open ports. No hardware.
          </motion.p>
          <motion.div variants={fadeUp} className={s.heroActions}>
            <Link href="/contact" className={s.btnPrimary}>Book a Demo</Link>
            <a href="http://docs.edge.privittytech.com" target="_blank" rel="noopener noreferrer" className={s.btnSecondary}>Read the Docs →</a>
          </motion.div>
        </motion.div>

        {/* Section 1 — 2-column bento */}
        <section className={s.section}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Identity-Verified Data Flow</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Every Machine Has an Identity. Every Handoff Is Verified.</motion.h2>
          </motion.div>
          <div className={s.bentoRow2}>
            {bentoCards.slice(0, 2).map((card, i) => (
              <motion.div
                key={card.tag}
                className={s.bentoCard}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i)}
              >
                <div className={s.cardTopText}>
                  <div className={s.cardTag}>{card.tag}</div>
                  <h3 className={s.cardTitle}>{card.title}</h3>
                  <p className={s.cardBody}>{card.body}</p>
                </div>
                {card.component}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2 — 3-column bento */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Capabilities</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Software Only. No Hardware. No Open Ports.</motion.h2>
          </motion.div>
          <div className={s.bentoRow3}>
            {bentoCards.slice(2).map((card, i) => (
              <motion.div
                key={card.tag}
                className={s.bentoCard}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i + 2)}
              >
                <div className={s.cardTopText}>
                  <div className={s.cardTag}>{card.tag}</div>
                  <h3 className={s.cardTitle}>{card.title}</h3>
                  <p className={s.cardBody}>{card.body}</p>
                </div>
                {card.component}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3 — Process steps */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Deployment</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Three Steps to OT Identity Sovereignty</motion.h2>
            <motion.p variants={fadeUp} className={s.sectionSubtitle}>~20 MB Windows service. Runs on your existing MELIPC or industrial PC. No rack hardware, no forklift upgrade.</motion.p>
          </motion.div>
          <div className={s.processGrid}>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                className={s.processCard}
                initial="hidden"
                whileInView="visible"
                viewport={scrollRevealViewport}
                variants={cardVariant(i + 4)}
              >
                <div className={s.processNumber}>{step.n}</div>
                <h3 className={s.processTitle}>{step.title}</h3>
                <p className={s.processBody}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
