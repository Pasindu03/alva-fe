import type React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export function Sidebar({ isOpen, onClose, title, children }: SidebarProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg"
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-4 max-h-[80vh] overflow-y-auto">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

