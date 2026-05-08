import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, MapPin, PoundSterling, Clock, ChevronDown, GraduationCap, Heart, Home, TrendingUp, BookOpen, Code2, Layers, Palette, ExternalLink } from "lucide-react";
import { GlowCard, Reveal, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Hot Beans Web" },
      { name: "description", content: "Open roles, salary bands, benefits and our hiring process at Hot Beans Web." },
      { property: "og:title", content: "Careers at Hot Beans Web" },
      { property: "og:description", content: "Junior, front-end, full-stack and UI/UX roles open now." },
    ],
  }),
  component: Careers,
});

const JOBS = [
  {
    icon: Code2, title: "Junior Web Developer", type: "Full-time · Hybrid", location: "London", salary: "£28k–£34k",
    summary: "Build and maintain client-facing websites alongside a senior mentor.",
    quals: ["BTEC L3 in Computing or equivalent", "Working knowledge of HTML, CSS, JavaScript", "A portfolio of personal projects (GitHub or live)", "Strong written communication"],
    responsibilities: ["Ship features under code review", "Write tests and documentation", "Pair with seniors weekly", "Contribute to our design system"],
  },
  {
    icon: Layers, title: "Front-End Developer", type: "Full-time · Hybrid", location: "London / Manchester", salary: "£42k–£55k",
    summary: "Lead the front-end on flagship client projects with React, TypeScript and modern tooling.",
    quals: ["2+ years professional experience", "Deep React + TypeScript", "Accessibility & performance mindset", "Design system experience"],
    responsibilities: ["Architect front-end solutions", "Mentor junior trainees", "Drive performance & a11y standards", "Liaise with design"],
  },
  {
    icon: Palette, title: "UI/UX Designer", type: "Full-time · Hybrid", location: "London", salary: "£40k–£52k",
    summary: "Design beautiful, accessible product experiences from research through to handoff.",
    quals: ["Strong Figma portfolio", "Design systems thinking", "Light front-end coding ability", "Research & user-testing experience"],
    responsibilities: ["Own end-to-end design", "Build & maintain design system", "Run usability sessions", "Prototype interactions"],
  },
  {
    icon: Briefcase, title: "Full-Stack Developer", type: "Full-time · Remote-friendly", location: "UK", salary: "£55k–£72k",
    summary: "Own features end-to-end across our TypeScript stack — from edge functions to UI.",
    quals: ["3+ years building production apps", "TypeScript, React, Node", "Postgres / SQL", "CI/CD experience"],
    responsibilities: ["Lead delivery of major features", "Set technical direction", "Mentor across stack", "Improve our infra"],
  },
];

const BENEFITS = [
  { icon: PoundSterling, title: "Competitive salary", desc: "Plus bi-annual reviews and performance bonuses." },
  { icon: Home, title: "Hybrid working", desc: "2 days in our Shoreditch HQ, 3 anywhere." },
  { icon: BookOpen, title: "£1,500 learning budget", desc: "Books, courses, conferences — all yours." },
  { icon: Heart, title: "Private healthcare", desc: "Vitality plan including mental health support." },
  { icon: TrendingUp, title: "Equity options", desc: "Share in the upside of what we build." },
  { icon: GraduationCap, title: "Mentor programme", desc: "Weekly 1:1s with a senior engineer." },
];

const PROCESS = [
  { step: "01", title: "Apply online", desc: "Submit our short application form — takes 5 minutes." },
  { step: "02", title: "Intro call", desc: "30-min friendly chat with our talent team." },
  { step: "03", title: "Technical pair", desc: "90-min collaborative coding session — no whiteboarding." },
  { step: "04", title: "Team meet", desc: "Coffee with two future teammates and a director." },
  { step: "05", title: "Offer", desc: "Decision within 48 hours. Start within 4 weeks." },
];

const COURSES = [
  { title: "freeCodeCamp · Responsive Web Design", desc: "Free 300hr HTML & CSS curriculum.", url: "https://www.freecodecamp.org/learn" },
  { title: "MDN Web Docs", desc: "The web platform, documented properly.", url: "https://developer.mozilla.org/" },
  { title: "The Odin Project", desc: "Full-stack JavaScript path.", url: "https://www.theodinproject.com/" },
  { title: "JavaScript.info", desc: "The modern JavaScript tutorial.", url: "https://javascript.info/" },
  { title: "React Official Docs", desc: "Build with the framework we use daily.", url: "https://react.dev/learn" },
  { title: "Refactoring UI", desc: "Design tips for developers.", url: "https://www.refactoringui.com/" },
];

function JobAccordion({ job, idx, open, setOpen }: { job: typeof JOBS[number]; idx: number; open: number | null; setOpen: (n: number | null) => void }) {
  const isOpen = open === idx;
  const Icon = job.icon;
  return (
    <GlowCard className="!p-0 overflow-hidden">
      <button
        onClick={() => setOpen(isOpen ? null : idx)}
        className="w-full text-left p-6 flex items-start gap-4"
      >
        <div className="h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <ChevronDown className={`h-5 w-5 transition ${isOpen ? "rotate-180" : ""}`} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="inline-flex items-center gap-1 gradient-text font-medium"><PoundSterling className="h-3.5 w-3.5" />{job.salary}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
        </div>
      </button>
      <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-6 grid md:grid-cols-2 gap-6 border-t border-border pt-5">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] gradient-text mb-3">Required qualifications</div>
              <ul className="space-y-2 text-sm">
                {job.quals.map((q) => (
                  <li key={q} className="flex gap-2 text-muted-foreground">
                    <span className="mt-1 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--neon-cyan)" }} /> {q}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] gradient-text mb-3">What you'll do</div>
              <ul className="space-y-2 text-sm">
                {job.responsibilities.map((q) => (
                  <li key={q} className="flex gap-2 text-muted-foreground">
                    <span className="mt-1 h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--neon-purple)" }} /> {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-primary-foreground neon-glow"
                style={{ background: "var(--gradient-primary)" }}>
                Apply for this role →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function Careers() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Careers"
              title={<>Open roles. Real <span className="gradient-text">growth</span>.</>}
              subtitle="From trainee to tech lead — every role at Hot Beans Web comes with mentorship, equity and the freedom to ship."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-12">
        <div className="mx-auto max-w-5xl px-6 space-y-4">
          {JOBS.map((j, i) => (
            <Reveal key={j.title} delay={i * 80}>
              <JobAccordion job={j} idx={i} open={open} setOpen={setOpen} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><SectionHeading eyebrow="Benefits" title={<>What you get on <span className="gradient-text">day one</span>.</>} /></Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <GlowCard>
                  <b.icon className="h-7 w-7 mb-4" style={{ color: "var(--neon-cyan)" }} />
                  <h3 className="font-semibold text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><SectionHeading eyebrow="Hiring process" title={<>Five steps. <span className="gradient-text">Two weeks</span>.</>} /></Reveal>
          <div className="mt-14 grid md:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <GlowCard className="h-full">
                  <div className="text-3xl font-semibold gradient-text font-mono">{p.step}</div>
                  <div className="mt-2 font-semibold">{p.title}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{p.desc}</div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Free learning resources"
              title={<>Level up <span className="gradient-text">before you apply</span>.</>}
              subtitle="A curated set of free resources we genuinely recommend to every applicant."
            />
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <a href={c.url} target="_blank" rel="noreferrer" className="block">
                  <GlowCard className="h-full">
                    <div className="flex items-start justify-between">
                      <Clock className="h-6 w-6" style={{ color: "var(--neon-cyan)" }} />
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  </GlowCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
