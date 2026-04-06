"use client";

import { useState } from 'react';
import { Search, Bell, ChevronRight, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

// types
import { User } from '@/types';

// components
import NotificationsDrawer from './drawers/NotificationsDrawer';
import ProfileDrawer from './drawers/ProfileDrawer';

// utils
import getPageTitle from '@/utils/getPageTitle';
import getBreadcrumbs from '@/utils/getBreadCrumbs';
import { getInitials } from '@/utils/getInitials';
import MobileSidebar from './MobileSidebar';

const UserDetails: User = {
  name: "Sarah Johnson",
  role: "HR Manager",
  email: "sarahj@nxtrecruitment.com",
  image: undefined
}

export function Header() {
  const path = usePathname();
  const pathname = path.substring(1);
  const breadcrumbs = getBreadcrumbs(pathname);
  const title = getPageTitle(path);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  const searchValue = "";
  const onSearchChange = (value: string) => {

  }

  const handleOpenNotifications = () => {
    setProfileDropdownOpen(false);
    setNotificationDrawerOpen(true);
  }

  const handleOpenProfile = () => {
    setNotificationDrawerOpen(false);
    setProfileDropdownOpen(pd => !pd);
  }



  return (
    <header className="bg-white border-b border-border px-4 md:px-6 lg:px-8 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        {/* Mobile menu */}
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className={index === breadcrumbs.length - 1 ? 'text-foreground' : ''}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4" />}
            </div>
          ))}
        </div>
        <h2 className="hidden lg:hidden sm:block text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none w-64 text-foreground"
            />
          </div>
          <button className="relative p-2 hover:bg-accent rounded-lg transition-colors text-foreground cursor-pointer" onClick={handleOpenNotifications}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          <button
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white"
            onClick={handleOpenProfile}
            disabled={profileDropdownOpen}
          >
            {getInitials(UserDetails.name)}
          </button>
        </div>
      </div>
      <h2 className="hidden lg:block text-xl font-semibold text-foreground">{title}</h2>

      {/** notifications drawer */}
      <NotificationsDrawer isOpen={notificationDrawerOpen} onClose={() => setNotificationDrawerOpen(false)} />
      <ProfileDrawer isOpen={profileDropdownOpen} onClose={() => setProfileDropdownOpen(false)} user={UserDetails} />
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
