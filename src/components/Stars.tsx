import { useState } from "react";
import "./Stars.css"

type StarProps = {
  count?: number | null;
  defaultRating: any;
  icon?: string | null;
  color?: string | null;
  iconSize: number | null;
}

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "yellow";

export default function Stars({ count, defaultRating, icon, color, iconSize }: StarProps) {
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);

  let stars = Array(count || DEFAULT_COUNT).fill(icon);

  const handleClick = (rating: any) => {
    setRating(rating);
    localStorage.setItem("starRating", rating);

  };

  return (
    <div className="starsContainer">
      {stars.map((_, index) => {
        const isActiveColor = (rating || temporaryRating) && (index < rating || index < temporaryRating);

        let elementColor = "";

        if (isActiveColor) {
          elementColor = color || DEFAULT_COLOR;
        } else {
          elementColor = DEFAULT_UNSELECTED_COLOR;
        }

        return (
          <div className="star" key={index}
            style={{ fontSize: iconSize ? `${iconSize}px` : "14px", color: elementColor, filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}` }}
            onMouseEnter={() => setTemporaryRating(index + 1)}
            onMouseLeave={() => setTemporaryRating(0)}
            onClick={() => handleClick(index + 1)}>
            {icon ? icon : DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  )
}
