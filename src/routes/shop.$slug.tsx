import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getProduct, packLabel } from "@/lib/products";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.product.name ?? "Bait";
    const d = loaderData?.product.description ?? "Handcrafted soft plastic bait.";
    return {
      meta: [
        { title: `${name} — Walker Baits` },
        { name: "description", content: d },
        { property: "og:title", content: `${name} — Walker Baits` },
        { property: "og:description", content: d },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [color, setColor] = useState(0);
  const [packs, setPacks] = useState(1);
  const c = product.colors[color]!;
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <div>
        <div className="aspect-square overflow-hidden rounded-xl bg-muted">
          <img key={c.image} src={c.image} alt={`${product.name} in ${c.name}`} width={816} height={816} className="h-full w-full object-cover animate-in fade-in" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.colors.map((col, i) => (
            <button key={col.name} onClick={() => setColor(i)} className={`overflow-hidden rounded-lg border-2 ${i === color ? "border-accent" : "border-transparent"}`}>
              <img src={col.image} alt={col.name} loading="lazy" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Link to="/shop" className="text-sm text-muted-foreground">← All baits</Link>
        <h1 className="mt-2 text-4xl md:text-5xl">{product.name}</h1>
        <p className="mt-2 text-2xl font-semibold text-accent">{formatPrice(product.price)} <span className="text-base font-normal text-muted-foreground">/ {packLabel(product).toLowerCase()}</span></p>
        <p className="mt-4 text-muted-foreground">{product.description}</p>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider">Color: {c.name}</p>
        <div className="mt-2 flex gap-2">
          {product.colors.map((col, i) => (
            <button key={col.name} aria-label={col.name} onClick={() => setColor(i)} className={`h-9 w-9 rounded-full border-2 ${i === color ? "border-accent ring-2 ring-accent/30" : "border-border"}`} style={{ background: col.swatch }} />
          ))}
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-wider">Packs</p>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center rounded-md border border-border">
            <button className="p-2.5" aria-label="Fewer" onClick={() => setPacks(Math.max(1, packs - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center font-semibold">{packs}</span>
            <button className="p-2.5" aria-label="More" onClick={() => setPacks(packs + 1)}><Plus className="h-4 w-4" /></button>
          </div>
          <span className="text-muted-foreground">Total {formatPrice(product.price * packs)}</span>
        </div>

        <Button variant="cta" size="lg" className="mt-8 w-full" onClick={() => toast.success("Checkout is coming soon", { description: `${packs} × ${product.name} (${c.name})` })}>Add to cart</Button>

        <div className="mt-8 rounded-xl bg-card p-4">
          <p className="text-sm font-semibold uppercase tracking-wider">Best rigs</p>
          <p className="mt-1 text-muted-foreground">{product.rigs.join(" · ")}</p>
          <Link to="/how-to-rig" className="mt-2 inline-block text-sm font-semibold text-accent">How to rig it →</Link>
        </div>
      </div>
    </div>
  );
}
