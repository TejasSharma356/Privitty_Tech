'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './poc.module.css';
import Link from 'next/link';

export default function POC() {
  const [isAfter, setIsAfter] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAfter((prev) => !prev);
    }, 2500); // Toggle every 2.5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Define the two states of the chart
  const beforeBars = [
    { height: 180, tooltip: null },
    { height: 160, tooltip: null },
    { height: 140, tooltip: null },
    { height: 180, tooltip: null },
    { height: 210, tooltip: '90% Cost' },
  ];

  const afterBars = [
    { height: 80, tooltip: null },
    { height: 130, tooltip: null },
    { height: 240, tooltip: '80% Automation' },
    { height: 110, tooltip: null },
    { height: 70, tooltip: '10% Cost' },
  ];

  const currentBars = isAfter ? afterBars : beforeBars;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Neumorphic Analytics Chart
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Smoothly interpolating between states using Framer Motion physics.
        </motion.p>
      </div>

      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.span 
            key={isAfter ? "after" : "before"}
            className={styles.yAxisLabel}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {isAfter ? "AFTER" : "BEFORE"}
          </motion.span>
        </AnimatePresence>

        {currentBars.map((bar, index) => (
          <div key={index} className={styles.barWrapper}>
            <AnimatePresence>
              {bar.tooltip && (
                <motion.div 
                  className={styles.tooltip}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                >
                  {bar.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div 
              className={styles.bar}
              initial={false}
              animate={{ height: bar.height }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                damping: 15,
                mass: 1.2
              }}
            />
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/contact" className={styles.homeBtn}>
          Back to Contact
        </Link>
      </motion.div>
    </div>
  );
}
