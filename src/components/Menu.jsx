import MenuItem from "./MenuItem.jsx";
import { useCart } from "../hooks/useCart.js";

function Menu({ items }) {
  const { addToCart } = useCart();

  if (items.length === 0) {
    return <p>No items on this menu yet.</p>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} onAdd={addToCart} />
      ))}
    </div>
  );
}

export default Menu;
