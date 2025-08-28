"use client";

import { useFocusSession } from '@/hooks/useFocusSession';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function FocusPage() {
  const { sessionTime, isRunning, startTimer, stopTimer } = useFocusSession();

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4">
      <header className="flex items-center">
        <Link href="/" className="p-2 -ml-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="font-headline text-lg ml-2">FOCUS SESSION</h1>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="font-headline text-7xl md:text-8xl text-center tabular-nums text-primary" style={{letterSpacing: '-0.05em'}}>
          {formatTime(sessionTime)}
        </div>
        
        <div className="flex items-center gap-4">
          {isRunning ? (
            <Button onClick={stopTimer} variant="destructive" size="lg" className="font-headline w-48 h-16 text-2xl">
              STOP
            </Button>
          ) : (
            <Button onClick={startTimer} variant="default" size="lg" className="font-headline bg-accent text-accent-foreground hover:bg-accent/90 w-48 h-16 text-2xl">
              START
            </Button>
          )}
        </div>
      </div>
      
      <footer className="text-center text-muted-foreground text-sm font-body py-4">
        <p>Stay on this page to keep the timer running.</p>
        <p>Your progress will be saved automatically.</p>
      </footer>
    </div>
  );
}
