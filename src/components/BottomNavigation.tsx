import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface BottomNavigationProps {
  items?: NavItem[];
}

export default function BottomNavigation({
  items = [
    { icon: "🐾", label: "Lokimon", href: "/portal" },
    { icon: "📚", label: "Library", href: "/library" },
    { icon: "🏠", label: "Home", href: "/" },
    { icon: "👥", label: "Party", href: "/party" },
    { icon: "👤", label: "Profile", href: "/profile" }
  ]
}: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex justify-around p-1 md:p-2 w-full bg-gray-800 border-t border-gray-700 z-50 overflow-x-auto">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <button
            className={`flex flex-col items-center space-y-1 transition-colors min-w-[60px] ${
              pathname === item.href
                ? "text-green-500"
                : "text-gray-400 hover:text-green-300"
            }`}
          >
            <span className="text-xl md:text-2xl">{item.icon}</span>
            <span className="text-xs font-medium truncate w-full text-center">{item.label}</span>
          </button>
        </Link>
      ))}
    </nav>
  );
}