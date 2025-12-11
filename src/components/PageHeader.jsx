import { motion } from 'framer-motion';

const PageHeader = ({ title, description, actions = null }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-sm uppercase tracking-[0.4em] text-neon-green">{title}</p>
      {description && <p className="text-white/70 mt-2 max-w-2xl">{description}</p>}
    </motion.div>
    {actions}
  </div>
);

export default PageHeader;
