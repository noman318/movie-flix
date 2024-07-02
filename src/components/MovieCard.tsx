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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-600 transition duration-300 ease-in-out transform hover:scale-105 my-2">
      <img
        className="w-full h-72 object-cover p-2"
        src={imageUrl}
        alt={movie?.title || "Movie poster"}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/500x750?text=Image+Load+Error";
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{movie?.title}</div>
        <p className="text-white text-base">
          {movie?.overview && truncateOverview(movie?.overview, 70)}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">
          Rating: {movie?.vote_average?.toFixed(1) || "N/A"}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">
          Year:{" "}
          {movie?.release_date
            ? new Date(movie?.release_date).getFullYear()
            : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
