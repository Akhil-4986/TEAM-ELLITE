import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isApp = location.pathname !== "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg text-primary-foreground tracking-tight">
              Gig<span className="text-secondary">Shield</span>
            </span>
          </Link>

          {/* Desktop nav */}
          {!isApp && (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {isApp && (
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Dashboard", to: "/dashboard" },
                { label: "My Policy", to: "/policy" },
                { label: "Claims", to: "/claims" },
                { label: "Admin", to: "/admin" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                    location.pathname === item.to
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isApp ? (
              <>
                <button className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
                </button>
                <div className="flex items-center gap-2 pl-3 border-l border-white/20">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                    RK
                  </div>
                  <span className="text-sm text-white/80 font-medium">Rahul K.</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                </div>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                    Sign in
                  </Button>
                </Link>
                <Link to="/onboarding">
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg">
                    Get Protected
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-primary px-4 py-4 space-y-1 animate-fade-in">
          {isApp ? (
            <>
              {[
                { label: "Dashboard", to: "/dashboard" },
                { label: "My Policy", to: "/policy" },
                { label: "Claims", to: "/claims" },
                { label: "Admin", to: "/admin" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </>
          ) : (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                    Sign in
                  </Button>
                </Link>
                <Link to="/onboarding" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold">
                    Get Protected
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
