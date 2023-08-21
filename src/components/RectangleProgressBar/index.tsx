import { useEffect, useRef } from "react";

interface RectangleProgressBarProps {
  percentage: number;
  isVisible: boolean;
  color: string;
}

const getTextColor = (backgroundColor: string) => {
  const expandHex = (color: string) =>
    color.length === 4
      ? "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
      : color;

  const hexToRgb = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });

  const calculateLuminance = (r: number, g: number, b: number) =>
    (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const rgb = hexToRgb(expandHex(backgroundColor));
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

  return luminance > 0.8 ? "#000000" : "#FFFFFF";
};

const RectangleProgressBar: React.FC<RectangleProgressBarProps> = ({
  percentage,
  isVisible,
  color,
}) => {
  const rectBarRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const rect = rectBarRef.current;

    if (rect) {
      if (isVisible) {
        rect.style.width = `${percentage}%`;
      } else {
        rect.style.width = "0%";
      }
    }
  }, [percentage, isVisible]);

  const currentBackgroundColor = percentage === 0 ? "#2F1050" : color;
  const textColor = getTextColor(currentBackgroundColor);

  return (
    <>
      <rect width="100%" height="100%" fill="#2F1050" rx="5" ry="5" />
      <rect
        ref={rectBarRef}
        fill={color}
        x="0"
        y="0"
        rx="5"
        height="100%"
        width="0%"
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="5"
        fill={textColor}
        className="font-montserrat font-bold z-10"
      >
        {percentage}%
      </text>
    </>
  );
};

export default RectangleProgressBar;
