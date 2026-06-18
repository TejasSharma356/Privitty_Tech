'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { fadeUp, stagger, cardVariant, scrollRevealViewport } from '@/lib/motionVariants';
import s from './privitty-messenger.module.css';

const MESSAGES = [
  { from: 'me', text: 'Program update ready for deployment.', delay: 0 },
  { from: 'me', text: '📎  PLC_Firmware_v3.1.gxw · View only · 30 min', delay: 1200, isFile: true },
  { from: 'them', text: '✓ Package received and staged. Ready for apply.', delay: 2600 },
  { from: 'me', text: '🔒 Access to PLC_Firmware_v3.1.gxw revoked', delay: 4800, isRevoked: true },
];

function ChatCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= MESSAGES.length) {
      const r = setTimeout(() => setVisible(0), 2500);
      return () => clearTimeout(r);
    }
    const t = setTimeout(() => setVisible(v => v + 1), MESSAGES[visible]?.delay ?? 1200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className={s.chatCard}>
      <div className={s.chatHeader}>
        <div className={s.chatAvatar}>M1</div>
        <div>
          <div className={s.chatName}>Factory Floor — MELIPC-001</div>
          <div className={s.chatSub}>prv://ch-8f3a2b · Osaka Plant · E2EE</div>
        </div>
        <div className={s.chatBadge}><div className={s.chatDot} /> Secure</div>
      </div>
      <div className={s.chatMessages}>
        {MESSAGES.slice(0, visible).map((msg, i) => (
          <motion.div key={i} className={`${s.msgRow} ${msg.from === 'me' ? s.msgRight : s.msgLeft}`}
            initial={{ opacity: 0, y: 12, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
            <div className={`${s.bubble} ${msg.from === 'me' ? s.bubbleDark : s.bubbleLight} ${msg.isRevoked ? s.bubbleRevoked : ''}`}>
              {msg.text}
              <div className={s.msgTime}>{msg.from === 'me' ? 'Yamamoto' : 'MELIPC-001'} · now</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className={s.chatInput}>
        <div className={s.inputFake}>Type a message…</div>
        <div className={s.sendBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function TrueRevokeCard() {
  const [state, setState] = useState<'idle'|'revoking'|'done'>('idle');
  const run = () => {
    if (state !== 'idle') { setState('idle'); return; }
    setState('revoking');
    setTimeout(() => setState('done'), 1400);
  };
  return (
    <div className={s.revokeWrap}>
      <div className={s.revokeLabel}>True Revoke™</div>
      <div className={s.revokeDoc}>
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div key="idle" className={s.revokeFile}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.75, rotate: -8 }}>
              <div className={s.revokeFileIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <span className={s.revokeFileName}>PLC_Firmware_v3.1.gxw</span>
              <span className={s.revokeStatus} style={{ color: '#22c55e' }}>● Active · View only</span>
            </motion.div>
          )}
          {state === 'revoking' && (
            <motion.div key="rev" className={s.revokeFile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div style={{ width: 26, height: 26, border: '2.5px solid rgba(0,0,0,0.1)', borderTopColor: '#000', borderRadius: '50%' }}
                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} />
              <span className={s.revokeFileName}>Destroying keys…</span>
            </motion.div>
          )}
          {state === 'done' && (
            <motion.div key="done" className={s.revokeFile} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
              <div className={s.revokeFileIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span className={s.revokeFileName}>PLC_Firmware_v3.1.gxw</span>
              <span className={s.revokeStatus} style={{ color: '#aaa' }}>● Revoked · Unreadable</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button className={s.revokeBtn} onClick={run}>{state === 'done' ? 'Reset' : 'Revoke Access'}</button>
    </div>
  );
}

function ZeroMetaCard() {
  const items = [
    { label: 'Read receipts stored on server', val: false },
    { label: 'Contact graph harvested', val: false },
    { label: 'Behavioral analytics', val: false },
    { label: 'Central server routing of content', val: false },
    { label: 'E2E encrypted — relay sees nothing', val: true },
    { label: 'True Revoke™ on every object', val: true },
  ];
  return (
    <div className={s.zeroMetaWrap}>
      {items.map((item, i) => (
        <motion.div key={item.label} className={s.metaRow}
          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 90, damping: 18 }}>
          <span className={item.val ? s.metaCheck : s.metaCross}>{item.val ? '✓' : '—'}</span>
          <span className={s.metaLabel}>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function EphemeralCard() {
  const [secs, setSecs] = useState(28800); // 8h session
  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 60);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return (
    <div className={s.ephemeralWrap}>
      <div className={s.ephLabel}>Engineer Session · Time-Bound</div>
      <div className={s.ephTimer}>
        <div className={s.ephTimerOuter}>
          <div className={s.ephTimerInner}>
            <div className={s.ephTime}>{h}h {m}m</div>
            <div className={s.ephTimeSub}>remaining</div>
          </div>
        </div>
      </div>
      <div className={s.ephDesc}>Access expires automatically. Session closed. No trace on any server.</div>
    </div>
  );
}

const platforms = ['Android', 'iOS', 'macOS', 'Windows', 'Linux'];

export default function PrivittyMessenger() {
  return (
    <div className={s.page}>
      <video autoPlay loop muted playsInline className={s.videoBg}>
        <source src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4" type="video/mp4" />
      </video>
      <Navbar />
      <div className={s.pageContent}>

        {/* Hero */}
        <motion.div className={s.hero} initial="hidden" animate="visible" variants={stagger}>
          <motion.span variants={fadeUp} className={s.eyebrow}>Privitty Messenger · For OT Teams</motion.span>
          <motion.h1 variants={fadeUp} className={s.title}>Verified Channels. Revokable Access. No VPN.</motion.h1>
          <motion.p variants={fadeUp} className={s.subtitle}>
            Human ↔ Machine and Human ↔ Human channels for field engineers, control room operators, and contractors. True Revoke™ on every message, file, and remote session.
          </motion.p>
          <motion.div variants={fadeUp} className={s.heroActions}>
            <Link href="/contact" className={s.btnPrimary}>Get Early Access</Link>
            <Link href="/about" className={s.btnSecondary}>Learn More →</Link>
          </motion.div>
        </motion.div>

        {/* Row 1: Chat + Revoke */}
        <section className={s.section}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Identity-Verified Channels</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Not Just Encrypted Chat. Identity-First Comms.</motion.h2>
          </motion.div>
          <div className={s.bentoRow2}>
            {[
              { tag: 'Live Demo', title: 'PLC Program Transfer — With Revoke', body: 'Send a firmware file to an engineer\'s device. Set view-only, 30-minute access. Revoke it mid-transfer — keys destroyed, file permanently unreadable.', comp: <ChatCard /> },
              { tag: 'True Revoke™', title: 'Object-Level, Not Portal-Level', body: 'Most platforms revoke at the portal. Privitty revokes at the object — a file revoked becomes unreadable wherever it is, even if already opened.', comp: <TrueRevokeCard /> },
            ].map((card, i) => (
              <motion.div key={card.tag} className={s.bentoCard}
                initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i)}>
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

        {/* Row 2: Zero meta + Ephemeral */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <div className={s.bentoRow2}>
            {[
              { tag: 'Privacy Architecture', title: 'The Relay Sees Nothing. The Cloud Stores Nothing.', body: 'The Privitty relay handles NAT traversal only. It cannot read message bodies, file content, or session payloads — by cryptographic design, not policy.', comp: <ZeroMetaCard /> },
              { tag: 'Session Control', title: 'Time-Bound Engineer Access', body: 'Set access to expire automatically after the commissioning window closes. When the job is done — or at any moment before — revoke everything in one tap.', comp: <EphemeralCard /> },
            ].map((card, i) => (
              <motion.div key={card.tag} className={s.bentoCard}
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

        {/* Platform grid */}
        <section className={s.section} style={{ paddingTop: 0 }}>
          <motion.div className={s.sectionHeader} initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={stagger}>
            <motion.span variants={fadeUp} className={s.sectionLabel}>Platform</motion.span>
            <motion.h2 variants={fadeUp} className={s.sectionTitle}>Available Everywhere Your Engineers Operate</motion.h2>
          </motion.div>
          <div className={s.platformGrid}>
            {platforms.map((platform, i) => (
              <motion.div key={platform} className={s.platformCard}
                initial="hidden" whileInView="visible" viewport={scrollRevealViewport} variants={cardVariant(i + 4)}>
                <div className={s.platformNumber}>{String(i + 1).padStart(2, '0')}</div>
                <div className={s.platformName}>{platform}</div>
                <div className={s.platformSub}>Full True Revoke™ support</div>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
