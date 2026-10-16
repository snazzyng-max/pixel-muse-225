import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/products";
import bass1 from "@/assets/catches/catch-bass-1.jpg.asset.json";
import bass2 from "@/assets/catches/catch-bass-2.jpg.asset.json";
import crappieWhite from "@/assets/catches/catch-crappie-white.jpg.asset.json";
import crappieCraw from "@/assets/catches/catch-crappie-craw.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      { title: "Catch Gallery — Walker Baits" },
      { name: "description", content: "Real bass and crappie caught on Walker Baits. Share your catch to be featured." },
      { property: "og:title", content: "Catch Gallery — Walker Baits" },
      { property: "og:description", content: "Real fish caught on Walker Baits lures." },
    ],
  }),
  component: Gallery,
});

const catches = [
  { img: bass1.url, fish: "Largemouth Bass", note: "Shoreline catch" },
  { img: crappieWhite.url, fish: "Crappie", note: "On a white bait" },
  { img: crappieCraw.url, fish: "Crappie", note: "On a craw bait" },
  { img: bass2.url, fish: "Largemouth Bass", note: "Weed-line catch" },
];

function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl md:text-5xl">Catch gallery</h1>
      <p className="mt-2 text-muted-foreground">Real fish. Real anglers. Caught on Walker Baits.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {catches.map((c) => (
          <figure key={c.img} className="overflow-hidden rounded-xl bg-card">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={c.img} alt={`${c.fish} caught on Walker Baits`} className="h-full w-full object-cover" />
            </div>
            <figcaption className="p-3 text-sm"><span className="font-semibold">{c.fish}</span> · <span className="text-muted-foreground">{c.note}</span></figcaption>
          </figure>
        ))}
      </div>

      <section className="mt-16 max-w-xl rounded-xl bg-card p-6">
        <h2 className="text-2xl">Share your catch</h2>
        <p className="mt-1 text-sm text-muted-foreground">Send us your photo and the bait you used to get featured.</p>
        <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! Submissions will go live soon."); e.currentTarget.reset(); }}>
          <div><Label htmlFor="n">Your name</Label><Input id="n" required className="mt-1" /></div>
          <div>
            <Label htmlFor="b">Bait used</Label>
            <select id="b" required className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
            </select>
          </div>
          <div><Label htmlFor="f">Photo</Label><Input id="f" type="file" accept="image/*" required className="mt-1" /></div>
          <Button type="submit" variant="cta" className="w-full">Submit catch</Button>
        </form>
      </section>
    </div>
  );
}
