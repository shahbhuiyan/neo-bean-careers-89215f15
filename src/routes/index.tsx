import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2, Sparkles, Rocket, Zap, Users, Trophy, ArrowRight, ChevronDown,
  Atom, Braces, Palette, Database, GitBranch, Globe, Cpu, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Counter, GlowCard, Reveal, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hot Beans Web — Recruiting the next generation of developers" },
      { name: "description", content: "Hot Beans Web is a futuristic web development studio recruiting trainee developers. Discover careers, profiles and learning paths." },
      { property: "og:title", content: "Hot Beans Web — Future-forward web development studio" },
      { property: "og:description", content: "Join Hot Beans Web. We're hiring trainee front-end, back-end, full-stack and UI/UX developers." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Rocket, title: "Real client work", desc: "Ship to production from week one. No coffee-runs, just craft." },
  { icon: Users, title: "Mentor-led growth", desc: "Senior engineers pair with you weekly on architecture, code & career." },
  { icon: Zap, title: "Bleeding-edge stack", desc: "TypeScript, React 19, edge-native runtimes, AI-assisted workflows." },
  { icon: Trophy, title: "Award-winning culture", desc: "Voted Top 50 UK tech startups to work for, three years running." },
];

const TECHS = [
  { icon: Globe, name: "HTML5" },
  { icon: Palette, name: "CSS3" },
  { icon: Braces, name: "JavaScript" },
  { icon: Atom, name: "React" },
  { icon: Cpu, name: "Node.js" },
  { icon: Database, name: "PostgreSQL" },
  { icon: GitBranch, name: "GitHub" },
  { icon: Code2, name: "TypeScript" },
];

const TESTIMONIALS = [
  { quote: "I joined as a trainee and shipped to production within a month. The mentorship is unmatched.", name: "Maya Chen", role: "Front-End Developer" },
  { quote: "Hot Beans actually invests in your growth. I went from BTEC to lead engineer in three years.", name: "Daniel Reyes", role: "Full-Stack Engineer" },
  { quote: "The culture is electric. Smart people, real problems, beautiful code.", name: "Aisha Patel", role: "UI/UX Designer" },
];

const TIMELINE = [
  { year: "2018", title: "Founded in Shoreditch", desc: "Three engineers, one big idea." },
  { year: "2021", title: "Trainee programme launched", desc: "Partnered with BTEC & university programmes." },
  { year: "2024", title: "50+ engineers, 4 cities", desc: "London, Manchester, Berlin, Lisbon." },
  { year: "2026", title: "AI-native studio", desc: "Pioneering agentic dev workflows for clients." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-40" width={1600} height={1024} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, var(--background) 90%)" }} />
        </div>

        {/* Floating shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 left-10 h-32 w-32 rounded-3xl glass animate-float" />
          <div className="absolute top-40 right-20 h-24 w-24 rounded-full glass animate-float" style={{ animationDelay: "-2s" }} />
          <div className="absolute bottom-32 left-1/4 h-20 w-20 rounded-2xl glass animate-float" style={{ animationDelay: "-4s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--neon-cyan)" }} />
              Now hiring · 2026 trainee cohort
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] max-w-5xl">
              Build the <span className="gradient-text">future</span> of the web,
              <br /> one commit at a time.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Hot Beans Web is a London-based studio crafting next-generation digital products.
              We're recruiting trainee developers ready to ship real work for real clients.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/apply"
                className="group relative inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-medium text-primary-foreground overflow-hidden neon-glow"
                style={{ background: "var(--gradient-primary)" }}>
                <span className="relative z-10">Apply for the cohort</span>
                <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/trainees"
                className="inline-flex items-center gap-2 rounded-2xl glass-strong px-7 py-4 text-base font-medium hover:bg-white/5 transition">
                Meet the team
              </Link>
            </div>
          </Reveal>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="h-10 w-6 rounded-full border border-border flex items-start justify-center pt-1.5">
              <span className="h-1.5 w-1 rounded-full animate-scroll-dot" style={{ background: "var(--neon-cyan)" }} />
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: 120, s: "+", l: "Engineers" },
              { v: 38, s: "", l: "Trainees graduated" },
              { v: 240, s: "+", l: "Projects shipped" },
              { v: 12, s: "M", l: "Lines of code" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <GlowCard className="text-center">
                  <div className="text-4xl md:text-5xl font-semibold gradient-text">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Why Hot Beans"
              title={<>A studio engineered for <span className="gradient-text">growth</span>.</>}
              subtitle="We don't run a 'graduate scheme'. We build careers — through real ownership, deep mentorship, and the freedom to ship."
            />
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <GlowCard>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "var(--gradient-primary)" }}>
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              center
              eyebrow="Tech stack"
              title={<>The tools we <span className="gradient-text">live</span> in.</>}
              subtitle="Modern, type-safe, edge-native — and yours to master from day one."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {TECHS.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <div className="aspect-square rounded-2xl glass gradient-border flex flex-col items-center justify-center gap-2 hover-lift group">
                  <t.icon className="h-7 w-7 text-muted-foreground group-hover:text-foreground transition" />
                  <span className="text-xs text-muted-foreground">{t.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Our journey"
              title={<>Eight years of <span className="gradient-text">building forward</span>.</>}
            />
          </Reveal>
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, transparent, var(--neon-purple), var(--neon-blue), transparent)" }} />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 100}>
                  <div className={`relative flex md:items-center md:gap-8 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                    <div className="hidden md:block flex-1" />
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full neon-glow"
                      style={{ background: "var(--neon-purple)" }} />
                    <div className="ml-12 md:ml-0 flex-1">
                      <GlowCard>
                        <div className="text-xs gradient-text font-mono">{t.year}</div>
                        <div className="mt-1 font-semibold text-lg">{t.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
                      </GlowCard>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading center eyebrow="Voices" title={<>Loved by the <span className="gradient-text">people</span> who built it.</>} />
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <GlowCard>
                  <Quote className="h-6 w-6 mb-4" style={{ color: "var(--neon-cyan)" }} />
                  <p className="text-foreground/90 leading-relaxed">{t.quote}</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass-strong gradient-border p-10 md:p-16 text-center">
              <div className="absolute inset-0 -z-10 aurora-bg opacity-60" />
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
                Your career, <span className="gradient-text">accelerated</span>.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Applications for the 2026 trainee cohort close in six weeks. Join us.
              </p>
              <Link to="/apply"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-medium text-primary-foreground neon-glow"
                style={{ background: "var(--gradient-primary)" }}>
                Start your application <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
