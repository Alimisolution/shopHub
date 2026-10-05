import { useRef, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

export default function ProductList() {
  const { loading, fetchingMore, error, products, loadMore, hasMore } = useProducts();
  

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        
        if (entries[0].isIntersecting && hasMore && !fetchingMore) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, fetchingMore, loadMore]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">⚠️ {error}</p>
        <p className="text-gray-400 mt-2">Please try again later.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div ref={observerTarget} className="h-24 flex items-center justify-center mt-8">
        {fetchingMore && (
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more products...</span>
          </div>
        )}
        
        {!hasMore && products.length > 0 && (
          <p className="text-gray-400 text-sm font-medium bg-gray-100 px-4 py-2 rounded-full">
            You've reached the end! 🎉
          </p>
        )}
      </div>
    </>
  );
}