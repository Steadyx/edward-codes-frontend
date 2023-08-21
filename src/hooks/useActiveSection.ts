import { useState, useEffect } from "react";

const useActiveSection = (sectionRefs: { [key: string]: React.RefObject<HTMLElement> }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleActiveSection = () => {
      const currentSection = Object.keys(sectionRefs).find((sectionName) => {
        const ref = sectionRefs[sectionName];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const sidebarHeight = window.innerHeight;
          return rect.top <= sidebarHeight / 2 && rect.bottom >= sidebarHeight / 2;
        }
        return false;
      });

      setActiveSection(currentSection || null);
    };

    window.addEventListener("scroll", handleActiveSection);

    return () => {
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, [sectionRefs]);

  return activeSection;
};

export default useActiveSection;
