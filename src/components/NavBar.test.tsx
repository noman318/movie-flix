import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Navbar from "./Navbar"; // Adjust the import path based on your directory structure
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";
import GenreTabs from "./GenreTabs";
import MovieCard from "./MovieCard";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const genresDataMock = {
  genres: [
    { id: "1", name: "Action" },
    { id: "2", name: "Comedy" },
    { id: "3", name: "Drama" },
  ],
};
const mockMovie = {
  adult: false,
  backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
  genre_ids: [878, 28, 12],
  id: 24428,
  original_language: "en",
  original_title: "The Avengers",
  overview:
    "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
  popularity: 134.251,
  poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
  release_date: "2012-04-25",
  title: "The Avengers",
  video: false,
  vote_average: 7.715,
  vote_count: 30199,
};

describe("Navbar component", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Enable fake timers
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  test("should handle search input change with value string after debounce", async () => {
    const dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    const { getByPlaceholderText } = render(<Navbar />);

    const input = getByPlaceholderText("Titles");

    fireEvent.change(input, { target: { value: "Star Wars" } });

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(dispatch).toHaveBeenCalledWith(setSearchTerm("Star Wars"));
  });
  test("renders GenreTabs component with initial state", () => {
    const handleGenreChange = jest.fn();

    const { getByText } = render(
      <GenreTabs
        genresData={genresDataMock}
        handleGenreChange={handleGenreChange}
      />
    );

    const allGenresButton = getByText("All Genres");
    expect(allGenresButton).toBeInTheDocument();

    const actionGenreButton = getByText("Action");
    expect(actionGenreButton).toBeInTheDocument();

    expect(allGenresButton).toHaveClass("active");
    expect(actionGenreButton).not.toHaveClass("active");
  });

  test("handles genre tab click and state change", () => {
    const handleGenreChange = jest.fn();

    const { getByText } = render(
      <GenreTabs
        genresData={genresDataMock}
        handleGenreChange={handleGenreChange}
      />
    );

    const comedyGenreButton = getByText("Comedy");
    fireEvent.click(comedyGenreButton);

    expect(handleGenreChange).toHaveBeenCalledWith("2");

    expect(comedyGenreButton).toHaveClass("active");

    const allGenresButton = getByText("All Genres");
    fireEvent.click(comedyGenreButton);

    expect(allGenresButton).not.toHaveClass("active");
  });

  test("renders MovieCard component with movie details", () => {
    const { getByAltText, getByText } = render(<MovieCard movie={mockMovie} />);

    const titleElement = getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();

    const overviewText =
      "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!";
    const overviewElement = getByText(overviewText.substr(0, 100) + "...");
    expect(overviewElement).toBeInTheDocument();

    const releaseYear = "2012";
    const releaseYearElement = getByText(releaseYear);
    expect(releaseYearElement).toBeInTheDocument();

    const voteAverage = "7.7";
    const voteAverageElement = getByText(voteAverage);
    expect(voteAverageElement).toBeInTheDocument();

    const imageElement = getByAltText(mockMovie.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
  });

  test("handles image loading and error scenarios", () => {
    const { getByAltText } = render(<MovieCard movie={mockMovie} />);

    const imageElement = getByAltText(mockMovie.title) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain("/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg");

    expect(imageElement.src).toContain(
      "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
    );
  });
});
