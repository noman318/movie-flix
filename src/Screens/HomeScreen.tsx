import React from "react";
import { useGetAllMoviesQuery } from "../slices/movieApiSlice";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const { data } = useGetAllMoviesQuery({});
  console.log("data", data);
  return (
    <div className=" p-8 grid grid-cols-3 gap-4">
      <MovieCard />
    </div>
  );
};

export default HomeScreen;
