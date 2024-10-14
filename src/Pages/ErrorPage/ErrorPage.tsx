import { Link } from "react-router-dom";
import './ErrorPage.css';
export default function ErrorPage() {
  return (
    <div>
      404 Not Found
      <Link to="/">Home from Link</Link>
      
    </div>
  );
}
