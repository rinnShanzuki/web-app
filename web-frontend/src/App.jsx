import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Listing from "./pages/listing";
import Order from "./pages/order";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/car-listing" element={<Listing />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
