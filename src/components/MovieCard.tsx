import { Movie } from "../interfaces/IMovie";

interface MovieCardProps {
  movie: Movie;
}
function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available";

  const truncateOverview = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="relative w-64 h-96 rounded-md overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 group">
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt={movie?.title || "Movie poster"}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/500x750?text=Image+Load+Error";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="font-bold text-xl mb-2">{movie?.title}</h2>
          <p className="text-sm mb-2">
            {movie?.overview && truncateOverview(movie?.overview, 100)}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              {movie?.release_date
                ? new Date(movie?.release_date).getFullYear()
                : "N/A"}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie?.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
