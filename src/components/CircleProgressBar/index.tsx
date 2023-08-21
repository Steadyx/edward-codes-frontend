import {useEffect, useRef} from "react";

interface CircleProgressBarProps {
  percentage: number;
  isVisible: boolean;
  color: string;
}


const CircleProgressBar: React.FC<CircleProgressBarProps> = ({ percentage, isVisible, color }) => {
  const circleBarRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleBarRef.current;
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
    <circle
      ref={circleBarRef}
      className={`transition-all duration-2000 ease-in-out skill-circle ${
        isVisible ? "skill-circle-visible" : "skill-circle-initial"
      }`}
      filter="url(#shadow)"
      strokeLinecap="round"
      fill="none"
      strokeWidth="4"
      stroke={color}
      r="16"
      cx="18"
      cy="18"
      style={{
        strokeDashoffset: isVisible
          ? (1 - percentage / 100) * (2 * Math.PI * 16)
          : 2 * Math.PI * 16,
      }}
    />
  );
};

export default CircleProgressBar;
