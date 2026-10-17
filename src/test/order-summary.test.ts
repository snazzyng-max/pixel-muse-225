import { describe, expect, it } from "vitest";
import { orderSummary } from "@/lib/checkout";
import type { CartItem } from "@/lib/cart";

const item: CartItem = {
  key: "wacky-worms::Cinnamon Sparkle",
  slug: "wacky-worms",
  name: "Wacky Worms",
  color: "Cinnamon Sparkle",
  swatch: "oklch(0.5 0.1 40)",
  image: "x.jpg",
  price: 4.5,
  pack: "5-pack",
  qty: 2,
};

describe("orderSummary", () => {
  it("lists bait name, colour, quantity and line price", () => {
    const summary = orderSummary([item]);
    expect(summary).toContain("2x Wacky Worms");
    expect(summary).toContain("Cinnamon Sparkle");
    expect(summary).toContain("5-pack");
    expect(summary).toContain(formatPriceText(9));
  });

  it("ends with the total of all lines", () => {
    const other = { ...item, key: "craws::Black & Blue", name: "Craws", price: 5, qty: 1 };
    const summary = orderSummary([item, other]);
    expect(summary.trim().endsWith(`Total: ${formatPriceText(14)}`)).toBe(true);
  });
});

function formatPriceText(n: number) {
  return `$${n.toFixed(2)}`;
}
