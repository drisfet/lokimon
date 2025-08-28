import { cn } from "@/lib/utils";

const WavyPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
      <defs>
        <pattern id="wavy" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
          <path d="M 0 10 C 10 0, 30 0, 40 10" stroke="#BFFF00" fill="none" strokeWidth="2"/>
          <path d="M 0 30 C 10 20, 30 20, 40 30" stroke="#BFFF00" fill="none" strokeWidth="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wavy)"/>
    </svg>
)

const FocumonCharacter = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-48 h-48 drop-shadow-lg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="pixelate" x="0" y="0" width="100%" height="100%">
          <feFlood x="4" y="4" height="2" width="2"/>
          <feComposite width="6" height="6"/>
          <feTile result="a"/>
          <feComposite in="SourceGraphic" in2="a" operator="in"/>
          <feMorphology operator="dilate" radius="3"/>
        </filter>
      </defs>
      
      <g className="translate-y-2">
         {/* Tail */}
        <path d="M80 75 Q 95 60 85 45" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" className="animate-wag" />
        
        {/* Body */}
        <path d="M 30 80 A 30 35 0 1 1 70 80 Z" fill="#FFFFFF" />
        
        {/* Eyes */}
        <circle cx="45" cy="55" r="5" fill="#1A1A1A" />
        <circle cx="65" cy="55" r="5" fill="#1A1A1A" />
        <circle cx="46" cy="54" r="2" fill="white" />
        <circle cx="66" cy="54" r="2" fill="white" />
        
        {/* Ears */}
        <path d="M 25 50 Q 15 20 40 30 Z" fill="#FFFFFF" />
        <path d="M 75 50 Q 85 20 60 30 Z" fill="#FFFFFF" />
      </g>
    </svg>
)

export default function Focumon() {
    return (
        <div className="relative aspect-square w-64 bg-primary rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
            <WavyPattern />
            <div className="relative z-10">
                <FocumonCharacter />
            </div>
        </div>
    )
}