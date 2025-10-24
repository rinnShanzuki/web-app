import React from "react";
import { motion } from "framer-motion";

const Card = ({ icon, title, description, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="
        relative bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl cursor-pointer group overflow-hidden
        flex flex-col justify-center items-center text-center
        w-[288px] h-[288px]
        shadow-[0_4px_20px_rgba(0,0,0,0.4)]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/70 rounded-2xl" />

      <div className="relative z-10 flex flex-col justify-center items-center px-6">
        <div className="text-4xl mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          {icon}
        </div>

        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500">
          {title}
        </h4>

        <p className="text-gray-300 text-base leading-relaxed max-w-xs">{description}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </motion.div>
  );
};

export default Card;
