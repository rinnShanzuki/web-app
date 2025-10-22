import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/card";
import PrimaryButton from "../components/primarybutton";

const LandingPage = ({ onExplore, onOrder }) => {
  const [activeModel, setActiveModel] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveModel((prev) => (prev + 1) % carModels.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const carModels = [
    {
      id: 1,
      name: "Nexus EV",
      type: "Electric Sedan",
      price: "$45,999",
      range: "350 miles",
      features: ["Quantum Charging", "Neural Autopilot", "Holographic Display"],
      image: "https://hips.hearstapps.com/hmg-prod/images/2026-lexus-ev-exterior-111-6809022c48dc8.jpg?crop=0.841xw:1.00xh;0.0849xw,0&resize=2048:*",
      badge: "Quantum Series",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Bugatti LVN",
      type: "Hypercar",
      price: "$18,700,000",
      range: "260 miles",
      features: ["Quad-Turbo W16", "Carbon Fiber Body", "Exclusive Luxury Interior"],
      image: "https://bugatti-newsroom.imgix.net/fc5cfcbe-f01f-4ee2-b664-d26ed3ca11db/01_LVN_34-Front",
      badge: "Legend Series",
      color: "from-gray-800 to-blue-600"
    },
    {
      id: 3,
      name: "Koenigsegg Gemera",
      type: "Mega GT Hybrid",
      price: "$1,700,000",
      range: "600 miles",
      features: ["Twin-Turbo Freevalve Engine", "Electric Torque Vectoring", "4-Seater Hyper Performance"],
      image: "https://m.netinfo.bg/media/images/50231/50231889/1180-663-koenigsegg-gemera.jpg",
      badge: "Aether Series",
      color: "from-amber-400 to-orange-600"
    }
  ];

  const features = [
    {
      icon: "⚡",
      title: "Quantum Acceleration",
      description: "0-60 mph in 1.9 seconds with our revolutionary quantum drive technology.",
      spec: "1.9s 0-60 mph"
    },
    {
      icon: "🔋",
      title: "Neural Battery",
      description: "Self-learning battery system with up to 500 miles of intelligent range optimization.",
      spec: "500 Mile Range"
    },
    {
      icon: "🧠",
      title: "AI Autopilot",
      description: "Fully autonomous driving with neural network processing and predictive safety.",
      spec: "Level 5 Autonomy"
    }
  ];

  const nextModel = () => {
    setActiveModel((prev) => (prev + 1) % carModels.length);
  };

  const prevModel = () => {
    setActiveModel((prev) => (prev - 1 + carModels.length) % carModels.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white w-screen overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Enhanced Hero Carousel */}
      <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={carModels[activeModel].image}
              alt={carModels[activeModel].name}
              className="w-full h-full object-cover"
            />
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-r ${carModels[activeModel].color} opacity-20`} />
            
            {/* Animated Scan Lines */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-5"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(59, 130, 246, 0.1) 2px,
                    rgba(59, 130, 246, 0.1) 4px
                  )
                `
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Model Info Overlay - Left Aligned (Moved Up) */}
        <div className="absolute inset-0 flex items-start justify-start z-20 px-8 lg:px-16 pt-5 md:pt-5 lg:pt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl text-left space-y-6"
          >
            {/* Car Badge */}
            <motion.div variants={itemVariants} className="space-y-2 mb-8">
              <motion.span 
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-xl"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-cyan-400 rounded-full mr-3"
                />
                {carModels[activeModel].badge}
              </motion.span>
            </motion.div>

            {/* Model Name */}
            <motion.h1 
              variants={itemVariants}
              className={`${
                carModels[activeModel].id === 3
                  ? "text-5xl sm:text-6xl md:text-6xl lg:text-7xl"
                  : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              } font-black mb-6 leading-tight bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent text-justify`}
            >
              {carModels[activeModel].name}
            </motion.h1>

            {/* Type + Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 mb-6 font-light leading-relaxed max-w-xl text-justify"
            >
              The{" "}
              <span className="text-cyan-300 font-medium">
                {carModels[activeModel].type}
              </span>{" "}
              redefines performance and design, combining next-generation engineering
              with unmatched luxury. With an impressive range of{" "}
              <span className="text-cyan-300">
                {carModels[activeModel].range}
              </span>{" "}
              and a starting price of{" "}
              <span className="text-cyan-300">
                {carModels[activeModel].price}
              </span>
              , this model delivers a seamless fusion of innovation and power.
            </motion.p>

            {/* Features in Paragraph Form */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-base leading-relaxed max-w-xl text-justify"
            >
              Features include{" "}
              <span className="text-cyan-300 font-medium">
                {carModels[activeModel].features.join(", ")}
              </span>
              , seamlessly integrated to transform driving into an intelligent, connected,
              and immersive experience like no other.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start pt-6"
            >
              <div className="flex w-full sm:w-auto gap-4">
                <PrimaryButton 
                  label="Quantum Reserve" 
                  onClick={onOrder} 
                  type="glowing" 
                  className="w-44 sm:w-48 text-base px-6 py-3"
                />
                <PrimaryButton 
                  label="Explore Dimensions" 
                  onClick={onExplore} 
                  type="outline" 
                  className="w-44 sm:w-48 text-base px-6 py-3 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6">
          <div className="flex gap-3">
            {carModels.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveModel(index)}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeModel === index 
                    ? `bg-gradient-to-r ${carModels[index].color} scale-125 glow-cyan` 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 w-screen bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.span 
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 text-cyan-300 text-lg font-medium mb-8 backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
            >
              QUANTUM INNOVATION
            </motion.span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Beyond Imagination
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Experience technology so advanced, it redefines the boundaries of electric mobility and luxury.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -20,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  spec={feature.spec}
                  onClick={onExplore}
                  delay={index * 0.2}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 w-screen bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-2xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              className="relative rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-cyan-500/30 p-16 backdrop-blur-2xl glow-purple"
              whileHover={{ scale: 1.02 }}
            >
              {/* Floating Particles */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-full blur-xl opacity-50"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-xl opacity-50"
              />
              
              <motion.h3 
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready for the Quantum Leap?
              </motion.h3>
              <motion.p 
                className="mb-12 text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Join the revolution and be among the first to experience the future of automotive excellence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <PrimaryButton 
                  label="Begin Your Journey" 
                  onClick={onOrder} 
                  type="glowing" 
                  icon="🌌"
                  className="text-lg px-16 py-5"
                />
                <PrimaryButton 
                  label="Virtual Tour" 
                  onClick={onExplore} 
                  type="outline" 
                  icon="👁️"
                  className="text-lg px-16 py-5 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 w-screen bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <motion.h4 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
                >
                  QUANTUM AUTO
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-400 text-sm leading-relaxed mb-6"
                >
                  Redefining the boundaries of electric mobility with quantum-inspired technology and sustainable luxury for the future.
                </motion.p>
                <div className="flex gap-4">
                  {['🌌', '⚡', '🚀', '💫'].map((icon, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl backdrop-blur-xl border border-cyan-500/20 flex items-center justify-center text-cyan-300 cursor-pointer glow-cyan hover:border-cyan-400/50 transition-all duration-300"
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {['QUANTUM SERIES', 'INNOVATION', 'EXPERIENCE', 'SUPPORT'].map((category, index) => (
                <div key={category}>
                  <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-lg font-semibold text-cyan-300 mb-6"
                  >
                    {category}
                  </motion.h4>
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="space-y-3 text-sm"
                  >
                    {Array.from({ length: 4 }, (_, i) => (
                      <motion.li 
                        key={i}
                        whileHover={{ x: 5, color: "#67e8f9" }}
                        className="text-gray-400 hover:text-cyan-300 transition-all duration-300 cursor-pointer"
                      >
                        Quantum Link {i + 1}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-gray-800/50 text-center"
            >
              <p className="text-gray-500 text-sm">
                © 2024 QUANTUM AUTO. All rights reserved. | The Future is Electric | Beyond Imagination
              </p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for Glow Effects */}
      <style jsx>{`
        .glow-blue {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .glow-cyan {
          box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
        }
        .glow-purple {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
        }
        .glow-blue:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
        .glow-cyan:hover {
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;