import { Link, useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import '../css/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <WelcomeBand />
      <div className="homepage-container">
        <div className="row">
          <div className="col-md-9">
            <div className="homepage-left">
              <h1>Go no further for all your favorites!</h1>
              <h3>Sign up today or login in with your account here!</h3>
              <div className="homepage-buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/userinfo')}>Register</button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-10">
          <div className="col-md-6"></div>
          <div className="homepage-right">
            <img src="/images/Ganglands.jpg" alt="Movie 1" className="poster" />
            <img src="/images/.jpg" alt="Movie 2" className="poster" />
          </div>
        </div>
      </div>
      <footer>
        <p>
          We value your privacy. Learn more about our steps to keep you safe in
          our <Link to="/privacy">privacy policy</Link>.
        </p>
      </footer>
    </>
  );
};

export default HomePage;
