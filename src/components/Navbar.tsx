import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import "./Navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Create a debounced funtion to set the search term
  // This helps to reduce the number of dispatches while typing
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchTerm = useCallback(
    debounce((query: string) => {
      // DIspatch the setSearchTerm action with the query
      dispatch(setSearchTerm(query));
    }, 2000), // Wait for 2 second of inactivity before dispatching
    [dispatch]
  );

  // Function for search input changes
  const handleSearchChange = (e: { target: { value: string } }) => {
    const query = e.target.value;
    // Call the debounceed function with the new query
    debouncedSetSearchTerm(query);
  };

  // Function to toggle the visibility of the search input
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
          <span className="logo-text">MovieFlix</span>
        </h1>
        <div
          className={`search-container ${
            isSearchVisible ? "search-visible" : ""
          }`}
        >
          <form className="search-form">
            <input
              type="text"
              placeholder="Titles"
              onChange={handleSearchChange}
              className="search-input"
            />
          </form>
          <button
            type="button"
            className="search-toggle"
            onClick={toggleSearch}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
