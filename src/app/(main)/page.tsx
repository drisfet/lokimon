'use client';

import Link from 'next/link';
import Focumon from '@/components/Focumon';
import { Button } from '@/components/ui/button';
import { useFocusSession } from '@/hooks/useFocusSession';
import { useEffect, useState } from 'react';

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  if (h !== '00') return `${h}:${m}:${s}`;
  return `${m}:${s}`;
}

export default function PortalPage() {
  const { totalTime, sessionTime } = useFocusSession();
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    // Only update from localStorage on client
    setDisplayTime(totalTime + sessionTime);
  }, [totalTime, sessionTime]);

  const totalFocusInSeconds = 25 * 60; // Example: 25 minutes goal
  const focusPercentage = Math.min(100, (displayTime / totalFocusInSeconds) * 100);

  return (
    <div className="p-4 flex flex-col items-center text-center h-full">
      <header className="w-full text-center py-4">
        <p className="font-headline text-xs text-muted-foreground tracking-wider">
          AUGUST 29TH, 2025
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <Focumon />
      </div>

      <footer className="w-full flex flex-col items-center gap-4 py-4">
        <div className="font-headline text-center text-sm">
          <p>Focused for: <span className="text-accent">{formatTime(displayTime)}</span></p>
          <p>Time in focus: <span className="text-accent">{focusPercentage.toFixed(0)}%</span></p>
        </div>
        <Link href="/focus">
          <Button
            variant="default"
            size="lg"
            className="font-headline bg-accent text-accent-foreground hover:bg-accent/90 w-48"
          >
            FOCUS
          </Button>
        </Link>
      </footer>
    </div>
  );
}
