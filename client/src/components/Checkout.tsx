import { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, AlertCircle } from "lucide-react";

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

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // declare the global error state
  const [error, setError] = useState("");

  // removed unused hasProcessed
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    address?: string;
  }>({});

  // guard so it only redirects on the checkout page
  useEffect(() => {
    if (cart.length === 0 && window.location.pathname === "/checkout") {
      navigate("/cart", { replace: true });
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) return null;

  // ✅ Auto-scroll to top when checkout page loads (fixes mobile landing issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const generateReference = () =>
    `shop_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const exchangeRate = 1500;
  const amountInNaira = Math.round(totalPrice * exchangeRate);
  const amountInKobo = amountInNaira * 100;

  const config: PaystackConfig = {
    reference: generateReference(),
    email,
    amount: amountInKobo,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
  };

  // ✅ Live validation flags (used to enable/disable the Paystack button)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
  const isEmailValid = emailRegex.test(email);
  const isPhoneValid = phoneRegex.test(phone);
  const isAddressValid = address.trim().length >= 10;
  const formValid = isEmailValid && isPhoneValid && isAddressValid;

  // ✅ Validation on blur / submit attempt — shows inline errors
  const validateField = (field: "email" | "phone" | "address") => {
    const newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = !email
        ? "Email address is required"
        : !isEmailValid
          ? "Please enter a valid email format (e.g., user@example.com)"
          : undefined;
    }
    if (field === "phone") {
      newErrors.phone = !phone
        ? "Phone number is required"
        : !isPhoneValid
          ? "Please enter a valid phone number (10-15 digits)"
          : undefined;
    }
    if (field === "address") {
      newErrors.address = !address.trim()
        ? "Delivery address is required"
        : address.trim().length < 10
          ? "Please enter a more detailed address"
          : undefined;
    }
    setErrors(newErrors);
  };

  const clearError = (field: "email" | "phone" | "address") => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setError(""); // ✅ clear global error when user edits
  };

  // ✅ Backend verification — assignment requires this (do NOT trust the success page alone)
  const handleSuccess = async (reference: any) => {
    setIsProcessing(true);
    setError("");
    try {
      const response = await fetch(
        `/api/payment/verify/${reference.reference}`,
      );
      const data = await response.json();

      await new Promise((r) => setTimeout(r, 500)); // let modal close

      if (data.status === true) {
        clearCart();
        navigate(`/checkout/success?reference=${reference.reference}`, {
          state: {
            reference: reference.reference,
            amount: amountInNaira,
            verified: true,
            email: data.data?.customer?.email || email,
          },
          replace: true,
        });
      } else {
        setError(
          "Payment could not be verified. Your cart is still saved. Please try again or contact support.",
        );
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError(
        "Payment verification service is unavailable. Your cart is still saved. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsProcessing(false);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Always first in the code, so it always shows first on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" /> Delivery Information
          </h2>

          {/* render the global error banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-2 text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                onBlur={() => validateField("email")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-black"} focus:ring-2 focus:border-transparent outline-none transition-all`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearError("phone");
                }}
                onBlur={() => validateField("phone")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-black"} focus:ring-2 focus:border-transparent outline-none transition-all`}
                placeholder="+234 800 000 0000"
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  clearError("address");
                }}
                onBlur={() => validateField("address")}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-black"} focus:ring-2 focus:border-transparent outline-none transition-all resize-none`}
                placeholder="Street, City, State"
              />
              {errors.address && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {errors.address}
                </motion.p>
              )}
            </div>

            {/* PaystackButton (proven to fire callbacks in React 19) */}
            <PaystackButton
              {...config}
              text={
                isProcessing
                  ? "Verifying Payment..."
                  : `Pay ₦${amountInNaira.toLocaleString()} with Paystack`
              }
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mt-6 transition-all ${
                formValid
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onSuccess={handleSuccess}
              onClose={handleClose}
              disabled={!formValid || isProcessing}
            />

            {!formValid && (
              <p className="text-xs text-gray-500 text-center">
                Fill in a valid email, phone number, and address to enable
                payment.
              </p>
            )}
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-gray-50 p-6 rounded-2xl h-fit lg:sticky lg:top-24"
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate mr-2">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-semibold whitespace-nowrap">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
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
