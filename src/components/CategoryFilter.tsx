import { useProducts } from "../context/ProductContext";

export default function CategoryFilter() {
  
  
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  const formatCategory = (cat: string) => {
    if (cat === "all") return "All Categories";
    return cat
      .replace(/-/g, " ") 
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="px-4 py-3 rounded-xl border border-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 bg-white shadow-sm cursor-pointer transition-all text-gray-700"
    >
      {categories.map((cat) => {
        const catStr = String(cat); 
        return (
          <option key={catStr} value={catStr}>
            {formatCategory(catStr)}
          </option>
        );
      })}
    </select>
  );
}