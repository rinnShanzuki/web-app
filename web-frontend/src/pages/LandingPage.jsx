import React, { useState, useEffect, useRef } from "react";
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

  const carImagesImport = import.meta.glob("../assets/images/car*.{png,jpg,jpeg,webp,avif,svg}", { eager: true });
  const carImages = Object.values(carImagesImport).map((img) => img.default);


  const lineupCars = carImages.map((img, i) => ({
    id: i + 1,
    name: `Model ${i + 1}`,
    price: `$${(40000 + i * 2500).toLocaleString()}`,
    image: img,
  }));

  const carScrollRef = useRef(null);

  const scrollByAmount = (amount = 600) => {
    if (!carScrollRef.current) return;
    carScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
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
      
      {/* Car Lineup Section */}
      <section className="relative w-screen py-24 bg-gradient-to-b from-gray-900/60 to-gray-800/80 border-t border-gray-700/30 overflow-hidden">
        <div className="w-full text-center px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="uppercase tracking-[0.3em] text-cyan-400/80 text-sm mb-3">
              Vehicles
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent mb-4">
              Meet Our Iconic Lineup
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              From electric hypercars to intelligent grand tourers, every model redefines luxury, performance, and sustainability.
            </p>
          </motion.div>

          {/* Arrows + Scrollable Row */}
          <div className="relative w-screen overflow-hidden">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollByAmount(-700)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 md:p-4 rounded-full z-20 backdrop-blur-md"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Scrollable Car Row */}
            <motion.div
              ref={carScrollRef}
              id="car-scroll"
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-8 gap-16 justify-start px-[10vw]"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {lineupCars.length ? (
                lineupCars.map((car, idx) => (
                  <motion.div
                    key={car.id}
                    className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] snap-center text-center group cursor-pointer"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">{car.price}</p>
                  </motion.div>
                ))
              ) : (
                <div className="w-full py-12 text-gray-400">
                  No car images found in <code>src/assets/images</code>.
                </div>
              )}
            </motion.div>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollByAmount(700)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 md:p-4 rounded-full z-20 backdrop-blur-md"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Fading edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent z-10" />
          </div>
        </div>

        {/* ✅ Hide scrollbar globally for this container */}
        <style jsx>{`
          #car-scroll::-webkit-scrollbar {
            display: none;
          }
          #car-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      {/* Featured Car Showcase Section - FLEX */}
      <section
        className="
          w-screen
          grid xl:grid-cols-[30%_65%]
          md:grid-cols-1
          items-center
          gap-4          
          bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
          border-t border-gray-700/30
          py-24 px-5 lg:px-20
        "
      >
        {/* Text Side */}
        <div className="w-full flex flex-col justify-center text-left space-y-6">
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-cyan-400/80 text-sm"
          >
            Zenith. Driven.
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
          >
            Vanquish
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg"
          >
            The return of Vanquish marks the dawn of a new legend. Powered by a
            <span className="text-cyan-300 font-medium"> 5.2-litre twin-turbo V12 engine</span>,
            this masterpiece redefines supremacy in both power and presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col-2 sm:flex-row gap-3 pt-6"
          >
            <PrimaryButton
              label="Explore"
              onClick={onExplore}
              type="glowing"
              className="w-40 sm:w-44 text-base px-6 py-3"
            />
            <PrimaryButton
              label="Configure"
              onClick={onOrder}
              type="outline"
              className="w-40 sm:w-44 text-base px-6 py-3 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            />
          </motion.div>
        </div>

        {/* Image Side */}
        <div className="w-full justify-center md:justify-end items-center">
          <motion.img
            src="https://www.astonmartin.com/-/media/new-model-page-design---models/all_models_imagery-for-new-component/vanquish-am370/240814_am370_shot_01_kv_front_7_8_rgb_72.jpg?mw=1920&rev=2d21eb909967450eb301dbbf97c32547&extension=webp&hash=5F132D9303F4A905FE7B3A78CB00E985"
            alt="Vanquish"
            className="w-full md:max-w-[100%] object-contain pointer-events-none select-none"
          />
        </div>
      </section>

      {/* Super Tourer Style Section */}
      <section
        className="
          w-screen
          grid xl:grid-cols-[65%_30%]
          md:grid-cols-1
          items-center
          gap-2       
          bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950
          border-t border-gray-700/30
          py-24 px-6 lg:px-20
        "
      >
        {/* Image Group Wrapper */}
        <div className="w-full justify-center md:justify-start items-center">
          <div className="grid grid-cols-3 gap-6 w-[90%] max-w-7xl">
            <img
              src="https://www.astonmartin.com/-/media/new-model-page-design---models/all_models_imagery-for-new-component/vanquish-am370/240814_am370_shot_03_rear_100_rgb_72.jpg?mw=1920&rev=3433698f11f343f690aa125e7011710d&extension=webp&hash=52AE28D25C48B14404700EA5993A8F0A"
              className="h-[75vh] object-cover rounded-lg shadow-lg"
              alt="Vanquish Rear"
            />
            <img
              src="https://www.astonmartin.com/-/media/models---vanquish/final-images/vanquish-seat-all-models-trio.jpg?mw=1920&rev=ef5054c3ef4f4952aaa061104a8dc3d6&extension=webp&hash=D238589245FE52AADC294F4DAD87B3C7"
              className="h-[75vh] object-cover rounded-lg shadow-lg"
              alt="Vanquish Seat"
            />
            <img
              src="https://www.astonmartin.com/-/media/new-model-page-design---models/all_models_imagery-for-new-component/vanquish-am370/image20240819140622_side.jpg?mw=1920&rev=b2a2aa32502c4439859f1f3e33366ec0&extension=webp&hash=157943FA07740275FDC82F1344E8EA17"
              className="h-[75vh] object-cover rounded-lg shadow-lg"
              alt="Vanquish Side"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className=" w-full flex flex-col justify-center space-y-6">
          <h2 className="text-4xl text-justify lg:text-5xl font-bold leading-tight">
            The world’s first <br /> Super Tourer
          </h2>

          <p className="text-lg text-justify text-gray-400 leading-relaxed">
            Redefining and reinventing what it means to be a tourer.
            A new standard of driver connection and innovative luxury.
          </p>

          <div className="mt-4 space-y-6">
            <div>
              <p className="font-medium text-gray-400 text-sm">
                Power <span className="text-xs">PS</span>
              </p>
              <p className="text-4xl font-extrabold">700</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 text-sm">
                0-62 MPH <span className="text-xs">S</span>
              </p>
              <p className="text-4xl font-extrabold">3.5</p>
            </div>
            <div>
              <p className="font-medium text-gray-400 text-sm">
                Top Speed <span className="text-xs">MPH</span>
              </p>
              <p className="text-4xl font-extrabold">202</p>
            </div>

            <p className="text-sm text-gray-500 italic">
              * DB12 S specifications
            </p>
          </div>
        </div>
      </section>
      
      {/* 🌟 Premium Features Section */}
      <section className="py-28 w-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black border-t border-gray-800/50">
        <div className="w-full px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
              Premium Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover the craftsmanship and technology that define the pinnacle of automotive excellence.
            </p>
          </motion.div>

          {/* ✅ Fixed 3x2 layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
              grid 
              grid xl:grid-cols-3
              md:grid-cols-1 
              gap-10 
              justify-center 
              max-w-[950px] 
              mx-auto
              place-items-center
            "
          >
            {[
              {
                icon: "⚡",
                title: "Exhilarating Power",
                description:
                  "Experience flawless acceleration with whisper-quiet precision—an effortless surge of power that redefines performance."
              },
              {
                icon: "🌿",
                title: "Sustainable Elegance",
                description:
                  "Our vehicles merge environmental consciousness with refined design, ensuring luxury that’s as responsible as it is remarkable."
              },
              {
                icon: "🛡️",
                title: "Uncompromising Safety",
                description:
                  "Advanced protection systems, intelligent sensors, and reinforced engineering crafted for total peace of mind."
              },
              {
                icon: "🤖",
                title: "Intelligent Innovation",
                description:
                  "A seamless blend of AI and automotive design—your car anticipates, adapts, and evolves with every journey."
              },
              {
                icon: "💺",
                title: "Bespoke Comfort",
                description:
                  "Immerse yourself in handcrafted interiors of premium leather, ambient serenity, and ergonomic perfection."
              },
              {
                icon: "💎",
                title: "Timeless Craftsmanship",
                description:
                  "Every line, curve, and stitch speaks of artistry—an uncompromising pursuit of beauty and precision."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                className="flex justify-center"
              >
                <Card
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  onClick={onExplore}
                  delay={index * 0.2}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* 5 Columns */}
          <div className="grid lg:grid-cols-5 gap-2 lg:gap-5 mb-12">
            
            {/* Explore */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Models</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Quantum Sport</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">What is Q-Drive?</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">SUV Models</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Electric Models</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Inside Quantum</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Subscribe to Updates</a></li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Offers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Find a Dealer</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">New Inventory</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Pre-Owned Inventory</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Certified Pre-Owned</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Compare Vehicles</a></li>
              </ul>
            </div>

            {/* Buy */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Buy</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Contact Dealer</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Trade-In Value</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Leasing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Financing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Military Program</a></li>
              </ul>
            </div>

            {/* Own */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Own</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">MyQuantum</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">About MyQuantum</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Quantum Connect</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Accessories</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Service & Maintenance</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Collision Care</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Newsroom</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Accessibility</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Battery Info</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800/70 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 QUANTUM AUTO. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-youtube"></i></a>
              <a href="#" className="hover:text-cyan-400 transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
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