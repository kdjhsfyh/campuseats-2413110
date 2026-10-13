import { useState } from "react";

function MenuItem({ item, onAdd }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="card">
      <span className="tag">{item.category}</span>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>

      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className={`btn ${isAdded ? "btn-added" : ""}`}
        onClick={handleAdd}
        disabled={!item.available}
      >
        {!item.available ? "Unavailable" : isAdded ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}

export default MenuItem;
