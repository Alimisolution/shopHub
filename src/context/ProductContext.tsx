import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react";
import type { Product, ProductContextType } from "../types";
import localData from "../data/products.json";

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const ITEMS_PER_PAGE = 10;

export function ProductProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Derive categories locally
  const categories = useMemo(() => {
    const uniqueCats = [...new Set(localData.products.map((p: any) => p.category))];
    return ["all", ...uniqueCats];
  }, []);


  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return localData.products.filter((item: any) => {
      const matchesSearch = searchQuery
        ? item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get products for the current page only
  const products: Product[] = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end).map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.thumbnail,
      rating: {
        rate: item.rating,
        count: item.reviews ? item.reviews.length : 0,
      },
    }));
  }, [filteredProducts, currentPage]);


  // Simulate a tiny loading delay for UX
  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory]);

  
  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        currentPage,
        totalPages,
        goToPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}