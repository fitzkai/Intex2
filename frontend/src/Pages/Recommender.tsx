// import { useNavigate } from 'react-router-dom';
import BarNav from '../components/BarNav';
import MLRecommendations from '../components/MLRecommendations';

const HomePage = () => {
  // const navigate = useNavigate();

  return (
    <>
      <BarNav />
      <h1></h1>

      <MLRecommendations userId={1} showId={5} />
    </>
  );
};
export default HomePage;
