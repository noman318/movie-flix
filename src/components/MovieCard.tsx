function MovieCard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-600 transition duration-300 ease-in-out transform hover:scale-105">
      <img
        className="w-full h-72 object-cover p-2"
        src={`https://m.media-amazon.com/images/M/MV5BOTQ1MmE4MDUtNjJlZi00MzhkLTk5M2EtOWRjOTI1YTk4NTkyXkEyXkFqcGdeQWFybm8@._V1_.jpg`}
        alt={"movie.title"}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{"movie.title"}</div>
        <p className="text-white text-base">
          {"movie.overview.length > 150: movie.overview"}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">
          Rating: {"movie.vote_average"}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">
          Year: 2023
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
