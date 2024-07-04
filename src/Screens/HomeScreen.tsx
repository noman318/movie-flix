import "./HomeScreen.css";
import { useState, useEffect, useCallback, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { IRootState, Movie } from "../interfaces/IMovie";
import Loader from "../components/Loader";
import {
  useGetMoviesQuery,
  useGetGenresQuery,
  useSearchMoviesQuery,
} from "../slices/apiSlice";
import { useSelector } from "react-redux";
import GenreTabs from "../components/GenreTabs";
const HomeScreen = () => {
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { data: genresData } = useGetGenresQuery({});
  const { data, isLoading, isFetching, error, refetch } = useGetMoviesQuery({
    year,
    page,
    genre: selectedGenre,
  });
  const { term } = useSelector((state: IRootState) => state.search);
  const { data: searchData, isLoading: searchLoading } = useSearchMoviesQuery(
    { query: term },
    { skip: !term }
  );
  // console.log("searchData", searchData);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  // console.log("Current page:", page);
  // console.log("Data:", data);

  useEffect(() => {
    // Determine which data source to use based on whether there's a search term
    const currentData = term ? searchData : data;

    // Check if we have valid data to work with
    if (currentData && currentData.results) {
      if (page === 1) {
        // the first page, simply set the movies to the current results
        setMovies(currentData.results);
      } else {
        // subsequent pages, update the movies state
        setMovies((prevMovies) => {
          // FIlter out any new movies that already exist in the previous movies
          const newMovies = currentData.results.filter(
            (newMovie: Movie) =>
              !prevMovies.some(
                (existingMovie) => existingMovie.id === newMovie.id
              )
          );
          // COmbine previous movies with new, unique movies
          return [...prevMovies, ...newMovies];
        });
      }

      // CHeck if there are more pages to load
      setHasMore(page < currentData.total_pages);

      // Set loading state to false
      loadingRef.current = false;
    }
  }, [data, searchData, page, term]);

  // function to load more movies when scrolling
  const loadMoreMovies = useCallback(() => {
    // Check if more movies are available and not currently loading
    if (hasMore && !isLoading && !isFetching && !loadingRef.current) {
      // Set loading state to true to prevent multiple simultaneous requests
      loadingRef.current = true;
      // INcrement the page number
      setPage((prevPage) => prevPage + 1);
      // If not searching, increment the year (for chronological loading)
      if (!term) {
        setYear((prevYear) => prevYear + 1);
      }
    }
  }, [hasMore, isLoading, isFetching, term]);

  // EFfect to reefetch data when not searching
  useEffect(() => {
    if (!term) {
      try {
        // Attempt to refetch data
        refetch();
      } catch (error) {}
    }
  }, [refetch, term]);

  // Effect to handle infinite scrolling
  useEffect(() => {
    // Function to check scroll position and load more movies if needed
    const handleScroll = () => {
      // Check if user has scrolled to near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        // Load more movies when near the bottom
        loadMoreMovies();
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // CLeanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreMovies]);

  if (isLoading && searchLoading && page === 1) return <Loader />;
  if (error) return <div>Error: {error.toString()}</div>;
  const handleGenreChange = (genreId: string | null) => {
    setSelectedGenre(genreId);
    setPage(1);
    setMovies([]);
  };
  return (
    <>
      <div>
        <div className="genre-section">
          <GenreTabs
            genresData={genresData}
            handleGenreChange={handleGenreChange}
          />
        </div>
        <div className="movies-container">
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {(isLoading || isFetching) && page > 1 && (
            <div className="loader-container">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
