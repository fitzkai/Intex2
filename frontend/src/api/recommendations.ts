// src/api/recommendations.ts

export interface InputItem {
  user_id: number;
  show_id: number;
}

export interface RecommendationResult {
  User: string;
  [key: `Recommended Item ${number}`]: string;
}

export const fetchMLRecommendations = async (
  input: InputItem[]
): Promise<RecommendationResult[]> => {
  const response = await fetch('/api/Recommendations/ml', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch recommendations: ${error}`);
  }

  const data = await response.json();
  return data.results.webServiceOutput0;
};
