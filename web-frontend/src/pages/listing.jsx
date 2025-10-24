import React, { useState } from "react";
import PrimaryButton from "../components/primarybutton";

import car1 from "../assets/images/car1.jpg";
import car2 from "../assets/images/car2.jpg";
import car3 from "../assets/images/car3.jpg";
import car4 from "../assets/images/car4.jpg";
import car5 from "../assets/images/car5.avif";
import car6 from "../assets/images/car6.jpeg";
import car7 from "../assets/images/car7.jpg";
import car8 from "../assets/images/car8.jpg";
import car9 from "../assets/images/car9.jpg";
import car10 from "../assets/images/car10.jpg";
import car11 from "../assets/images/car11.jpeg";
import car12 from "../assets/images/car12.jpg";
import car13 from "../assets/images/car13.jpg";
import car14 from "../assets/images/car14.jpg";
import car15 from "../assets/images/car15.jpg";
import car16 from "../assets/images/car16.jpg";

const Listing = ({ goBack, goToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cars = [
    { id: 1, name: "Eco Pro", type: "Electric Sedan", price: "$45,999", image: car1, category: "electric" },
    { id: 2, name: "Urban X", type: "Compact SUV", price: "$39,999", image: car2, category: "electric" },
    { id: 3, name: "Performance GT", type: "Sports Coupe", price: "$68,999", image: car3, category: "performance" },
    { id: 4, name: "Family XL", type: "7-Seater SUV", price: "$52,999", image: car4, category: "family" },
    { id: 5, name: "Quantum S", type: "Electric Coupe", price: "$59,999", image: car5, category: "electric" },
    { id: 6, name: "Spectra Z", type: "Luxury EV", price: "$74,999", image: car6, category: "performance" },
    { id: 7, name: "AeroMax", type: "Electric Hatchback", price: "$42,999", image: car7, category: "electric" },
    { id: 8, name: "Vortex LX", type: "SUV", price: "$57,999", image: car8, category: "family" },
    { id: 9, name: "Ionix RS", type: "Electric Sedan", price: "$61,999", image: car9, category: "electric" },
    { id: 10, name: "Zenith Q", type: "Hybrid", price: "$48,999", image: car10, category: "performance" },
    { id: 11, name: "Falrix GT", type: "Electric Coupe", price: "$66,999", image: car11, category: "performance" },
    { id: 12, name: "Aventra X", type: "Electric SUV", price: "$71,999", image: car12, category: "family" },
    { id: 13, name: "Velos XR", type: "Compact EV", price: "$46,999", image: car13, category: "electric" },
    { id: 14, name: "Myra LX", type: "Luxury Coupe", price: "$84,999", image: car14, category: "performance" },
    { id: 15, name: "Kairo EV", type: "SUV", price: "$69,999", image: car15, category: "family" },
    { id: 16, name: "Arden GT", type: "Sports EV", price: "$91,999", image: car16, category: "performance" },
  ];

  const categories = [
    { id: "all", name: "All Models" },
    { id: "electric", name: "Electric" },
    { id: "performance", name: "Performance" },
    { id: "family", name: "Family" },
  ];

  const filteredCars =
    selectedCategory === "all"
      ? cars
      : cars.filter((car) => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white w-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-black text-white py-20 w-screen border-b border-gray-800/50">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent mb-4">
            Our Car Lineup
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the future of performance, innovation, and sustainable luxury.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full font-medium transition-all duration-300 text-center
              ${
                selectedCategory === category.id
                  ? "bg-cyan-500 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
              px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base md:px-8 md:py-3 md:text-lg
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-20 ">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8 justify-items-center">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="group bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 
                        w-[360px] h-[360px] flex flex-col justify-between text-center"
            >
              {/* Image box */}
              <div className="flex justify-center items-center bg-black/40 h-[60%] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="object-contain w-full h-full p-5 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info box */}
              <div className="flex flex-col justify-center items-center bg-gray-950/60 h-[40%] px-5 py-4">
                <h3 className="text-white font-semibold text-lg">{car.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{car.type}</p>
                <p className="text-cyan-400 text-base font-medium mt-2">{car.price}</p>
                <button
                  onClick={goToOrder}
                  className="mt-4 text-sm px-4 py-2 bg-cyan-500/90 hover:bg-cyan-400 text-black rounded-full font-medium transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 bg-gray-900 border-t border-gray-800/50">
        <h3 className="text-2xl font-bold mb-3">Can't Find What You're Looking For?</h3>
        <p className="text-gray-400 mb-6">
          Contact our specialists to discuss custom options or schedule a personalized test drive.
        </p>
        <div className="flex flex-col-2 sm:flex-row gap-4 justify-center">
          <PrimaryButton label="Contact Specialist" onClick={() => {}} type="primary" />
          <PrimaryButton label="Schedule Test Drive" onClick={() => {}} type="outline" />
        </div>
      </div>
    </div>
  );
};

export default Listing;
