import { Card, CardContent } from "@/components/ui/card";
import { Rabbit, Plus } from "lucide-react";

export default function PartyPage() {
  return (
    <div className="p-4 h-full">
      <header className="py-4">
        <h1 className="font-headline text-2xl text-accent">Party</h1>
        <p className="font-body text-muted-foreground">Your current team of Focumon.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card className="aspect-square bg-card flex flex-col items-center justify-center">
          <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
            <Rabbit className="w-16 h-16 text-primary" />
            <span className="font-headline text-sm">Focu</span>
          </CardContent>
        </Card>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="aspect-square bg-zinc-800 border-dashed border-zinc-600 flex items-center justify-center">
            <CardContent className="p-0">
              <Plus className="w-10 h-10 text-zinc-600" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
