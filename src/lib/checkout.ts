// External payment only: these destinations do not submit or confirm an order.
export const CHECKOUT_URL = "https://www.venmo.com/u/Walker_Baits";
export const PAYPAL_URL = "https://paypal.me/walkerbaits";
export const INSTAGRAM_DM_URL = "https://www.instagram.com/walker_baits1711";

import type { CartItem } from "@/lib/cart";
import { cartSubtotal } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

// Plain-text order the shopper pastes into their Venmo/PayPal note or Instagram DM.
export function orderSummary(items: CartItem[]): string {
  const lines = items.map(
    (i) => `${i.qty}x ${i.name} — ${i.color} (${i.pack}) — ${formatPrice(i.price * i.qty)}`,
  );
  return [...lines, `Total: ${formatPrice(cartSubtotal(items))}`].join("\n");
}
