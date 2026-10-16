import { describe, expect, it } from "vitest";
import { CHECKOUT_URL } from "@/lib/checkout";

describe("Direct checkout", () => {
  it("sends payment to the requested Walker Baits Venmo account", () => {
    expect(CHECKOUT_URL).toBe("https://www.venmo.com/u/Walker_Baits");
  });
});