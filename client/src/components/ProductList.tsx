import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton"; // ✅ Import Skeleton
import SlideUp from "./SlideUp";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductList() {
  const { loading, error, products, currentPage, totalPages, goToPage } = useProducts();

  // ✅ REPLACED SPINNER WITH SKELETON GRID
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Render 8 skeletons to fill the screen while loading */}
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">⚠️ {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* Product Grid with Staggered Animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <SlideUp key={product.id} delay={index * 0.05}>
            <ProductCard product={product} />
          </SlideUp>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <SlideUp delay={0.5}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-text-secondary">
              Page <span className="font-semibold text-accent">{currentPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                           bg-white border border-border text-text-primary
                           hover:bg-accent/10 hover:border-accent hover:text-accent
                           disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-2 text-text-secondary">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-primary text-white shadow-md"
                        : "bg-white border border-border text-text-primary hover:bg-accent/10 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                           bg-white border border-border text-text-primary
                           hover:bg-accent/10 hover:border-accent hover:text-accent
                           disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </SlideUp>
      )}
    </>
  );
}