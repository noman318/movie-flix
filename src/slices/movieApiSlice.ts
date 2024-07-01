import { BASE_URL } from "../constants/url";
import { apiSlice } from "./apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllMoviesQuery } = movieApiSlice;
