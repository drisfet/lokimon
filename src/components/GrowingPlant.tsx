import { cn } from "@/lib/utils";

export default function GrowingPlant({ isRunning }: { isRunning: boolean }) {
  return (
    <div className={cn("relative w-64 h-64", isRunning ? "animate-grow" : "")}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Ground */}
            <line x1="50" y1="180" x2="150" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="2" className="ground" />

            {/* Seed */}
            <circle cx="100" cy="180" r="5" fill="hsl(var(--accent))" className="seed" />
            
            {/* Sprout */}
            <path d="M 100 180 Q 105 170 100 160" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" className="sprout" />
            
            {/* Stem */}
            <path d="M 100 160 L 100 100" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" className="stem" />

            {/* Branches and Leaves */}
            <g className="leaves">
                {/* Branch 1 */}
                <path d="M 100 120 Q 80 110 70 90" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                <circle cx="70" cy="90" r="8" fill="hsl(var(--primary))" />
                
                {/* Branch 2 */}
                <path d="M 100 110 Q 120 100 130 80" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                <circle cx="130" cy="80" r="10" fill="hsl(var(--primary))" />
                
                {/* Branch 3 */}
                <path d="M 100 100 Q 90 80 80 60" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
                <circle cx="80" cy="60" r="12" fill="hsl(var(--primary))" />

                 {/* Top leaves */}
                <circle cx="100" cy="40" r="20" fill="hsl(var(--primary))" />
            </g>
        </svg>
    </div>
  )
}
