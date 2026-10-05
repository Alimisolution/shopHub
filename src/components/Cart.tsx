import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 hover:underline font-medium inline-flex items-center gap-2">
          Continue shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      <div className="space-y-3 sm:space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-3 sm:p-4"
          >
            {/* Mobile: Stack vertically | Desktop: Row layout */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              
              {/* Product Image */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 sm:w-20 sm:h-20 object-contain bg-gray-50 rounded-lg p-2"
                />
              </div>

              {/* Product Details - Mobile: Centered | Desktop: Left-aligned */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-indigo-600 font-bold text-sm sm:text-base mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls - Mobile: Horizontal row | Desktop: Compact */}
              <div className="flex items-center justify-center sm:justify-start gap-2 bg-gray-100 rounded-lg p-1.5 sm:p-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-sm active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-sm sm:text-base">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-md bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Subtotal - Mobile: Full width | Desktop: Fixed width */}
              <div className="text-center sm:text-right sm:w-24">
                <p className="font-bold text-gray-800 text-base sm:text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Delete Button - Mobile: Bottom right | Desktop: Inline */}
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 sm:p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout - Sticky on mobile for easy access */}
      <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm p-5 sm:p-6 sticky bottom-4 z-10 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
        </div>
        
        <Link
          to="/checkout"
          className="w-full bg-indigo-600 text-white py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 text-base sm:text-lg shadow-lg shadow-indigo-200"
        >
          Proceed to Checkout <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}