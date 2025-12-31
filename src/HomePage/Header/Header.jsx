import "./Header.css";
export function Header({ setSearch }) {
  return (
    <div className="header">
      <div className="header-left">
        <img
          className="hamburger-menu"
          src="../../../Images/hamburger-menu.svg"
        ></img>
        <div>ProjectAlpha</div>
      </div>
      <div className="header-middle">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <button className="header-search-btn" onClick={() => {}}>
          🔍︎
        </button>
      </div>
      <div className="header-right">
        <div className="header-add-new-board">+ New Board</div>
        <div className="user">user</div>
      </div>
    </div>
  );
}
