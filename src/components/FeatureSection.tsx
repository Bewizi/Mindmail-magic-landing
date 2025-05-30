import ScrollReveal from "./ScrollReveal";

const features = [
  {
    title: "Mental Operating System",
    description:
      "Learn the foundational principles of the MindMail methodology for organizing your thinking patterns.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M21 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 5V3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 21V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Thought Organization",
    description:
      "Practical techniques from the audiobook implemented in the dashboard to structure and prioritize your ideas.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 8V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mental Clarity Routine",
    description:
      "Follow the guided audio sessions and use the dashboard to establish your daily mental clarity practice.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 8V5C16 4.44772 15.5523 4 15 4H9C8.44772 4 8 4.44772 8 5V8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 16V19C8 19.5523 8.44772 20 9 20H15C15.5523 20 16 19.5523 16 19V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 12H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 5V3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 21V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Focus Enhancement",
    description:
      "Scientifically-backed techniques from the book, integrated with dashboard tools for deep work and sustained attention.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 9H9.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 9H15.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mental Decluttering",
    description:
      "Learn the MindMail approach to eliminating mental noise and creating space for important thoughts and ideas.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 15H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 9H9.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 9H15.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Continuous Improvement",
    description:
      "The audiobook teaches the principles while the dashboard tracks your progress and adapts to your evolving mental clarity journey.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 12H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 8V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-30"></div>

      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm mb-4">
            The Complete System
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
            Audiobook + Dashboard
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            The MindMail system combines a comprehensive audiobook with a
            powerful dashboard to transform your mental clarity and
            productivity.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={index * 100}
              className="cosmic-card p-6 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-cosmic-500/20 flex items-center justify-center text-cosmic-300 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* <ScrollReveal className="mt-16 text-center" delay={800}>
          <a 
            href="#book" 
            className="cosmic-button inline-flex items-center space-x-2"
          >
            <span>Learn About the Audiobook</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </ScrollReveal> */}
      </div>
    </section>
  );
};

export default FeatureSection;
