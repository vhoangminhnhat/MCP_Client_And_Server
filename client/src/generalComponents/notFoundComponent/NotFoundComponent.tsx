import { useNavigate } from "react-router-dom";

const NotFoundComponent = () => {
  const navigate = useNavigate();

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404"></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <button
          className="italic font-bold text-blue-600"
          onClick={() => navigate("/")}
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundComponent;
