import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import BookSection from '../components/BookSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import UniverseChat from '../components/UniverseChat';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Trash2, 
  Edit, 
  Save, 
  Plus, 
  Brain, 
  ArrowLeft,
  Search
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface Affirmation {
  id: string;
  content: string;
  created: Date;
  category: string;
}

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [affirmations, setAffirmations] = useState<Affirmation[]>(() => {
    const saved = localStorage.getItem('affirmations');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        content: 'My focus is my superpower, shaping new realities with each thought.',
        created: new Date(),
        category: 'Consciousness'
      },
      {
        id: '2',
        content: 'I am a conscious creator of my experience, not a passive observer.',
        created: new Date(),
        category: 'Creation'
      },
      {
        id: '3',
        content: 'With gratitude and relief, I celebrate my manifestations as already complete.',
        created: new Date(),
        category: 'Gratitude'
      }
    ];
  });
  
  const [newAffirmation, setNewAffirmation] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = 'MindMail - Upgrade Your Mental Operating System';
    
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

    // Save affirmations to localStorage
    localStorage.setItem('affirmations', JSON.stringify(affirmations));
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      
      document.querySelectorAll('.appear-animation').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [affirmations]);

  const addAffirmation = () => {
    if (!newAffirmation.trim()) {
      toast({
        title: "Cannot add empty affirmation",
        description: "Please enter some text for your affirmation.",
        variant: "destructive"
      });
      return;
    }
    
    const newItem: Affirmation = {
      id: Date.now().toString(),
      content: newAffirmation,
      created: new Date(),
      category: newCategory
    };
    
    setAffirmations(prev => [newItem, ...prev]);
    setNewAffirmation('');
    setNewCategory('General');
    setIsCreating(false);
    
    toast({
      title: "Affirmation added",
      description: "Your new affirmation has been added to your dashboard."
    });
  };
  
  const deleteAffirmation = (id: string) => {
    setAffirmations(prev => prev.filter(a => a.id !== id));
    toast({
      title: "Affirmation deleted",
      description: "Your affirmation has been removed from your dashboard."
    });
  };
  
  const startEditing = (affirmation: Affirmation) => {
    setEditingId(affirmation.id);
    setEditContent(affirmation.content);
    setEditCategory(affirmation.category);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
  };
  
  const saveEdit = (id: string) => {
    if (!editContent.trim()) {
      toast({
        title: "Cannot save empty affirmation",
        description: "Please enter some text for your affirmation.",
        variant: "destructive"
      });
      return;
    }
    
    setAffirmations(prev => prev.map(a => 
      a.id === id ? { ...a, content: editContent, category: editCategory } : a
    ));
    
    setEditingId(null);
    
    toast({
      title: "Affirmation updated",
      description: "Your changes have been saved."
    });
  };
  
  const filteredAffirmations = searchQuery 
    ? affirmations.filter(a => 
        a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : affirmations;
  
  const categories = Array.from(new Set(affirmations.map(a => a.category)));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <NavBar />

      {!showDashboard ? (
        <main>
          <HeroSection />
          <div className="flex justify-center mt-8 mb-16">
            <Button 
              className="cosmic-button text-lg"
              onClick={() => setShowDashboard(true)}
            >
              Go to Dashboard
            </Button>
          </div>
          <FeatureSection />
          <BookSection />
          
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
      ) : (
        <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <Button 
              variant="outline" 
              onClick={() => setShowDashboard(false)} 
              className="mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>

            <div className="mb-8 md:flex md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">
                  Your Quantum <span className="text-cosmic-gradient">Affirmations</span>
                </h1>
                <p className="text-white/70 mb-4">
                  Shape your reality with focused consciousness
                </p>
              </div>
              
              {!isMobile && (
                <Button 
                  className="cosmic-button flex items-center gap-2"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus size={18} />
                  New Affirmation
                </Button>
              )}
            </div>
            
            {/* Mobile New Affirmation Button */}
            {isMobile && (
              <div className="mb-6">
                <Button 
                  className="cosmic-button w-full flex items-center justify-center gap-2"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus size={18} />
                  New Affirmation
                </Button>
              </div>
            )}
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                type="text"
                placeholder="Search affirmations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            {/* Two Column Layout: Affirmation Form/Tip Card and Universe Chat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column: Affirmation Creation Form or Tip */}
              {isCreating ? (
                <Card className="cosmic-card">
                  <CardHeader>
                    <CardTitle className="text-white">Create New Affirmation</CardTitle>
                    <CardDescription>
                      Create an affirmation to focus your consciousness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="newAffirmation" className="block text-sm font-medium text-white/70 mb-1">
                          Affirmation Text
                        </label>
                        <Textarea
                          id="newAffirmation"
                          placeholder="Enter your affirmation here..."
                          value={newAffirmation}
                          onChange={(e) => setNewAffirmation(e.target.value)}
                          className="bg-white/5 border-white/10 text-white min-h-24"
                        />
                      </div>
                      <div>
                        <label htmlFor="newCategory" className="block text-sm font-medium text-white/70 mb-1">
                          Category
                        </label>
                        <Input
                          id="newCategory"
                          placeholder="Enter category..."
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                          list="categories"
                        />
                        <datalist id="categories">
                          {categories.map(cat => <option key={cat} value={cat} />)}
                        </datalist>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button className="cosmic-button" onClick={addAffirmation}>
                      Save Affirmation
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="cosmic-card h-full">
                  <CardContent className="flex flex-col items-center justify-center py-6 h-full">
                    <div className="text-center max-w-md mx-auto">
                      <h3 className="text-xl font-medium text-white mb-4">Daily Quantum Tip</h3>
                      <p className="text-white/80 mb-4">
                        "Your focus creates reality. Bring conscious awareness to what you want to manifest, not what you fear."
                      </p>
                      <Button 
                        className="cosmic-button"
                        onClick={() => setIsCreating(true)}
                      >
                        <Plus size={18} className="mr-2" />
                        Create New Affirmation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Right Column: Universe Chat */}
              <UniverseChat />
            </div>
            
            {/* Affirmation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAffirmations.length > 0 ? (
                filteredAffirmations.map(affirmation => (
                  <Card key={affirmation.id} className="cosmic-card relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-cosmic-500/20 blur-xl"></div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide text-cosmic-200 border border-cosmic-400/30 bg-cosmic-900/50 backdrop-blur-sm">
                          {affirmation.category}
                        </div>
                        
                        <div className="flex space-x-1">
                          {editingId === affirmation.id ? (
                            <>
                              <Button 
                                onClick={() => saveEdit(affirmation.id)} 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-cosmic-200 hover:text-cosmic-100 hover:bg-white/5"
                              >
                                <Save size={16} />
                              </Button>
                              <Button 
                                onClick={cancelEditing} 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/5"
                              >
                                <ArrowLeft size={16} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                onClick={() => startEditing(affirmation)} 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/5"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                onClick={() => deleteAffirmation(affirmation.id)} 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/5"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {editingId === affirmation.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="bg-white/5 border-white/10 text-white min-h-24"
                          />
                          <Input
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="Category"
                            list="categories"
                          />
                        </div>
                      ) : (
                        <p className="text-white/90 text-lg leading-relaxed">
                          "{affirmation.content}"
                        </p>
                      )}
                    </CardContent>
                    
                    <CardFooter className="text-xs text-white/50">
                      Created: {affirmation.created instanceof Date ? 
                        new Date(affirmation.created).toLocaleDateString() : 
                        new Date(affirmation.created).toLocaleDateString()}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="text-cosmic-300/40 w-16 h-16 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No affirmations found</h3>
                  <p className="text-white/60 max-w-md mb-6">
                    {searchQuery ? 
                      "No affirmations match your search. Try a different term or clear your search." : 
                      "You haven't created any affirmations yet. Start by adding your first one!"}
                  </p>
                  {searchQuery ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery('')}
                      className="border-cosmic-400/30 text-cosmic-200"
                    >
                      Clear Search
                    </Button>
                  ) : (
                    <Button 
                      className="cosmic-button"
                      onClick={() => setIsCreating(true)}
                    >
                      <Plus size={18} className="mr-2" />
                      Create Your First Affirmation
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
