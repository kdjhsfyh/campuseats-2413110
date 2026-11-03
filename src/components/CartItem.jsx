import { useCart } from "../hooks/useCart.js";

function CartItem({ line }) {
  const { changeQty, removeFromCart } = useCart();

  const { item, qty } = line;

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>

      <div className="qty">
        <button type="button" onClick={() => changeQty(item.id, -1)}>
          -
        </button>

        <span>{qty}</span>

        <button type="button" onClick={() => changeQty(item.id, 1)}>
          +
        </button>
      </div>

      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>

      <button
        type="button"
        className="link danger"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default CartItem;
