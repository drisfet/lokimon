import Head from "next/head";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { IRefPhaserGame } from "@/PhaserGame";

const inter = Inter({ subsets: ["latin"] });

// Dynamically import PhaserGame with no SSR
const PhaserGame = dynamic(
    () => import("@/PhaserGame").then(mod => mod.PhaserGame),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-64">Loading game...</div>
    }
);

// Dynamically import App component to get the button functions
const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Portal() {
    const phaserRef = useRef<IRefPhaserGame>(null);
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    return (
        <>
            <Head>
                <title>LOKIMON - Portal</title>
                <meta name="description" content="LOKIMON Portal - Your focus session adventure awaits" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                `}</style>
            </Head>
            
            <div className={`min-h-screen bg-gray-900 flex flex-col ${inter.className}`} style={{ border: '2px solid red' }}>
                {/* Test element to verify Tailwind is working */}
                <div className="bg-blue-500 text-white p-4 mb-4">
                    Tailwind Test - This should be blue with white text
                </div>
                
                {/* Additional test elements */}
                <div className="bg-red-500 text-white p-2 mb-2">
                    Red background test
                </div>
                <div className="text-green-500 font-bold">
                    Green text test
                </div>
                <div className="border-2 border-yellow-400 p-2 mb-2">
                    Yellow border test
                </div>
                {/* Header */}
                <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <span className="text-yellow-400 text-2xl">⭐</span>
                        <h1 className="text-white text-xl font-['Press_Start_2P'] tracking-wider">LOKIMON</h1>
                    </div>
                    <button className="text-gray-400 hover:text-gray-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </header>

                {/* Date Bar */}
                <div className="flex items-center justify-center py-3 px-4 bg-gray-800 border-b border-gray-700">
                    <button className="text-gray-400 hover:text-white mx-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <span className="text-gray-500 text-sm">{`< August 29, 2025 >`}</span>
                    <button className="text-gray-400 hover:text-white mx-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Phaser Game Container */}
                    <div className="flex-1 flex items-center justify-center p-4 relative">
                        <div
                            className="w-full max-w-4xl mx-auto mt-4 p-4"
                            style={{
                                width: '100%',
                                height: '70vh',
                                minHeight: '400px',
                                background: '#14b8a6',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <div
                                id="game-container-wrapper"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    id="game-master-container"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <AppWithoutSSR />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex justify-center space-x-2 p-4">
                        <button
                            onClick={() => {
                                // Dispatch event to change scene
                                window.dispatchEvent(new CustomEvent('change-scene'));
                            }}
                            style={{
                                background: '#374151',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontFamily: 'monospace'
                            }}
                        >
                            Change Scene
                        </button>
                        <button
                            onClick={() => {
                                // Dispatch event to toggle movement
                                window.dispatchEvent(new CustomEvent('toggle-movement'));
                            }}
                            style={{
                                background: '#374151',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontFamily: 'monospace'
                            }}
                        >
                            Toggle Movement
                        </button>
                        <button
                            onClick={() => {
                                // Dispatch event to add sprite
                                window.dispatchEvent(new CustomEvent('add-sprite'));
                            }}
                            style={{
                                background: '#374151',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontFamily: 'monospace'
                            }}
                        >
                            Add New Sprite
                        </button>
                        <button
                            onClick={() => {
                                window.location.href = '/';
                            }}
                            style={{
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontFamily: 'monospace'
                            }}
                        >
                            Start
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="flex justify-between px-4 py-2 bg-gray-800 border-t border-gray-700">
                        <div className="text-white">
                            <span className="text-gray-400">Focused for </span>
                            <span className="font-mono">00:07</span>
                        </div>
                        <div className="text-green-500">
                            <span className="text-gray-400">Time in focus </span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Top Tabs */}
                    <div className="flex space-x-4 px-4 py-2 bg-gray-800 border-t border-gray-700">
                        <button className="flex items-center space-x-2 text-orange-500 font-medium">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            <span>PORTAL</span>
                        </button>
                        <Link href="/focus">
                            <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 rounded-md transition-colors">
                                FOCUS NOW
                            </button>
                        </Link>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors">
                            <span>EVENTS</span>
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        </button>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="flex justify-around p-2 bottom-0 w-full bg-gray-800 border-t border-gray-700">
                    <button className="flex flex-col items-center space-y-1 text-green-500 hover:text-green-300 transition-colors">
                        <span className="text-xl">🐾</span>
                        <span className="text-xs">Lokimon</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-green-300 transition-colors">
                        <span className="text-xl">📚</span>
                        <span className="text-xs">Library</span>
                    </button>
                    <Link href="/">
                        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-green-300 transition-colors">
                            <span className="text-xl">🏠</span>
                            <span className="text-xs">Home</span>
                        </button>
                    </Link>
                    <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-green-300 transition-colors">
                        <span className="text-xl">👥</span>
                        <span className="text-xs">Party</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-green-300 transition-colors">
                        <span className="text-xl">👤</span>
                        <span className="text-xs">Profile</span>
                    </button>
                </nav>

                {/* Footer */}
                <footer className="text-center py-2 bg-gray-900 border-t border-gray-800">
                    <a href="https://lokimon.com" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                        lokimon.com
                    </a>
                </footer>
            </div>
        </>
    );
}