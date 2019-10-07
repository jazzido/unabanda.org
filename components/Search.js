const Search = ({ style }) => {
  return (
    <div className="dropdown-content" style={style}>
      <a href="#" className="dropdown-item">
        Dropdown item
      </a>
      <a className="dropdown-item">Other dropdown item</a>
      <a href="#" className="dropdown-item is-active">
        Active dropdown item
      </a>
      <a href="#" className="dropdown-item">
        Other dropdown item
      </a>
      <hr className="dropdown-divider" />
      <a href="#" className="dropdown-item">
        With a divider
      </a>
    </div>
  );
};

export default Search;
