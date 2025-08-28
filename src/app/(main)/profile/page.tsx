import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="p-4 h-full">
      <header className="py-4 flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://picsum.photos/200" alt="User Avatar" data-ai-hint="avatar pixelated" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="font-headline text-2xl text-accent">Trainer</h1>
        <div className="flex gap-2">
          <Badge variant="secondary" className="font-headline">Level 7</Badge>
          <Badge variant="secondary" className="font-headline">Novice</Badge>
        </div>
      </header>

      <div className="space-y-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Stats</CardTitle>
          </CardHeader>
          <CardContent className="font-body text-sm space-y-2">
            <p>Total Focus Time: <span className="font-headline text-accent">7h 12m</span></p>
            <p>Focumon Discovered: <span className="font-headline text-accent">1</span></p>
            <p>Quests Completed: <span className="font-headline text-accent">1</span></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
