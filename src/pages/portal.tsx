import dynamic from "next/dynamic";
import AppShell from "@/components/AppShell";
import { IRefPhaserGame } from "@/PhaserGame";
import { useRef, useState } from "react";

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
        <AppShell
            title="LOKIMON - Portal"
            showHeader={true}
            showDateBar={true}
            showBottomNav={true}
            showControlButtons={true}
            showStats={true}
            showTopTabs={true}
            headerProps={{
                showMenu: true,
                onMenuClick: () => console.log("Menu clicked")
            }}
            dateBarProps={{
                currentDate: "< August 29, 2025 >",
                onPrevious: () => console.log("Previous date"),
                onNext: () => console.log("Next date")
            }}
            controlButtonsProps={{
                onSceneChange: () => {
                    window.dispatchEvent(new CustomEvent('change-scene'));
                },
                onToggleMovement: () => {
                    window.dispatchEvent(new CustomEvent('toggle-movement'));
                },
                onAddSprite: () => {
                    window.dispatchEvent(new CustomEvent('add-sprite'));
                },
                onStart: () => {
                    window.location.href = '/';
                }
            }}
            statsProps={{
                focusedTime: "00:07",
                focusPercentage: 100
            }}
            topTabsProps={{
                tabs: [
                    { id: "portal", label: "PORTAL", isActive: true, badge: true },
                    { id: "focus", label: "FOCUS NOW", href: "/focus" },
                    { id: "events", label: "EVENTS", badge: true }
                ]
            }}
            bottomNavProps={{
                items: [
                    { icon: "🐾", label: "Lokimon", href: "/portal", isActive: true },
                    { icon: "📚", label: "Library", href: "/library" },
                    { icon: "🏠", label: "Home", href: "/" },
                    { icon: "👥", label: "Party", href: "/party" },
                    { icon: "👤", label: "Profile", href: "/profile" }
                ]
            }}
            customStyles={{
                // Ensure proper overflow handling
                overflow: 'hidden',
                height: '100vh'
            }}
        >
            {/* Main Content - Phaser Game Container */}
            <div
                className="flex-1 flex flex-col min-h-0 pr-0 md:pr-16"
                style={{ overflow: 'hidden' }}
            >
                <div
                    className="flex-1 flex items-center justify-center p-4"
                    style={{ overflow: 'hidden' }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '1024px',
                            height: '100%',
                            maxHeight: '768px',
                            background: '#14b8a6',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            margin: '0 auto'
                        }}
                    >
                        <AppWithoutSSR />
                    </div>
                </div>
            </div>
        </AppShell>
    );
}