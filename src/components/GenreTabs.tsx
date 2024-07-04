import React, { useState, useRef, useEffect } from "react";
import "./GenreTabs.css";
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
      className="genre-tabs"
      data-testid="genre-tabs"
    >
      <button
        onClick={() => handleTabClick(null)}
        className={`tab ${selectedGenre === null ? "active" : ""}`}
      >
        All Genres
      </button>
      {genresData?.genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleTabClick(genre.id)}
          className={`tab ${selectedGenre === genre.id ? "active" : ""}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreTabs;
