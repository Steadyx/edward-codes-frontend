import { forwardRef } from "react";

interface AboutProps {
  id: string;
}

const About = forwardRef<HTMLDivElement, AboutProps>((props, ref) => {
  const { id } = props;

  const aboutContent = [
    {
      title: "Where I'm From",
      description: "I'm from these places.",
      color: "bg-purple-600",
      items: [
        "Born in 🇧🇸",
        "Grew up there all my life",
        "Moved to London, UK in 2016",
      ],
    },
    {
      title: "Hobbies & Pastimes",
      description: "I love to do these things in my free time.",
      color: "bg-pink-500",
      items: [
        "Reading Sci-Fi novels",
        "Hiking and nature walks",
        "Playing the guitar, making music",
        "Going to gigs and concerts",
      ],
    },
    {
      title: "Passions",
      description: "My passions in life are these things.",
      color: "bg-red-500",
      items: ["Web Development", "Music", "Skateboarding <3", "Traveling"],
    },
    {
      title: "Adventures",
      description: "Life is an adventure, and I love to explore.",
      color: "bg-purple-600",
      items: [
        "Love traveling",
        "Want to visit every continent",
        "Love getting out of my comfort zone",
        "Love meeting new people",
      ],
    },
  ];

  return (
    <div className="bg-2F1050 py-10 sm:py-60" id={id} ref={ref}>
      <h2 className="text-center text-4xl font-semibold text-red-500 mb-10 font-montserrat title-underline">
        About Me
      </h2>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-10 px-4 sm:px-0">
        {aboutContent.map((section) => (
          <div
            key={section.title}
            className={`${section.color} p-4 sm:p-6 rounded-lg shadow-md w-full sm:w-80 mb-6 sm:mb-0`}
          >
            <h3 className="font-bold text-xl mb-4 text-2F1050 font-montserrat">
              {section.title}
            </h3>
            <p className="text-white font-montserrat mb-4">
              {section.description}
            </p>
            {section.items.map((item) => (
              <div key={item} className="bg-2F1050 p-2 rounded mb-2">
                <p className="text-white font-montserrat">{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default About;
