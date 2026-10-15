import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FACEBOOK, INSTAGRAM } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Walker Baits" },
      { name: "description", content: "Questions or custom color requests? Get in touch with Walker Baits." },
      { property: "og:title", content: "Contact Walker Baits" },
      { property: "og:description", content: "Customer service and custom color requests." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-4xl md:text-5xl">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">Questions about an order or want a custom color? Drop us a line.</p>
        <div className="mt-8 space-y-3">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-semibold hover:text-accent"><Instagram /> @walker_baits1711</a>
          <a href={FACEBOOK} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-semibold hover:text-accent"><Facebook /> Walker Baits on Facebook</a>
        </div>
      </div>
      <form className="space-y-4 rounded-xl bg-card p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Message received — we'll be in touch."); e.currentTarget.reset(); }}>
        <div><Label htmlFor="name">Name</Label><Input id="name" required className="mt-1" /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="mt-1" /></div>
        <div><Label htmlFor="msg">Message</Label><Textarea id="msg" rows={5} required className="mt-1" placeholder="Order question, custom color request…" /></div>
        <Button type="submit" variant="cta" className="w-full">Send message</Button>
      </form>
    </div>
  );
}
