import { useState, useEffect } from "react";

const useSidebarColor = (sectionRefs: { [key: string]: React.RefObject<HTMLElement> }) => {
  const [sidebarColor, setSidebarColor] = useState("#2F1050");

  useEffect(() => {
    const handleColorChange = () => {
      const overlappingSection = Object.values(sectionRefs).find(
        (ref: React.RefObject<HTMLElement>) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const sidebarHeight = window.innerHeight;
            const isAtBottom = rect.top <= sidebarHeight && rect.bottom >= sidebarHeight;
            return (rect.top <= sidebarHeight / 2 && rect.bottom >= sidebarHeight / 2) || isAtBottom;
          }
        },
      );

      if (overlappingSection?.current) {
        const bgColor = window.getComputedStyle(overlappingSection.current).backgroundColor;
        const matches = bgColor.match(/\((\d+), (\d+), (\d+)\)/);
        if (matches) {
          const [_, r, g, b] = matches.map(Number);
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          if (luminance >= 128) {
            setSidebarColor("#2F1050");
          } else {
            setSidebarColor("#270b35");
          }
        } else {
          setSidebarColor("#2F1050");
        }
      }
    };

    window.addEventListener("scroll", handleColorChange);

    return () => {
      window.removeEventListener("scroll", handleColorChange);
    };
  }, [sectionRefs]);

  return sidebarColor;
};

export default useSidebarColor;
