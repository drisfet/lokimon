import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export default function Header({ 
  title = "LOKIMON", 
  showMenu = true, 
  onMenuClick 
}: HeaderProps) {
  return (
    <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <span className="text-yellow-400 text-2xl">⭐</span>
        <h1 className="text-white text-xl font-['Press_Start_2P'] tracking-wider">
          {title}
        </h1>
      </div>
      
      {showMenu && (
        <button 
          onClick={onMenuClick}
          className="text-gray-400 hover:text-gray-200 transition-colors p-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </header>
  );
}