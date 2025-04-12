import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  variant?: "default" | "gradient" | "outlined";
}

const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  align = "center",
  variant = "default",
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const titleClasses = {
    default: "text-gray-800",
    gradient:
      "bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent",
    outlined:
      "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 border-b-2 border-orange-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative py-8 ${alignmentClasses[align]} mx-auto max-w-4xl px-4`}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4"
      >
        <motion.h2
          className={`font-bold text-3xl md:text-4xl lg:text-5xl ${titleClasses[variant]}`}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={`h-1 w-20 bg-orange-500 mt-4 rounded-full ${
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        }`}
      />
    </motion.div>
  );
};

export default Title;
