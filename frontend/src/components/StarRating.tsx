import React, { useState } from 'react';
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
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1;
        const filled = hover !== null ? value <= hover : value <= rating;
        return (
          <button
            key={value}
            onClick={() => setRating?.(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer p-0 m-0 bg-transparent border-none"
          >
            <Star
              fill={filled ? 'currentColor' : 'none'}
              className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
