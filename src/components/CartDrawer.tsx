import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Instagram, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  cartCount,
  cartSubtotal,
  clearCart,
  closeCart,
  removeFromCart,
  setQty,
  useCartItems,
  useCartOpen,
} from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { CHECKOUT_URL, INSTAGRAM_DM_URL, orderSummary, PAYPAL_URL } from "@/lib/checkout";

function copySummary(items: ReturnType<typeof useCartItems>) {
  const text = orderSummary(items);
  const done = () => toast("Order summary copied — paste it into your payment note");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done, () => toast("Couldn't copy — long-press the summary to copy it"));
  } else {
    toast("Couldn't copy — long-press the summary to copy it");
  }
}

export function CartDrawer() {
  const open = useCartOpen();
  const items = useCartItems();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  return (
    <div className={open ? "fixed inset-0 z-50" : "pointer-events-none fixed inset-0 z-50"} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-scrim transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-primary transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-xl uppercase tracking-wider">
            Your cart {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-1 hover:text-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add a bait or two and they'll show up here.</p>
            <Button asChild variant="cta" className="mt-2" onClick={closeCart}>
              <Link to="/shop">Browse baits</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5">
            {items.map((i) => (
              <li key={i.key} className="flex gap-3 border-b border-border py-4 last:border-0">
                <img src={i.image} alt={i.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{i.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {i.color} · {i.pack}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        className="p-1.5 hover:text-accent"
                        aria-label={`Fewer ${i.name}`}
                        onClick={() => setQty(i.key, i.qty - 1)}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{i.qty}</span>
                      <button
                        className="p-1.5 hover:text-accent"
                        aria-label={`More ${i.name}`}
                        onClick={() => setQty(i.key, i.qty + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-accent">{formatPrice(i.price * i.qty)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(i.key)}
                  aria-label={`Remove ${i.name}`}
                  className="self-start p-1 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-lg">
            <span>Subtotal</span>
            <span className="font-semibold text-accent">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Pay Walker Baits directly on Venmo or PayPal. Payment does not automatically submit an order.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {items.length > 0 ? (
              <Button asChild variant="cta" size="lg" className="w-full">
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Checkout with Venmo <ArrowUpRight />
                </a>
              </Button>
            ) : (
              <Button variant="cta" size="lg" className="w-full" disabled>
                Checkout with Venmo <ArrowUpRight />
              </Button>
            )}
            {items.length > 0 ? (
              <Button asChild variant="heroOutline" size="lg" className="w-full">
                <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
                  Checkout with PayPal <ArrowUpRight />
                </a>
              </Button>
            ) : (
              <Button variant="heroOutline" size="lg" className="w-full" disabled>
                Checkout with PayPal <ArrowUpRight />
              </Button>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <button onClick={closeCart} className="font-semibold hover:text-accent">
              Keep shopping
            </button>
            <button
              onClick={() => {
                clearCart();
                toast("Cart emptied");
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              Empty cart
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
