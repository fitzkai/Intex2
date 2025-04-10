export interface Movie {
  showId: number;
  title: string;
}
export interface MovieDetail {
  showId: string;
  title: string;
  type: string;
  director: string;
  cast: string;
  releaseYear: string;
  country: string;
  rating: string;
  duration: string;
  description: string;
  genre: string;
  imagePath: string;
}

export interface RecommendationRow {
  showId: number;
  title: string;
  recommendation1: string;
  recommendation2: string;
  recommendation3: string;
  recommendation4: string;
  recommendation5: string;
  recommendation6?: string | null;
  recommendation7?: string | null;
  recommendation8?: string | null;
  recommendation9?: string | null;
  recommendation10?: string | null;
}