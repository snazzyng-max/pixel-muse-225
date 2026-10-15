import { Link } from "@tanstack/react-router";
import { formatPrice, packLabel, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="group overflow-hidden rounded-xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={product.colors[0]!.image} alt={product.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="text-lg">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{packLabel(product)}</span>
          <span className="font-semibold text-accent">{formatPrice(product.price)}</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {product.colors.map((c) => <span key={c.name} className="h-3.5 w-3.5 rounded-full border border-border" style={{ background: c.swatch }} />)}
        </div>
      </div>
    </Link>
  );
}
