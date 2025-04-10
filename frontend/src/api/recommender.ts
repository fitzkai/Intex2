export interface UserPreferences {
  age: number;
  gender: string;
  platforms: string[];
  genres?: string[];
}

export interface RecommendedMovie {
  showId: number;
  title: string;
  genres: string[];
}

export async function fetchRecommendations(
  user: UserPreferences
): Promise<RecommendedMovie[]> {
  const response = await fetch(
    'https://flaskapi-fi03.onrender.com/recommendations',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  const data = await response.json();
  return data; // or `data.recommendations` if your response is wrapped
}
