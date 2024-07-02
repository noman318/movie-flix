import { useState, useEffect, useCallback, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { Movie } from "../interfaces/IMovie";
import Loader from "../components/Loader";
import { useGetMoviesQuery, useGetGenresQuery } from "../slices/apiSlice";
import GenreTabs from "../components/GenreTabs";

const HomeScreen = () => {
  const [year, setYear] = useState(2012);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { data: genresData } = useGetGenresQuery({});
  const { data, isLoading, isFetching, error } = useGetMoviesQuery({
    year,
    page,
    genre: selectedGenre,
  });
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  // console.log("Current page:", page);
  // console.log("Data:", data);

  useEffect(() => {
    if (data && data.results) {
      setMovies((prevMovies) => {
        const newMovies = data.results.filter(
          (newMovie: Movie) =>
            !prevMovies.some(
              (existingMovie) => existingMovie.id === newMovie.id
            )
        );
        return [...prevMovies, ...newMovies];
      });
      setHasMore(page < data.total_pages);
      loadingRef.current = false;
    }
  }, [data, page]);

  const loadMoreMovies = useCallback(() => {
    if (hasMore && !isLoading && !isFetching && !loadingRef.current) {
      loadingRef.current = true;
      setPage((prevPage) => prevPage + 1);
      setYear((prevYear) => prevYear + 1);
    }
  }, [hasMore, isLoading, isFetching]);

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

  if (isLoading && page === 1) return <Loader />;
  if (error) return <div>Error: {error.toString()}</div>;
  const handleGenreChange = (genreId: string | null) => {
    setSelectedGenre(genreId);
    setPage(1);
    setMovies([]);
  };
  return (
    <div>
      <div className="mb-4 mt-8">
        <GenreTabs
          genresData={genresData}
          handleGenreChange={handleGenreChange}
        />
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {(isLoading || isFetching) && page > 1 && (
          <div className="flex justify-center mt-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
