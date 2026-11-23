import { useState, useRef, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { ChevronDown, Check } from "lucide-react";

export default function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatCategory = (cat: string) => {
    if (cat === "all") return "All Categories";
    return cat
      .replace(/-/g, " ") 
      .replace(/\b\w/g, (char) => char.toUpperCase()); 
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-200 
                   bg-white shadow-sm cursor-pointer transition-all text-gray-700 hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
      >
        <span className="font-medium">
          {formatCategory(selectedCategory)}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full sm:w-64 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
          <ul className="max-h-60 overflow-y-auto py-1">
            {categories.map((cat) => {
              const catStr = String(cat);
              const isActive = catStr === selectedCategory;

              return (
                <li
                  key={catStr}
                  onClick={() => {
                    setSelectedCategory(catStr);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between text-sm font-medium
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-black hover:text-white"
                    }`}
                >
                  <span>{formatCategory(catStr)}</span>
                  {isActive && <Check className="w-4 h-4" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}