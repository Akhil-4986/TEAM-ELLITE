import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Shield, Zap,
  MapPin, User, IndianRupee, Brain, Loader2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

type Step = 1 | 2 | 3 | 4 | 5;

const platforms = [
  { id: "zomato", label: "Zomato", icon: "🍕", color: "border-red-300 bg-red-50" },
  { id: "swiggy", label: "Swiggy", icon: "🛵", color: "border-orange-300 bg-orange-50" },
  { id: "zepto", label: "Zepto", icon: "⚡", color: "border-purple-300 bg-purple-50" },
  { id: "amazon", label: "Amazon Flex", icon: "📦", color: "border-yellow-300 bg-yellow-50" },
  { id: "blinkit", label: "Blinkit", icon: "🛍️", color: "border-green-300 bg-green-50" },
  { id: "flipkart", label: "Flipkart", icon: "🏬", color: "border-blue-300 bg-blue-50" },
];

const zones = [
  { city: "Mumbai", zones: ["Zone 1 – Andheri/Bandra", "Zone 2 – Dadar/Worli", "Zone 3 – Thane", "Zone 4 – Navi Mumbai"] },
  { city: "Delhi NCR", zones: ["Zone 1 – Central Delhi", "Zone 2 – Noida/Greater Noida", "Zone 3 – Gurgaon", "Zone 4 – Faridabad"] },
  { city: "Bengaluru", zones: ["Zone 1 – Koramangala", "Zone 2 – HSR/BTM", "Zone 3 – Whitefield", "Zone 4 – Electronic City"] },
  { city: "Hyderabad", zones: ["Zone 1 – Hitech City", "Zone 2 – Jubilee Hills", "Zone 3 – Secunderabad"] },
];

const allZones = zones.flatMap((c) => c.zones.map((z) => `${c.city} · ${z}`));

