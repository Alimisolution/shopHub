import { Search } from "lucide-react";
import { useProducts } from "../context/ProductContext";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useProducts();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-black 
                   focus:border-transparent shadow-sm transition-all bg-white"
      />
    </div>
  );
}