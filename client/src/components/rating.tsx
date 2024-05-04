import React from 'react';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  return (
    <div className="feedback">
      <div className="rating">
        {[5, 4, 3, 2, 1].map((ratingValue) => (
          <React.Fragment key={ratingValue}>
            <input 
              type="radio" 
              name="rating" 
              id={`rating-${ratingValue}`} 
              value={ratingValue} 
              checked={value === ratingValue}
              onChange={() => onChange(ratingValue)}
              className="rating-input"
            />
            <label htmlFor={`rating-${ratingValue}`} className="rating-label"></label>
          </React.Fragment>
        ))}
        <div className="emoji-wrapper">
          <div className="emoji">
            {/* Always include all images, manage visibility via CSS */}
            <img src="/rating0.jpg" alt="Star 0" className="rating-0 w-24" />
            <img src="/rating1.jpg" alt="Star 1" className="rating-1 w-24" />
            <img src="/rating2.jpg" alt="Star 2" className="rating-2 w-24" />
            <img src="/rating3.jpg" alt="Star 3" className="rating-3 w-24" />
            <img src="/rating4.jpg" alt="Star 4" className="rating-4 w-24" />
            <img src="/rating5.jpg" alt="Star 5" className="rating-5 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
