import React, { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkScrollTop = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 400 && !showScrollButton) {
        setShowScrollButton(true);
    } else{
        setShowScrollButton(false);
    }
};


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <div>
      <button
        className={`back-to-top ${showScrollButton ? "show" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
};

export default BackToTop;
