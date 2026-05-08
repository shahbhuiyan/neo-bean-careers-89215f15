import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Coffee, Globe2, Award } from "lucide-react";
import workspace from "@/assets/workspace.jpg";
import { Counter, GlowCard, Reveal, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hot Beans Web" },
      { name: "description", content: "The story, mission and culture behind Hot Beans Web — a London studio shaping the future of digital products." },
      { property: "og:title", content: "About Hot Beans Web" },
      { property: "og:description", content: "Founded in 2018, we're a 120-person studio investing in the next generation of developers." },
    ],
  }),
  component: About,
});

const VALUES = [
  { icon: Target, title: "Mission", desc: "Empower the next generation of web craftspeople with real-world work and world-class mentorship." },
  { icon: Eye, title: "Vision", desc: "A web that's faster, more accessible, more delightful — built by the most diverse engineering community in the UK." },
  { icon: Heart, title: "Values", desc: "Craft, curiosity, kindness. We optimise for the long game — for our clients, our team, and the web itself." },
];

const CULTURE = [
  { icon: Coffee, title: "Async-first", desc: "Deep work over meetings. Outcomes over hours." },
  { icon: Globe2, title: "Hybrid by design", desc: "Two days in our Shoreditch HQ, three wherever you do your best work." },
  { icon: Award, title: "Learning budget", desc: "£1,500/year for courses, conferences and books." },
];

function About() {
  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              About us
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1]">
              We're a studio of <span className="gradient-text">makers</span>, mentors & misfits.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Hot Beans Web was founded in 2018 above a coffee shop in Shoreditch. Eight years
              later we ship for some of the UK's most ambitious brands — and we still grind our own beans.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative rounded-3xl overflow-hidden gradient-border neon-glow">
              <img src={workspace} alt="Our office" className="w-full h-full object-cover" loading="lazy" width={1600} height={1024} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <GlowCard>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "var(--gradient-primary)" }}>
                    <v.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{v.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><SectionHeading eyebrow="Numbers" title={<>By the <span className="gradient-text">numbers</span>.</>} /></Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: 8, s: "yrs", l: "Building the web" },
              { v: 120, s: "+", l: "Engineers & designers" },
              { v: 14, s: "", l: "Industry awards" },
              { v: 98, s: "%", l: "Trainee retention" },
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

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading eyebrow="Culture" title={<>The way we <span className="gradient-text">work</span>.</>} />
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {CULTURE.map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <GlowCard>
                  <c.icon className="h-7 w-7 mb-4" style={{ color: "var(--neon-cyan)" }} />
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
