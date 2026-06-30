import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", icon: Icon, className = "", ...props }) {
  const base = variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "btn-ghost";
  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`${base} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </motion.button>
  );
}
