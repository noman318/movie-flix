import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-2xl text-gray-300 mb-8">Oops! Page not found.</p>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
