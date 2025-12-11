import { AnimatePresence, motion } from 'framer-motion';

const ConfirmModal = ({ isOpen, title = 'Are you sure?', message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-base-charcoal p-6 text-white"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-red-400">{title}</p>
          <p className="mt-3 text-sm text-white/80">{message}</p>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-full bg-red-500/90 px-4 py-2 text-sm font-semibold text-white"
            >
              Yes, delete it
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmModal;
