import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate();
  const location = useLocation();

  // Smart search handler
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollToProducts = () => {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // 300ms delay to let the page transition finish
    };

    if (location.pathname !== '/') {
      navigate('/'); // Go to homepage first
      scrollToProducts(); // Then scroll
    } else {
      scrollToProducts(); // Already on homepage, just scroll
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Shop', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-primary text-white text-xs text-center py-2 tracking-wide">
          <span className="hidden sm:inline">✨</span> Free shipping on orders over $50 • <span className="text-accent font-semibold">Shop Now</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-text-primary hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                <span className="text-white font-serif font-bold text-lg">S</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                Shop<span className="text-accent">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-sm font-medium text-text-primary hover:text-accent transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              
             <button 
                onClick={handleSearchClick}
                className="hidden sm:flex p-2 text-text-primary hover:text-accent transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <button 
                className="hidden sm:flex p-2 text-text-primary hover:text-accent transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-text-primary hover:text-accent transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block text-lg font-medium text-text-primary hover:text-accent transition-colors py-2 border-b border-border"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}