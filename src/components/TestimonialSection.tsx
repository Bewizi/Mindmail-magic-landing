import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Creative Director",
    content: "MindMail has completely transformed my creative process. The cognitive enhancement exercises have boosted my ability to think outside the box and come up with innovative solutions.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=150&h=150&dpr=2&q=80&crop=faces&fit=crop",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "As someone who needs to maintain focus for long coding sessions, MindMail has been a game-changer. My productivity has increased significantly, and I'm able to solve complex problems more efficiently.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?&w=150&h=150&dpr=2&q=80&crop=faces&fit=crop",
    rating: 5,
  },
  {
    name: "Michael Torres",
    role: "Medical Student",
    content: "The sleep enhancement program helped me establish a healthier sleep pattern, which was crucial during my intense study periods. My memory retention has improved dramatically.",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=150&h=150&dpr=2&q=80&crop=faces&fit=crop",
    rating: 4,
  },
  {
    name: "Emma Lewis",
    role: "Marketing Executive",
    content: "MindMail's mindfulness training has helped me manage work stress more effectively. I'm more present in meetings and can think more clearly under pressure.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?&w=150&h=150&dpr=2&q=80&crop=faces&fit=crop",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Entrepreneur",
    content: "The personalized growth path has been instrumental in helping me adapt to the challenges of running a startup. My decision-making has become more intuitive and effective.",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?&w=150&h=150&dpr=2&q=80&crop=faces&fit=crop",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState([testimonials[0]]);
  const slideRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize with all testimonials
    setVisibleTestimonials(testimonials);
    
    // Set up interval for auto-scrolling if needed
    resetInterval();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
    }
  }, [activeIndex]);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
    resetInterval();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    resetInterval();
  };

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-30"></div>
      
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm mb-4">
            User Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
            From Our Community
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Discover how MindMail has transformed the mental capabilities and everyday lives of people just like you.
          </p>
        </ScrollReveal>
        
        {/* Grid Display of All Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal 
              key={index}
              delay={index * 150}
              className="cosmic-card p-6 rounded-xl flex flex-col h-full"
            >
              <div className="mb-6 flex justify-center">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-cosmic-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="mb-6 flex-grow">
                <p className="text-white text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
              </blockquote>
              
              <div className="mt-auto flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cosmic-400/30 mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display font-semibold text-white">{testimonial.name}</p>
                  <p className="text-cosmic-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        {/* Carousel section - keeping it for mobile or as an alternative view */}
        <div className="relative max-w-4xl mx-auto hidden">
          <div className="absolute inset-0 bg-cosmic-radial opacity-20 blur-3xl"></div>
          
          <div className="relative overflow-hidden rounded-2xl cosmic-card">
            <div 
              ref={slideRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full px-6 md:px-12 py-10 md:py-16 flex-shrink-0"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="flex flex-col h-full max-w-2xl mx-auto">
                    <div className="mb-8 flex justify-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-cosmic-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <blockquote className="text-center mb-8">
                      <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </blockquote>
                    
                    <div className="mt-auto flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cosmic-400/30 mb-3">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-display font-semibold text-white text-lg">{testimonial.name}</p>
                      <p className="text-cosmic-200 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-10 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-10 focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-cosmic-400 w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
