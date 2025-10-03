import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Header() {
  const { pathname } = useLocation();

  const nav = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/cart", label: "Cart" },
    { to: "/checkout", label: "Checkout" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto container-px h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-black to-zinc-600 dark:from-white dark:to-zinc-300" />
            <span className="text-xl font-extrabold tracking-tight">Ablis</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium text-foreground/70 hover:text-foreground transition",
                    isActive || pathname === item.to
                      ? "text-foreground"
                      : undefined,
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-full border px-3 py-2 text-sm text-muted-foreground hover:border-foreground/20 transition">
            <Search className="mr-2 size-4" />
            <input
              placeholder="Search products"
              className="bg-transparent outline-none placeholder:text-muted-foreground/70 w-40"
            />
          </div>
          <ThemeSwitcher />
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link to="/cart">
              <ShoppingCart className="size-5" />
            </Link>
          </Button>
          <Button
            className="hidden sm:inline-flex rounded-full"
            size="sm"
            variant="default"
            asChild
          >
            <a href="#chatbot">
              <MessageCircle className="mr-2 size-4" /> Chat with us
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
