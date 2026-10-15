import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, packLabel, products } from "@/lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Soft Plastic Baits — Walker Baits" },
      { name: "description", content: "Wacky worms, tubes, craws, paddle tails, flukes and more — handcrafted in small batches." },
      { property: "og:title", content: "Shop Walker Baits" },
      { property: "og:description", content: "Handcrafted soft plastics for bass and crappie." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl md:text-5xl">Shop all baits</h1>
      <p className="mt-2 text-muted-foreground">Every bait comes in multiple colors. Custom colors available on request.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>

      <section id="pricing" className="mt-16 scroll-mt-20">
        <h2 className="text-3xl">Pricing</h2>
        <div className="mt-4 overflow-hidden rounded-xl bg-card">
          {products.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0 hover:bg-muted">
              <span className="font-semibold">{p.name}</span>
              <span className="flex gap-4 text-sm"><span className="text-muted-foreground">{packLabel(p)}</span><span className="w-14 text-right font-semibold text-accent">{formatPrice(p.price)}</span></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
