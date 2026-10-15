import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";
import { formatPrice, packLabel, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const c = product.colors[0]!;
  return (
    <div className="group overflow-hidden rounded-xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-square overflow-hidden bg-muted">
          <img src={c.image} alt={product.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4">
          <h3 className="text-lg">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{packLabel(product)}</span>
            <span className="font-semibold text-accent">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex gap-1.5">
          {product.colors.map((col) => <span key={col.name} className="h-3.5 w-3.5 rounded-full border border-border" style={{ background: col.swatch }} />)}
        </div>
        <button
          onClick={() => {
            addToCart({
              key: `${product.slug}::${c.name}`,
              slug: product.slug,
              name: product.name,
              color: c.name,
              swatch: c.swatch,
              image: c.image,
              price: product.price,
              pack: packLabel(product),
            });
            toast.success(`${product.name} added`, { description: c.name });
          }}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider hover:border-accent hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>
  );
}
