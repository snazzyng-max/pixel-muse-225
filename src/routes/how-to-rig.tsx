import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/how-to-rig")({
  head: () => ({
    meta: [
      { title: "How to Rig Soft Plastics — Walker Baits" },
      { name: "description", content: "Step-by-step guides for Texas, wacky, drop shot and more with Walker Baits lures." },
      { property: "og:title", content: "How to Rig — Walker Baits" },
      { property: "og:description", content: "Texas rig, wacky rig, drop shot and more — step by step." },
    ],
  }),
  component: Rig,
});

const guides = [
  { name: "Texas Rig", steps: ["Slide a bullet weight onto your line.", "Tie on an offset worm hook.", "Thread the hook ¼\" into the bait's nose and pop it out.", "Rotate and bury the point back into the body so it's weedless."] },
  { name: "Wacky Rig", steps: ["Find the middle of the worm.", "Optional: slide on an O-ring for durability.", "Hook straight through the center (or under the O-ring).", "Cast, let it fall slack, and twitch lightly."] },
  { name: "Drop Shot", steps: ["Tie a Palomar knot with a long tag end.", "Pass the tag back down through the hook eye so the point faces up.", "Clip a drop shot weight 12–18\" below the hook.", "Nose-hook the bait and shake in place."] },
];

function Rig() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl md:text-5xl">How to rig</h1>
      <p className="mt-2 text-muted-foreground">Get the most out of every bait. Videos and step photos coming soon.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {guides.map((g) => (
          <article key={g.name} className="overflow-hidden rounded-xl bg-card">
            <div className="flex aspect-video items-center justify-center bg-primary text-primary-foreground/70">
              <PlayCircle className="h-12 w-12" />
            </div>
            <div className="p-5">
              <h2 className="text-2xl">{g.name}</h2>
              <ol className="mt-3 space-y-2">
                {g.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span>{s}</li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-16 text-3xl">By bait</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.slug} className="flex gap-4 rounded-xl bg-card p-3">
            <img src={p.colors[0].image} alt={p.name} loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
            <div>
              <h3 className="text-lg">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.rigs.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
