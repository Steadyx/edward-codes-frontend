import React, { useState } from "react";
import CircleProgressBar from "@/components/CircleProgressBar";
import RectangleProgressBar from "@/components/RectangleProgressBar";
import useCountUp from "@/hooks/useCountUp";

interface SkillProps {
  skill: string;
  percentage: number;
  isVisible: boolean;
}

const Skill: React.FC<SkillProps> = ({ skill, percentage, isVisible }) => {
  const [count, setCount] = useState(0);
  const displayedPercentage = useCountUp(
    percentage,
    isVisible,
    count,
    setCount,
  );

  const getColor = (percentage: number) => {
    if (percentage <= 30) return "#FF6B6B";
    if (percentage <= 60) return "#FFD464";
    return "#A8E6CF";
  };

  return (
    <div className="flex flex-col items-start mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transform hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg">
      <div className="relative w-4/5 h-4/5 sm:w-full sm:h-full">
        <svg className="w-full h-full block md:hidden" viewBox="0 0 100 10">
          <RectangleProgressBar
            percentage={displayedPercentage}
            isVisible={isVisible}
            color={getColor(displayedPercentage)}
          />
        </svg>
        <div className="text-left mt-2 pl-2">
          <span className="text-white font-bold text-lg md:hidden">
            {skill}
          </span>
        </div>
        <div className="hidden md:block sm:mt-4 w-6/12">
          <svg className="w-full" viewBox="0 0 36 36">
            <CircleProgressBar
              percentage={displayedPercentage}
              isVisible={isVisible}
              color={getColor(displayedPercentage)}
            />
            {isVisible && (
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="0.4em"
                fontWeight="bold"
              >
                {`${displayedPercentage}%`}
              </text>
            )}
          </svg>
          <div className="text-center mt-2">
            <span className="text-white font-bold text-lg">{skill}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