function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {([1, 2, 3, 4, 5] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              s < step ? "bg-success text-white" :
              s === step ? "bg-secondary text-white ring-4 ring-secondary/25" :
              "bg-muted text-muted-foreground"
            }`}
          >
            {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
          </div>
          {i < 4 && <div className={`w-12 h-0.5 transition-colors duration-300 ${s < step ? "bg-success" : "bg-muted"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState<Step>(1);
  const [platform, setPlatform] = useState("");
  const [zone, setZone] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("8");
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Derived AI premium
  const basePremium: Record<string, number> = { basic: 29, pro: 67, elite: 89 };
  const zoneMultiplier = zone.includes("Delhi") ? 1.32 : zone.includes("Mumbai") ? 1.18 : zone.includes("Hyderabad") ? 0.92 : 1.0;
  const hoursMultiplier = parseInt(hours) > 10 ? 1.1 : parseInt(hours) < 6 ? 0.9 : 1.0;
  const aiPremium = Math.round(basePremium[plan] * zoneMultiplier * hoursMultiplier);
  const riskScore = Math.min(95, Math.round(50 * zoneMultiplier * hoursMultiplier));

  const next = () => setStep((s) => Math.min(5, s + 1) as Step);
  const back = () => setStep((s) => Math.max(1, s - 1) as Step);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 flex items-start justify-center py-12 px-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Shield className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                  GigShield Enrollment
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {step === 1 && "Choose Your Platform"}
                {step === 2 && "Your Delivery Zone"}
                {step === 3 && "Your Profile"}
                {step === 4 && "Pick Your Shield Plan"}
                {step === 5 && "Confirm & Activate"}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                {step === 1 && "Select the platform you primarily deliver for"}
                {step === 2 && "Your zone determines your risk profile and premium"}
                {step === 3 && "We use this to personalise your coverage"}
                {step === 4 && "AI-adjusted weekly pricing based on your profile"}
                {step === 5 && "Review your policy and activate weekly cover"}
              </p>
            </div>

            <ProgressBar step={step} />

            {/* Card */}
            <div className="bg-card rounded-2xl border border-border card-shadow p-8">

              {/* Step 1 — Platform */}
              {step === 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`rounded-xl p-4 border-2 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        platform === p.id
                          ? "border-secondary ring-2 ring-secondary/25 " + p.color
                          : "border-border hover:border-secondary/40 " + p.color
                      }`}
                    >
                      <div className="text-2xl mb-2">{p.icon}</div>
                      <div className="text-sm font-semibold text-foreground">{p.label}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 — Zone */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/60 border border-border">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Select your primary delivery zone</span>
                  </div>
                  <div className="grid gap-2 max-h-72 overflow-y-auto pr-1">
                    {allZones.map((z) => (
                      <button
                        key={z}
                        onClick={() => setZone(z)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                          zone === z
                            ? "border-secondary bg-secondary/10 text-secondary"
                            : "border-border hover:border-secondary/40 text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {z}
                          {zone === z && <CheckCircle2 className="w-4 h-4 text-secondary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Profile */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Full Name</Label>
                      <Input
                        className="mt-1.5"
                        placeholder="e.g. Rahul Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Mobile Number</Label>
                      <Input
                        className="mt-1.5"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Avg. Daily Working Hours</Label>
                    <div className="flex gap-2 mt-1.5">
                      {["4", "6", "8", "10", "12"].map((h) => (
                        <button
                          key={h}
                          onClick={() => setHours(h)}
                          className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150 ${
                            hours === h
                              ? "border-secondary bg-secondary/10 text-secondary"
                              : "border-border hover:border-secondary/40 text-muted-foreground"
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/60 border border-border">
                    <Brain className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Our AI uses your working hours and zone history to build a personalised risk score — affecting your weekly premium by ±15%.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4 — Plan */}
              {step === 4 && (
                <div className="space-y-4">
                  {/* AI Risk Score */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/10 border border-secondary/20 mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">AI Risk Score</div>
                        <div className="text-xs text-muted-foreground">{zone || "Zone not selected"}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-display font-bold text-secondary">{riskScore}</div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                  </div>

                  {[
                    { id: "basic", name: "Basic Shield", base: 29, adjusted: Math.round(29 * zoneMultiplier * hoursMultiplier), payout: "₹700", types: 1 },
                    { id: "pro", name: "Pro Shield", base: 67, adjusted: Math.round(67 * zoneMultiplier * hoursMultiplier), payout: "₹1,200", types: 4 },
                    { id: "elite", name: "Elite Shield", base: 89, adjusted: Math.round(89 * zoneMultiplier * hoursMultiplier), payout: "₹1,500", types: 4 },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        plan === p.id
                          ? "border-secondary bg-secondary/8"
                          : "border-border hover:border-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">{p.name}</span>
                            {p.id === "pro" && (
                              <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                                RECOMMENDED
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Max payout {p.payout}/event · {p.types === 4 ? "All disruption types" : "1 disruption type"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">₹{p.adjusted}</div>
                          <div className="text-xs text-muted-foreground">/week (AI-adjusted)</div>
                          {p.adjusted !== p.base && (
                            <div className="text-[10px] text-muted-foreground line-through">₹{p.base} base</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 5 — Confirm */}
              {step === 5 && (
                <div className="space-y-5">
                  {/* Summary */}
                  <div className="rounded-xl bg-muted/60 border border-border p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground font-display">Policy Summary</h3>
                    {[
                      { label: "Name", value: name || "—" },
                      { label: "Phone", value: phone || "—" },
                      { label: "Platform", value: platforms.find((p) => p.id === platform)?.label || "—" },
                      { label: "Zone", value: zone || "—" },
                      { label: "Daily Hours", value: `${hours} hours` },
                      { label: "Plan", value: `${plan === "basic" ? "Basic" : plan === "pro" ? "Pro" : "Elite"} Shield` },
                      { label: "AI-Adjusted Premium", value: `₹${aiPremium} / week` },
                      { label: "Max Payout / Event", value: plan === "basic" ? "₹700" : plan === "pro" ? "₹1,200" : "₹1,500" },
                      { label: "Policy Start", value: "This Monday" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-success/8 border border-success/20">
                    <Zap className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      Your policy will auto-activate each Monday. All disruption payouts are fully automated — no claim filing needed.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={back} className="gap-2 flex-shrink-0">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                {step < 5 ? (
                  <Button
                    onClick={next}
                    disabled={(step === 1 && !platform) || (step === 2 && !zone) || (step === 3 && (!name || !phone))}
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2 disabled:opacity-50"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submit}
                    disabled={loading}
                    className="flex-1 bg-gradient-accent hover:opacity-90 text-white font-bold gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Activating Shield…
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Activate My GigShield
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
              {["AI-verified premiums", "Cancel anytime", "Instant UPI payouts", "Zero paperwork"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
