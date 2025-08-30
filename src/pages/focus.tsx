import dynamic from "next/dynamic";
import { GameCanvas, IRefGameCanvas } from "@/components/GameCanvas";
import { useRef } from "react";

// Dynamically import GameCanvas with no SSR
const GameCanvasComponent = dynamic(
    () => import("@/components/GameCanvas").then(mod => mod.GameCanvas),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-64">Loading game...</div>
    }
);

export default function Focus() {
    const gameCanvasRef = useRef<IRefGameCanvas>(null);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Simple header */}
            <header className="bg-gray-800 border-b border-gray-700 p-4 z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">⭐</span>
                        <h1 className="text-xl font-bold text-white">LOKIMON - Focus</h1>
                    </div>
                </div>
            </header>

            {/* Main content - Only the game canvas */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div
                    className="relative"
                    style={{
                        background: '#14b8a6',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                >
                    <GameCanvasComponent
                        ref={gameCanvasRef}
                        className="w-full h-full"
                        currentActiveScene={(scene) => {
                            console.log('Focus scene ready:', scene);
                        }}
                    />
                </div>
            </main>
        </div>
    );
}