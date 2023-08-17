import { useState, useEffect } from "react";
const useCountUp = (
  targetValue: number,
  isVisible: boolean,
  duration: number = 2000,
) => {
  const [value, setValue] = useState(0);
  const step = targetValue / (duration / 20); 

  useEffect(() => {
    if (isVisible) {
      const updateValue = () => {
        setValue((prev) => {
          const nextValue = prev + step;
          return nextValue < targetValue ? nextValue : targetValue;
        });
      };

      const intervalId = setInterval(updateValue, 20);

      return () => clearInterval(intervalId);
    }
  }, [isVisible, targetValue, step]);

  return Math.round(value);
};

export default useCountUp;
