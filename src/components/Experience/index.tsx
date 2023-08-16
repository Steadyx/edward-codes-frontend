import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ExperienceProps {
  id: string;
}

const Experience = React.forwardRef<HTMLDivElement, ExperienceProps>(
  (props, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [offsetTop, setOffsetTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const { id } = props;

    const experiences = [
      {
        company: "Viooh",
        title: "Full Stack Developer",
        duration: "October (2022) - July 2023",
        description:
          'Developed and implemented the "planner" prototype, a user-centric system for visualising allocated data and Out-Of-Home marketing campaigns on a map. Collaborated with teams to integrate and release features in each sprint, including collapsible hero items and input fields, and performed bug fixes using Redux, TypeScript, Jest, ESlint, Prettier, etc.',
        color: "bg-purple-600",
      },
      {
        company: "Squiz",
        title: "Front End Web Developer ",
        duration: "June (2021) - September 2022",
        description: `Collaborated with the React squad on an in-house application, handling state management via Context API
and executing unit tests for component coverage. Assisted in building and redesigning websites for clients.`,
        color: "bg-purple-600",
      },
      {
        company: "iTech Media",
        title: "Front End Web Developer",
        duration: "August (2018) - 2021",
        description:
          "Implemented modern technologies such as VueJS, StorybookJS, SASS with BEM, and NodeJS to rebuild one of our main sites, ensuring smooth integration with CraftCMS.",
        color: "bg-purple-600",
      },
      {
        company: "EG+ Worldwide",
        title: "Junior Web Developer",
        duration: "August (2017) - August (2018)",
        description: `Assisted in developing microsites and internal tools, focusing on maintaining project consistency and
meeting deadlines with exceptional attention to detail.`,
        color: "bg-purple-600",
      },
    ];

    useEffect(() => {
      if (titleRef.current && containerRef.current) {
        const titleHeight = titleRef.current.getBoundingClientRect().height;
        const containerPaddingTop = parseInt(
          window.getComputedStyle(containerRef.current).paddingTop,
          10,
        );
        setOffsetTop(titleHeight + containerPaddingTop + 16);
      }
    }, []);

    const colors = [
      "bg-purple-600",
      "bg-pink-500",
      "bg-red-500",
      "bg-purple-600",
    ];

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 800) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const combinedRef = (el: HTMLDivElement) => {
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }

      containerRef.current = el;
    };

    return (
      <div
        className="timeline-container bg-gray-800 py-20 sm:py-20 min-h-screen"
        ref={combinedRef}
        id={id}
      >
        <h2
          className="text-center text-4xl font-semibold text-red-500 mb-10 font-montserrat title-underline"
          ref={titleRef}
        >
          Experience
        </h2>
        <div className="timeline-line" style={{ top: `${offsetTop}px` }}></div>
        <div className={`${isMobile ? "mt-0" : "mt-60"}`}>
          {experiences.map((exp, index) => {
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
                key={index}
                ref={ref}
                className={`timeline-item ${inView ? "visible" : ""} ${isLeft ? "flex-row-reverse" : ""
                  }`}
              >
                <div
                  className={`timeline-node ${colors[index % colors.length]}`}
                ></div>
                <div
                  style={contentMarginStyle}
                  className={`timeline-content ${colors[index % colors.length]
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
          })}
        </div>
      </div>
    );
  },
);

export default Experience;
