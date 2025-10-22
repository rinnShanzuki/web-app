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
      
      {/* Progress Bar - Full Width */}
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

      {/* Main Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Model Selection */}
        {currentStep === 1 && (
          <div className="text-center w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Model</h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 w-full">
              Select the perfect vehicle that matches your lifestyle and driving needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 w-full">
              {carModels.map(model => (
                <div 
                  key={model.id}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border-2 cursor-pointer transition-all duration-300 w-full ${
                    selectedModel?.id === model.id 
                      ? 'border-indigo-600 shadow-xl' 
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <img 
                    src={model.image} 
                    alt={model.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 sm:mb-6"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-gray-600 mb-4">{model.description}</p>
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                    ${model.basePrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <PrimaryButton 
              label="Continue to Customization" 
              onClick={() => setCurrentStep(2)} 
              type="primary"
              disabled={!selectedModel}
            />
          </div>
        )}

        {/* Step 2: Customization */}
        {currentStep === 2 && (
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Customize Your {selectedModel?.name}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 w-full">
              {/* Color Selection */}
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Choose Color</h3>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {colors.map(color => (
                    <div 
                      key={color.value}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all w-full ${
                        selectedColor === color.value 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setSelectedColor(color.value)}
                    >
                      <div className={`w-full h-20 rounded-xl mb-3 bg-${color.value}-500`}></div>
                      <div className="font-medium text-gray-900">{color.name}</div>
                      {color.price > 0 && (
                        <div className="text-indigo-600">+${color.price}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Selection */}
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Additional Features</h3>
                <div className="space-y-4 w-full">
                  {features.map(feature => (
                    <div 
                      key={feature.id}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all w-full ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => toggleFeature(feature.id)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium text-gray-900">{feature.name}</div>
                          <div className="text-indigo-600">+${feature.price.toLocaleString()}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedFeatures.includes(feature.id)
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedFeatures.includes(feature.id) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
            <div className="mt-8 sm:mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">Total: ${calculateTotal().toLocaleString()}</div>
                  <div className="text-gray-600">Including all selected options</div>
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
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Review Your Order</h2>
            
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
                {/* Order Summary */}
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 sm:space-y-6 w-full">
                    <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                      <div>
                        <div className="font-semibold text-gray-900">{selectedModel?.name}</div>
                        <div className="text-gray-600">Base Model</div>
                      </div>
                      <div className="text-lg font-semibold">${selectedModel?.basePrice.toLocaleString()}</div>
                    </div>

                    {selectedColor && (
                      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {colors.find(c => c.value === selectedColor)?.name} Color
                          </div>
                        </div>
                        <div className="text-lg font-semibold">
                          +${colors.find(c => c.value === selectedColor)?.price.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {selectedFeatures.map(featureId => {
                      const feature = features.find(f => f.id === featureId);
                      return feature ? (
                        <div key={featureId} className="flex justify-between items-start border-b border-gray-200 pb-4">
                          <div>
                            <div className="font-semibold text-gray-900">{feature.name}</div>
                          </div>
                          <div className="text-lg font-semibold">+${feature.price.toLocaleString()}</div>
                        </div>
                      ) : null;
                    })}

                    <div className="flex justify-between items-center pt-4">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">Total Amount</div>
                      <div className="text-xl sm:text-2xl font-bold text-indigo-600">${calculateTotal().toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                  
                  <form className="space-y-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center w-full">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton 
                  label="Back to Customization" 
                  onClick={() => setCurrentStep(2)} 
                  type="outline" 
                />
                <PrimaryButton 
                  label="Place Order" 
                  onClick={() => alert('Order placed successfully!')} 
                  type="gradient" 
                  icon="🎉"
                />
              </div>
              <p className="text-gray-500 mt-4 w-full">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
