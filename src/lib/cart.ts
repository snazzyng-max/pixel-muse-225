import { useEffect, useSyncExternalStore } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  color: string;
  swatch: string;
  image: string;
  price: number;
  pack: string;
  qty: number;
};

const STORAGE_KEY = "walker-baits-cart-v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let hydrated = false;
const itemListeners = new Set<() => void>();

let drawerOpen = false;
const drawerListeners = new Set<() => void>();

function emitItems() {
  for (const l of itemListeners) l();
}

function emitDrawer() {
  for (const l of drawerListeners) l();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — cart stays for this visit only */
  }
}

export function hydrateCart() {
  if (hydrated) return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        items = parsed.filter(
          (i): i is CartItem =>
            !!i &&
            typeof (i as CartItem).key === "string" &&
            typeof (i as CartItem).qty === "number" &&
            typeof (i as CartItem).price === "number",
        );
      }
    }
  } catch {
    items = EMPTY;
  }
  emitItems();
}

function subscribeItems(cb: () => void) {
  itemListeners.add(cb);
  return () => {
    itemListeners.delete(cb);
  };
}

function subscribeDrawer(cb: () => void) {
  drawerListeners.add(cb);
  return () => {
    drawerListeners.delete(cb);
  };
}

export function useCartItems() {
  useEffect(() => {
    hydrateCart();
  }, []);
  return useSyncExternalStore(
    subscribeItems,
    () => items,
    () => EMPTY,
  );
}

export function useCartOpen() {
  return useSyncExternalStore(
    subscribeDrawer,
    () => drawerOpen,
    () => false,
  );
}

export function openCart() {
  drawerOpen = true;
  emitDrawer();
}

export function closeCart() {
  drawerOpen = false;
  emitDrawer();
}

export function addToCart(item: Omit<CartItem, "qty">, qty = 1) {
  hydrateCart();
  const at = items.findIndex((x) => x.key === item.key);
  items =
    at >= 0
      ? items.map((x, j) => (j === at ? { ...x, qty: x.qty + qty } : x))
      : [...items, { ...item, qty }];
  persist();
  emitItems();
}

export function setQty(key: string, qty: number) {
  hydrateCart();
  items =
    qty <= 0
      ? items.filter((x) => x.key !== key)
      : items.map((x) => (x.key === key ? { ...x, qty } : x));
  persist();
  emitItems();
}

export function removeFromCart(key: string) {
  setQty(key, 0);
}

export function clearCart() {
  hydrateCart();
  items = EMPTY;
  persist();
  emitItems();
}

export function cartCount(list: CartItem[]) {
  return list.reduce((n, i) => n + i.qty, 0);
}

export function cartSubtotal(list: CartItem[]) {
  return list.reduce((n, i) => n + i.price * i.qty, 0);
}
