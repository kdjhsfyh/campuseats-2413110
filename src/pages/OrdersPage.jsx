import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <>
      <h2 className="section-title">My Orders</h2>

      {orders.map((order) => (
        <div className="card order-card" key={order.id}>
          <h3>Order #{order.id}</h3>

          <p>Name: {order.name}</p>
          <p>Mahallah: {order.mahallah}</p>
          <p>Pickup time: {order.pickupTime}</p>
          <p>Date: {order.date}</p>

          <h4>Items</h4>

          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>
                {line.item.name} x {line.qty}
              </li>
            ))}
          </ul>

          <p>Total: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </>
  );
}

export default OrdersPage;
