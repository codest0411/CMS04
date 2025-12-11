import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatsGrid = ({ stats = [] }) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {stats.map(({ label, value, icon: Icon, trend, accentClass = 'text-neon-green', to }, idx) => {
      const Wrapper = to ? Link : 'div';

      return (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-0 text-white overflow-hidden"
        >
          <Wrapper
            to={to}
            className={
              to
                ? 'block p-5 h-full hover:bg-white/10 transition-colors cursor-pointer'
                : 'block p-5 h-full'
            }
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">{label}</span>
              {Icon && <Icon className={`size-4 ${accentClass}`} />}
            </div>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            {typeof trend === 'number' && (
              <p className="mt-1 text-xs text-white/60">
                {trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`} last 30 days
              </p>
            )}
          </Wrapper>
        </motion.div>
      );
    })}
  </div>
);

export default StatsGrid;
