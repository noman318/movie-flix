import { Movie } from "../interfaces/IMovie";
import "./MovieCard.css";
import { FaStar } from "react-icons/fa";

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
    <div className="movie-card" data-testid="movie-card">
      <img
        className="movie-poster"
        src={imageUrl}
        alt={movie?.title || "Movie poster"}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/500x750?text=Image+Load+Error";
        }}
      />
      <div className="movie-info">
        <div className="movie-details">
          <h2 className="movie-title">{movie?.title}</h2>
          <p className="movie-overview">
            {movie?.overview && truncateOverview(movie?.overview, 100)}
          </p>
          <div className="movie-meta">
            <span className="movie-year">
              {movie?.release_date
                ? new Date(movie?.release_date).getFullYear()
                : "N/A"}
            </span>
            <span className="movie-rating">
              <FaStar className="star-icon" />
              {movie?.vote_average?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
