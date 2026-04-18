import { memo } from "react";
import { TypingAnimation } from "@/components/ui/typing-animation";

export interface TypingAnimationCompProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
}

export const TypingAnimationComp = memo(function TypingAnimationComp({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDelay = 1000,
  loop = true,
}: TypingAnimationCompProps) {
  return (
    <TypingAnimation
      words={words}
      typeSpeed={typeSpeed}
      deleteSpeed={deleteSpeed}
      pauseDelay={pauseDelay}
      loop={loop}
      className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
    />
  );
});
