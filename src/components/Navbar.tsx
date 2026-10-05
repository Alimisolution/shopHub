import { Link } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Store className="w-7 h-7" />
          <span>ShopHub</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-200 transition-colors font-medium">
            Products
          </Link>
          <Link to="/cart" className="relative hover:text-indigo-200 transition-colors font-medium flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-indigo-600">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}