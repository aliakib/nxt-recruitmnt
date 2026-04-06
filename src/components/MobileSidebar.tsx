// src/components/MobileSidebar.tsx

"use client";

import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";

export default function MobileSidebar({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-64 bg-white h-full shadow-xl">
                <div className="p-4 flex justify-end">
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <div onClick={onClose}>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}