
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, BarChart, Settings, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <aside className={`
      ${isMobile ? 
        `fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out` : 
        'relative'}
      w-64 cosmic-blur backdrop-blur-xl bg-white/5 border-r border-white/10
    `}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-0 transform translate-x-full text-white bg-cosmic-600/80 rounded-l-none hover:bg-cosmic-500/80"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      <div className="h-full flex flex-col py-6">
        <div className="px-6 mb-8">
          <Link to="/" className="flex items-center">
            <div className="text-white font-display font-bold text-xl relative">
              <span className="text-cosmic-gradient">Mind</span>Mail
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-cosmic-400 animate-pulse"></span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1 px-2">
            <NavItem href="/" icon={<Home size={18} />} label="Home" />
            <NavItem href="/dashboard" icon={<BarChart size={18} />} label="Dashboard" active />
            <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" />
          </ul>
        </nav>
        
        <div className="px-6 mt-auto">
          <div className="cosmic-card p-4 text-xs text-white/60">
            <p className="mb-2">Using conscious focus to manifest reality.</p>
            <p>MindMail © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => {
  return (
    <li>
      <Link 
        to={href} 
        className={`
          flex items-center py-2 px-4 rounded-lg text-sm
          ${active ? 
            'bg-cosmic-500/20 text-white' : 
            'text-white/70 hover:bg-white/5 hover:text-white'}
        `}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default DashboardNav;
