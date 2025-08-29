
'use client';

import { motion } from 'framer-motion';

const PixelArtFocumon = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    style={{ imageRendering: 'pixelated' }}
    animate={{ y: ["-52%", "-48%", "-52%"] }}
    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Body color: A reddish pink */}
    <path fill="#FF69B4" d="M12 18h24v18H12z" />
    {/* Stripes: A lighter pink */}
    <path fill="#FFC0CB" d="M15 18h3v18h-3z M21 18h3v18h-3z M27 18h3v18h-3z M33 18h3v18h-3z" />
    {/* Eyes: Black */}
    <path fill="#000000" d="M18 24h3v3h-3z M27 24h3v3h-3z" />
    {/* Outline: Darker pink/purple */}
    <path fill="#C71585" d="M12 17h24v1h-24z M11 18h1v18h-1z M36 18h1v18h-1z M12 36h24v1h-24z" />
  </motion.svg>
);


const PixelArtBackground = () => (
  <svg width="100%" height="100%" className="absolute inset-0">
    <defs>
      <pattern id="pixel-grass" patternUnits="userSpaceOnUse" width="16" height="16">
        {/* Main background color */}
        <rect width="16" height="16" fill="#4a7a7a" />
        {/* Darker grass blades */}
        <path d="M2 13v-2h1v2z M5 15v-3h1v3z M9 14v-2h1v2z M13 12v-3h1v3z" fill="#3b6262" />
        {/* Lighter grass highlights */}
        <path d="M3 8v-2h1v2z M7 6v-1h1v1z M11 9v-3h1v3z M14 7v-2h1v2z" fill="#98c898" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pixel-grass)" style={{ imageRendering: 'pixelated' }}/>
  </svg>
)


export default function PixelFocumon() {
    return (
        <div className="relative aspect-square w-full max-w-sm bg-zinc-800 overflow-hidden border-4 border-zinc-700 shadow-inner" style={{ imageRendering: 'pixelated' }}>
            <PixelArtBackground />
            <PixelArtFocumon />
            <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 20px 10px rgba(0,0,0,0.2)' }}></div>
        </div>
    )
}
