import green from "@/assets/lure-green.jpg";
import blue from "@/assets/lure-blue.jpg";
import orange from "@/assets/lure-orange.jpg";

// Placeholder photos — swap for real product shots per color when ready.
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

const defaultColors: ColorOption[] = [
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
  featured = false,
): Product => ({ slug, name, count, price, description, rigs, colors: defaultColors, featured });

export const products: Product[] = [
  p("wacky-worms", "Wacky Worms", 6, 7.5, "Slow-falling, hand-poured worm with a subtle shimmy on every drop.", ["Wacky rig", "Neko rig"], true),
  p("curly-tail", "Curly Tail", 6, 8.0, "Thin tail that kicks with the slowest retrieve.", ["Texas rig", "Carolina rig"], true),
  p("tubes", "Tubes", 10, 6.0, "Hollow-body tube that spirals on the fall — a crappie and smallmouth favorite.", ["Jig head (inside)", "Texas rig"]),
  p("craws", "Craws", 4, 5.0, "Flapping claws for flipping, pitching and jig trailers.", ["Texas rig", "Jig trailer"], true),
  p("stick-bait", "Stick Bait", null, 7.5, "Dense, salt-heavy stick for long casts and a do-nothing fall.", ["Wacky rig", "Texas rig"]),
  p("bellows-gills", "Bellows Gills", 5, 6.5, "Bluegill profile with pulsing gills for a natural presentation.", ["Swimbait hook", "Texas rig"]),
  p("drop-shot-worm", "Drop Shot Worm", 6, 5.5, "Slim, soft worm that quivers in place on a drop shot.", ["Drop shot"]),
  p("paddle-tail", "Paddle Tail", 9, 7.0, "Thumping paddle tail swimbait for steady retrieves.", ["Jig head", "Swimbait hook"], true),
  p("craw-2", "Craw #2", 5, 6.0, "Compact craw with ribbed body for tight cover.", ["Texas rig", "Jig trailer"]),
  p("fluke", "Fluke", 6, 5.0, "Erratic darting jerkbait for topwater and subsurface action.", ["Weightless", "Swimbait hook"]),
  p("paddle-tail-2", "Paddle Tail #2", 7, 5.0, "Smaller paddle tail — perfect for crappie and finesse bass.", ["Jig head", "Drop shot"]),
];

export const packLabel = (pr: Product) => (pr.count ? `${pr.count} per pack` : "Per pack");
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
