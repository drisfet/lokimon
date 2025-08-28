"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useFocusSession } from "@/hooks/useFocusSession";
import { getDiscoveredFocumon } from "@/lib/focumon";

export default function PartyPage() {
  const { completedSessions } = useFocusSession();
  const discoveredFocumon = getDiscoveredFocumon(completedSessions);
  const partySize = 4;
  const party = discoveredFocumon.slice(0, partySize);

  return (
    <div className="p-4 h-full">
      <header className="py-4">
        <h1 className="font-headline text-2xl text-accent">Party</h1>
        <p className="font-body text-muted-foreground">
          Your current team of Focumon.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {party.map((focumon) => (
          <Card
            key={focumon.id}
            className="aspect-square bg-card flex flex-col items-center justify-center"
          >
            <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
              <focumon.icon className="w-16 h-16 text-primary" />
              <span className="font-headline text-sm">{focumon.name}</span>
            </CardContent>
          </Card>
        ))}
        {[...Array(partySize - party.length)].map((_, i) => (
          <Card
            key={i}
            className="aspect-square bg-zinc-800 border-dashed border-zinc-600 flex items-center justify-center"
          >
            <CardContent className="p-0">
              <Plus className="w-10 h-10 text-zinc-600" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
