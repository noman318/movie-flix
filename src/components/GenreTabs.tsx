import React, { useState, useRef, useEffect } from "react";
import { GenreTabsProps } from "../interfaces/IMovie";

const GenreTabs: React.FC<GenreTabsProps> = ({
  genresData,
  handleGenreChange,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY + e.deltaX;
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const handleTabClick = (genreId: string | null) => {
    setSelectedGenre(genreId);
    handleGenreChange(genreId);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto whitespace-nowrap pb-2"
      style={{
        scrollBehavior: "smooth",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      data-testid="genre-tabs"
    >
      <button
        onClick={() => handleTabClick(null)}
        className={`px-4 py-2 mx-1 rounded-xl flex-shrink-0 ${
          selectedGenre === null
            ? "bg-red-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        All Genres
      </button>
      {genresData?.genres.slice(0, -1).map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleTabClick(genre.id)}
          className={`px-4 py-2 mx-1 rounded-xl flex-shrink-0 ${
            selectedGenre === genre.id
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreTabs;
