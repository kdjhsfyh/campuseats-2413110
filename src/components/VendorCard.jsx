function VendorCard({ vendor, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`card vendor-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(vendor.id)}
    >
      <div className="thumb">{vendor.name.charAt(0)}</div>

      <div>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">{vendor.openHours}</p>

        <span className={`status ${vendor.isOpen ? "open" : "closed"}`}>
          {vendor.isOpen ? "Open" : "Closed"}
        </span>
      </div>
    </button>
  );
}

export default VendorCard;
