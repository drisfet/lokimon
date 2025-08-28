"use client";

import { useFocusSession } from '@/hooks/useFocusSession';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Focumon from '@/components/Focumon';
import { getDiscoveredFocumon } from '@/lib/focumon';
import { generateFocumon, GeneratedFocumon } from '@/ai/flows/generate-focumon-flow';
import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function FocusPage() {
  const { sessionTime, isRunning, startTimer, stopTimer, completedSessions } = useFocusSession();
  const [generatedFocumon, setGeneratedFocumon] = useState<GeneratedFocumon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const discoveredFocumon = getDiscoveredFocumon(completedSessions);
  const latestFocumon = discoveredFocumon[discoveredFocumon.length - 1];

  const handleStart = async () => {
    setIsLoading(true);
    setGeneratedFocumon(null);
    try {
      // Use a simple prompt for now. We can make this more complex later.
      const newFocumon = await generateFocumon({ prompt: "a creature that helps with focus" });
      setGeneratedFocumon(newFocumon);
      startTimer();
    } catch (error) {
      console.error("Failed to generate Focumon for focus session:", error);
      // Even if generation fails, start the timer.
      startTimer();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4">
       <header className="flex items-center justify-between">
        <Link href="/" className="p-2 -ml-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="font-headline text-lg">FOCUS SESSION</h1>
        <div className="w-10"></div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <Focumon focumon={latestFocumon} generatedFocumon={generatedFocumon} />
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
