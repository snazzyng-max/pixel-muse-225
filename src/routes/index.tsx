import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/fishing-editorial.jpg";
import bass1 from "@/assets/catches/catch-bass-1.jpg.asset.json";
import crappie from "@/assets/catches/catch-crappie-white.jpg.asset.json";
import bass2 from "@/assets/catches/catch-bass-2.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { ArrowRight, ArrowUpRight, Fish, Hand, Heart } from "lucide-react";
export const Route = createFileRoute("/")({
  head: () => ({meta:[{title:"Walker Baits — Handcrafted Soft Plastic Lures"},{name:"description",content:"Handcrafted soft plastic fishing lures for bass and crappie anglers. Cast with Faith. Fish with Purpose."},{property:"og:title",content:"Walker Baits — Handcrafted Soft Plastic Lures"},{property:"og:description",content:"Handcrafted baits made with purpose. Explore our soft plastics and real catches."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
  component: Index,
});
function Index() {
  const featured = products.filter(p => p.featured).slice(0,4);
  return <>
    <section className="home-hero relative flex items-center overflow-hidden">
      <img src={hero} alt="Angler casting across a forest-lined lake" width={1920} height={1024} fetchPriority="high" className="hero-photo absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-hero-overlay"/>
      <div className="site-container hero-enter relative py-10"><p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-accent"/> Handcrafted soft plastics</p><h1 className="hero-title">Walker<br/>Baits<span className="text-accent">.</span></h1><p className="mt-6 font-display text-xl uppercase md:text-2xl">Cast with Faith. Fish with Purpose.</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Small-batch baits. A love for the water.<br/>Made with purpose, for your next cast.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="cta" size="lg"><Link to="/shop">Shop the baits <ArrowUpRight/></Link></Button><Button asChild variant="heroOutline" size="lg"><Link to="/gallery">The catches <ArrowRight/></Link></Button></div></div>
      <div className="absolute bottom-5 right-10 hidden items-center gap-3 text-[10px] uppercase md:flex"><span className="h-px w-10 bg-accent"/> Faith in every cast · Matthew 4:19</div>
    </section>
    <section className="border-y border-border"><div className="site-container grid grid-cols-3 py-5 text-center">{[{icon:Hand,text:"Handcrafted"},{icon:Fish,text:"Bass & crappie"},{icon:Heart,text:"Made with purpose"}].map(({icon:I,text},i)=><div key={text} className={`flex flex-col items-center justify-center gap-2 text-[10px] font-semibold uppercase sm:flex-row sm:gap-3 sm:text-xs ${i ? "border-l border-border" : ""}`}><I size={16}/>{text}</div>)}</div></section>
    <section className="site-container py-14 md:py-20"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow mb-3 text-muted-foreground">The bait lineup / 01</p><h2 className="text-4xl md:text-5xl">Made for your next cast.</h2></div><Link to="/shop" className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase"><span className="hidden sm:inline">All 11 baits</span><ArrowUpRight size={20}/></Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{featured.map(p=><ProductCard key={p.slug} product={p}/>)}</div></section>
    <section className="border-y border-border bg-card"><div className="site-container py-14 md:py-20"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow mb-3 text-muted-foreground">From the water / 02</p><h2 className="text-4xl md:text-5xl">The catch says it all.</h2></div><Link to="/gallery" className="flex items-center gap-2 text-xs font-semibold uppercase"><span className="hidden sm:inline">Catch gallery</span><ArrowUpRight size={20}/></Link></div><div className="grid grid-cols-3 gap-3 md:gap-5">{[{img:bass1.url,fish:"Largemouth bass"},{img:crappie.url,fish:"Crappie"},{img:bass2.url,fish:"Largemouth bass"}].map((c,i)=><Link to="/gallery" key={c.img} className="group block"><div className="overflow-hidden rounded-sm"><img src={c.img} alt={c.fish} loading="lazy" width={600} height={750} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"/></div><div className="mt-3 flex items-center justify-between text-[10px] uppercase md:text-xs"><span>{c.fish}</span><span className="hidden text-muted-foreground sm:inline">0{i+1}</span></div></Link>)}</div></div></section>
    <section className="site-container flex flex-col justify-between gap-6 py-14 md:flex-row md:items-center md:py-20"><div><p className="eyebrow mb-3 text-muted-foreground">Rig it right.</p><h2 className="text-4xl md:text-5xl">Good bait. The right setup.</h2></div><Button asChild variant="cta" size="lg"><Link to="/how-to-rig">Find your rig <ArrowUpRight/></Link></Button></section>
  </>;
}
