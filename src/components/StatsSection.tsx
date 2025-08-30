interface StatsSectionProps {
  focusedTime?: string;
  focusPercentage?: number | string;
  className?: string;
}

export default function StatsSection({
  focusedTime = "00:07",
  focusPercentage = 100,
  className = ""
}: StatsSectionProps) {
  return (
    <div className={`flex flex-col sm:flex-row justify-between px-2 sm:px-4 py-2 bg-gray-800 border-t border-gray-700 z-30 ${className}`}>
      <div className="text-white text-center sm:text-left mb-1 sm:mb-0">
        <span className="text-gray-400 text-xs sm:text-sm">Focused for </span>
        <span className="font-mono font-bold text-green-400">{focusedTime}</span>
      </div>
      <div className="text-green-500 text-center sm:text-right">
        <span className="text-gray-400 text-xs sm:text-sm">Time in focus </span>
        <span className="font-bold">{focusPercentage}%</span>
      </div>
    </div>
  );
}