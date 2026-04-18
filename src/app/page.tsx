"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { IconRing } from "@/components/icon-ring";
import { BackgroundEffects } from "@/components/background-effects";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <BackgroundEffects />
      </motion.div>

      {/* Hero Section and Icon Ring */}
      <div className="relative w-full h-full max-w-[1400px] mx-auto flex items-center justify-center">
        {/* The Icon Ring sits in front of the background but lets clicks pass through its empty space */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center scale-[0.6] md:scale-100 opacity-50 md:opacity-100 z-20 pointer-events-none"
        >
          <IconRing />
        </motion.div>

        {/* Central Hero Content */}
        <Hero />
      </div>

      {/* Floating Laser Beams (Foreground) */}
      <motion.div 
        className="fixed top-[15%] -left-[10%] w-[150%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rotate-[15deg] blur-md pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="fixed bottom-[20%] -right-[10%] w-[150%] h-[1.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rotate-[-25deg] blur-lg pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
      />
      
      {/* Decorative stars/particles (Foreground) */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {mounted && [...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-30 shadow-[0_0_8px_white]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </main>
  );
}
