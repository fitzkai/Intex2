import { Link, useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import '../css/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page-wrapper">
        <WelcomeBand />
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="homepage-left">
              <h1>Go no further for all your favorites!</h1>
              <h3>Sign up today or login in with your account here!</h3>
              <div className="homepage-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/userinfo')}>Register</button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="homepage-right">
              <img
                src="/images/Ganglands.jpg"
                alt="Movie 1"
                className="poster"
              />
              <img
                src="/images/some-movie.jpg"
                alt="Movie 2"
                className="poster"
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
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
