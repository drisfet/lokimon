"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFocusSession } from "@/hooks/useFocusSession";
import { focumonLibrary } from "@/lib/focumon";

export default function LibraryPage() {
  const { completedSessions } = useFocusSession();
  const totalFocumon = focumonLibrary.length;

  const discoveredFocumon = focumonLibrary.filter(
    (f) => completedSessions >= f.discoveryThreshold
  );

  return (
    <div className="p-4 h-full">
      <header className="py-4">
        <h1 className="font-headline text-2xl text-accent">Library</h1>
        <p className="font-body text-muted-foreground">
          Discovered: {discoveredFocumon.length}/{totalFocumon}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {focumonLibrary.map((focumon) => {
          const isDiscovered = discoveredFocumon.some((d) => d.id === focumon.id);
          return (
            <Card
              key={focumon.id}
              className={`aspect-square flex flex-col items-center justify-center ${
                isDiscovered ? "bg-card" : "bg-zinc-800"
              }`}
            >
              <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                {isDiscovered ? (
                  <>
                    <focumon.icon className="w-10 h-10 text-primary" />
                    <span className="font-headline text-xs">
                      #{focumon.id.toString().padStart(3, "0")}
                    </span>
                  </>
                ) : (
                  <p className="font-headline text-2xl text-zinc-600">?</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
