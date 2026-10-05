import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode  } from "react";
import type { Product, ProductContextType } from "../types";
import localData from "../data/products.json"; 

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const LIMIT = 10;

export function ProductProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [skip, setSkip] = useState(0);

  
  const categories = useMemo(() => {
    const uniqueCats = [...new Set(localData.products.map((p: any) => p.category))];
    return ["all", ...uniqueCats];
  }, []);


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

  const hasMore = skip < filteredProducts.length;
  
  const productsToDisplay = filteredProducts.slice(0, skip === 0 ? LIMIT : skip);

  const products: Product[] = productsToDisplay.map((item: any) => ({
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

  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    setSkip(0);
  }, [searchQuery, selectedCategory]);

  const loadMore = () => {
    if (fetchingMore || !hasMore) return;
    setFetchingMore(true);
    
    setTimeout(() => {
      setSkip((prev) => prev + LIMIT);
      setFetchingMore(false);
    }, 400);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchingMore,
        hasMore,
        loadMore,
        error,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
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