import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, AlertCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // ✅ Reference can come from router state OR from the URL (?reference=...)
  const reference = location.state?.reference || searchParams.get('reference');

  const [status, setStatus] = useState<'loading' | 'success' | 'unverified'>('loading');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    if (!reference) {
      setStatus('unverified');
      return;
    }

    // If we already have verified state from checkout, show success instantly
    if (location.state?.verified) {
      setStatus('success');
      setDetails({
        reference,
        amount: location.state.amount,
        email: location.state.email,
      });
      return;
    }

    // Otherwise, re-verify with our backend (survives page refresh & direct URL access)
    const verify = async () => {
      try {
        const res = await fetch(`/api/payment/verify/${reference}`);
        const data = await res.json();
        if (data.status === true) {
          clearCart();
          setStatus('success');
          setDetails({
            reference: data.data?.reference || reference,
            amount: data.data?.amount / 100,
            email: data.data?.customer?.email,
          });
        } else {
          setStatus('unverified');
        }
      } catch (err) {
        console.error('Verification failed:', err);
        setStatus('unverified');
      }
    };

    verify();
  }, [reference]);

  // ---------- LOADING ----------
  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="w-10 h-10 text-amber-500 animate-spin" />
      </div>
    );
  }

  // ---------- UNVERIFIED ----------
  if (status === 'unverified') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-red-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-2">Unverified Payment</h1>
          <p className="text-gray-600 mb-6">
            This payment could not be verified with Paystack. Please go back and complete checkout properly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go Home
          </button>
        </div>
      </div>
    );
  }

  // ---------- SUCCESS ----------
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>

        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and verified.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Reference:</span>
            <span className="font-mono font-semibold text-gray-900 break-all">{details.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid:</span>
            <span className="font-bold text-gray-900">₦{details.amount?.toLocaleString()}</span>
          </div>
          {details.email && (
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-semibold text-gray-900">{details.email}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Continue Shopping
        </button>
      </motion.div>
    </div>
  );
}