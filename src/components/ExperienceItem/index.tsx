import React from "react";
import { useInView } from "react-intersection-observer";

interface ExperienceItemProps {
  exp: {
    company: string;
    title: string;
    duration: string;
    description: string;
  };
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
  colors: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ exp, index, containerRef, colors }) => {
const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const isLeft = index % 2 === 0;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const timelineLineWidth = 2;
    const contentBoxWidth = 250;

    const spaceOnOneSide = (containerWidth - timelineLineWidth) / 2;
    const contentMarginValue = (spaceOnOneSide - contentBoxWidth) / 2;

    const contentMarginStyle = isLeft
      ? { marginRight: `${contentMarginValue}px` }
      : { marginLeft: `${contentMarginValue}px` };

    return (
      <div
        ref={ref}
        className={`timeline-item ${inView ? "visible" : ""} ${
          isLeft ? "flex-row-reverse" : ""
        }`}
      >
        <div
          style={contentMarginStyle}
          className={`timeline-content ${
            colors[index % colors.length]
          } p-4 sm:p-6 rounded-lg shadow-md w-full mb-6 sm:mb-0`}
        >
          <h3 className="font-bold text-xl mb-4 text-2F1050 font-montserrat">
            {exp.company} - {exp.title}
          </h3>
          <p className="text-gray-800 font-bold font-montserrat mb-4">
            {exp.duration}
          </p>
          <p className="text-gray-800 font-montserrat text-lg">
            {exp.description}
          </p>
        </div>
      </div>
    );
  }

export default ExperienceItem;
