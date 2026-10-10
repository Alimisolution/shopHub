import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductList() {
  const { loading, error, products, currentPage, totalPages, goToPage } = useProducts();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-black rounded-full animate-spin" />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* Page Info */}
          <p className="text-sm text-gray-500">
            Page <span className="font-semibold test-grey-500">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                         bg-white border border-gray-200 text-gray-700
                         hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
                         transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`dots-${idx}`} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                    currentPage === page
                      ? "bg-black text-white shadow-md shadow-indigo-200"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-slate-900"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                         bg-white border border-gray-200 text-gray-700
                         hover:bg-indigo-50 hover:border-indigo-300 hover:black
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
                         transition-all active:scale-95"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}