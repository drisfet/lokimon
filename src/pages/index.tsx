import Head from "next/head";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>LOKIMON - Focus Sessions as Idle RPG</title>
                <meta name="description" content="LOKIMON - An AI-augmented browser-based Progressive Web App reimagining focus sessions as an idle RPG." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#26a69a" />
            </Head>
            <main className={`min-h-screen bg-gray-900 flex flex-col ${inter.className}`}>
                <AppWithoutSSR />
                
                {/* Main content area */}
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl font-bold text-white mb-6 font-pixel tracking-wider">LOKIMON</h1>
                        <p className="text-teal-200 text-xl mb-8 leading-relaxed">
                            Transform your focus sessions into an epic idle RPG adventure. Level up your character, grow your garden, and achieve your goals while staying productive.
                        </p>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Link href="/portal" className="block">
                                <button className="btn-primary">
                                    Start Your Journey
                                </button>
                            </Link>
                            
                            <button className="btn-secondary">
                                <span className="text-2xl mr-2">📚</span>
                                Guide
                            </button>
                            
                            <button className="btn-secondary">
                                <span className="text-2xl mr-2">🎮</span>
                                Controls
                            </button>
                            
                            <button className="btn-secondary">
                                <span className="text-2xl mr-2">⚙️</span>
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
