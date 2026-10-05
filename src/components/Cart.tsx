import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 hover:underline font-medium inline-flex items-center gap-2">
          Continue shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2" />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
              <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-md hover:bg-white flex items-center justify-center text-gray-600 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-md hover:bg-white flex items-center justify-center text-gray-600 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <p className="font-bold text-gray-800 w-24 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gray-500">Total</p>
          <p className="text-3xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</p>
        </div>
        <Link to="/checkout" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors active:scale-95 flex items-center gap-2">
          Proceed to Checkout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}