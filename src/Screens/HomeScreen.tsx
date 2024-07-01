import React from "react";
import { useGetAllMoviesQuery } from "../slices/movieApiSlice";

const HomeScreen = () => {
  const { data } = useGetAllMoviesQuery({});
  console.log("data", data);
  return (
    <div>
      <h1 className="">Home</h1>
    </div>
  );
};

export default HomeScreen;
