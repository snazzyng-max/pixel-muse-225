import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { formatPrice, packLabel, type Product } from "@/lib/products";
export function ProductCard({ product }: { product: Product }) {
  const c = product.colors[0];
  if (!c) return null;
  return <article className="product-card group overflow-hidden rounded-md border border-border bg-card">
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="relative block overflow-hidden bg-muted">
      <img src={c.image} alt={product.name} loading="lazy" width={816} height={816} className="product-image aspect-square w-full object-cover" />
      <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-background/90"><ArrowUpRight size={15}/></span>
    </Link>
    <div className="p-4 md:p-5"><div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><span>{packLabel(product)}</span><span>Handcrafted</span></div><Link to="/shop/$slug" params={{slug: product.slug}}><h3 className="text-xl md:text-2xl">{product.name}</h3></Link>
    <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3"><span className="font-semibold">{formatPrice(product.price)}</span><Button variant="ghost" size="sm" aria-label={`Add ${product.name} to cart`} className="h-8 px-2 text-[10px] uppercase hover:bg-accent/10 hover:text-accent" onClick={() => { addToCart({key:`${product.slug}::${c.name}`,slug:product.slug,name:product.name,color:c.name,swatch:c.swatch,image:c.image,price:product.price,pack:packLabel(product)}); toast.success(`${product.name} added`,{description:c.name}); }}><Plus/> Add</Button></div></div>
  </article>;
}
