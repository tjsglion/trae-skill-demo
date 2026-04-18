"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface ShootingStarProps {
  id: number;
}

const ShootingStar = React.memo(({ id }: ShootingStarProps) => {
  // 使用 useMemo 确保每颗流星的随机参数在组件生命周期内只计算一次，避免不必要的重新渲染和动画重置
  const { delay, duration, top, left, repeatDelay } = useMemo(() => ({
    delay: Math.random() * 10,
    duration: 2 + Math.random() * 2,
    top: -10 - Math.random() * 20,
    left: Math.random() * 150,
    repeatDelay: Math.random() * 5 + 2,
  }), []);

  return (
    <motion.div
      className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-cyan-200 to-white rounded-full blur-[1px]"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        rotate: "135deg",
        // 开启硬件加速，提升动画渲染性能
        willChange: "transform, opacity",
      }}
      animate={{
        x: [0, -2500],
        y: [0, 2500],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatDelay,
        delay,
      }}
    >
      {/* Glow Head */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full blur-[2px] shadow-[0_0_10px_2px_#67e8f9]" />
    </motion.div>
  );
});

ShootingStar.displayName = "ShootingStar";

interface ShootingStarsProps {
  /**
   * 控制流星的数量
   * @default 5
   */
  count?: number;
}

export const ShootingStars = React.memo(({ count = 5 }: ShootingStarsProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 避免 SSR 期间的随机数不匹配导致 hydration 报错
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <ShootingStar key={`star-${i}`} id={i} />
      ))}
    </div>
  );
});

ShootingStars.displayName = "ShootingStars";
