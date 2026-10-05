import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Lock, ShoppingBag, Truck } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test", 
  currency: "USD",
  intent: "capture",
};

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({ name: "", email: "", address: "" });
  const [isShippingValid, setIsShippingValid] = useState(false);

useEffect(() => {
  if (cart.length === 0 && !success) {
    navigate("/cart");
  }
}, [cart.length, success, navigate]);

if (cart.length === 0 && !success) {
  return null;
}

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInfo = { ...shippingInfo, [e.target.name]: e.target.value };
    setShippingInfo(newInfo);
    

    const valid = newInfo.name.trim() !== "" && newInfo.email.includes("@") && newInfo.address.trim().length > 5;
    setIsShippingValid(valid);
  };

  const handlePaymentSuccess = (details: any) => {
    console.log("Payment successful!", details);
    clearCart();
    setSuccess(true);
  };


  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you, {shippingInfo.name}! Your order has been paid and will be shipped to {shippingInfo.address}.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" /> Order Summary
            </h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">{item.title} × {item.quantity}</span>
                  <span className="font-semibold whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" /> Shipping Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" required value={shippingInfo.name} onChange={handleShippingChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" required value={shippingInfo.email} onChange={handleShippingChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <input type="text" name="address" required value={shippingInfo.address} onChange={handleShippingChange} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="123 Main St, City, Zip" />
              </div>
            </div>
          </div>

          {/* Real PayPal Payment Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" /> Secure Payment
            </h2>
            
            {!isShippingValid ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">
                Please fill in all shipping details above to enable payment.
              </div>
            ) : (
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
                  disabled={!isShippingValid}
                  createOrder={(_data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          description: "ShopHub Order",
                          amount: {
                            currency_code: "USD",
                            value: totalPrice.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(_data, actions) => {
                    return actions.order!.capture().then((details) => {
                      handlePaymentSuccess(details);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout Error:", err);
                    alert("Payment failed. Please try again.");
                  }}
                />
              </PayPalScriptProvider>
            )}
            
            <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Secured by PayPal Sandbox (Test Mode)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}