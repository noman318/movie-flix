import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `2dca580c2a14b55200e784d157207b4d`;
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Films"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ year, page = 1, genre }) =>
        `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=${page}${
          genre ? `&with_genres=${genre}` : ""
        }&vote_count.gte=100`,
    }),
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
    }),
    searchMovies: builder.query({
      query: ({ query, page = 1 }) =>
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}&append_to_response=original_title`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useSearchMoviesQuery } =
  apiSlice;
