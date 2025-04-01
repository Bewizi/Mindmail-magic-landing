import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Book, Brain, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position percentage
      const moveX = ((clientX - innerWidth / 2) / (innerWidth / 2)) * -10;
      const moveY = ((clientY - innerHeight / 2) / (innerHeight / 2)) * -10;

      // Apply perspective transform
      imageRef.current.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8  relative  min-h-screen flex items-center pt-32 overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-50"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 max-w-xl">
          <ScrollReveal delay={300} direction="left">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm">
              The Quantum Manifestation System
            </span>
          </ScrollReveal>

          <ScrollReveal delay={500} direction="left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-white">Master Your </span>
              <span className="text-cosmic-gradient">Reality with Focus</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={700} direction="left">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              The science-backed system that transforms your conscious focus
              into your superpower, turning quantum possibilities into concrete
              realities in your life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={900} direction="left">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="#book"
                className="cosmic-button text-center flex items-center justify-center"
              >
                <Book className="w-5 h-5 mr-2" />
                Discover the Book
              </Link>
              <Link
                to="/dashboard"
                className="cosmic-button-outline text-center flex items-center justify-center"
              >
                <Brain className="w-5 h-5 mr-2" />
                Try the Dashboard
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1100} direction="left">
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-cosmic-500/20 border-2 border-cosmic-400/30 flex items-center justify-center text-xs font-medium text-white/90"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm">
                Join <span className="text-white font-medium">10,000+</span>{" "}
                people manifesting their reality through focused consciousness
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-cosmic-radial opacity-40 blur-2xl"></div>

          <ScrollReveal delay={800} direction="right">
            <div className="relative">
              <img
                ref={imageRef}
                src="/lovable-uploads/afcce6a3-cefa-4d12-b014-5405bbe7fecc.png"
                alt="Quantum Consciousness Visualization"
                className="max-w-full w-[80%] mx-auto transition-transform duration-200 relative z-10 rounded-xl shadow-2xl"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-cosmic-500/20 blur-3xl animate-pulse"></div>
              <div className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/4 w-12 h-12 rounded-full bg-cosmic-300/30 animate-float"></div>
              <div className="absolute bottom-0 left-0 translate-x-1/2 translate-y-1/4 w-16 h-16 rounded-full bg-cosmic-400/20 animate-float"></div>

              {/* Add a quantum particle effect to represent the quantum field */}
              <div className="absolute -right-8 top-1/3 w-24 h-24">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full bg-cosmic-400/10 animate-ping"></div>
                  <div className="absolute inset-2 rounded-full bg-cosmic-400/20 animate-pulse"></div>
                  <div
                    className="absolute inset-4 rounded-full bg-cosmic-400/30 animate-pulse"
                    style={{ animationDelay: "500ms" }}
                  ></div>
                  <div className="absolute inset-6 rounded-full bg-cosmic-500/40"></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
        <span className="text-white/50 text-sm">Scroll to explore</span>
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div> */}
    </section>
  );
};

export default HeroSection;
