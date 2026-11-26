export default function ProductSkeleton() {
  return (
    <div className="group cursor-pointer">
      {/* Image Placeholder */}
      <div className="aspect-square bg-neutral-100 rounded-xl mb-4 overflow-hidden skeleton" />
      
      {/* Category Placeholder */}
      <div className="h-3 w-16 bg-neutral-200 rounded mb-2 skeleton" />
      
      {/* Title Placeholder */}
      <div className="h-4 w-3/4 bg-neutral-200 rounded mb-2 skeleton" />
      
      {/* Price Placeholder */}
      <div className="h-5 w-1/3 bg-neutral-200 rounded skeleton" />
    </div>
  );
}