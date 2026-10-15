import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Hand, Fish, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Walker Baits — Cast with Faith. Fish with Purpose." },
      { name: "description", content: "Handcrafted soft plastic fishing lures for bass and crappie anglers." },
      { property: "og:title", content: "Walker Baits — Handcrafted Soft Plastics" },
      { property: "og:description", content: "Handcrafted baits made with purpose. Cast with Faith. Fish with Purpose." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <>
      <section className="relative flex min-h-[85vh] items-end overflow-hidden text-primary-foreground">
        <img src={hero} alt="Handcrafted Walker Baits lure at sunrise" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 md:pb-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Handcrafted baits made with purpose</p>
          <h1 className="max-w-3xl text-5xl leading-[0.95] md:text-7xl">Cast with Faith.<br />Fish with Purpose.</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg"><Link to="/shop">Shop All Baits</Link></Button>
            <Button asChild variant="heroOutline" size="lg"><Link to="/shop" hash="pricing">See Pricing</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        {[
          { icon: Hand, t: "Hand-poured", d: "Every bait is poured by hand in small batches — no shortcuts." },
          { icon: Fish, t: "Built for bass & crappie", d: "Profiles and colors tested on real water, by real anglers." },
          { icon: Heart, t: "Made with purpose", d: "A family brand rooted in faith and a love for the outdoors." },
        ].map(({ icon: I, t, d }) => (
          <div key={t}>
            <I className="h-8 w-8 text-accent" />
            <h2 className="mt-3 text-xl">{t}</h2>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl">Top sellers</h2>
            <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-accent">View all →</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
