import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";
import { useCallback } from "react";
import { debounce } from "lodash";

const Navbar = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchTerm = useCallback(
    debounce((query: string) => {
      dispatch(setSearchTerm(query));
    }, 2000),
    [dispatch]
  );

  const handleSearchChange = (e: { target: { value: string } }) => {
    const query = e.target.value;
    debouncedSetSearchTerm(query);
  };

  return (
    <nav className="bg-black">
      <div className="w-full flex items-center justify-between p-4 flex-col md:flex-row">
        <h1 className="text-4xl font-bold text-red-600">MovieFlix</h1>
        <form className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={handleSearchChange}
            className="bg-gray-700 text-white px-4 py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white pointer-events-none">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
