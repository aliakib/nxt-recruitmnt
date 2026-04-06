"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Notification } from "@/types";
import notificationsData from "@/data/mockNotifications";
import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationsDrawer({ isOpen, onClose }: Props) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [readIds, setReadIds] = useState<Set<string>>(new Set());
    const [visible, setVisible] = useState<boolean>(false);

    const handleClick = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));

        setReadIds((prev) => {
            const updated = new Set(prev);
            updated.add(id);
            return updated;
        });
    };

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen])


    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">

            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`relative w-[380px] h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="font-semibold">Notifications</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {notificationsData.map((item: Notification) => {
                        const isExpanded = expandedId === item.id;
                        const isRead = readIds.has(item.id);

                        return (
                            <div
                                key={item.id}
                                onClick={() => handleClick(item.id)}
                                className={`p-4 border-b cursor-pointer transition ${isRead ? "bg-white" : "bg-blue-50"
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <p className={`font-medium ${isRead ? "text-gray-700" : "text-black"}`}>
                                        {item.title}
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                        {item.time}
                                    </span>
                                </div>

                                {isExpanded && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}