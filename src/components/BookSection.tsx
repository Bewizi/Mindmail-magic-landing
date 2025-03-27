
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { Headphones, BookAudio, Play, ArrowRight } from 'lucide-react';

const BookSection = () => {
  return (
    <section id="book" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-30"></div>
      
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm mb-4">
            The MindMail Guide
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
            Understand Your Mind's Mechanism
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Discover the science behind mental clarity and how the MindMail system transforms your cognitive capabilities.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={300} direction="left">
            <div className="cosmic-card p-8 relative">
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-cosmic-500/30 flex items-center justify-center text-white">
                <BookAudio size={30} />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-4">The MindMail Audiobook</h3>
              <p className="text-white/70 mb-6">
                In this comprehensive guide, you'll learn how to harness your mind's full potential through the proven MindMail methodology. The audiobook explains the science of mental clarity and provides practical exercises.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Understand the neuroscience of focus and attention",
                  "Learn practical techniques for mental decluttering",
                  "Discover how to build a sustainable mental clarity practice",
                  "Master the art of deep work and flow states"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cosmic-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-cosmic-300"></div>
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#listen-sample" 
                  className="cosmic-button-outline flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  <span>Listen to Sample</span>
                </a>
                <Link 
                  to="#pricing" 
                  className="cosmic-button flex items-center justify-center gap-2"
                >
                  <Headphones size={16} />
                  <span>Get the Audiobook</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={500} direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-cosmic-radial opacity-40 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="relative mx-auto w-[80%]">
                  <img 
                    src="/lovable-uploads/b005bd91-f09a-4a31-8fd0-cbf88caf1bfa.png" 
                    alt="MindMail Audiobook" 
                    className="w-full rounded-xl cosmic-card p-4"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-cosmic-500/20 flex items-center justify-center backdrop-blur-lg border border-white/10">
                    <div className="w-14 h-14 rounded-full bg-cosmic-500 flex items-center justify-center cursor-pointer hover:bg-cosmic-400 transition-colors">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-16 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cosmic-500/20 flex items-center justify-center flex-shrink-0">
                      <Headphones size={24} className="text-cosmic-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">6+ Hours of Audio Content</h4>
                      <p className="text-white/60">Narrated by professional voice artists</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cosmic-500/20 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={24} className="text-cosmic-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Companion Workbook</h4>
                      <p className="text-white/60">Practical exercises to implement what you learn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={700} className="mt-16 text-center">
          <div className="inline-block cosmic-card p-4 px-6">
            <p className="text-white/70">
              <span className="text-cosmic-300 font-semibold">Special Offer:</span> Get the audiobook and 3 months of MindMail dashboard access for just $49.99
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BookSection;
