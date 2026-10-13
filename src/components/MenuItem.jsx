function MenuItem({ item, onAdd }) {
  return (
    <div className="card">
      <span className="tag">{item.category}</span>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>

      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className="btn"
        onClick={() => onAdd(item)}
        disabled={!item.available}
      >
        {item.available ? "Add to cart" : "Unavailable"}
      </button>
    </div>
  );
}

export default MenuItem;
