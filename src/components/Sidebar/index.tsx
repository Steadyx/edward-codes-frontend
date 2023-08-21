import useScrollDetection from "@/hooks/useScrollDetection";
import useSidebarColor from "@/hooks/useSidebarColor";
import useActiveSection from "@/hooks/useActiveSection";

interface SidebarProps {
  sectionRefs: {
    [key: string]: React.RefObject<HTMLElement>;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ sectionRefs }) => {
  const isScrolled = useScrollDetection();
  const sidebarColor = useSidebarColor(sectionRefs);
  const activeSection = useActiveSection(sectionRefs);

  const scrollToSection = (sectionName: string) => {
    const ref = sectionRefs[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={`fixed right-0 transform -translate-y-1/2 h-auto p-4 shadow-lg sidebar-container z-50 transition-all duration-300 rounded-l-lg hidden lg:block ${
        isScrolled ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ backgroundColor: sidebarColor }}
    >
      <ul className="flex flex-col space-y-4 text-xl font-bold font-montserrat text-white">
        {Object.keys(sectionRefs).map((sectionName) => (
          <li
            key={sectionName}
            className="transition-all duration-300 hover:scale-110"
          >
            <button
              onClick={() => scrollToSection(sectionName)}
              className={`focus:outline-none py-2 px-4 rounded text-white transition-colors duration-300 ${
                sectionName === activeSection ? "active--underline" : ""
              }`}
            >
              {sectionName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
