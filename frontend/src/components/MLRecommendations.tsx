import React, { useEffect, useState } from 'react';
import {
  fetchMLRecommendations,
  InputItem,
  RecommendationResult,
} from '../api/recommendations';

interface Props {
  userId: number;
  showId: number;
}

const MLRecommendations: React.FC<Props> = ({ userId, showId }) => {
  const [recommendations, setRecommendations] = useState<
    RecommendationResult[] | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const input: InputItem[] = [{ user_id: userId, show_id: showId }];
        const results = await fetchMLRecommendations(input);
        setRecommendations(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId, showId]);

  if (loading) return <p>Loading recommendations...</p>;

  if (!recommendations || recommendations.length === 0) {
    return <p>No recommendations found.</p>;
  }

  const topPicks = Object.entries(recommendations[0])
    .filter(([key]) => key.startsWith('Recommended Item'))
    .map(([_, title]) => title);

  return (
    <div>
      <h3>Top Picks for You</h3>
      <ul>
        {topPicks.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MLRecommendations;
