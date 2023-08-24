import React, { useState, useEffect, useRef } from "react";
import ExperienceItem from "@/components/ExperienceItem";

interface ExperienceProps {
  id: string;
}

const Experience = React.forwardRef<HTMLDivElement, ExperienceProps>(
  (props, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [offsetTop, setOffsetTop] = useState(0);

    const { id } = props;

    const experiences = [
      {
        company: "Viooh",
        title: "Full Stack Developer",
        duration: "October (2022) - July (2023)",
        description:
          'Developed and implemented the "planner" prototype, a user-centric system for visualising allocated data and Out-Of-Home marketing campaigns on a map. Collaborated with teams to integrate and release features in each sprint, including collapsible hero items and input fields, and performed bug fixes using Redux, TypeScript, Jest, ESlint, Prettier, etc.',
        color: "bg-purple-600",
      },
      {
        company: "Squiz",
        title: "Front End Web Developer ",
        duration: "June (2021) - September (2022)",
        description: `Collaborated with the React squad on an in-house application, handling state management via Context API
and executing unit tests for component coverage. Assisted in building and redesigning websites for clients.`,
        color: "bg-purple-600",
      },
      {
        company: "iTech Media",
        title: "Front End Web Developer",
        duration: "August (2018) - (2021)",
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
        className="timeline-container bg-2F1050 py-20 sm:py-20 min-h-screen"
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
        <div className="lg:mt-60">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              exp={exp}
              index={index}
              containerRef={containerRef}
              colors={colors}
            />
          ))}
        </div>
      </div>
    );
  },
);

export default Experience;
