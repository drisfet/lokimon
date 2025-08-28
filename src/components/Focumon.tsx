import { cn } from "@/lib/utils";
import type { Focumon as FocumonType } from "@/lib/focumon";
import { Rabbit } from "lucide-react";
import { GeneratedFocumon } from "@/ai/flows/generate-focumon-flow";

const WavyPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
      <defs>
        <pattern id="wavy" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
          <path d="M 0 10 C 10 0, 30 0, 40 10" stroke="hsl(var(--accent))" fill="none" strokeWidth="2"/>
          <path d="M 0 30 C 10 20, 30 20, 40 30" stroke="hsl(var(--accent))" fill="none" strokeWidth="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wavy)"/>
    </svg>
)

const FocumonCharacter = ({ focumon, generatedFocumon } : { focumon?: FocumonType, generatedFocumon?: GeneratedFocumon | null }) => {
    // The AI-generated focumon takes priority for icon and animation
    const Icon = generatedFocumon ? Rabbit : (focumon ? focumon.icon : Rabbit);
    const animationClass = generatedFocumon?.animation?.includes("wag") ? "animate-wag" : "";
    
    return <Icon className={cn("w-48 h-48 drop-shadow-lg text-card-foreground", animationClass)} />
}

export default function Focumon({ focumon, generatedFocumon } : { focumon?: FocumonType, generatedFocumon?: GeneratedFocumon | null }) {
    return (
        <div className="relative aspect-square w-64 bg-primary rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
            <WavyPattern />
            <div className="relative z-10">
                <FocumonCharacter focumon={focumon} generatedFocumon={generatedFocumon}/>
            </div>
        </div>
    )
}
