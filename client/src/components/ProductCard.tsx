import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-56 bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
          {product.category}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-black">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 rounded-lg 
                       hover:bg-slate-900 active:scale-95 transition-all text-sm font-medium flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}