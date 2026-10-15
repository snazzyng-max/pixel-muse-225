import green from "@/assets/lure-green.jpg";
import blue from "@/assets/lure-blue.jpg";
import orange from "@/assets/lure-orange.jpg";
import wackyWorms from "@/assets/baits/wacky-worms.jpg.asset.json";
import curlyTail from "@/assets/baits/curly-tail.jpg.asset.json";
import craws from "@/assets/baits/craws.jpg.asset.json";
import stickBait from "@/assets/baits/stick-bait.jpg.asset.json";
import bellowsGills from "@/assets/baits/bellows-gills.jpg.asset.json";
import dropShotWorm from "@/assets/baits/drop-shot-worm.jpg.asset.json";
import paddleTail from "@/assets/baits/paddle-tail.jpg.asset.json";
import flukeGreen from "@/assets/baits/fluke-green.jpg.asset.json";
import flukeWhite from "@/assets/baits/fluke-white.jpg.asset.json";
import paddleTail2 from "@/assets/baits/paddle-tail-2.jpg.asset.json";

export type ColorOption = { name: string; swatch: string; image: string };
export type Product = {
  slug: string;
  name: string;
  count: number | null;
  price: number;
  description: string;
  rigs: string[];
  colors: ColorOption[];
  featured?: boolean;
};

// Placeholder photos for the two baits still waiting on real shots.
const placeholderColors: ColorOption[] = [
  { name: "Watermelon Red", swatch: "oklch(0.45 0.08 130)", image: green },
  { name: "Black & Blue", swatch: "oklch(0.3 0.12 260)", image: blue },
  { name: "Pumpkin Chartreuse", swatch: "oklch(0.68 0.17 50)", image: orange },
];

const p = (
  slug: string,
  name: string,
  count: number | null,
  price: number,
  description: string,
  rigs: string[],
  colors: ColorOption[],
  featured = false,
): Product => ({ slug, name, count, price, description, rigs, colors, featured });

export const products: Product[] = [
  p("wacky-worms", "Wacky Worms", 6, 7.5, "Slow-falling, hand-poured worm with a subtle shimmy on every drop.", ["Wacky rig", "Neko rig"], [
    { name: "Cinnamon Sparkle", swatch: "oklch(0.45 0.09 55)", image: wackyWorms.url },
  ], true),
  p("curly-tail", "Curly Tail", 6, 8.0, "Thin tail that kicks with the slowest retrieve.", ["Texas rig", "Carolina rig"], [
    { name: "Orange Chartreuse", swatch: "oklch(0.7 0.18 60)", image: curlyTail.url },
  ], true),
  p("tubes", "Tubes", 10, 6.0, "Hollow-body tube that spirals on the fall — a crappie and smallmouth favorite.", ["Jig head (inside)", "Texas rig"], placeholderColors),
  p("craws", "Craws", 4, 5.0, "Flapping claws for flipping, pitching and jig trailers.", ["Texas rig", "Jig trailer"], [
    { name: "Pumpkin Chartreuse", swatch: "oklch(0.68 0.17 50)", image: craws.url },
  ], true),
  p("stick-bait", "Stick Bait", null, 7.5, "Dense, salt-heavy stick for long casts and a do-nothing fall.", ["Wacky rig", "Texas rig"], [
    { name: "Black & Blue", swatch: "oklch(0.3 0.12 260)", image: stickBait.url },
  ]),
  p("bellows-gills", "Bellows Gills", 5, 6.5, "Bluegill profile with pulsing gills for a natural presentation.", ["Swimbait hook", "Texas rig"], [
    { name: "Watermelon Sparkle", swatch: "oklch(0.5 0.1 130)", image: bellowsGills.url },
  ]),
  p("drop-shot-worm", "Drop Shot Worm", 6, 5.5, "Slim, soft worm that quivers in place on a drop shot.", ["Drop shot"], [
    { name: "Green Pumpkin", swatch: "oklch(0.5 0.09 120)", image: dropShotWorm.url },
  ]),
  p("paddle-tail", "Paddle Tail", 9, 7.0, "Thumping paddle tail swimbait for steady retrieves.", ["Jig head", "Swimbait hook"], [
    { name: "Silver Shad", swatch: "oklch(0.85 0.02 260)", image: paddleTail.url },
  ], true),
  p("craw-2", "Craw #2", 5, 6.0, "Compact craw with ribbed body for tight cover.", ["Texas rig", "Jig trailer"], placeholderColors),
  p("fluke", "Fluke", 6, 5.0, "Erratic darting jerkbait for topwater and subsurface action.", ["Weightless", "Swimbait hook"], [
    { name: "Green Sparkle", swatch: "oklch(0.5 0.1 130)", image: flukeGreen.url },
    { name: "Pearl White", swatch: "oklch(0.92 0.02 260)", image: flukeWhite.url },
  ]),
  p("paddle-tail-2", "Paddle Tail #2", 7, 5.0, "Smaller paddle tail — perfect for crappie and finesse bass.", ["Jig head", "Drop shot"], [
    { name: "Electric Blue", swatch: "oklch(0.55 0.18 250)", image: paddleTail2.url },
  ]),
];

export const packLabel = (pr: Product) => (pr.count ? `${pr.count} per pack` : "Per pack");
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
