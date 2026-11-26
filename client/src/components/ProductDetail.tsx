import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import PageTransition from '../components/PageTransition';
import { useToast } from '../context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
   const { showToast } = useToast();
  const [addedToCart, setAddedToCart] = useState(false);

  // Force page to scroll to the very top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((p) => p.id === Number(id));

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showToast(`${product.title} added to cart!`);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 rounded-xl font-semibold">
            Back to Products
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </button>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-10 sm:p-16 flex items-center justify-center min-h-[400px]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[400px] object-contain mix-blend-multiply"
              />
            </motion.div>

            {/* Right: Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 sm:p-12 flex flex-col justify-center"
            >
              {/* Category */}
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {product.description || 'No description available.'}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating?.rate || 0)
                          ? 'fill-black text-black'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* ✅ Full Width Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all text-base ${
                  addedToCart
                    ? 'bg-emerald-500 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

            </motion.div>
          </div>
        </div>

        {/* Related Products Section at the Bottom */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-square bg-gray-50 rounded-xl p-6 flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-medium text-gray-900 line-clamp-1 mb-1 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-bold text-gray-900">{formatPrice(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}