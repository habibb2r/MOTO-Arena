import { motion } from "framer-motion";

interface DashboardTitleProps {
  title: string;
  subtitle?: string;
}

const DashboardTitle = ({ title, subtitle }: DashboardTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md overflow-hidden"
    >
      <div className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-500 text-sm"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mt-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default DashboardTitle;
