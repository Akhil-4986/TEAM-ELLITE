import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Shield, Zap, CloudRain, Wind, AlertTriangle, CheckCircle2,
  ArrowRight, Star, TrendingUp, Users, IndianRupee, Clock,
  Smartphone, BarChart2, Lock, ChevronRight, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import DisruptionMonitor from "@/components/DisruptionMonitor";

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Section wrapper with reveal ── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-sm"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${color}`}>{icon}</div>
      <div className="text-2xl font-display font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground text-center leading-snug">{label}</div>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, body, delay }: { icon: React.ReactNode; title: string; body: string; delay: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all duration-500 group cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-base font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

/* ── Step ── */
function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-sm font-display font-bold text-white shadow-lg">
        {num}
      </div>
      <div className="pt-1">
        <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* ── Testimonial ── */
function Testimonial({ quote, name, platform, earnings }: { quote: string; name: string; platform: string; earnings: string }) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border card-shadow">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />)}
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-4">"{quote}"</p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{platform}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Protected this month</div>
          <div className="text-sm font-bold text-success">{earnings}</div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ───────────── HERO ───────────── */}
      <section className="bg-hero relative overflow-hidden pt-16">
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 mb-6 animate-fade-in">
                <Zap className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  Parametric Insurance · Zero Paperwork
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-[1.05] animate-fade-up" style={{ animationDelay: "100ms" }}>
                Your Income,{" "}
                <span className="text-gradient-hero">Protected</span>{" "}
                Against Every Storm
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "200ms" }}>
                GigShield is India's first AI-powered parametric income insurance for Zomato, Swiggy, Zepto & Amazon delivery partners. When weather or disruptions strike, payouts happen <strong className="text-white/90">automatically</strong> — no claim needed.
              </p>

              <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
                <Link to="/onboarding">
                  <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-white font-bold shadow-xl px-8 gap-2 transition-all duration-200 active:scale-95">
                    Get Weekly Cover
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 gap-2 border border-white/20">
                    <Play className="w-4 h-4" />
                    See How It Works
                  </Button>
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 mt-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
                <div className="flex -space-x-2">
                  {["SK", "PR", "AM", "DK", "NV"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-[10px] font-bold text-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">47,200+ workers protected</div>
                  <div className="text-white/50 text-xs">₹3.8Cr paid out this month</div>
                </div>
              </div>
            </div>

            {/* Right — Live monitor widget */}
            <div className="animate-fade-up lg:animate-none" style={{ animationDelay: "300ms" }}>
              <div className="animate-float">
                <DisruptionMonitor />
              </div>

              {/* Mini stats row */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Avg payout", value: "₹847", sub: "per event" },
                  { label: "Payout time", value: "< 4h", sub: "automated" },
                  { label: "This week", value: "3 active", sub: "disruptions" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10 text-center">
                    <div className="text-lg font-display font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-white/60">{s.label}</div>
                    <div className="text-[10px] text-secondary font-medium">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* ───────────── PLATFORMS ───────────── */}
      <section className="py-10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
              Coverage for delivery partners across
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {["Zomato", "Swiggy", "Zepto", "Amazon Flex", "Blinkit", "Dunzo", "Flipkart"].map((p) => (
                <div key={p} className="px-5 py-2.5 rounded-xl bg-muted border border-border text-sm font-semibold text-muted-foreground hover:border-secondary hover:text-secondary transition-colors duration-200 cursor-default">
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="bg-primary rounded-3xl overflow-hidden card-shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
              <StatCard
                icon={<Users className="w-5 h-5 text-secondary" />}
                value="47,200+"
                label="Workers Protected"
                color="bg-secondary/20"
              />
              <StatCard
                icon={<IndianRupee className="w-5 h-5 text-accent" />}
                value="₹3.8 Cr"
                label="Paid This Month"
                color="bg-accent/20"
              />
              <StatCard
                icon={<Clock className="w-5 h-5 text-success" />}
                value="< 4 hrs"
                label="Avg Payout Time"
                color="bg-success/20"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-secondary" />}
                value="98.4%"
                label="Auto-Claim Rate"
                color="bg-secondary/20"
              />
            </div>
            {/* Inset text */}
            <div className="px-6 py-4 border-t border-white/10 text-center">
              <p className="text-sm text-white/60">
                Protecting <span className="text-white font-semibold">Mumbai, Delhi, Bengaluru, Hyderabad</span> &amp; 12 more cities
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────── COVERAGE ───────────── */}
      <section id="coverage" className="py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                What We Cover
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Parametric triggers automatically activate when disruptions exceed defined thresholds — no forms, no delays.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <CloudRain className="w-6 h-6 text-info" />,
                title: "Heavy Rainfall",
                body: "Triggers when rainfall >50mm/hr. Covers lost delivery hours during monsoon disruptions.",
                trigger: "> 50mm/hr",
                color: "bg-info/10 text-info border-info/20",
              },
              {
                icon: <Wind className="w-6 h-6 text-warning" />,
                title: "Severe Pollution",
                body: "AQI above 300 activates automatic income protection for all affected zones.",
                trigger: "AQI > 300",
                color: "bg-warning/10 text-warning border-warning/20",
              },
              {
                icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
                title: "Zone Closures",
                body: "Unplanned curfews, strikes, or sudden delivery zone shutdowns trigger instant cover.",
                trigger: "Official notice",
                color: "bg-destructive/10 text-destructive border-destructive/20",
              },
              {
                icon: <Smartphone className="w-6 h-6 text-secondary" />,
                title: "Platform Outages",
                body: "Extended app downtime >3 hours activates coverage for lost earning opportunity.",
                trigger: "> 3 hr downtime",
                color: "bg-secondary/10 text-secondary border-secondary/20",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="bg-card rounded-2xl p-6 border border-border card-shadow h-full hover:card-shadow-hover transition-all duration-300 group cursor-default">
                  <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-4 border ${c.color} group-hover:scale-110 transition-transform duration-300`}>
                    {c.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.body}</p>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-secondary" />
                    <span className="text-xs font-semibold text-secondary">Auto-trigger: {c.trigger}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-6 p-4 rounded-xl bg-destructive/8 border border-destructive/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Exclusions:</strong> Health, life, accidents, vehicle repairs, and personal property damage are strictly excluded. GigShield covers <em>income loss only</em>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FEATURES ───────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                AI-First Architecture
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every component is powered by intelligent automation — from dynamic pricing to fraud prevention.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 text-secondary" />,
                title: "Dynamic Weekly Premiums",
                body: "ML model adjusts your ₹29–₹89/week price based on zone history, platform type, and real-time weather forecasts.",
                delay: 0,
              },
              {
                icon: <Zap className="w-6 h-6 text-accent" />,
                title: "Zero-Touch Claims",
                body: "When a parametric trigger fires, GigShield automatically verifies, approves, and initiates your payout — no forms, no calls.",
                delay: 80,
              },
              {
                icon: <Lock className="w-6 h-6 text-success" />,
                title: "AI Fraud Detection",
                body: "GPS validation, activity cross-checking, and anomaly detection prevent duplicate and false claims in real time.",
                delay: 160,
              },
              {
                icon: <BarChart2 className="w-6 h-6 text-info" />,
                title: "Insurer Analytics",
                body: "Predictive dashboards show loss ratios, next-week disruption probability, and zone-level risk heat maps.",
                delay: 0,
              },
              {
                icon: <IndianRupee className="w-6 h-6 text-warning" />,
                title: "Instant UPI Payouts",
                body: "Lost wages credited directly to your UPI/bank account within 4 hours of trigger confirmation — same day.",
                delay: 80,
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Hyper-Local Risk Profiling",
                body: "Each worker gets a personalised risk score based on delivery zone, historical disruption frequency, and working hours.",
                delay: 160,
              },
            ].map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} delay={f.delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section id="how-it-works" className="py-16 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                How GigShield Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                3 minutes to enroll. Completely automatic from there.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-7">
              {[
                {
                  num: "1",
                  title: "Quick Onboarding (3 min)",
                  body: "Enter your platform, delivery zone, and typical working hours. Our AI builds your risk profile instantly.",
                },
                {
                  num: "2",
                  title: "Weekly Policy Activated",
                  body: "Pay ₹29–₹89/week (adjusted weekly by AI). Policy auto-renews each Monday aligned with your payout cycle.",
                },
                {
                  num: "3",
                  title: "Disruption Triggers Auto-Detected",
                  body: "GigShield monitors 6 real-time APIs continuously — weather, AQI, government orders, platform status.",
                },
                {
                  num: "4",
                  title: "Payout Lands in Your Account",
                  body: "Once verified, lost income credit hits your UPI within 4 hours. Check status on your dashboard.",
                },
              ].map((s) => (
                <Reveal key={s.num} delay={parseInt(s.num) * 80}>
                  <Step {...s} />
                </Reveal>
              ))}
            </div>

            {/* Premium calculator preview */}
            <Reveal delay={200}>
              <div className="bg-card rounded-2xl border border-border card-shadow p-6">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold text-foreground font-display">Weekly Premium Preview</span>
                </div>
                <div className="space-y-3">
                  {[
                    { platform: "Zomato — Mumbai Zone 4", risk: "High", premium: "₹67 / week", payout: "Up to ₹1,200" },
                    { platform: "Swiggy — Bengaluru Zone 2", risk: "Medium", premium: "₹44 / week", payout: "Up to ₹950" },
                    { platform: "Zepto — Delhi NCR", risk: "Very High", premium: "₹89 / week", payout: "Up to ₹1,500" },
                    { platform: "Amazon — Pune Zone 1", risk: "Low", premium: "₹29 / week", payout: "Up to ₹700" },
                  ].map((row) => (
                    <div key={row.platform} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                      <div>
                        <div className="text-sm font-medium text-foreground">{row.platform}</div>
                        <div className={`text-xs font-medium ${
                          row.risk === "Very High" ? "status-danger" :
                          row.risk === "High" ? "status-warning" :
                          row.risk === "Low" ? "status-active" : "text-muted-foreground"
                        }`}>
                          {row.risk} risk zone
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-foreground">{row.premium}</div>
                        <div className="text-xs text-muted-foreground">{row.payout}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/onboarding">
                  <Button size="sm" className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2">
                    Calculate My Premium
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── PRICING ───────────── */}
      <section id="pricing" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Simple Weekly Pricing
              </h2>
              <p className="text-muted-foreground">Aligned with your weekly payout cycle. Cancel anytime.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Basic Shield",
                price: "₹29",
                freq: "/ week",
                color: "border-border",
                cta: "Get Started",
                ctaStyle: "bg-primary",
                features: ["1 disruption type", "Up to ₹700 / event", "UPI payout", "Weekly auto-renew"],
                badge: null,
              },
              {
                name: "Pro Shield",
                price: "₹67",
                freq: "/ week",
                color: "border-secondary ring-2 ring-secondary/30",
                cta: "Most Popular",
                ctaStyle: "bg-secondary",
                features: ["All 4 disruption types", "Up to ₹1,200 / event", "UPI + Bank payout", "AI risk adjustment", "Priority payout"],
                badge: "⚡ Recommended",
              },
              {
                name: "Elite Shield",
                price: "₹89",
                freq: "/ week",
                color: "border-border",
                cta: "Get Maximum Cover",
                ctaStyle: "bg-primary",
                features: ["All disruption types", "Up to ₹1,500 / event", "All payout methods", "AI weekly re-pricing", "Fraud protection audit"],
                badge: null,
              },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`bg-card rounded-2xl border ${plan.color} p-6 card-shadow h-full flex flex-col`}>
                  {plan.badge && (
                    <div className="inline-block mb-3 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">{plan.name}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground mb-1">{plan.freq}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/onboarding">
                    <Button size="sm" className={`w-full text-white font-semibold ${plan.ctaStyle} hover:opacity-90`}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="py-16 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-display font-bold text-center text-foreground mb-8">
              Workers Who Never Missed a Payment
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                quote: "During last monsoon the app trigger fired automatically. ₹1,100 in my account before I could even call anyone. Unbelievable.",
                name: "Santosh Kumar",
                platform: "Zomato · Mumbai",
                earnings: "₹3,400 protected",
              },
              {
                quote: "Delhi AQI went to 420 and I got notified within minutes. The payout covered my whole day's earnings. Best ₹67 I ever spent.",
                name: "Priya Rathore",
                platform: "Zepto · Delhi NCR",
                earnings: "₹4,800 protected",
              },
              {
                quote: "The AI reduced my premium by ₹12 this week because my zone had fewer disruptions. It actually rewards good zones!",
                name: "Arjun Mehta",
                platform: "Swiggy · Bengaluru",
                earnings: "₹2,100 protected",
              },
            ].map((t) => (
              <Reveal key={t.name} delay={100}>
                <Testimonial {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <div className="bg-hero rounded-3xl p-10 relative overflow-hidden card-shadow-lg">
              <div className="absolute inset-0 bg-secondary/5 pointer-events-none" />
              <Shield className="w-12 h-12 text-secondary mx-auto mb-4 animate-float" />
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Start Your Weekly Shield Today
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                3 minutes to set up. Automatic protection every week. Cancel whenever.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-white font-bold gap-2 shadow-xl active:scale-95 transition-all duration-200">
                    Get Protected Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="font-display font-bold text-white">Gig<span className="text-secondary">Shield</span></span>
              <span className="text-white/30 text-xs ml-2">by Team Elite Five · Guidewire DEVTrails 2026</span>
            </div>
            <div className="flex gap-6 text-xs text-white/50">
              <span>Coverage: Income loss only</span>
              <span>Weekly pricing model</span>
              <span>AI-parametric</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
