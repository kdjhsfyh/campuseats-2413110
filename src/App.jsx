import { useState } from "react";
import vendors from "./data/vendors.js";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import Menu from "./components/Menu.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id);
  const [cart, setCart] = useState([]);

  const selectedVendor =
    vendors.find((vendor) => vendor.id === selectedVendorId) || vendors[0];

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <>
      <Header cartCount={cart.length} />

      <main className="container">
        <h2 className="section-title">Choose a vendor</h2>

        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={selectedVendorId === vendor.id}
              onSelect={setSelectedVendorId}
            />
          ))}
        </div>

        <h2 className="section-title">Menu: {selectedVendor.name}</h2>
        <SearchBar />
        <Menu items={selectedVendor.menu} onAdd={handleAddToCart} />
      </main>

      <footer className="footer">© 2026 CampusEats BICS 3301, IIUM</footer>
    </>
  );
}

export default App;
