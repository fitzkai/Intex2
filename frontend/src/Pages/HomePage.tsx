import { Link, useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import '../css/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-wrapper">
        <WelcomeBand />
        <div className="homepage-container homepage-flex">
          <div className="homepage-left">
            <h1>Go no further for all your favorites!</h1>
            <h3>Sign up today or login with your account here!</h3>
            <div className="homepage-buttons">
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/userinfo')}>Register</button>
            </div>
          </div>
          <div className="homepage-right">
            <div className="poster-grid">
              <img
                src="https://moviepostersintex48.blob.core.windows.net/movieposters/Grown Ups.jpg"
                alt="Grown-ups"
                className="poster"
              />
              <img
                src="https://moviepostersintex48.blob.core.windows.net/movieposters/Dick Johnson Is Dead.jpg"
                alt="Dick Johnson is Dead"
                className="poster"
              />
              <img
                src="https://moviepostersintex48.blob.core.windows.net/movieposters/The Great British Baking Show Masterclass.jpg"
                alt="Great British Baking Show"
                className="poster"
              />
              <img
                src="https://moviepostersintex48.blob.core.windows.net/movieposters/Avengers Infinity War.jpg"
                alt="Avengers"
                className="poster"
              />
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>
            We value your privacy. Learn more about our steps to keep you safe
            in our <Link to="/privacy">privacy policy</Link>.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
