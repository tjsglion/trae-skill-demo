"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShootingStars } from "./shooting-stars";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial Gradient Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" 
      />
      
      {/* Diagonal Glowing Lines (Beams) */}
      <motion.div 
        animate={{ 
          x: ["-10%", "10%", "-10%"],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] -left-[10%] w-[150%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rotate-[15deg] blur-sm"
      />
      <motion.div 
        animate={{ 
          x: ["10%", "-10%", "10%"],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[35%] -left-[10%] w-[150%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rotate-[-25deg] blur-sm"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {mounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() * 0.3 }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars (Independent & Optimized Component) */}
      <ShootingStars count={5} />
    </div>
  );
}
