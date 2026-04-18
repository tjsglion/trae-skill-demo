"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillExecutionPanelProps {
  skill: {
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
  };
  onClose: () => void;
}

export function SkillExecutionPanel({ skill, onClose }: SkillExecutionPanelProps) {
  const Icon = skill.icon;
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    let isActive = true;
    let interval: NodeJS.Timeout;

    const fetchAndSimulateLogs = async () => {
      // Clear logs when skill changes
      setLogs([]);
      setIsComplete(false);
      setIsLoading(true);

      try {
        const res = await fetch(`/api/skill?name=${encodeURIComponent(skill.name)}`);
        const data = await res.json();
        
        let mockLogs: string[] = [];
        if (data.logs && Array.isArray(data.logs)) {
          mockLogs = data.logs;
        } else {
          mockLogs = [
            `[SYSTEM] Initializing ${skill.name} workspace...`,
            `[ERROR] Failed to fetch specific logs.`,
            `[OUTPUT] Aborting execution.`
          ];
        }

        if (!isActive) return;
        setIsLoading(false);

        let currentIndex = 0;
        interval = setInterval(() => {
          if (currentIndex < mockLogs.length) {
            const currentLog = mockLogs[currentIndex];
            if (currentLog !== undefined) {
              setLogs(prev => [...prev, currentLog]);
            }
            currentIndex++;
          } else {
            setIsComplete(true);
            clearInterval(interval);
          }
        }, 300); // Add a new log line every 300ms (faster for real data)
      } catch (err) {
        if (!isActive) return;
        setIsLoading(false);
        setLogs([
          `[SYSTEM] Initializing ${skill.name} workspace...`,
          `[ERROR] Network error while fetching skill data.`,
          `[OUTPUT] Execution failed.`
        ]);
        setIsComplete(true);
      }
    };

    fetchAndSimulateLogs();

    return () => {
      isActive = false;
      if (interval) clearInterval(interval);
    };
  }, [skill.name]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] sm:h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700`}>
                <Icon className={`w-5 h-5 ${skill.color}`} />
              </div>
              <div>
                <h3 className="text-white font-medium flex items-center gap-2">
                  {skill.name}
                  {isComplete ? (
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  {isComplete ? 'Execution Finished' : 'Running Task...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Body - Terminal Simulator */}
          <div 
            ref={containerRef}
            className="flex-1 bg-[#0D1117] p-6 overflow-y-auto font-mono text-sm relative scroll-smooth"
          >
            {/* macOS Window Controls */}
            <div className="flex gap-2 mb-6 opacity-50">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-3">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
                    ${log?.startsWith('[SYSTEM]') ? 'text-purple-400' : ''}
                    ${log?.startsWith('[INFO]') ? 'text-blue-400' : ''}
                    ${log?.startsWith('[SUCCESS]') || log?.startsWith('[OUTPUT]') ? 'text-emerald-400 font-bold' : ''}
                    ${log?.startsWith('[ERROR]') || log?.startsWith('[WARNING]') ? 'text-rose-400 font-bold' : ''}
                    ${log?.startsWith('>') ? 'text-slate-300' : ''}
                    ${log === '---' ? 'text-slate-600' : ''}
                  `}
                >
                  {log}
                </motion.div>
              ))}
              {!isComplete && (
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-cyan-400 inline-block mt-1 align-middle"
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
