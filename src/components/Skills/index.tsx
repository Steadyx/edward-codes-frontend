import React, { forwardRef } from "react";
import Skill from "@/components/Skill";

interface SkillsProps {
  isVisible: boolean;
}

import { useState } from "react";

// Sample grouped skills data
const groupedSkills = {
  Frontend: [
    { skill: "React", percentage: 90 },
    { skill: "VueJS", percentage: 80 },
    { skill: "TypeScript", percentage: 80 },
    { skill: "JavaScript", percentage: 90 },
  ],
  Backend: [
    { skill: "NodeJS", percentage: 70 },
    { skill: "Express", percentage: 70 },
  ],
  Tools: [
    { skill: "Git", percentage: 90 },
    { skill: "Docker", percentage: 70 },
    { skill: "AWS", percentage: 60 },
  ],
  Testing: [
    { skill: "TDD", percentage: 75 },
    { skill: "Jest", percentage: 80 },
    { skill: "Cypress", percentage: 70 },
  ],
  Editor: [{ skill: "Neovim <3", percentage: 90 }],
};

const Skills = forwardRef<HTMLDivElement, SkillsProps>(({ isVisible }, ref) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSection(null);
    } else {
      setExpandedSection("all");
    }
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="py-10 sm:py-60 bg-270b35 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      <h2 className="text-center text-4xl font-semibold text-red-500 mb-10 font-montserrat title-underline">
        My Skills
      </h2>
      <p className="text-left text-white font-montserrat font-bold mb-10 text-lg max-w-2xl mx-auto">
        Here are some of the technologies I've worked with:
        <br /> Learning is a never-ending process, and I'm always looking for new
        technologies to work with!
      </p>
      <p className="text-center text-white font-montserrat font-bold mb-10 text-lg">

      </p>
      <button
        onClick={toggleAllSections}
        className="mb-4 p-2 font-montserrat font-bold rounded-lg hover:bg-opacity-90 transition-opacity duration-300"
        style={{ backgroundColor: "#A8E6CF", color: "#2F1050" }}
      >
        {allExpanded ? "Collapse All ▲" : "Expand All ▼"}
      </button>
      {Object.entries(groupedSkills).map(([section, skills]) => (
        <div key={section} className="mb-4">
          <button
            onClick={() => toggleSection(section)}
            className="w-full p-4 text-left rounded-lg shadow-md hover:bg-opacity-90 transition-opacity duration-300 text-white font-montserrat font-bold bg-2F1050"
          >
            {section}{" "}
            <span className="float-right">
              {expandedSection === section || allExpanded ? "▲" : "▼"}
            </span>
          </button>
          <div
            className={`mt-4 flex flex-wrap justify-start transition-max-height duration-500 overflow-hidden ${expandedSection === section || allExpanded
                ? "max-h-[1000px]"
                : "max-h-0"
              }`}
          >
            {skills.map((skillData) => (
              <Skill
                key={skillData.skill}
                {...skillData}
                isVisible={
                  isVisible && (expandedSection === section || allExpanded)
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default Skills;
