import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! Page not found.</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
