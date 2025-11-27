import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, navigate directly to dashboard without validation
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        

        {/* Login Form */}
        <div className="bg-white rounded-2xl drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]">
          {/* Logo and Header */}
          <div className="flex items-center justify-center gap-1 bg-gradient-to-b from-[#FF6A3D] via-[#D30019] to-[#920114] rounded-lg py-4 px-6 shadow-lg">
            <img
              src={logo}
              alt="RES-Q Logo"
              className="h-16 w-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]"
            />
            <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">RES-Q</h1>
          </div>
          <div className="flex items-center justify-center mt-3">
            <p className="text-[#D30019] text-md font-bold">Admin Portal Login</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors shadow-lg drop-shadow-gray"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors shadow-lg drop-shadow-gray"
                  placeholder="Enter your password"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[#D30019] hover:text-[#920114] transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#D30019] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#920114] transition-colors duration-200 shadow-md"
              >
                Log In
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Don't have an account yet?{" "}
                  <Link 
                    to="/signup" 
                    className="text-[#D30019] hover:text-[#920114] font-semibold transition-colors"
                  >
                    Click Sign Up
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