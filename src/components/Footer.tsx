
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-cosmic-900 bg-opacity-80"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <div className="text-white font-display font-bold text-2xl relative">
                <span className="text-cosmic-gradient">Mind</span>Mail
                <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-cosmic-400 animate-pulse"></span>
              </div>
            </Link>
            <p className="text-white/60 mb-6">
              Unlock your mind's true potential with our neuroscience-backed mental training system.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon="twitter" />
              <SocialLink href="#" icon="instagram" />
              <SocialLink href="#" icon="facebook" />
              <SocialLink href="#" icon="linkedin" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-display font-semibold mb-6">
              Product
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-display font-semibold mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Press</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-display font-semibold mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {year} MindMail. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6">
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-white/60 hover:text-white transition-colors duration-300"
      >
        {children}
      </a>
    </li>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: string }) => {
  let iconSvg;
  
  switch (icon) {
    case 'twitter':
      iconSvg = (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'instagram':
      iconSvg = (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
      );
      break;
    case 'facebook':
      iconSvg = (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    case 'linkedin':
      iconSvg = (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      break;
    default:
      iconSvg = null;
  }
  
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
      aria-label={`Follow us on ${icon}`}
    >
      {iconSvg}
    </a>
  );
};

export default Footer;
