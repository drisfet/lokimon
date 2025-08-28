"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rabbit, BookOpen, Home, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/library', icon: BookOpen, label: 'Library' },
  { href: '/', icon: Rabbit, label: 'Focumon' },
  { href: '/party', icon: Users, label: 'Party' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-900 border-t border-zinc-800">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1 flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-1">
                <item.icon
                  className={cn(
                    'h-6 w-6 transition-colors',
                    isActive ? 'text-accent' : 'text-gray-400'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    'text-xs font-mono transition-colors',
                    isActive ? 'text-accent' : 'text-gray-400'
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
