import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Package, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import type { ProductsResponse, Product } from "@shared/api";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = (await res.json()) as ProductsResponse;
        if (mounted) setProducts(data.items);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => products.slice(0, 8), [products]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,hsl(var(--primary)/0.12),transparent_50%)]" />
        <div className="container mx-auto container-px">
          <div className="py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-5 bg-background/70 backdrop-blur">
                <span className="size-1.5 rounded-full bg-primary" />
                US-first dropshipping. 2-5 day delivery.
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Elevate your store with premium products built for the US market
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Curated selection, fast shipping, and an AI shopping assistant
                to help your customers find the perfect products.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button className="rounded-full" asChild>
                  <a href="#featured">
                    Shop now <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button variant="secondary" className="rounded-full" asChild>
                  <a href="#chatbot">Chat with us</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="size-4" /> Fast US shipping
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4" /> Secure checkout
                </div>
                <div className="flex items-center gap-2">
                  <Package className="size-4" /> Handpicked items
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 hidden md:block size-72 rounded-full bg-primary/10 blur-3xl" />
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {featured.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-3xl overflow-hidden border aspect-square"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section id="featured" className="py-14 md:py-20">
        <div className="container mx-auto container-px">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Featured
              </h2>
              <p className="text-muted-foreground">
                Trending products with US inventory
              </p>
            </div>
            <Button variant="ghost" className="rounded-full" asChild>
              <a href="/shop">View all</a>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                  badge={p.badge}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto container-px grid gap-8 md:grid-cols-3">
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-1">US-focused logistics</h3>
            <p className="text-sm text-muted-foreground">
              Warehouses across the US for 2-5 day delivery to your customers.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-1">
              AI shopping assistant
            </h3>
            <p className="text-sm text-muted-foreground">
              Built-in chatbot to guide customers and boost conversions.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-1">
              Seamless integrations
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect your favorite payment and analytics tools easily.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
