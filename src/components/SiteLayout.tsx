import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Menu, ShoppingBag, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { cartCount, openCart, useCartItems } from "@/lib/cart";

export const INSTAGRAM = "https://www.instagram.com/walker_baits1711";
export const FACEBOOK = "https://www.facebook.com/";
const nav = [
  { to: "/shop", label: "Shop baits" },
  { to: "/how-to-rig", label: "How to rig" },
  { to: "/gallery", label: "Catch gallery" },
  { to: "/contact", label: "Contact" },
] as const;
function Socials() {
  return <div className="flex gap-4"><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-70"><Instagram size={19} /></a><a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-opacity hover:opacity-70"><Facebook size={19} /></a></div>;
}
function CartButton() {
  const count = cartCount(useCartItems());
  return <Button variant="ghost" onClick={openCart} aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`} className="gap-2 hover:bg-accent/10 hover:text-accent"><ShoppingBag /><span className="hidden text-xs uppercase sm:inline">Bag</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-accent/40 px-1 text-[10px]">{count}</span></Button>;
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="flex min-h-screen flex-col">
    <div className="border-b border-border bg-background py-2 text-center text-[10px] font-semibold uppercase">Handcrafted baits made with purpose. <span className="mx-3 opacity-40">/</span> Matthew 4:19</div>
    <header className="site-header sticky top-0 z-40 border-b border-border">
      <div className="site-container flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="Walker Baits home" className="flex shrink-0 items-center gap-3"><img src={logoAsset.url} alt="Walker Baits logo" className="h-14 w-[86px] object-contain" /><span className="hidden font-display text-xl uppercase lg:block">Walker Baits<span className="mt-0.5 block font-sans text-[9px] font-semibold">Handcrafted soft plastics</span></span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">{nav.map(n => <Link key={n.to} to={n.to} className="nav-link text-xs font-semibold uppercase" activeProps={{ className: "text-accent" }}>{n.label}</Link>)}</nav>
        <div className="flex items-center gap-2"><CartButton /><Button variant="ghost" size="icon" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</Button></div>
      </div>
      {open && <nav aria-label="Mobile navigation" className="flex flex-col gap-5 border-t border-border px-5 py-6 md:hidden">{nav.map(n => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display text-xl uppercase">{n.label}</Link>)}<Socials /></nav>}
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-border bg-background">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div><Link to="/" className="flex items-center gap-4"><img src={logoAsset.url} alt="Walker Baits logo" className="h-16 w-24 object-contain" /><span className="font-display text-3xl uppercase">Walker Baits.</span></Link><p className="mt-5 text-sm text-muted-foreground">Cast with Faith. Fish with Purpose.</p><p className="mt-2 text-xs text-muted-foreground">Matthew 4:19</p></div>
        <div><p className="eyebrow mb-5 text-muted-foreground">Explore</p><div className="flex flex-col gap-3">{nav.map(n => <Link key={n.to} to={n.to} className="text-sm hover:underline">{n.label}</Link>)}</div></div>
        <div><p className="eyebrow mb-5 text-muted-foreground">On the water</p><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mb-5 flex items-center gap-2 text-sm">@walker_baits1711 <ArrowUpRight size={14}/></a><Socials /></div>
      </div><div className="site-container flex flex-wrap justify-between gap-3 border-t border-border py-5 text-[11px] text-muted-foreground"><span>© {new Date().getFullYear()} Walker Baits</span><span>Handcrafted. Small batches. Big purpose.</span></div>
    </footer>
  </div>;
}
