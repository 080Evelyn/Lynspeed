import { Link } from "react-router-dom";
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! Page Not Found</h2>
        <p className="error-description">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="error-home-link">Go Back Home</Link>
      </div>
    </div>
  );
}
