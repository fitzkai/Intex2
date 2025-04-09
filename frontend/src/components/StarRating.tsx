import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  setRating?: (value: number) => void;
  max?: number;
  showId: string;
}
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  max = 5,
  showId,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rating);
  useEffect(() => {
    setCurrentRating(rating); // update if prop changes
  }, [rating]);
  const submitRating = async (value: number) => {
    setCurrentRating(value);
    setRating?.(value); // propagate to parent if needed
    try {
      const response = await fetch('https://index2-4-8-backend-bwe2c5c2a3dzfhdd.eastus-01.azurewebsites.net/Ratings/Rate', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showId,
          value,
        }),
      });
      if (!response.ok) {
        console.error('Failed to save rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1;
        const filled = hover !== null ? value <= hover : value <= currentRating;
        return (
          <button
            key={value}
            onClick={() => submitRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer p-0 m-0 bg-transparent border-none"
            style={{ background: 'none', border: 'none' }}
          >
            <Star
              fill={filled ? 'currentColor' : 'none'}
              className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
