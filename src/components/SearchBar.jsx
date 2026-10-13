function SearchBar() {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>

      <input
        type="text"
        className="search-input"
        placeholder="What are you craving today?"
        aria-label="Search menu by name"
      />
    </div>
  );
}

export default SearchBar;
