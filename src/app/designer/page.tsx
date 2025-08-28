import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DesignerPage() {
  return (
    <div className="p-4 h-screen flex flex-col items-center justify-center text-center">
       <header className="absolute top-0 left-0 p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            &larr;
          </Button>
        </Link>
      </header>
      <h1 className="font-headline text-2xl text-accent mb-4">Designer</h1>
      <p className="font-body text-muted-foreground">This is a placeholder for the designer page.</p>
    </div>
  );
}
