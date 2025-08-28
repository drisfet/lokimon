"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateFocumon, GeneratedFocumon } from "@/ai/flows/generate-focumon-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DesignerPage() {
  const [focumon, setFocumon] = useState<GeneratedFocumon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setFocumon(null);
    try {
      const newFocumon = await generateFocumon({ prompt: "a cute and powerful creature" });
      setFocumon(newFocumon);
    } catch (error) {
      console.error("Failed to generate Focumon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col items-center justify-center text-center">
      <header className="absolute top-0 left-0 p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            &larr;
          </Button>
        </Link>
      </header>
      <div className="w-full max-w-md">
        <h1 className="font-headline text-2xl text-accent mb-4">Focumon Designer</h1>
        <p className="font-body text-muted-foreground mb-8">
          Use the power of AI to generate a new Focumon with its own personality and behaviors.
        </p>

        <Button onClick={handleGenerate} disabled={isLoading} className="mb-8 font-headline">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate New Focumon"
          )}
        </Button>

        {focumon && (
           <Card className="text-left">
            <CardHeader>
              <CardTitle className="font-headline">{focumon.name}</CardTitle>
              <CardDescription className="font-body pt-2">{focumon.description}</CardDescription>
            </CardHeader>
            <CardContent className="font-body text-sm space-y-2">
                <div>
                    <h3 className="font-headline text-xs text-muted-foreground">Personality</h3>
                    <p>{focumon.personality}</p>
                </div>
                 <div>
                    <h3 className="font-headline text-xs text-muted-foreground">Animation</h3>
                    <p>{focumon.animation}</p>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
