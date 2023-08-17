import React, { useEffect, useRef } from "react";
import useCountUp from "@/hooks/useCountUp";

interface SkillProps {
  skill: string;
  percentage: number;
  isVisible: boolean;
}

const Skill: React.FC<SkillProps> = ({ skill, percentage, isVisible }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const displayedPercentage = useCountUp(percentage, isVisible);

  const getColor = (percentage: number) => {
    if (percentage <= 30) return "#FF6B6B";
    if (percentage <= 60) return "#FFD464";
    return "#A8E6CF";
  };

  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const length = 2 * Math.PI * circle.r.baseVal.value;
      circle.style.strokeDasharray = `${length} ${length}`;
      circle.style.strokeDashoffset = `${length}`;

      if (isVisible) {
        circle.style.strokeDashoffset = `${(1 - percentage / 100) * length}`;
      }
    }
  }, [percentage, isVisible]);

  return (
    <div className="flex flex-col items-center mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transform hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg">
      <svg className="w-4/5 h-4/5" viewBox="0 0 36 36">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          stroke="#2F1050"
          strokeWidth="4"
          fill="none"
          r="16"
          cx="18"
          cy="18"
        />
        <circle
          ref={circleRef}
          className={`transition-all duration-2000 ease-in-out skill-circle ${isVisible ? "skill-circle-visible" : "skill-circle-initial"
            } `}
          filter="url(#shadow)"
          strokeLinecap="round"
          fill="none"
          strokeWidth="4"
          stroke={getColor(displayedPercentage)}
          r="16"
          cx="18"
          cy="18"
          style={{
            strokeDashoffset: isVisible
              ? (1 - percentage / 100) * (2 * Math.PI * 16)
              : 2 * Math.PI * 16,
          }}
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fontSize="6"
          fill="#FFF"
          className="font-montserrat font-bold"
        >
          {displayedPercentage}%
        </text>
      </svg>
      <h2 className="text-white font-montserrat font-bold mt-2 text-lg sm:text-xl md:text-2xl">
        {skill}
      </h2>
    </div>
  );
};

export default Skill;
