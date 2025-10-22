import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./primarybutton";

const Navbar = ({ onHome, onBrowse, onOrder }) => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-gray-900 to-gray-800/90 border-b border-gray-700/40 backdrop-blur-xl shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* --- Company Logo --- */}
        <motion.div
          onClick={onHome}
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-extrabold tracking-wide cursor-pointer select-none"
        >
         <span className="text-white">Zuki</span>
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent text-5xl font-black ml-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
            X
          </span>
        </motion.div>

        {/* --- Navigation + Order Button Group --- */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-lg">
            <motion.a
              whileHover={{ scale: 1.05 }}
              onClick={onHome}
              className="cursor-pointer text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Home
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              onClick={onBrowse}
              className="cursor-pointer text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Browse
            </motion.a>
          </div>

          {/* Order Now Button */}
          <PrimaryButton
            label="Order Now"
            onClick={onOrder}
            type="glowing"
            className="text-base px-8 py-3"
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
