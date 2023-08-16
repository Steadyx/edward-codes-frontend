import React, { useState, useEffect, forwardRef } from "react";

interface NavBarProps {
  sectionRefs: {
    [key: string]: React.RefObject<HTMLElement>;
  };
}

const Navbar: React.FC<NavBarProps> = ({ sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToSection = (sectionName: string) => {
    const ref = sectionRefs[sectionName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navContent = {
    items: ["Home", "About", "Experience", "Contact"],
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsMobile(false);
        setIsOpen(false);
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`p-4 rounded-full max-w-4xl mx-auto my-10 relative ${isOpen || isMobile
          ? "p-0"
          : "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
        }`}
    >
      <ul className="hidden sm:flex justify-between text-2xl font-bold font-montserrat text-2F1050">
        {Object.keys(sectionRefs).map((sectionName) => (
          <li key={sectionName} className="mx-8 nav-item">
            <button
              onClick={() => scrollToSection(sectionName)}
              // no padding or margin on the button
              className="focus:outline-none py-0 px-0"
            >
              {sectionName}
            </button>
          </li>
        ))}
      </ul>

      <div className="sm:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`focus:outline-none ${isOpen || (isMobile && "fixed right-0 top-50")
            }`}
        >
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 fixed right-10 top-50 transform -translate-y-1/2"
            >
              <path
                d="M6 6L18 18"
                stroke="#2F1050"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 18L18 6"
                stroke="#2F1050"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <>
              <div className="w-10 h-1.5 bg-red-500 mb-1 rounded"></div>
              <div className="w-10 h-1.5 bg-red-500 mb-1 rounded"></div>
              <div className="w-10 h-1.5 bg-red-500 rounded"></div>
            </>
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      <ul
        className={`fixed inset-0 w-screen h-screen bg-red-500 flex flex-col justify-center items-center text-2xl font-bold font-montserrat text-2F1050 transform transition-transform duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          } sm:hidden z-10`}
      >
        {navContent.items.map((item) => (
          <li key={item} className="mb-2 w-full text-center py-2" onClick={() => setIsOpen(false)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
