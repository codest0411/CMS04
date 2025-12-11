import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const EmptyState = ({ title = 'No entries yet', subtitle = 'Add your first item to get started.' }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-black/20 px-6 py-12 text-center text-white/70"
  >
    <div className="rounded-2xl bg-white/5 p-3 mb-4">
      <Sparkles className="size-6 text-neon-green" />
    </div>
    <p className="text-lg font-semibold text-white">{title}</p>
    <p className="text-sm mt-2 max-w-md">{subtitle}</p>
  </motion.div>
);

export default EmptyState;
