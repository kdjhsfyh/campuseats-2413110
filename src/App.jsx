import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import Menu from "./components/Menu.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [view, setView] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVendors() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/vendors.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load vendors.");
        }

        const data = await response.json();

        setVendors(data);
        setSelectedVendorId((currentId) => currentId || data[0]?.id || "");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load vendors.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    const timeoutId = setTimeout(() => {
      fetchVendors();
    }, 600);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reloadKey]);

  const selectedVendor =
    vendors.find((vendor) => vendor.id === selectedVendorId) || vendors[0];

  function handleAddToCart(item) {
    setCart((previousCart) => {
      const existingLine = previousCart.find(
        (line) => line.item.id === item.id,
      );

      if (existingLine) {
        return previousCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...previousCart, { item, qty: 1 }];
    });
  }

  function handleChangeQty(itemId, delta) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId),
    );
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    );

    setOrder({
      ...details,
      total,
    });

    setCart([]);
    setView("done");
  }

  const cartCount = cart.reduce((total, line) => total + line.qty, 0);

  const filteredMenu = selectedVendor
    ? selectedVendor.menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  let content;

  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  } else if (view === "cart") {
    content = (
      <>
        <h2 className="section-title">Your Cart</h2>

        <CartPage
          cart={cart}
          onChangeQty={handleChangeQty}
          onRemove={handleRemove}
          onPlaceOrder={handlePlaceOrder}
        />

        <button type="button" className="btn" onClick={() => setView("menu")}>
          Back to Vendors
        </button>
      </>
    );
  } else if (view === "done") {
    content = (
      <section className="card">
        <h2>Order placed successfully!</h2>
        <p>Name: {order?.name}</p>
        <p>Mahallah: {order?.mahallah}</p>
        <p>Pickup time: {order?.pickupTime}</p>
        <p>Total: RM {order?.total.toFixed(2)}</p>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setView("menu");
            setSearchTerm("");
          }}
        >
          Back to Vendors
        </button>
      </section>
    );
  } else {
    content = (
      <>
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

        {selectedVendor && (
          <>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <Menu items={filteredMenu} onAdd={handleAddToCart} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />

      <main className="container">{content}</main>

      <footer className="footer">© 2026 CampusEats BICS 3301, IIUM</footer>
    </>
  );
}

export default App;
