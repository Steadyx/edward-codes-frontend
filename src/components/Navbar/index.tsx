import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (


    <div className="p-4 rounded-full max-w-4xl mx-auto my-10 relative navbar-container">
      <ul className="hidden lg:flex justify-between text-2xl font-bold font-montserrat text-2F1050 desktop-navbar">
        {Object.keys(sectionRefs).map((sectionName) => (
          <li key={sectionName} className="mx-8 nav-item">
            <button
              onClick={() => scrollToSection(sectionName)}
              className="focus:outline-none py-0 px-0"
            >
              {sectionName}
            </button>
          </li>
        ))}
      </ul>

      <div className="lg:hidden fixed top-10 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`focus:outline-none ${
            isOpen || (isMobile && "fixed right-0 top-50")
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
              <div
                className="w-10 h-1.5 bg-red-500 mb-1 rounded shadow"
              ></div>
              <div
                className="w-10 h-1.5 bg-red-500 mb-1 rounded shadow"
              ></div>
              <div
                className="w-10 h-1.5 bg-red-500 rounded shadow"
              ></div>
            </>
          )}
        </button>
      </div>
      <ul
        className={`fixed inset-0 w-screen h-screen bg-red-500 flex flex-col justify-center items-center text-2xl font-bold font-montserrat text-2F1050 transform transition-transform duration-500 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } z-10`}
      >
        {Object.keys(sectionRefs).map((sectionName) => (
          <li
            key={sectionName}
            className="mx-8 my-4 nav-item transform -skew-x-6"
          >
            <button
              onClick={() => {
                scrollToSection(sectionName);
                setIsOpen(false);
              }}
              className="focus:outline-none py-0 px-0 text-shadow-lg tracking-wider"
            >
              {sectionName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
