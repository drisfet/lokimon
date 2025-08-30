import { useState } from "react";

interface DateBarProps {
  currentDate?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function DateBar({ 
  currentDate = "< August 29, 2025 >", 
  onPrevious, 
  onNext 
}: DateBarProps) {
  return (
    <div className="flex items-center justify-center py-3 px-4 bg-gray-800 border-b border-gray-700">
      <button 
        onClick={onPrevious}
        className="text-gray-400 hover:text-white mx-2 p-1 rounded transition-colors"
        aria-label="Previous date"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-gray-500 text-sm font-medium">{currentDate}</span>
      <button 
        onClick={onNext}
        className="text-gray-400 hover:text-white mx-2 p-1 rounded transition-colors"
        aria-label="Next date"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}