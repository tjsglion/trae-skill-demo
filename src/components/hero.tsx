"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Infinity, Zap, Bot, Sparkles, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { TypingAnimationComp } from "@/components/typing-animation-comp";

const TYPING_WORDS = ['全栈应用开发', '智能代码审查', '自动化测试生成', '架构设计与选型'];

export function Hero() {
  const [isStarting, setIsStarting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    // 模拟连接或者系统初始化过程
    setTimeout(() => {
      setIsStarting(false);
    }, 2000);
  };

  const handleCopyEmail = () => {
    if (isCopied) return;
    navigator.clipboard.writeText("contact@trae.ai");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 py-20 min-h-screen"
    >
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          y: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <Badge variant="outline" className="mb-8 px-4 py-1.5 border-cyan-500/30 text-cyan-400 bg-cyan-950/20 backdrop-blur-sm rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          Trae Skills Ecosystem
        </Badge>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.2]"
      >
        让 <span className="text-white">Trae Skill</span> 为你
        <br />
        <TypingAnimationComp words={TYPING_WORDS} />
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base text-slate-400 max-w-2xl mb-12 leading-relaxed"
      >
        聚合数十款专业 Trae Skill，覆盖前端开发、后端架构、UI/UX 设计及自动化运维，
        <br className="hidden md:block" />
        一键召唤你的专属 AI 开发团队，释放 10x 生产力
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-6 mb-20 relative z-50"
      >
        {/* 开始使用按钮：发光边框和加载状态 */}
        <div className="relative group">
          {/* 发光背景 - hover 时变亮 */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
          <Button 
            onClick={handleStart}
            size="lg" 
            disabled={isStarting}
            className="relative bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white border-none rounded-full px-8 h-14 text-base font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] w-48 overflow-hidden group-hover:scale-105"
          >
            <AnimatePresence mode="wait">
              {isStarting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>初始化...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>开始使用</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.div>
              )}
            </AnimatePresence>
            {/* 闪过的高光效果 (Sweep) */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
          </Button>
        </div>

        {/* 商务合作按钮：复制邮箱逻辑 */}
        <Button 
          onClick={handleCopyEmail}
          variant="outline" 
          size="lg" 
          className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white text-slate-300 rounded-full px-8 h-14 text-base font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-slate-500 w-48 relative overflow-hidden group"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-2 text-green-400"
              >
                <Check className="h-5 w-5" />
                <span>邮箱已复制</span>
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                <span>商务合作</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-3 gap-12 md:gap-24"
      >
        <motion.div 
          whileHover={{ scale: 1.1, y: -5 }}
          className="flex flex-col items-center group cursor-default"
        >
          <div className="text-2xl md:text-4xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">35+</div>
          <div className="text-sm text-slate-500 flex items-center gap-1.5">
            <Bot size={14} className="text-cyan-500 group-hover:animate-bounce" />
            专业 Skill
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1, y: -5 }}
          className="flex flex-col items-center group cursor-default"
        >
          <div className="text-2xl md:text-4xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">10x</div>
          <div className="text-sm text-slate-500 flex items-center gap-1.5">
            <Zap size={14} className="text-blue-500 group-hover:animate-bounce" />
            开发效能
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.1, y: -5 }}
          className="flex flex-col items-center group cursor-default"
        >
          <div className="text-2xl md:text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
            <Infinity className="inline-block h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-500 group-hover:animate-bounce" />
            创造力
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
