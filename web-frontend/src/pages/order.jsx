import React, { useState } from "react";
import PrimaryButton from "../components/primarybutton";

const Order = ({ goBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const carModels = [
    {
      id: 1,
      name: "Eco Pro",
      basePrice: 45999,
      image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg",
      description: "Efficient electric sedan with premium features"
    },
    {
      id: 2,
      name: "Urban X",
      basePrice: 39999,
      image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      description: "Compact SUV perfect for city driving"
    }
  ];

  const colors = [
    { name: "Midnight Black", value: "black", price: 0 },
    { name: "Arctic White", value: "white", price: 0 },
    { name: "Deep Blue", value: "blue", price: 500 },
    { name: "Ruby Red", value: "red", price: 800 }
  ];

  const features = [
    { id: "premium_sound", name: "Premium Sound System", price: 1200 },
    { id: "autopilot", name: "Enhanced Autopilot", price: 6000 },
    { id: "premium_interior", name: "Premium Interior", price: 2500 },
    { id: "performance_package", name: "Performance Package", price: 8000 }
  ];

  const calculateTotal = () => {
    let total = selectedModel ? selectedModel.basePrice : 0;
    if (selectedColor) {
      const colorObj = colors.find(c => c.value === selectedColor);
      total += colorObj ? colorObj.price : 0;
    }
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      total += feature ? feature.price : 0;
    });
    return total;
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const steps = [
    { number: 1, title: "Select Model" },
    { number: 2, title: "Customize" },
    { number: 3, title: "Review & Order" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-screen overflow-x-hidden">
      
      {/* Progress Bar*/}
      <div className="bg-white border-b border-gray-200 py-6 w-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step.number 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content*/}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Model Selection */}
        {currentStep === 1 && (
          <div>
            <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-8 justify-items-center">
              {carModels.map(model => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`
                    relative cursor-pointer transition-all duration-300 ease-in-out
                    rounded-3xl p-6 sm:p-8 border-2 flex flex-col justify-between
                    w-full max-w-[7in] h-[5in] sm:w-[6.5in] sm:h-[6in]
                    border-cyan-400 text-cyan-400 hover:bg-cyan-400/10
                    ${selectedModel?.id === model.id
                      ? "shadow-[0_0_30px_4px_rgba(34,211,238,0.6)] scale-[1.02] bg-cyan-400/10"
                      : "hover:shadow-[0_0_20px_2px_rgba(34,211,238,0.3)]"
                    }
                  `}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-[65%] object-cover rounded-2xl mb-4"
                  />
                  <div className="flex flex-col justify-between flex-grow text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{model.name}</h3>
                    <p className="text-gray-500 mb-4">{model.description}</p>
                    <div className="text-2xl sm:text-3xl font-bold">
                      ${model.basePrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <PrimaryButton 
                label="Continue to Customization" 
                onClick={() => setCurrentStep(2)} 
                type="primary"
                disabled={!selectedModel}
                className="mt-20"
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Customization */}
        {currentStep === 2 && (
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-8 text-center">
              Customize Your {selectedModel?.name}
            </h2>

            <div className="grid xl:grid-cols-[30%_60%] md:grid-cols-1 gap-3 sm:gap-12 w-full">
              {/* Color Selection */}
              <div className="w-full flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-8 text-center">
                  Choose Exterior Color
                </h3>

                <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5 justify-items-center">
                  {[
                    {
                      name: "Magnet Gray",
                      value: "magnet-gray",
                      price: 0,
                      image:
                        "https://mediaservice.audi.com/media/cdb/data/b2c241e8-0a02-4a2a-bf20-b9923d59db44.jpg?wid=100",
                    },
                    {
                      name: "Mythos Black Metallic",
                      value: "mythos-black",
                      price: 595,
                      image:
                        "https://mediaservice.audi.com/media/cdb/data/be0b6822-f1f6-461c-b034-9adb58c3c699.jpg?wid=100",
                    },
                    {
                      name: "Glacier White Metallic",
                      value: "glacier-white",
                      price: 595,
                      image:
                        "https://mediaservice.audi.com/media/cdb/data/1e416cc4-7807-49e4-b601-c76cc77d1e12.jpg?wid=100",
                    },
                    {
                      name: "Plasma Blue Metallic",
                      value: "plasma-blue",
                      price: 595,
                      image:
                        "https://mediaservice.audi.com/media/cdb/data/2c0967ee-feab-4170-a42e-46dbb5499279.jpg?wid=100",
                    },
                    {
                      name: "Manhattan Gray Metallic",
                      value: "manhattan-gray",
                      price: 595,
                      image:
                        "https://mediaservice.audi.com/media/cdb/data/932a4432-370d-41b5-92ae-ff76386e05a7.jpg?wid=100",
                    },
                  ].map((color) => (
                    <div
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className="flex flex-col items-center cursor-pointer transition-all group"
                    >
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 shadow-md 
                          overflow-hidden flex items-center justify-center transition-all duration-300
                          ${
                            selectedColor === color.value
                              ? "border-cyan-400 scale-110 shadow-[0_0_20px_2px_rgba(34,211,238,0.6)]"
                              : "border-gray-200 hover:border-cyan-400 hover:scale-105"
                          }
                        `}
                      >
                        <img
                          src={color.image}
                          alt={color.name}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>

                      <div className="text-center mt-2">
                        <p
                          className={`font-medium text-xs sm:text-sm ${
                            selectedColor === color.value
                              ? "text-cyan-400 font-semibold"
                              : "text-gray-800 group-hover:text-cyan-400"
                          }`}
                        >
                          {color.name}
                        </p>
                        {color.price > 0 && (
                          <p className="text-xs text-gray-500">+${color.price}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Selection */}
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-6">
                  Additional Features
                </h3>
                <div className="space-y-4 w-full">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all w-full ${
                        selectedFeatures.includes(feature.id)
                          ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_2px_rgba(34,211,238,0.3)]"
                          : "border-gray-200 hover:border-cyan-400 hover:bg-cyan-400/5"
                      }`}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium text-gray-100">
                            {feature.name}
                          </div>
                          <div className="text-cyan-400">
                            +${feature.price.toLocaleString()}
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedFeatures.includes(feature.id)
                              ? "bg-cyan-400 border-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.4)]"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedFeatures.includes(feature.id) && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Navigation */}
            <div className="mt-12 p-6 bg-cyan-400/5 border border-cyan-400 rounded-3xl w-full shadow-[0_0_25px_2px_rgba(34,211,238,0.2)]">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                    Total: ${calculateTotal().toLocaleString()}
                  </div>
                  <div className="text-gray-400">Including all selected options</div>
                </div>
                <div className="flex gap-4">
                  <PrimaryButton
                    label="Back"
                    onClick={() => setCurrentStep(1)}
                    type="outline"
                  />
                  <PrimaryButton
                    label="Review Order"
                    onClick={() => setCurrentStep(3)}
                    type="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Order */}
        {currentStep === 3 && (
          <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-full max-w-6xl bg-cyan-400/5 border border-cyan-400 rounded-3xl shadow-[0_0_25px_2px_rgba(34,211,238,0.3)] p-8 sm:p-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-8 text-center">
                Review Your Order
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                {/* Order Summary */}
                <div className="w-full bg-gray-900/40 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_15px_1px_rgba(34,211,238,0.2)]">
                  <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-cyan-400/20 pb-3">
                      <div>
                        <div className="font-semibold text-white">{selectedModel?.name}</div>
                        <div className="text-gray-400">Base Model</div>
                      </div>
                      <div className="text-lg font-semibold text-cyan-400">
                        ${selectedModel?.basePrice.toLocaleString()}
                      </div>
                    </div>

                    {selectedColor && (
                      <div className="flex justify-between border-b border-cyan-400/20 pb-3">
                        <div className="font-semibold text-white">
                          {colors.find((c) => c.value === selectedColor)?.name} Color
                        </div>
                        <div className="text-lg font-semibold text-cyan-400">
                          +$
                          {colors
                            .find((c) => c.value === selectedColor)
                            ?.price.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {selectedFeatures.map((featureId) => {
                      const feature = features.find((f) => f.id === featureId);
                      return feature ? (
                        <div
                          key={featureId}
                          className="flex justify-between border-b border-cyan-400/20 pb-3"
                        >
                          <div className="font-semibold text-white">{feature.name}</div>
                          <div className="text-lg font-semibold text-cyan-400">
                            +${feature.price.toLocaleString()}
                          </div>
                        </div>
                      ) : null;
                    })}

                    <div className="flex justify-between pt-4">
                      <div className="text-xl sm:text-2xl font-bold text-white">
                        Total Amount
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-cyan-400">
                        ${calculateTotal().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="w-full bg-gray-900/40 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_15px_1px_rgba(34,211,238,0.2)]">
                  <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
                    Contact Information
                  </h3>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-transparent border border-cyan-400/40 rounded-xl 
                          text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                          transition-all outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-transparent border border-cyan-400/40 rounded-xl 
                          text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                          transition-all outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-transparent border border-cyan-400/40 rounded-xl 
                          text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                          transition-all outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-transparent border border-cyan-400/40 rounded-xl 
                          text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
                          transition-all outline-none"
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center mt-10">
                <div className="flex flex-wrap justify-center gap-4">
                  <PrimaryButton
                    label="Back to Customization"
                    onClick={() => setCurrentStep(2)}
                    type="outline"
                    className="w-40 sm:w-44 md:w-48 py-2 text-sm"
                  />
                  <PrimaryButton
                    label="Place Order"
                    onClick={() => alert('Order placed successfully!')}
                    type="primary"
                    className="w-40 sm:w-44 md:w-48 py-2 text-sm"
                  />
                </div>

                <p className="text-gray-400 mt-4 text-sm">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
