import { motion, AnimatePresence, type Variants} from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };


  const handleBrowseProducts = () => {
    onClose();
    
    const scrollToProducts = () => {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 300); // 300ms delay to let the page load/transition
    };

    if (location.pathname !== '/') {
      navigate('/');
      scrollToProducts();
    } else {
      scrollToProducts(); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-40"
          />

          {/* Drawer Panel */}
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 bg-neutral-900 text-white">
              <div>
                <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  Your Cart
                </h2>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6 max-w-xs">
                    Looks like you haven't added anything yet. Start exploring our collection.
                  </p>
                  <button
                    onClick={handleBrowseProducts}
                    className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 bg-neutral-50 rounded-2xl p-3 border border-neutral-100"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-sm text-neutral-900 line-clamp-2 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-0.5 capitalize">
                              {item.category}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity */}
                            <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-full p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price + Remove */}
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-neutral-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-200 bg-white px-6 py-5 space-y-4">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 text-sm">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-neutral-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Free shipping hint */}
                {totalPrice < 50 ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Add <strong>${(50 - totalPrice).toFixed(2)}</strong> more to unlock free shipping!
                    </span>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>You've unlocked <strong>free shipping</strong>! 🎉</span>
                  </div>
                )}

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-neutral-900 text-white py-4 rounded-full font-semibold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}