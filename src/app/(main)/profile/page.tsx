"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFocusSession } from "@/hooks/useFocusSession";
import { getDiscoveredFocumon } from "@/lib/focumon";
import { useEffect, useState } from "react";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function ProfilePage() {
  const { totalTime, completedSessions } = useFocusSession();
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    setDisplayTime(totalTime);
  }, [totalTime]);

  const discoveredCount = getDiscoveredFocumon(completedSessions).length;
  const questsCompleted = completedSessions > 0 ? 1 : 0; // Simple logic for now

  return (
    <div className="p-4 h-full">
      <header className="py-4 flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://picsum.photos/200" alt="User Avatar" data-ai-hint="avatar pixelated" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="font-headline text-2xl text-accent">Trainer</h1>
        <div className="flex gap-2">
          <Badge variant="secondary" className="font-headline">Level {discoveredCount}</Badge>
          <Badge variant="secondary" className="font-headline">Novice</Badge>
        </div>
      </header>

      <div className="space-y-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent className="font-body text-sm space-y-2">
            <p>Total Focus Time: <span className="font-headline text-accent">{formatTime(displayTime)}</span></p>
            <p>Focumon Discovered: <span className="font-headline text-accent">{discoveredCount}</span></p>
            <p>Quests Completed: <span className="font-headline text-accent">{questsCompleted}</span></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
