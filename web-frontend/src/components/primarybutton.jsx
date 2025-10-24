import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ 
  label, 
  onClick, 
  type = "primary", 
  icon, 
  className = "",
  size = "default"
}) => {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-full",
    default: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const baseStyle =
    "font-semibold transition-all duration-300 transform flex items-center justify-center gap-2 relative overflow-hidden tracking-wider";

  const typeStyles = {
    primary:
      "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/30 border border-cyan-500/30",
    secondary:
      "bg-gray-900/80 text-white border border-gray-600 hover:border-cyan-400 hover:bg-gray-800/80 backdrop-blur-sm",
    outline:
      "border-2 border-cyan-500/50 text-cyan-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm",
    glowing:
      "relative overflow-hidden rounded-xl font-semibold tracking-wide " +
      "bg-gradient-to-r from-cyan-600 to-blue-600 text-white " +
      "shadow-lg hover:shadow-cyan-500/40 border border-cyan-400/30 transition-all duration-300"
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${sizeStyles[size]} ${typeStyles[type]} ${className}`}
    >
      {/* Subtle Animated Cyan Glow Layer */}
      {type === "glowing" && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 blur-xl opacity-40"
        />
      )}

      {/* Button Label */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <motion.span
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
        {label}
      </span>
    </motion.button>
  );
};

export default PrimaryButton;
