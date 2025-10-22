import React, { useState } from "react";
import PrimaryButton from "../components/primarybutton";

const Listing = ({ goBack, goToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const cars = [
    {
      id: 1,
      name: "Eco Pro",
      type: "Electric Sedan",
      price: "$45,999",
      range: "350 miles",
      features: ["Autopilot", "Premium Sound", "Fast Charging"],
      image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "electric"
    },
    {
      id: 2,
      name: "Urban X",
      type: "Compact SUV",
      price: "$39,999",
      range: "300 miles",
      features: ["All-Wheel Drive", "Panoramic Roof", "Smart Display"],
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "electric"
    },
    {
      id: 3,
      name: "Performance GT",
      type: "Sports Coupe",
      price: "$68,999",
      range: "280 miles",
      features: ["Ludicrous Mode", "Carbon Fiber", "Track Package"],
      image: "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "performance"
    },
    {
      id: 4,
      name: "Family XL",
      type: "7-Seater SUV",
      price: "$52,999",
      range: "320 miles",
      features: ["Third Row", "Family Mode", "Enhanced Safety"],
      image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "family"
    }
  ];

  const categories = [
    { id: "all", name: "All Models" },
    { id: "electric", name: "Electric" },
    { id: "performance", name: "Performance" },
    { id: "family", name: "Family" }
  ];

  const filteredCars = selectedCategory === "all" 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-screen overflow-x-hidden">
      
      {/* Hero Section - Full Width */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 w-screen">
        <div className="w-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Our Car Models
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 w-full">
            Explore our complete lineup of innovative vehicles, each designed to 
            deliver exceptional performance, comfort, and sustainability.
          </p>
        </div>
      </div>

      {/* Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12 w-full">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group w-full">
              <div className="relative overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {car.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
                    <p className="text-gray-600">{car.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indigo-600">{car.range}</div>
                    <div className="text-sm text-gray-500">Range</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {car.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <PrimaryButton 
                    label="Learn More" 
                    onClick={() => {}} 
                    type="outline" 
                    className="flex-1"
                  />
                  <PrimaryButton 
                    label="Order Now" 
                    onClick={goToOrder} 
                    type="primary" 
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Full Width */}
        <div className="text-center mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12 w-full">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 w-full">
            Contact our specialists to discuss custom options or schedule a personalized test drive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton 
              label="Contact Specialist" 
              onClick={() => {}} 
              type="primary" 
            />
            <PrimaryButton 
              label="Schedule Test Drive" 
              onClick={() => {}} 
              type="outline" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
