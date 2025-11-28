import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, BookOpen, ShoppingBag, BrainCircuit, Github, Twitter, Linkedin, Search, ChevronRight, MessageCircle } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'article' | 'product';
  url: string;
  subtitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Rocket size={16} /> },
    { name: 'Journal', path: '/blog', icon: <BookOpen size={16} /> },
    { name: 'Emporium', path: '/shop', icon: <ShoppingBag size={16} /> },
    { name: 'Forum', path: '/forum', icon: <MessageCircle size={16} /> },
    { name: 'Assistant', path: '/assistant', icon: <BrainCircuit size={16} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Handle Search Logic
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    const matchedPosts: SearchResult[] = BLOG_POSTS
      .filter(p => p.title.toLowerCase().includes(lowerQuery) || p.excerpt.toLowerCase().includes(lowerQuery))
      .map(p => ({
        id: p.id,
        title: p.title,
        type: 'article',
        url: `/blog/${p.id}`,
        subtitle: p.category
      }));

    const matchedProducts: SearchResult[] = PRODUCTS
      .filter(p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery))
      .map(p => ({
        id: p.id,
        title: p.name,
        type: 'product',
        url: '/shop', 
        subtitle: `$${p.price}`
      }));

    setSearchResults([...matchedPosts, ...matchedProducts].slice(0, 6));
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (url: string) => {
    navigate(url);
    setShowSearchResults(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal font-sans selection:bg-brand-gold selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-darkBlue text-brand-gold border-2 border-brand-gold rounded-lg flex items-center justify-center font-serif font-bold text-2xl shadow-sm">
                  H
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl tracking-tight text-brand-darkBlue leading-none">
                    Hustlers Point
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-medium">Est. 2024</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                    isActive(link.path)
                      ? 'text-brand-blue'
                      : 'text-stone-600 hover:text-brand-blue'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {link.name}
                  </span>
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Search & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Global Search Bar */}
              <div className="relative" ref={searchRef}>
                <div className="relative group">
                   <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                    onFocus={() => setShowSearchResults(true)}
                    placeholder="Search..."
                    className="w-48 transition-all duration-300 focus:w-64 pl-9 pr-4 py-1.5 text-sm bg-stone-50 border border-stone-300 rounded-full focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue placeholder-stone-400 font-serif"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchQuery && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden z-50">
                    <div className="py-2">
                      {searchResults.length > 0 ? (
                        <>
                          <div className="px-4 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider">Results</div>
                          {searchResults.map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleSearchResultClick(result.url)}
                              className="w-full text-left px-4 py-3 hover:bg-stone-50 flex items-start gap-3 transition-colors group border-b border-stone-50 last:border-0"
                            >
                              <div className={`mt-1 p-1.5 rounded-md ${result.type === 'article' ? 'bg-blue-50 text-brand-blue' : 'bg-amber-50 text-brand-gold'}`}>
                                {result.type === 'article' ? <BookOpen size={14} /> : <ShoppingBag size={14} />}
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-brand-charcoal group-hover:text-brand-blue font-serif leading-tight">
                                  {result.title}
                                </h4>
                                <p className="text-xs text-stone-500 mt-1">{result.subtitle}</p>
                              </div>
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-stone-500 italic font-serif">
                          No treasures found matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-brand-darkBlue text-brand-gold border border-brand-darkBlue px-6 py-2 rounded-full font-serif font-bold text-sm shadow-md hover:bg-white hover:text-brand-darkBlue transition-all transform hover:-translate-y-0.5">
                Join Club
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-charcoal hover:text-brand-blue focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-cream border-t border-stone-200">
             {/* Mobile Search */}
             <div className="p-4 border-b border-stone-200">
               <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                    placeholder="Search articles & tools..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-brand-blue font-serif"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
               </div>
               {/* Mobile Search Results */}
               {showSearchResults && searchQuery && (
                 <div className="mt-2 bg-white rounded-lg border border-stone-200 max-h-60 overflow-y-auto">
                    {searchResults.map(result => (
                      <button
                         key={result.id}
                         onClick={() => handleSearchResultClick(result.url)}
                         className="w-full text-left px-4 py-3 border-b border-stone-100 last:border-0 hover:bg-stone-50"
                      >
                        <p className="text-sm font-bold text-brand-charcoal font-serif">{result.title}</p>
                        <p className="text-xs text-stone-500">{result.type}</p>
                      </button>
                    ))}
                 </div>
               )}
             </div>

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-serif font-medium flex items-center gap-3 ${
                    isActive(link.path)
                      ? 'text-brand-blue bg-blue-50/50'
                      : 'text-stone-600 hover:text-brand-blue hover:bg-stone-50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 pb-4 px-3">
                <button className="w-full bg-brand-darkBlue text-brand-gold px-5 py-3 rounded-lg font-serif font-bold shadow-md">
                  Join The Club
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-darkBlue text-white border-t-4 border-brand-gold py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white text-brand-darkBlue rounded flex items-center justify-center font-serif font-bold text-xl">H</div>
                <span className="font-serif font-bold text-2xl tracking-wide">Hustlers Point</span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-light font-serif">
                A curated digital ecosystem for the modern gentleman and gentlewoman builder. 
                We provide the tools, knowledge, and network to craft your legacy.
              </p>
              <div className="flex space-x-6 mt-8">
                <a href="#" className="text-stone-400 hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-stone-400 hover:text-brand-gold transition-colors"><Github size={20} /></a>
                <a href="#" className="text-stone-400 hover:text-brand-gold transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-brand-gold tracking-[0.2em] uppercase mb-6">Platform</h3>
              <ul className="space-y-4">
                <li><Link to="/blog" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Journal</Link></li>
                <li><Link to="/shop" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Emporium</Link></li>
                <li><Link to="/forum" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Forum</Link></li>
                <li><Link to="/assistant" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Consigliere (AI)</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-brand-gold tracking-[0.2em] uppercase mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">About</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Contact Us</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">FAQ</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Privacy Policy</a></li>
                <li><a href="#" className="text-stone-400 hover:text-white transition-colors text-sm font-serif">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm font-serif italic">© {new Date().getFullYear()} Hustlers Point. Established MMXXIV.</p>
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
               Systems Nominal
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;