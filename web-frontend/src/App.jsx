import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Listing from "./pages/listing";
import Order from "./pages/order";
import Navbar from "./components/navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const goToListing = () => setCurrentPage("listing");
  const goToOrder = () => setCurrentPage("order");
  const goToLanding = () => setCurrentPage("landing");

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar
        onHome={goToLanding}
        onBrowse={goToListing}
        onOrder={goToOrder}
      />

      {/* Add top padding to offset the fixed navbar */}
      <div className="pt-24">
        {currentPage === "landing" && (
          <LandingPage onExplore={goToListing} onOrder={goToOrder} />
        )}
        {currentPage === "listing" && (
          <Listing goBack={goToLanding} goToOrder={goToOrder} />
        )}
        {currentPage === "order" && <Order goBack={goToLanding} />}
      </div>
    </div>
  );
}

export default App;
