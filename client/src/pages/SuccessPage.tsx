import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';

export default function SuccessPage() {
  console.log("✅ SUCCESS PAGE COMPONENT RENDERED!"); // Debug log
  const location = useLocation();
  const navigate = useNavigate();
  const reference = location.state?.reference || 'N/A';
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-gray-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm">
          <p className="text-gray-500">Transaction Reference:</p>
          <p className="font-mono font-semibold text-gray-900 break-all">{reference}</p>
          <p className="text-gray-500 mt-2">Amount Paid:</p>
          <p className="font-bold text-black">₦{amount.toLocaleString()}</p>
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