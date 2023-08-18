import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/Navbar";
import Landing from "@/components/Landing";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import ContactForm from "@/components/Form";
import BackToTop from "@/components/BackToTop";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef(null);
  const skillsRef = useRef<HTMLDivElement | null>(null); 

  const [isSkillsVisible, setIsSkillsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSkillsVisible(true);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const sectionRefs = {
    Home: homeRef,
    About: aboutRef,
    Skills: skillsRef,
    Experience: experienceRef,
    Contact: contactRef,
  };

  return (
    <>
      <NavBar sectionRefs={sectionRefs} />
      <Landing id="Home" refs={[homeRef, aboutRef]} />
      <About id="About" ref={aboutRef} />
      <Skills ref={skillsRef} isVisible={isSkillsVisible} />
      <Experience id="Experience" ref={experienceRef} />
      <ContactForm id="Contact" ref={contactRef} />
      <BackToTop />
    </>
  );
};
export default App;
