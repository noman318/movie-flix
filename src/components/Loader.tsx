import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader-container" data-testid="loading">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
