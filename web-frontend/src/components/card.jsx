// src/components/card.jsx
import React from "react";
import { motion } from "framer-motion";

const Card = ({ icon, title, description, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      className="relative bg-gray-800/50 backdrop-blur-md border border-gray-700 p-8 rounded-3xl cursor-pointer group overflow-hidden"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl backdrop-blur-sm" />
      
      <div className="relative z-10">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="text-4xl mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30"
        >
          {icon}
        </motion.div>
        
        <motion.h4 
          className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500"
        >
          {title}
        </motion.h4>
        
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          {description}
        </p>
        
        {/* Animated arrow indicator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="flex items-center text-blue-400"
        >
          <span className="font-medium mr-2">Discover</span>
          <motion.svg 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </motion.svg>
        </motion.div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </motion.div>
  );
};

export default Card;