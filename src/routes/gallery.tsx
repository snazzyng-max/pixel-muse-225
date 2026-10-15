import { createFileRoute } from "@tanstack/react-router";
import { Fish } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/products";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Catch Gallery — Walker Baits" },
      { name: "description", content: "Real bass and crappie caught on Walker Baits. Share your catch to be featured." },
      { property: "og:title", content: "Catch Gallery — Walker Baits" },
      { property: "og:description", content: "Real fish caught on Walker Baits lures." },
    ],
  }),
  component: Gallery,
});

// Placeholder tiles until the real catch photos are added.
const catches = [
  { angler: "Catch #1", bait: "Wacky Worms" },
  { angler: "Catch #2", bait: "Paddle Tail" },
  { angler: "Catch #3", bait: "Tubes" },
  { angler: "Catch #4", bait: "Craws" },
];

function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl md:text-5xl">Catch gallery</h1>
      <p className="mt-2 text-muted-foreground">Real fish. Real anglers. Caught on Walker Baits.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {catches.map((c) => (
          <figure key={c.angler} className="overflow-hidden rounded-xl bg-card">
            <div className="flex aspect-[4/5] items-center justify-center bg-secondary text-secondary-foreground/60"><Fish className="h-12 w-12" /></div>
            <figcaption className="p-3 text-sm"><span className="font-semibold">{c.angler}</span> · <span className="text-muted-foreground">{c.bait}</span></figcaption>
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
