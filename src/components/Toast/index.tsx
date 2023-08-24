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

    const transitionTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const visibilityTimer = setTimeout(() => {
      setIsTransitioning(false);
      onClose();
    }, 3600); 

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(visibilityTimer);
    };
}, [onClose]);


  return (
    <div className={`toast ${isTransitioning ? 'transitioning' : ''} ${isVisible ? 'show' : ''} ${type}`}>
      {message}
    </div>
  );
};

export default Toast;

