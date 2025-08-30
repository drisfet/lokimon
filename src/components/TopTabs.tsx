import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
  href?: string;
  badge?: boolean;
}

interface TopTabsProps {
  tabs?: Tab[];
  className?: string;
}

export default function TopTabs({
  tabs = [
    { id: "portal", label: "PORTAL", isActive: true, badge: true },
    { id: "focus", label: "FOCUS NOW", href: "/focus" },
    { id: "events", label: "EVENTS", badge: true }
  ],
  className = ""
}: TopTabsProps) {
  return (
    <div className={`flex space-x-2 md:space-x-4 px-2 md:px-4 py-2 bg-gray-800 border-t border-gray-700 z-40 overflow-x-auto ${className}`}>
      {tabs.map((tab) => (
        <Link key={tab.id} href={tab.href || "#"}>
          <button
            className={`flex items-center space-x-1 md:space-x-2 transition-colors font-medium whitespace-nowrap ${
              tab.isActive
                ? "text-orange-500"
                : "text-gray-400 hover:text-orange-500"
            }`}
          >
            {tab.badge && (
              <span className={`w-2 h-2 rounded-full ${
                tab.isActive ? "bg-orange-500" : "bg-gray-500"
              }`}></span>
            )}
            <span className="text-xs md:text-sm">{tab.label}</span>
            {tab.badge && !tab.isActive && (
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </button>
        </Link>
      ))}
    </div>
  );
}