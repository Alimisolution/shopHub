import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Check } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">Product not found.</p>
        <button onClick={() => navigate("/")} className="text-indigo-600 hover:underline font-medium flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <button onClick={() => navigate("/")} className="mb-6 text-black hover:underline font-medium flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="bg-gray-50 flex items-center justify-center p-10">
          <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <p className="text-sm text-black uppercase tracking-wider font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? "fill-current" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-black">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2 ${
                added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-slate-900"
              }`}
            >
              {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}