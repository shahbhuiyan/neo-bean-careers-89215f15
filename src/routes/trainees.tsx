import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Mail, Code2, Atom, Palette, Cpu, Braces, Database, GitBranch, Globe } from "lucide-react";
import dev1 from "@/assets/dev1.jpg";
import dev2 from "@/assets/dev2.jpg";
import dev3 from "@/assets/dev3.jpg";
import dev4 from "@/assets/dev4.jpg";
import { GlowCard, Reveal, SectionHeading } from "@/components/ui-bits";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/trainees")({
  head: () => ({
    meta: [
      { title: "Trainee Developers — Hot Beans Web" },
      { name: "description", content: "Meet our trainee front-end, back-end, full-stack and UI/UX developers." },
      { property: "og:title", content: "Meet our trainee developers" },
      { property: "og:description", content: "Profiles of our current trainee cohort at Hot Beans Web." },
    ],
  }),
  component: Trainees,
});

const ICONS: Record<string, typeof Code2> = {
  HTML: Globe, CSS: Palette, JS: Braces, React: Atom, "Node.js": Cpu, Python: Code2, GitHub: GitBranch, Figma: Palette, TS: Code2, SQL: Database,
};

const DEVS = [
  { name: "Maya Chen", role: "Front-End Trainee", img: dev1, bio: "BTEC L3 Computing graduate building accessible, performant interfaces with React & Tailwind.", level: "Year 2", skills: [["HTML", 95],["CSS", 92],["JS", 88],["React", 85],["Figma", 78]] },
  { name: "Daniel Reyes", role: "Back-End Trainee", img: dev2, bio: "Loves distributed systems. Currently shipping our payments API on Cloudflare Workers.", level: "Year 1", skills: [["Node.js", 88],["TS", 84],["SQL", 80],["Python", 76],["GitHub", 90]] },
  { name: "Aisha Patel", role: "UI/UX Trainee", img: dev3, bio: "Designer-coder hybrid. Crafts design systems and prototypes them in production code.", level: "Year 2", skills: [["Figma", 95],["CSS", 90],["HTML", 85],["JS", 70],["React", 65]] },
  { name: "Jamie O'Connor", role: "Full-Stack Trainee", img: dev4, bio: "From pixel-perfect UI to RESTful APIs. Recently led delivery of our internal CRM rebuild.", level: "Year 3", skills: [["React", 90],["Node.js", 86],["TS", 88],["SQL", 78],["GitHub", 92]] },
] as const;

function SkillBar({ name, value }: { name: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(value); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  const Icon = ICONS[name] ?? Code2;
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {name}</span>
        <span className="font-mono">{v}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.25 0.05 275 / 0.6)" }}>
        <div
          className="h-full transition-[width] duration-1000 ease-out"
          style={{ width: `${v}%`, background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))", boxShadow: "0 0 10px var(--neon-purple)" }}
        />
      </div>
    </div>
  );
}

function Trainees() {
  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Trainee developers"
              title={<>Meet the <span className="gradient-text">2026 cohort</span>.</>}
              subtitle="Real developers, real ownership. Each of these engineers joined as a trainee — and is shipping production code today."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-8">
          {DEVS.map((d, i) => (
            <Reveal key={d.name} delay={i * 100}>
              <GlowCard className="!p-0 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" width={768} height={768} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, oklch(0.13 0.04 270) 100%)" }} />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="text-xs uppercase tracking-[0.2em] gradient-text">{d.level}</div>
                    <div className="text-2xl font-semibold mt-1">{d.name}</div>
                    <div className="text-sm text-muted-foreground">{d.role}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.bio}</p>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {d.skills.map(([n, v]) => <SkillBar key={n} name={n as string} value={v as number} />)}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-xs font-medium hover:bg-white/5 transition">
                      <ExternalLink className="h-3.5 w-3.5" /> Portfolio
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-xl glass px-4 py-2 text-xs font-medium hover:bg-white/5 transition">
                      <Mail className="h-3.5 w-3.5" /> Contact
                    </button>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="rounded-3xl glass-strong gradient-border p-10 text-center">
              <h3 className="text-3xl md:text-4xl font-semibold">Could you be next?</h3>
              <p className="mt-3 text-muted-foreground">Applications open for all four trainee tracks.</p>
              <Link to="/apply" className="mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-medium text-primary-foreground neon-glow"
                style={{ background: "var(--gradient-primary)" }}>Apply now →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
