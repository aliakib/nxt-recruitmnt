"use client";

import { useEffect, useState } from "react";
import { LogOut, Settings, User, X } from "lucide-react";

interface UserType {
  name: string;
  role: string;
  email: string;
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

export default function ProfileDrawer({ isOpen, onClose, user }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`relative w-[380px] h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold">Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-6">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold mb-3">
                {getInitials(user.name)}
              </div>
            )}

            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 border">
              <User className="w-4 h-4" />
              View Profile
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 border">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Footer (Logout) */}
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 border">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}