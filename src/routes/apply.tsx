import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { z } from "zod";
import { Upload, Check, Sparkles, Mail, MapPin, Phone, X } from "lucide-react";
import { GlowCard, Reveal, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply Now — Hot Beans Web" },
      { name: "description", content: "Apply for a role at Hot Beans Web. Submit your CV, skills and qualifications in 5 minutes." },
      { property: "og:title", content: "Apply to Hot Beans Web" },
      { property: "og:description", content: "Trainee, junior, mid and senior roles open across web development & design." },
    ],
  }),
  component: Apply,
});

const ROLES = ["Junior Web Developer", "Front-End Developer", "UI/UX Designer", "Full-Stack Developer", "Trainee Programme"];
const QUALS = ["BTEC Level 3 in Computing", "A-Levels", "Degree in Computer Science", "Self-taught / Bootcamp", "Other"];
const SKILLS = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue", "Node.js", "Python", "SQL", "Git", "Figma", "Tailwind", "Next.js", "Accessibility"];

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  role: z.string().min(1, "Select a role"),
  qualification: z.string().min(1, "Select a qualification"),
  skills: z.array(z.string()).min(1, "Pick at least one skill"),
  portfolio: z.string().trim().url("Must be a valid URL").max(255).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  cv: z.string().min(1, "Please attach your CV"),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs" style={{ color: "var(--neon-pink)" }}>{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl bg-[oklch(0.18_0.05_275/0.5)] border border-border px-4 py-3 text-sm outline-none transition focus:border-[var(--neon-purple)] focus:shadow-[0_0_0_3px_oklch(0.65_0.27_300/0.2)] placeholder:text-muted-foreground";

function Apply() {
  const [skills, setSkills] = useState<string[]>([]);
  const [cv, setCv] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleSkill = (s: string) =>
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const onFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, cv: "Max 5MB" }));
      return;
    }
    setCv(f);
    setErrors((e) => ({ ...e, cv: undefined }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      role: String(fd.get("role") || ""),
      qualification: String(fd.get("qualification") || ""),
      portfolio: String(fd.get("portfolio") || ""),
      message: String(fd.get("message") || ""),
      skills,
      cv: cv ? cv.name : "",
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      for (const issue of r.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative py-32">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <GlowCard className="text-center !p-12">
              <div className="mx-auto h-20 w-20 rounded-full flex items-center justify-center neon-glow"
                style={{ background: "var(--gradient-primary)" }}>
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="mt-8 text-4xl font-semibold">Application <span className="gradient-text">received</span>.</h2>
              <p className="mt-4 text-muted-foreground">
                Thanks — our talent team will review your application and get back within 5 working days.
              </p>
              <button onClick={() => { setSubmitted(false); setCv(null); setSkills([]); }}
                className="mt-8 inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm hover:bg-white/5 transition">
                Submit another
              </button>
            </GlowCard>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Apply now"
              title={<>Your <span className="gradient-text">future</span> in five minutes.</>}
              subtitle="Tell us about you. We read every application personally."
            />
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[2fr_1fr] gap-8">
          <Reveal>
            <form onSubmit={onSubmit} noValidate>
              <GlowCard className="!p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full name" error={errors.name}>
                    <input name="name" type="text" placeholder="Jane Doe" className={inputCls} />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input name="email" type="email" placeholder="jane@example.com" className={inputCls} />
                  </Field>
                  <Field label="Phone (optional)" error={errors.phone}>
                    <input name="phone" type="tel" placeholder="+44 ..." className={inputCls} />
                  </Field>
                  <Field label="Portfolio / GitHub URL" error={errors.portfolio}>
                    <input name="portfolio" type="url" placeholder="https://..." className={inputCls} />
                  </Field>
                  <Field label="Role" error={errors.role}>
                    <select name="role" className={inputCls} defaultValue="">
                      <option value="" disabled>Select a role</option>
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Highest qualification" error={errors.qualification}>
                    <select name="qualification" className={inputCls} defaultValue="">
                      <option value="" disabled>Select qualification</option>
                      {QUALS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Skills" error={errors.skills}>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((s) => {
                      const active = skills.includes(s);
                      return (
                        <button type="button" key={s} onClick={() => toggleSkill(s)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition ${
                            active ? "text-primary-foreground border-transparent neon-glow" : "border-border text-muted-foreground hover:text-foreground"
                          }`}
                          style={active ? { background: "var(--gradient-primary)" } : undefined}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="CV / Resume" error={errors.cv}>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); onFile(e.dataTransfer.files?.[0] ?? null); }}
                    onClick={() => fileRef.current?.click()}
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
                      dragOver ? "border-[var(--neon-purple)] bg-[oklch(0.65_0.27_300/0.08)]" : "border-border"
                    }`}
                  >
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
                    {cv ? (
                      <div className="flex items-center justify-center gap-3">
                        <Check className="h-5 w-5" style={{ color: "var(--neon-cyan)" }} />
                        <span className="text-sm">{cv.name}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setCv(null); }}
                          className="ml-2 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-3 text-sm">
                          <span className="gradient-text font-medium">Drop your CV</span> or click to browse
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">PDF, DOC up to 5MB</p>
                      </>
                    )}
                  </div>
                </Field>

                <Field label="Cover note (optional)" error={errors.message}>
                  <textarea name="message" rows={4} className={inputCls} placeholder="Tell us why Hot Beans Web..." />
                </Field>

                <button type="submit"
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 font-medium text-primary-foreground overflow-hidden neon-glow"
                  style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="h-4 w-4" />
                  <span>Submit application</span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }} />
                </button>
              </GlowCard>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <div className="space-y-6 lg:sticky lg:top-28 self-start">
              <GlowCard>
                <h3 className="font-semibold text-lg">Get in touch</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3"><Mail className="h-4 w-4" style={{ color: "var(--neon-cyan)" }} /> careers@hotbeansweb.io</li>
                  <li className="flex items-center gap-3"><Phone className="h-4 w-4" style={{ color: "var(--neon-cyan)" }} /> +44 (0) 20 7946 0123</li>
                  <li className="flex items-center gap-3"><MapPin className="h-4 w-4" style={{ color: "var(--neon-cyan)" }} /> Shoreditch, London</li>
                </ul>
              </GlowCard>
              <GlowCard>
                <h3 className="font-semibold text-lg">What happens next</h3>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li><span className="gradient-text font-mono">01</span> · We review (within 5 days)</li>
                  <li><span className="gradient-text font-mono">02</span> · Intro call (30 min)</li>
                  <li><span className="gradient-text font-mono">03</span> · Pair on code (90 min)</li>
                  <li><span className="gradient-text font-mono">04</span> · Team coffee</li>
                  <li><span className="gradient-text font-mono">05</span> · Offer 🎉</li>
                </ol>
              </GlowCard>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
