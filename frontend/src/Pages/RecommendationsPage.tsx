// RecommendationsPage.tsx
import { useLocation } from 'react-router-dom';

function RecommendationsPage() {
  const { state } = useLocation();
  const recommendations = state?.recommendations || {};

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Your Personalized Recommendations</h2>
      {Object.entries(recommendations).map(([genre, titles]: any) => (
        <div key={genre} className="mb-4">
          <h4>{genre}</h4>
          <ul>
            {titles.map((title: string, idx: number) => (
              <li key={idx}>{title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecommendationsPage;
