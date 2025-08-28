import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const quests = [
    { title: "First Focus", description: "Complete a 25-minute focus session.", completed: true },
    { title: "Steady Gaze", description: "Focus for a total of 1 hour.", completed: false },
    { title: "Collector", description: "Discover a new Focumon.", completed: false },
]

export default function EventsPage() {
  return (
    <div className="p-4">
       <header className="flex items-center py-4">
        <Link href="/" className="p-2 -ml-2">
          <Button variant="ghost" size="icon">
            &larr;
          </Button>
        </Link>
        <h1 className="font-headline text-2xl text-accent">Quests</h1>
      </header>

      <div className="space-y-4">
        {quests.map((quest, index) => (
            <Card key={index} className={quest.completed ? "bg-zinc-800 border-green-500/30" : ""}>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex justify-between items-center">
                        {quest.title}
                        {quest.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                </CardHeader>
                {!quest.completed && (
                    <CardFooter>
                        <Button variant="outline" className="font-headline text-xs">Claim Reward</Button>
                    </CardFooter>
                )}
            </Card>
        ))}
      </div>
    </div>
  );
}
