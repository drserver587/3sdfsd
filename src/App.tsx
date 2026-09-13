import { useState, useEffect, useRef } from "react";
import logo from "@/imports/Planet_Arcadia__1_21-1.png";

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ── Intersection observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080808]/95 backdrop-blur border-b border-[#222]" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="w-[40px] h-[40px] rounded-full bg-[#c8f04d] inline-flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src={logo} alt="Rinayra logo" className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
          </span>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-lg font-bold text-white tracking-tight">
            Rinayra
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#888]">
          {["About", "How It Works", "Values", "FAQ", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c8f04d] text-[#080808] text-sm font-semibold hover:bg-white transition-colors"
        >
          Let&apos;s Talk
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-[#222] px-6 py-5 flex flex-col gap-4">
          {["About", "How It Works", "Values", "FAQ", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setMenuOpen(false)} className="text-sm text-[#888] hover:text-white">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-2.5 rounded-full bg-[#c8f04d] text-[#080808] text-sm font-semibold text-center">
            Let&apos;s Talk
          </a>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Badge */}
      <div className="mb-10 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#333] text-xs text-[#888] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f04d] animate-pulse" />
          New team. Fresh eyes. Real solutions.
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-tight text-white mb-8 fade-up"
      >
        We listen<br />
        <em
          className="not-italic"
          style={{ WebkitTextStroke: "1px #c8f04d", color: "transparent" }}
        >
          then we build
        </em>
        <br />
        for you.
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-end gap-8 justify-between">
        <p className="max-w-md text-base text-white leading-relaxed font-light">
          Rinayra sits with you, learns your workflow, finds the friction and codes a custom solution. No upfront cost. You pay only if it genuinely helps.
        </p>
        <div className="flex items-center gap-4 flex-shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#c8f04d] text-[#080808] text-sm font-bold hover:bg-white transition-colors"
          >
            Start a conversation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works" className="text-sm text-white hover:text-white transition-colors underline underline-offset-4">
            How it works
          </a>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mt-16 pt-8 border-t border-[#1e1e1e] grid grid-cols-2 sm:grid-cols-3 gap-8">
        {[
          { value: "$0", label: "Upfront cost to you", suffix: "" },
          { value: "100", label: "Pay only if it helps", suffix: "%" },
          { value: "24", label: "Avg. response time (hrs)", suffix: "h" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-bold text-white">
              {s.value}<span className="text-[#c8f04d]">{s.suffix}</span>
            </div>
            <div className="text-xs text-white mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Marquee ── */
const MARQUEE_ITEMS = [
  "Custom Software", "Workflow Automation", "No Upfront Cost", "Relationship First",
  "Team Tools", "Process Gaps", "Tailored Solutions", "We Learn What You Need",
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="border-y border-[#1e1e1e] py-5 overflow-hidden bg-[#080808]">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span className="text-sm font-medium text-[#888] tracking-wide uppercase">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f04d] flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8f04d] font-medium mb-6">We are Rinayra</p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-4xl lg:text-5xl font-bold leading-tight text-white"
          >
            A new team
            <br />
            with no assumptions
            <br />
            <span className="bg-[#c8f04d] text-[#080808] px-2 inline-block">and real curiosity.</span>
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="text-white leading-relaxed font-light text-base border-none">
            We started Rinayra because we noticed that most software companies arrive
            with a pitch before they understand the problem. We do the opposite we show up with questions.
          </p>
          <p className="text-white leading-relaxed font-light text-base">
            We don&apos;t have a fixed technology stack or a preferred solution we are trying to sell you.
            We are a small, adaptive team that learns what each problem needs us to learn.
            That flexibility is the point.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-4">
            {[
              { label: "Conversation first", sub: "No pitches, no decks, just listening." },
              { label: "Adaptable stack", sub: "We learn whatever your solution needs." },
              { label: "Zero risk to you", sub: "Build, ship, use pay only if useful." },
              { label: "Long-term focus", sub: "Referrals matter more than quick revenue." },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border border-[#1e1e1e] bg-[#111] hover:border-[#c8f04d]/30 transition-colors">
                <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                <div className="text-xs text-white leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Tell us about your day",
      body: "A relaxed call no agenda, no sales script. Walk us through how your team works, what slows you down, what you wish existed. We ask questions and we listen.",
    },
    {
      num: "02",
      title: "We find the gap",
      body: "After talking, we reflect on what we heard and identify the biggest friction points places where a simple software tool could save real time or reduce real headaches.",
    },
    {
      num: "03",
      title: "We build the solution",
      body: "We design and develop a custom tool tailored exactly to your workflow. We learn whatever we need to. Your problem drives our learning, not the other way around.",
    },
    {
      num: "04",
      title: "You use it, risk-free",
      body: "We ship it to you at no upfront cost. Use it in your actual work. We stay available for tweaks, fixes, and improvements throughout.",
    },
    {
      num: "05",
      title: "Pay only if it works",
      body: "If it genuinely helps you if you can feel the difference we talk payment. If not, then zero pressure. We leave as friends. Your trust matters more.",
    },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 lg:px-10 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8f04d] font-medium mb-4">Process</p>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              How we work
              <br />
              <span className="bg-[#c8f04d] text-[#080808] px-2 inline-block">together.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white leading-relaxed font-light">
            No onboarding forms, No contracts on day one. Just a conversation that might turn into something useful.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group grid grid-cols-12 gap-6 py-8 border-b border-[#1a1a1a] hover:bg-[#0e0e0e] -mx-4 px-4 transition-colors cursor-default"
            >
              <div className="col-span-2 sm:col-span-1">
                <span style={{ fontFamily: "var(--font-display)" }} className="text-xs text-[#333] group-hover:text-[#c8f04d] transition-colors font-bold">
                  {step.num}
                </span>
              </div>
              <div className="col-span-10 sm:col-span-4">
                <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg font-bold text-white">
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-7 sm:col-start-6">
                <p className="text-sm text-white leading-relaxed font-light">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Impact metrics ── */
function Metrics() {
  const { ref, inView } = useInView(0.3);
  const clients = useCountUp(0, 1500, inView);
  const satisfaction = useCountUp(100, 1500, inView);

  return (
    <section ref={ref} className="py-28 px-6 lg:px-10 bg-[#c8f04d]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#080808]/50 font-medium mb-4">Our approach in numbers</p>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-6xl font-bold text-[#080808] leading-tight">
            Simple math.<br />You win first.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#080808]/10 divide-y sm:divide-y-0 sm:divide-x divide-[#080808]/10">
          {[
            { value: clients, suffix: "", label: "Cost to you upfront", note: "Zero. Always.", big: "$0" },
            { value: satisfaction, suffix: "%", label: "Relationship-first principle", note: "We prioritise trust over transactions", big: null },
          ].map((m, i) => (
            <div key={i} className="p-10 group hover:bg-[#080808]/5 transition-colors">
              <div style={{ fontFamily: "var(--font-display)" }} className="text-6xl lg:text-8xl font-extrabold text-[#080808] mb-3">
                {m.big ?? `${m.value}${m.suffix}`}
              </div>
              <div className="text-sm font-semibold text-[#080808] mb-1">{m.label}</div>
              <div className="text-xs text-[#080808]/50">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Values ── */
function Values() {
  const values = [
    {
      num: "01",
      title: "Relationship over revenue",
      body: "We would rather earn a client who trusts us completely than close a deal that leaves either party uneasy. Trust is the only sustainable foundation.",
    },
    {
      num: "02",
      title: "Curiosity as a skill",
      body: "We don't have a fixed stack or a preferred answer. We let the problem teach us where to begin. Adaptability is our edge.",
    },
    {
      num: "03",
      title: "Honest about our limits",
      body: "We are new. We will say that plainly. What we bring is genuine attention, honest communication, and the drive to figure things out.",
    },
    {
      num: "04",
      title: "Small problems matter too",
      body: "Not every pain is worth a six-figure contract. Sometimes it is a script or a simple form. We are happy to build those too.",
    },
  ];

  return (
    <section id="values" className="py-28 px-6 lg:px-10 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8f04d] font-medium mb-4">What drives us</p>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Design solutions
              <br />
              <span className="bg-[#c8f04d] text-[#080808] px-2 inline-block">built on real trust.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1a1a1a]">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-[#080808] p-10 group hover:bg-[#0e0e0e] transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <span style={{ fontFamily: "var(--font-display)" }} className="text-xs font-bold text-[#333] group-hover:text-[#c8f04d] transition-colors">
                  {v.num}
                </span>
                <div className="w-8 h-8 rounded-full border border-[#1e1e1e] group-hover:border-[#c8f04d]/50 transition-colors flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="#c8f04d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-white mb-3 leading-snug">
                {v.title}
              </h3>
              <p className="text-sm text-white leading-relaxed font-light">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  const testimonials = [
    {
      name: "Arjun Mehra",
      role: "Operations Manager, Mehra Textiles",
      quote: "I didn't know what to expect we just talked about how we track orders. A few weeks later I had a tool that saves my team two hours every morning. No invoice until I said it was working.",
    },
    {
      name: "Priya Nambiar",
      role: "Founder, Nambiar Catering Co.",
      quote: "They listened for an hour before writing a single line of code. That alone was different from every other vendor I'd spoken to. The result felt like it came from inside our business.",
    },
    {
      name: "Sandeep Rathi",
      role: "Team Lead, Rathi Logistics",
      quote: "Honest, patient, and genuinely curious about our work. They told me upfront what they could and couldn't do. That kind of transparency is rare. We now work together regularly.",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="py-28 px-6 lg:px-10 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8f04d] font-medium mb-4">In Their Words</p>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="p-10 rounded-2xl bg-[#111] border border-[#1e1e1e] min-h-56 flex flex-col justify-between">
              <svg className="mb-6 text-[#c8f04d]" width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 2.4C11.2 3.6 8.4 6.4 7.6 10.4H13.6V24H0ZM18.4 24V14.4C18.4 6.4 23.2 1.6 32 0L32 2.4C27.2 3.6 24.4 6.4 23.6 10.4H29.6V24H18.4Z" />
              </svg>
              <p className="text-[#aaa] text-lg leading-relaxed font-light flex-1">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c8f04d] flex items-center justify-center text-[#080808] font-bold text-sm">
                  {testimonials[active].name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonials[active].name}</div>
                  <div className="text-xs text-white">{testimonials[active].role}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-xl border transition-all ${active === i ? "border-[#c8f04d]/50 bg-[#111]" : "border-[#1a1a1a] hover:border-[#2a2a2a]"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center text-xs font-bold text-[#c8f04d]">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-[#444]">{t.role.split(",")[0]}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q: "Do you really ship with no upfront cost?", a: "Yes. We build and deploy the solution at our own cost. You use it. If it helps, we discuss payment. If it doesn't, there is no invoice." },
  { q: "What if you can't solve my problem?", a: "We will tell you plainly and early. We don't take on problems we can't figure out just to collect a fee. Honesty protects both of us." },
  { q: "What kind of businesses do you work with?", a: "Anyone with a repeatable workflow that has friction small businesses, solo operators, team leads in larger organisations. Industry doesn't matter, the problem does." },
  { q: "What technology do you use?", a: "Whatever your problem calls for. We have no stack religion. Web apps, automations, dashboards, internal tools we learn what the job needs." },
  { q: "How long does it take?", a: "Depends entirely on complexity. Simple automations can be ready in days. Larger tools take a few weeks. We share a realistic estimate after the first conversation." },
  { q: "What happens after I start using the product?", a: "We stay available. We fix bugs, take feedback, and make improvements. Long-term support is part of how we build relationships, not an add-on." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-6 lg:px-10 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8f04d] font-medium mb-4">FAQ</p>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Frequently<br />asked<br />questions.
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-white transition-colors underline underline-offset-4"
            >
              Ask something else →
            </a>
          </div>

          <div className="lg:col-span-8 space-y-0">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-[#1a1a1a]">
                <button
                  className="w-full flex items-center justify-between py-6 text-left gap-4 group"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-sm font-medium text-white group-hover:text-[#c8f04d] transition-colors">
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full border border-[#2a2a2a] flex items-center justify-center transition-all ${open === i ? "bg-[#c8f04d] border-[#c8f04d]" : "group-hover:border-[#c8f04d]/40"}`}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className={`transition-transform ${open === i ? "rotate-45" : ""}`}>
                      <path d="M5.5 1v9M1 5.5h9" stroke={open === i ? "#080808" : "#555"} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="pb-6 text-sm text-white leading-relaxed font-light pr-12">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA / Contact ── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", business: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xvkojkzp", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, business: form.business, email: form.email, message: form.message }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => res.status.toString());
        throw new Error(`${res.status}: ${body}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please email us at hello@rinayra.org.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#111] border border-[#222] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#c8f04d]/50 transition-colors font-light";

  return (
    <section id="contact" className="py-28 px-6 lg:px-10 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Big CTA headline */}
        <div className="mb-20 text-center">
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-5xl lg:text-8xl font-extrabold text-white leading-tight mb-6">
            See a problem?
            <br />
            <span className="text-[#c8f04d]">Let&apos;s solve it.</span>
          </h2>
          <p className="text-white text-base max-w-lg mx-auto font-light">
            Fill this in and we will reach out within 24 hours to find a time that works.
            Let's have a conversation.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div style={{ fontFamily: "var(--font-display)" }} className="text-6xl font-bold text-[#c8f04d] mb-4">
              Sent.
            </div>
            <p className="text-white font-light">
              We got your message and will be in touch within 24 hours.
              Looking forward to the conversation, {form.name || "friend"}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#444] mb-2 uppercase tracking-widest">Your name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Arjun Mehra" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-[#444] mb-2 uppercase tracking-widest">Business</label>
                <input name="business" value={form.business} onChange={handleChange} placeholder="Mehra Textiles" className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#444] mb-2 uppercase tracking-widest">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="arjun@mehratextiles.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[#444] mb-2 uppercase tracking-widest">Tell us about your workflow or challenge</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="We track our orders in a spreadsheet and it takes forever every evening. I think there might be a better way but I don't know what to look for..."
                className={inputClass + " resize-none"}
              />
            </div>
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#c8f04d] text-[#080808] text-sm font-bold hover:bg-white transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send, we'll be in touch within 24 hours"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#c8f04d] inline-flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={logo} alt="Rinayra logo" className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
              </span>
              <span style={{ fontFamily: "var(--font-display)" }} className="font-bold text-white">Rinayra</span>
            </div>
            <p className="text-xs text-[#444] leading-relaxed font-light">
              We listen before we build. Custom software solutions with no upfront cost.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#333] mb-4">Navigate</p>
            <div className="space-y-2">
              {["About", "How It Works", "Values", "FAQ", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="block text-xs text-[#444] hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[#333] mb-4">Get in touch</p>
            <a href="mailto:hello@rinayra.org" className="text-xs text-[#444] hover:text-[#c8f04d] transition-colors block mb-2">
              hello@rinayra.org
            </a>
            <p className="text-xs text-[#333] font-light">We reply to every message personally.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#333] font-light">© 2026 Rinayra. All conversations welcome.</p>
          <p className="text-xs text-[#2a2a2a] font-light">We listen before we build.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <div className="min-h-full bg-[#080808]">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <HowItWorks />
        <Metrics />
        <Values />

        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
