import { Link, useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <WelcomeBand />
      <h1>Go no further for all your favorites!</h1>
      <h3>Sign up today or login in with your account here!</h3>
      <button onClick={() => navigate('/MoviesPage')}>Login</button>
      <button onClick={() => navigate('/userinfo')}>Register</button>
      <p>
        We value your privacy. Learn more about our steps to keep you safe in
        our <Link to="/privacy">privacy policy</Link>.
      </p>

      <div>{/* Enter the super awesome top movie posters here! */}</div>
    </>
  );
};
export default HomePage;
