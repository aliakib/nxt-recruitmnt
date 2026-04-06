"use client";

import { LayoutDashboard, Briefcase, Users, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { id: 'dashboard', path: "/", paths: ["/"], label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', path: "/jobs", paths: ["/jobs", "/jobs/add"], label: 'Jobs', icon: Briefcase },
    { id: 'candidates', path: "/candidates", paths: ["/candidates", "/candidates/add"], label: 'Candidates', icon: Users },
    { id: 'reports', path: "/reports", paths: ["/reports"], label: 'Reports', icon: BarChart3 },
    { id: 'settings', path: "/settings", paths: ["/settings"], label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-border">
        <Link href="/">
          <h1 className="text-xl font-semibold text-foreground">Nxt Recruitmnt</h1>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.paths.includes(pathname);

            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
