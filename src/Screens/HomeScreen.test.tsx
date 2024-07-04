import { Store, UnknownAction } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  useGetGenresQuery,
  useGetMoviesQuery,
  useSearchMoviesQuery,
} from "../slices/apiSlice";
import HomeScreen from "./HomeScreen";

// Mock the Redux hooks
jest.mock("../slices/apiSlice", () => ({
  useGetMoviesQuery: jest.fn(),
  useGetGenresQuery: jest.fn(),
  useSearchMoviesQuery: jest.fn(),
}));

// Mock the child components
jest.mock("../components/MovieCard", () => () => (
  <div data-testid="movie-card" />
));
jest.mock("../components/Loader", () => () => <div data-testid="loader" />);
jest.mock("../components/GenreTabs", () => () => (
  <div data-testid="genre-tabs" />
));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe("HomeScreen", () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      search: { term: "" },
    });

    // Default mock implementations
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: { results: [], total_pages: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
    });
    (useGetGenresQuery as jest.Mock).mockReturnValue({ data: [] });
    (useSearchMoviesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });
  });

  test("renders movie cards when data is loaded", async () => {
    const mockMovies = [
      {
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
      },
      {
        adult: false,
        backdrop_path: "/uBHeAB2Ug9ELBzkMyls8CUjzn4i.jpg",
        genre_ids: [28, 878, 53],
        id: 64635,
        original_language: "en",
        original_title: "Total Recall",
        overview:
          "Factory worker Doug Quaid takes a virtual mind-trip vacation with the Rekall company, opting for implanted memories of being a spy. When the procedure goes wrong, Quaid becomes a wanted man by the police and joins forces with a rebel fighter to stop the evil Chancellor Cohaagen.",
        popularity: 99.48,
        poster_path: "/4M5urSlUyR2PtVBIoW9hLG9NQCQ.jpg",
        release_date: "2012-08-02",
        title: "Total Recall",
        video: false,
        vote_average: 6.016,
        vote_count: 5341,
      },
    ];
    const mockRefetch = jest.fn();

    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: { results: mockMovies, total_pages: 1 },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("movie-card")).toHaveLength(2);
    });
  });

  test("renders error message when there is an error", () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      error: new Error("Test error"),
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });
});
