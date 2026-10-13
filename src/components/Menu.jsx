import MenuItem from "./MenuItem.jsx";

function Menu({ items, onAdd }) {
  if (items.length === 0) {
    return <p>No items on this menu yet.</p>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default Menu;
