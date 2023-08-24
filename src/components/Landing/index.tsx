import { useState, useEffect } from "react";
import bgImage from "@/assets/background-image.png";
import ChevronDown from "@/components/ChevronDown";
import Tagline from "@/components/Tagline";

interface LandingProps {
  id: string;
  refs: React.RefObject<HTMLDivElement>[];
}

const Landing: React.FC<LandingProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  const { id } = props;
  const [homeRef, aboutRef] = props.refs;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsMobile(true);
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
    <div
      className="flex flex-col justify-center items-center bg-bottom bg-no-repeat px-4 sm:px-0"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(39, 11, 53, 1) 0%, rgba(39, 11, 53, 0) 50%), url(/background-image.png)`,
        backgroundSize: isMobile ? "cover" : "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: isMobile ? "0 60%" : "0 80%",
        boxShadow: "inset 0 0 10px #000000",
      }}
      id={id}
      ref={homeRef}
    >
      <div className="text-center mt-20 sm:mt-60">
        <h1 className="text-6xl sm:text-8xl font-light tracking-widest font-montserrat text-red-500">
          Edward
        </h1>
        <h2 className="text-7xl sm:text-9xl font-extrabold tracking-wide font-montserrat text-red-500">
          Kemp
        </h2>
      </div>

      <div className="text-center mt-20 sm:mt-40">
        <Tagline />
      </div>
      <ChevronDown nextSectionRef={aboutRef} />
    </div>
  );
};

export default Landing;
