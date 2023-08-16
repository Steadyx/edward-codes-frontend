import React, { useEffect, useState } from "react";

const Toast: React.FC<{
  message: string;
  type: "success" | "error";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    // This timer will start the "leave" transition after 3 seconds (or any desired duration)
    const transitionTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    // This timer ensures the "leave" transition has enough time to complete before calling onClose
    const visibilityTimer = setTimeout(() => {
      setIsTransitioning(false);
      onClose();
    }, 3600); // 3000ms (duration before starting the leave transition) + 600ms (transition duration)

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(visibilityTimer);
    };
}, []);


  return (
    <div className={`toast ${isTransitioning ? 'transitioning' : ''} ${isVisible ? 'show' : ''} ${type}`}>
      {message}
    </div>
  );
};

export default Toast;

