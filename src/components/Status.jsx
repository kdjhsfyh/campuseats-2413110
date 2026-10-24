export function Loading() {
  return (
    <section aria-label="Loading vendors" aria-busy="true">
      <h2 className="section-title">Choose a vendor</h2>

      <div className="vendor-grid">
        {[1, 2, 3].map((item) => (
          <div className="card skeleton-card" key={item}>
            <div className="skeleton skeleton-thumb" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-button" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card error" role="alert">
      <p>Could not load menus: {message}</p>
      <button className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
