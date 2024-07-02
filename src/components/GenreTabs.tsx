import React, { useState, useRef, useEffect } from "react";
import { GenreTabsProps } from "../interfaces/IMovie";

const GenreTabs: React.FC<GenreTabsProps> = ({
  genresData,
  handleGenreChange,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleTabClick = (genreId: string | null) => {
    setSelectedGenre(genreId);
    handleGenreChange(genreId);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto whitespace-nowrap pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <button
        onClick={() => handleTabClick(null)}
        className={`px-4 py-2 mx-1 rounded-xl ${
          selectedGenre === null
            ? "bg-red-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        All Genres
      </button>
      {genresData?.genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleTabClick(genre.id)}
          className={`px-4 py-2 mx-1 rounded-xl ${
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
