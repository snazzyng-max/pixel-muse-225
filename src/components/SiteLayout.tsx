import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

export const INSTAGRAM = "https://www.instagram.com/walker_baits1711";
export const FACEBOOK = "https://www.facebook.com/";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/how-to-rig", label: "How to Rig" },
  { to: "/gallery", label: "Catch Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

function Socials() {
  return (
    <div className="flex items-center gap-3">
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-accent"><Instagram className="h-5 w-5" /></a>
      <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-accent"><Facebook className="h-5 w-5" /></a>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="font-display text-2xl uppercase tracking-wider">Walker <span className="text-accent">Baits</span></Link>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm font-semibold uppercase tracking-wider opacity-85 hover:opacity-100" activeProps={{ className: "text-accent opacity-100" }}>{n.label}</Link>
            ))}
            <Socials />
          </nav>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t border-primary-foreground/15 px-4 py-5 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-semibold uppercase tracking-wider">{n.label}</Link>
            ))}
            <Socials />
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl uppercase tracking-wider">Walker <span className="text-accent">Baits</span></p>
            <p className="mt-2 text-sm opacity-75">Cast with Faith. Fish with Purpose.</p>
            <p className="mt-1 text-sm opacity-60">Matthew 4:19</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {nav.map((n) => <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">{n.label}</Link>)}
          </div>
          <div className="space-y-3 text-sm">
            <p className="opacity-80">Follow @walker_baits1711</p>
            <Socials />
          </div>
        </div>
        <p className="pb-6 text-center text-xs opacity-60">© {new Date().getFullYear()} Walker Baits. Handcrafted soft plastics.</p>
      </footer>
    </div>
  );
}
