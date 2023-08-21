import { useState, useEffect } from "react";

const useCountUp = (
  targetValue: number,
  isVisible: boolean,
  count: number, // <-- Add this parameter
  setCount?: (count: number) => void,
  duration: number = 2000,
) => {
  const [value, setValue] = useState(count); // <-- Initialize with count
  const step = targetValue / (duration / 20);

  useEffect(() => {
    if (count === 0) {
      setValue(0); // <-- Reset internal state if count is zero
    }
  }, [count]);

  useEffect(() => {
    if (isVisible) {
      const updateValue = () => {
        setValue((prev) => {
          const nextValue = prev + step;
          if (setCount) {
            setCount(nextValue);
          }
          return nextValue < targetValue ? nextValue : targetValue;
        });
      };

      const intervalId = setInterval(updateValue, 20);

      return () => clearInterval(intervalId);
    }
  }, [isVisible, targetValue, step, setCount]);

  return Math.round(value);
};

export default useCountUp;
