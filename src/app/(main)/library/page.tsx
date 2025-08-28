import { Card, CardContent } from "@/components/ui/card";
import { Rabbit } from "lucide-react";

export default function LibraryPage() {
  const discovered = 1;
  const total = 151;

  return (
    <div className="p-4 h-full">
      <header className="py-4">
        <h1 className="font-headline text-2xl text-accent">Library</h1>
        <p className="font-body text-muted-foreground">Discovered: {discovered}/{total}</p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <Card className="aspect-square bg-card flex flex-col items-center justify-center">
          <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
            <Rabbit className="w-10 h-10 text-primary" />
            <span className="font-headline text-xs">#001</span>
          </CardContent>
        </Card>
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="aspect-square bg-zinc-800 flex items-center justify-center">
            <CardContent className="p-0">
              <p className="font-headline text-2xl text-zinc-600">?</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
