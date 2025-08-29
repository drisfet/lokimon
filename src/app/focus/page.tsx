
'use client';

import { useFocusSession } from '@/hooks/useFocusSession';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Focumon from '@/components/Focumon';
import { getDiscoveredFocumon } from '@/lib/focumon';
import { generateFocumon, GeneratedFocumon } from '@/ai/flows/generate-focumon-flow';
import { useState } from 'react';
import GrowingPlant from '@/components/GrowingPlant';
import FlappyFocumon from '@/components/FlappyFocumon';
import AutonomousFocumon from '@/components/AutonomousFocumon';
import { AnimatePresence, motion } from 'framer-motion';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

export default function FocusPage() {
  const { sessionTime, isRunning, startTimer, stopTimer, completedSessions } = useFocusSession();
  const [generatedFocumon, setGeneratedFocumon] = useState<GeneratedFocumon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [[page, direction], setPage] = useState([0, 0]);

  const discoveredFocumon = getDiscoveredFocumon(completedSessions);
  const latestFocumon = discoveredFocumon[discoveredFocumon.length - 1];

  const handleStart = async () => {
    setIsLoading(true);
    setGeneratedFocumon(null);
    try {
      startTimer();
      const newFocumon = await generateFocumon({ prompt: "a creature that helps with focus" });
      setGeneratedFocumon(newFocumon);
    } catch (error) {
      console.error("Failed to generate Focumon for focus session:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const components = [
    <AutonomousFocumon key="autonomous" isRunning={isRunning} />,
    <FlappyFocumon key="flappy" isRunning={isRunning} />,
    <GrowingPlant key="plant" isRunning={isRunning} />,
    <Focumon key="focumon" focumon={latestFocumon} generatedFocumon={generatedFocumon} />
  ];

  const componentIndex = (page % components.length + components.length) % components.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4 overflow-hidden">
       <header className="flex items-center justify-between">
        <Link href="/" className="p-2 -ml-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="font-headline text-lg">FOCUS SESSION</h1>
        <div className="w-10"></div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {components[componentIndex]}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 flex items-center justify-between z-20">
            <Button onClick={() => paginate(-1)} variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button onClick={() => paginate(1)} variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="w-8 h-8" />
            </Button>
        </div>
      </div>
      
      <footer className="w-full flex flex-col items-center gap-4 py-4">
        <div className="font-headline text-5xl md:text-6xl text-center tabular-nums text-primary" style={{letterSpacing: '-0.05em'}}>
          {formatTime(sessionTime)}
        </div>
        
        <div className="flex items-center gap-4">
          {isRunning ? (
            <Button onClick={stopTimer} variant="destructive" size="lg" className="font-headline w-48 h-16 text-2xl">
              STOP
            </Button>
          ) : (
            <Button onClick={handleStart} disabled={isLoading} variant="default" size="lg" className="font-headline bg-accent text-accent-foreground hover:bg-accent/90 w-48 h-16 text-2xl">
              {isLoading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                "START"
              )}
            </Button>
          )}
        </div>
        <p className="text-center text-muted-foreground text-sm font-body pt-4">
            Stay on this page to keep the timer running.
        </p>
      </footer>
    </div>
  );
}
