function Header({ cartCount }) {
  return (
    <header className="header">
      <a href="#" className="logo-link">
        <h1 className="logo">CampusEats 🍽️</h1>
      </a>

      <nav className="nav">
        <span>Order your favourite campus meals!</span>

        <span className="badge">
          🛒 {cartCount} {cartCount === 1 ? "item" : "items"}
        </span>
      </nav>
    </header>
  );
}

export default Header;
