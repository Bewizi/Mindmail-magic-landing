
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
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
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import DashboardNav from '../components/DashboardNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

interface Affirmation {
  id: string;
  content: string;
  created: Date;
  category: string;
}

const Dashboard = () => {
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
  
  useEffect(() => {
    localStorage.setItem('affirmations', JSON.stringify(affirmations));
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
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
          
          {/* Creation Form */}
          {isCreating && (
            <Card className="mb-8 cosmic-card">
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
          )}
          
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
      
      <Footer />
    </div>
  );
};

export default Dashboard;
