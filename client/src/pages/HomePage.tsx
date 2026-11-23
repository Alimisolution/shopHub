import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SlideUp from '../components/SlideUp';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';



// 1. Define the slider data
const slides = [
  {
    badge: "Curated for Modern Living",
    titleTop: "Elevate Your",
    titleBottom: "Everyday Life",
    description: "From premium home goods and fresh groceries to luxury fragrances and beauty. Discover quality products for every part of your life, all in one place.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
  },
  {
    badge: "Premium Quality, Unbeatable Value",
    titleTop: "Shop the",
    titleBottom: "Finest Essentials",
    description: "Handpicked goods for your home, health, and happiness. Explore our diverse collection of furniture, personal care, and more, delivered right to your doorstep.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Auto-advance slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <PageTransition>
      {/* 1. HERO SECTION WITH SLIDER */}
      <section className="relative bg-primary text-white overflow-hidden min-h-[85vh] flex items-center">
        
        {/* Animated Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }} // ✅ Changed from 0.4 to 1 (Image is now fully bright)
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img 
              src={slide.image} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  {slide.titleTop} <br/>
                  <span className="text-accent italic">{slide.titleBottom}</span>
                </h1>
                
                {/* Description */}
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#products" 
                    className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-hover transition-all group"
                  >
                    Explore Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link 
                    to="/about" 
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                  >
                    Our Story
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex gap-2 mt-12">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-accent' : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 2. TRUST BADGES (Wrapped in SlideUp) */}
      <SlideUp className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected checkout' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>

      {/* 3. PRODUCTS SECTION (Wrapped in SlideUp) */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/*  1. Header animates in first */}
        <SlideUp className="text-center mb-12">
          <span className="text-accent font-medium tracking-wider text-sm uppercase">Our Collection</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-text-primary mt-2 mb-4">
            Featured Products
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Handpicked essentials designed for modern living
          </p>
        </SlideUp>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="w-full sm:w-1/2">
            <SearchBar />
          </div>
          <div className="w-full sm:w-auto">
            <CategoryFilter />
          </div>
        </div>

        {/* ✅ 2. The Grid (ProductList handles the staggered animation) */}
        <ProductList />
      </section>

      {/* 4. CTA / NEWSLETTER BANNER (Wrapped in SlideUp) */}
      <SlideUp className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
            Join the <span className="text-accent italic">ShopHub</span> Family
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Subscribe to receive exclusive offers, early access to new arrivals, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
            />
            <button className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </SlideUp>
    </PageTransition>
  );
}