import type React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function RightSidebar({ isOpen, onClose, title, children }: RightSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-lg"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 h-full overflow-y-auto">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

