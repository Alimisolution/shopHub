import { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShoppingBag, AlertCircle } from 'lucide-react';

interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
  currency: string;
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) return null;

  const generateReference = () => {
    return `shop_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  };

  const exchangeRate = 1500; 
  const amountInNaira = Math.round(totalPrice * exchangeRate);
  const amountInKobo = amountInNaira * 100; 

  const config: PaystackConfig = {
    reference: generateReference(),
    email,
    amount: amountInKobo, 
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: 'NGN', 
  };

  // ✅ 1. This will NOW reliably fire when payment succeeds
  const handleSuccess = async (reference: any) => {
    console.log("🔥 SUCCESS CALLBACK FIRED!", reference);
    setIsProcessing(true);
    
    try {
      clearCart();
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for modal to close
      
      console.log("🚀 NAVIGATING TO SUCCESS PAGE...");
      navigate('/checkout/success', { 
        state: { reference: reference.reference, amount: amountInNaira },
        replace: true 
      });
    } catch (err) {
      console.error("Navigation error:", err);
      window.location.href = '/checkout/success';
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ 2. This will fire if the user closes the modal
  const handleClose = () => {
    console.log("⚠️ CLOSE CALLBACK FIRED (Payment cancelled)");
    setError('Payment was cancelled. Your cart is still saved.');
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !address) {
      setError('Please fill in all delivery details.');
      return;
    }
    setError(''); // Clear any previous errors
    // The PaystackButton will handle the actual click and open the modal
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Secure Checkout
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" /> Delivery Information
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="+234 800 000 0000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                placeholder="Street, City, State"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}

            {/* ✅ 3. Replace the standard button with PaystackButton */}
            <PaystackButton
              {...config}
              text={isProcessing ? "Verifying Payment..." : `Pay ₦${amountInNaira.toLocaleString()} with Paystack`}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              onSuccess={handleSuccess}
              onClose={handleClose}
              disabled={isProcessing || !email || !phone || !address}
            />
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 p-6 rounded-2xl h-fit sticky top-24"
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">{item.title} × {item.quantity}</span>
                <span className="font-semibold whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total (USD)</span>
            <span className="text-black">${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            * Charged as ₦{amountInNaira.toLocaleString()} in Test Mode
          </p>
        </motion.div>
      </div>
    </div>
  );
}