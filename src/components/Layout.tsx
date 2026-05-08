import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, Github, Linkedin, Twitter } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/trainees", label: "Trainees" },
  { to: "/careers", label: "Careers" },
  { to: "/apply", label: "Apply" },
];

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${p}%`,
          background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))",
          boxShadow: "0 0 10px var(--neon-purple)",
        }}
      />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition"
                style={{ background: "var(--gradient-primary)" }} />
            </div>
            <span className="font-semibold tracking-tight text-lg">
              Hot Beans <span className="gradient-text">Web</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition rounded-lg"
                activeProps={{ className: "text-foreground" }}
              >
                {({ isActive }) => (
                  <>
                    <span>{n.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px"
                        style={{ background: "linear-gradient(90deg, transparent, var(--neon-purple), transparent)" }} />
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/apply"
              className="relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-primary-foreground overflow-hidden group"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span className="relative z-10">Apply Now</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }} />
              <span className="relative z-10">→</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1 animate-fade-up">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-3 rounded-lg text-sm hover:bg-white/5"
                activeProps={{ className: "bg-white/10" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">
                Hot Beans <span className="gradient-text">Web</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Building the next generation of the web — and the developers who craft it. Join a studio where craft, code and curiosity meet.
            </p>
            <div className="flex gap-3 mt-6">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-xl glass flex items-center justify-center hover:neon-glow transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider gradient-text">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-foreground transition">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider gradient-text">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>careers@hotbeansweb.io</li>
              <li>+44 (0) 20 7946 0123</li>
              <li>Shoreditch, London</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© 2026 Hot Beans Web Ltd. All rights reserved.</span>
          <span>Crafted with neon, caffeine & code.</span>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-40" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl opacity-30 animate-aurora"
          style={{ background: "var(--neon-purple)" }} />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-25 animate-aurora"
          style={{ background: "var(--neon-blue)", animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full blur-3xl opacity-20 animate-aurora"
          style={{ background: "var(--neon-cyan)", animationDelay: "-12s" }} />
      </div>
      <Navbar />
      <main className="flex-1 pt-24"><Outlet /></main>
      <Footer />
    </div>
  );
}
