import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative panel panel-pad w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-ink">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="text-sm text-ink-muted">{children}</div>
            {footer && <div className="flex items-center justify-end gap-2 mt-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
