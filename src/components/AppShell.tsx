import { Inter } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";

import Header from "./Header";
import DateBar from "./DateBar";
import BottomNavigation from "./BottomNavigation";
import ControlButtons from "./ControlButtons";
import StatsSection from "./StatsSection";
import TopTabs from "./TopTabs";

const inter = Inter({ subsets: ["latin"] });

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showDateBar?: boolean;
  showBottomNav?: boolean;
  showControlButtons?: boolean;
  showStats?: boolean;
  showTopTabs?: boolean;
  headerProps?: any;
  dateBarProps?: any;
  controlButtonsProps?: any;
  statsProps?: any;
  topTabsProps?: any;
  bottomNavProps?: any;
  className?: string;
  customStyles?: object;
}

export default function AppShell({
  children,
  title = "LOKIMON",
  showHeader = true,
  showDateBar = false,
  showBottomNav = true,
  showControlButtons = false,
  showStats = false,
  showTopTabs = false,
  headerProps,
  dateBarProps,
  controlButtonsProps,
  statsProps,
  topTabsProps,
  bottomNavProps,
  className = "",
  customStyles = {}
}: AppShellProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="LOKIMON - An AI-augmented browser-based Progressive Web App reimagining focus sessions as an idle RPG." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#26a69a" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        `}</style>
      </Head>

      <div
        className={`min-h-screen bg-gray-900 flex flex-col ${inter.className} ${className}`}
        style={{
          ...customStyles,
          overflow: 'hidden',
          position: 'relative',
          height: '100vh'
        }}
      >
        {/* Header */}
        {showHeader && (
          <Header
            title={title}
            {...headerProps}
          />
        )}

        {/* Date Bar */}
        {showDateBar && (
          <DateBar {...dateBarProps} />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>

        {/* Control Buttons */}
        {showControlButtons && (
          <ControlButtons {...controlButtonsProps} />
        )}

        {/* Stats Section */}
        {showStats && (
          <StatsSection {...statsProps} />
        )}

        {/* Top Tabs */}
        {showTopTabs && (
          <TopTabs {...topTabsProps} />
        )}

        {/* Bottom Navigation - Hidden on desktop, shown on mobile */}
        {showBottomNav && (
          <div className="md:hidden">
            <BottomNavigation {...bottomNavProps} />
          </div>
        )}

        {/* Desktop Sidebar Navigation - Hidden on mobile, shown on desktop */}
        {showBottomNav && (
          <div className="hidden md:flex md:flex-col md:w-16 md:fixed md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 md:bg-gray-800 md:border-l md:border-gray-700 md:rounded-l-lg md:shadow-lg">
            <div className="flex flex-col space-y-4 p-2">
              {bottomNavProps?.items?.map((item: any, index: number) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 transition-colors p-2 rounded ${
                    item.isActive
                      ? "text-green-500 bg-gray-700"
                      : "text-gray-400 hover:text-green-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-2 bg-gray-900 border-t border-gray-800">
          <a
            href="https://lokimon.com"
            className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
          >
            lokimon.com
          </a>
        </footer>
      </div>
    </>
  );
}