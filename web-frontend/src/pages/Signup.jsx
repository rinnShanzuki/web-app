import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // For demo: Navigate to dashboard after signup
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 border-[3px] border-gray-800 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]">
      <div className="max-w-md w-full">
        
        {/* Signup Form Card */}
        <div className="bg-white rounded-2xl drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-center mt-3">
            <p className="text-[#D30019] text-xl font-bold mt-10">
              Create Your Account
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSignup} className="space-y-6">
              
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent 
                             transition-colors shadow-lg"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent 
                             transition-colors shadow-lg"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent 
                             transition-colors shadow-lg"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent 
                             transition-colors shadow-lg"
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-[#D30019] text-white py-3 px-4 rounded-lg font-semibold 
                           hover:bg-[#920114] transition-colors duration-200 shadow-md"
              >
                Sign Up
              </button>

              {/* Already Have an Account Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-[#D30019] hover:text-[#920114] font-semibold transition-colors"
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 RES-Q Emergency Response System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
