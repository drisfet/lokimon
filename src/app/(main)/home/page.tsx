import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4 h-full">
      <header className="py-4">
        <h1 className="font-headline text-2xl text-accent">Home</h1>
        <p className="font-body text-muted-foreground">Your Focumon journey starts here.</p>
      </header>

      <div className="space-y-4">
        <Link href="/events">
          <Card className="hover:bg-zinc-800 transition-colors">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Quests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Check your daily and weekly quests.</p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/designer">
          <Card className="hover:bg-zinc-800 transition-colors">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Designer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Create and customize your Focumon.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
