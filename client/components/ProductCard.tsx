import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
}

export default function ProductCard({ id, title, price, image, badge }: ProductCardProps) {
  return (
    <div className={cn("group card overflow-hidden flex flex-col")}>      
      <Link to={`/shop?product=${id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {badge ? (
          <span className="absolute left-3 top-3 glass rounded-full px-3 py-1 text-xs font-semibold">{badge}</span>
        ) : null}
      </Link>
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold leading-tight line-clamp-2 min-h-[2lh]">{title}</h3>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold">${price.toFixed(2)}</span>
          <Button size="sm" className="rounded-full">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
