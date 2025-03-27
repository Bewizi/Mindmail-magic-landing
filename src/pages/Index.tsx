
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'MindMail - Transform Your Mental Clarity';
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
    
    // Initialize scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.appear-animation').forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      
      document.querySelectorAll('.appear-animation').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <NavBar />
      <main>
        <HeroSection />
        <FeatureSection />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-30"></div>
          
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 max-w-3xl mx-auto appear-animation">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm mb-4">
                The Process
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">
                How MindMail Works
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Our scientifically-backed approach uses advanced algorithms to personalize your mental training experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="cosmic-card p-8 relative appear-animation">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-cosmic-500 text-white font-bold flex items-center justify-center">
                  1
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-4">Assessment</h3>
                <p className="text-white/70">
                  Complete our comprehensive cognitive profile assessment to establish your baseline and identify key areas for improvement.
                </p>
              </div>
              
              <div className="cosmic-card p-8 relative appear-animation" style={{animationDelay: '200ms'}}>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-cosmic-500 text-white font-bold flex items-center justify-center">
                  2
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-4">Personalization</h3>
                <p className="text-white/70">
                  Our AI creates a tailored program based on your cognitive profile, goals, and preferences for maximum effectiveness.
                </p>
              </div>
              
              <div className="cosmic-card p-8 relative appear-animation" style={{animationDelay: '400ms'}}>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-cosmic-500 text-white font-bold flex items-center justify-center">
                  3
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-4">Regular Practice</h3>
                <p className="text-white/70">
                  Engage with your personalized exercises regularly to strengthen neural pathways and enhance cognitive abilities.
                </p>
              </div>
            </div>
            
            <div className="cosmic-card p-8 max-w-3xl mx-auto appear-animation">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-cosmic-500/20 flex-shrink-0 flex items-center justify-center text-cosmic-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-2">Ongoing Adaptation</h3>
                  <p className="text-white/70">
                    As you progress, MindMail continuously adapts your training program to ensure optimal development and prevent plateaus, keeping your mind constantly engaged and evolving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        {/* Contact/CTA Section */}
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-[-1] bg-cosmic-radial opacity-30"></div>
          <div className="absolute inset-0 bg-cosmic-900/50 backdrop-blur-lg z-[-1]"></div>
          
          <div className="container mx-auto max-w-4xl relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-cosmic-500/30 filter blur-3xl opacity-60"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cosmic-400/20 filter blur-3xl opacity-60"></div>
            
            <div className="cosmic-card p-8 md:p-12 border border-white/10 relative z-10 appear-animation">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm mb-4">
                  Get Started
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
                  Begin Your Mental Transformation
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Join thousands of others who have enhanced their cognitive abilities with MindMail. Start your journey today.
                </p>
              </div>
              
              <form className="max-w-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="glass-input w-full"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="glass-input w-full"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="glass-input w-full mb-4"
                  required
                />
                <button 
                  type="submit" 
                  className="cosmic-button w-full py-4 text-lg font-medium"
                >
                  Start Free Trial
                </button>
                <p className="text-white/50 text-sm text-center mt-4">
                  No credit card required. 14-day free trial.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
