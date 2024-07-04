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
    const currentData = term ? searchData : data;
    if (currentData && currentData.results) {
      if (page === 1) {
        setMovies(currentData.results);
      } else {
        setMovies((prevMovies) => {
          const newMovies = currentData.results.filter(
            (newMovie: Movie) =>
              !prevMovies.some(
                (existingMovie) => existingMovie.id === newMovie.id
              )
          );
          return [...prevMovies, ...newMovies];
        });
      }
      setHasMore(page < currentData.total_pages);
      loadingRef.current = false;
    }
  }, [data, searchData, page, term]);

  const loadMoreMovies = useCallback(() => {
    if (hasMore && !isLoading && !isFetching && !loadingRef.current) {
      loadingRef.current = true;
      setPage((prevPage) => prevPage + 1);
      if (!term) {
        setYear((prevYear) => prevYear + 1);
      }
    }
  }, [hasMore, isLoading, isFetching, term]);
  useEffect(() => {
    if (!term) {
      try {
        refetch();
      } catch (error) {}
    }
  }, [refetch, term]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
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
