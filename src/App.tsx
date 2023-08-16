import { useRef } from "react";
import NavBar from "@/components/Navbar";
import Landing from "@/components/Landing";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ContactForm from "@/components/Form";
import BackToTop from "@/components/BackToTop";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    Home: homeRef,
    About: aboutRef,
    Experience: experienceRef,
    Contact: contactRef,
  };

  return (
    <>
      <NavBar sectionRefs={sectionRefs} />
      <Landing id="Home" refs={[homeRef, aboutRef]} />
      <About id="About" ref={aboutRef} />
      <Experience id="Experience" ref={experienceRef} />
      <ContactForm id="Contact" ref={contactRef} />
      <BackToTop />
    </>
  );
};

export default App;
