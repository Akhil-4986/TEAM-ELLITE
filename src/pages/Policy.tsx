import { useState } from "react";
import {
  Shield, IndianRupee, Calendar, Zap, MapPin, CheckCircle2,
  RefreshCw, AlertCircle, ChevronDown, Brain, ArrowRight, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const plans = [
  {
    id: "basic",
    name: "Basic Shield",
    price: 29,
    aiPrice: 26,
    maxPayout: "₹700",
    types: ["Heavy Rainfall"],
    badge: null,
  },
  {
    id: "pro",
    name: "Pro Shield",
    price: 67,
    aiPrice: 67,
    maxPayout: "₹1,200",
    types: ["Heavy Rainfall", "Severe AQI", "Zone Closure", "Platform Outage"],
    badge: "Current Plan",
  },
  {
    id: "elite",
    name: "Elite Shield",
    price: 89,
    aiPrice: 98,
    maxPayout: "₹1,500",
    types: ["All disruption types", "+ Priority payout", "+ Fraud audit"],
    badge: null,
  },
];

export default function Policy() {
  const [activePlan, setActivePlan] = useState("pro");
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-foreground">My Policy</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your weekly income protection coverage</p>
          </div>

          {/* Active policy banner */}
          <div className="bg-hero rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-full bg-secondary/10 blur-2xl" />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="text-secondary font-semibold">Pro Shield — Active</span>
                </div>
                <div className="text-3xl font-display font-bold text-white">₹67 <span className="text-white/60 text-base font-normal">/ week</span></div>
                <p className="text-white/60 text-sm mt-1">AI-adjusted from ₹67 base · Risk score: 73/100</p>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs mb-1">Policy Period</div>
                <div className="text-white font-semibold text-sm">Mar 17 – Mar 23, 2026</div>
                <div className="text-secondary text-xs mt-1">Auto-renews in 3 days</div>
              </div>
            </div>
          </div>

          {/* Policy Details */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div className="bg-card rounded-2xl border border-border card-shadow p-5">
              <h2 className="text-sm font-display font-semibold text-foreground mb-4">Policy Details</h2>
              <div className="space-y-3">
                {[
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: "Delivery Zone", value: "Delhi NCR · Zone 2 (Noida)" },
                  { icon: <Activity className="w-3.5 h-3.5" />, label: "Platform", value: "Zepto" },
                  { icon: <Calendar className="w-3.5 h-3.5" />, label: "Policy ID", value: "GS-2026-047821" },
                  { icon: <IndianRupee className="w-3.5 h-3.5" />, label: "Max Weekly Payout", value: "₹1,200 / event" },
                  { icon: <Zap className="w-3.5 h-3.5" />, label: "Disruption Types", value: "4 types covered" },
                  { icon: <RefreshCw className="w-3.5 h-3.5" />, label: "Auto-Renew", value: "Enabled (Every Monday)" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      {r.icon}
                      {r.label}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Premium breakdown */}
            <div className="bg-card rounded-2xl border border-border card-shadow p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-secondary" />
                <h2 className="text-sm font-display font-semibold text-foreground">AI Premium Breakdown</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Base Premium", value: "₹67.00", note: "Pro Shield" },
                  { label: "Zone Risk Factor", value: "+₹0.00", note: "Delhi · Zone 2 = 1.00x" },
                  { label: "Hours Factor", value: "+₹0.00", note: "8h/day = 1.00x" },
                  { label: "Platform Stability", value: "−₹2.00", note: "Zepto has low outages" },
                  { label: "Loyalty Discount", value: "−₹3.00", note: "12 weeks enrolled" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-xs">
                    <div>
                      <span className="text-foreground font-medium">{r.label}</span>
                      <div className="text-[10px] text-muted-foreground">{r.note}</div>
                    </div>
                    <span className={`font-semibold ${r.value.startsWith("+") ? "text-muted-foreground" : r.value.startsWith("−") ? "status-active" : "text-foreground"}`}>
                      {r.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm font-bold text-foreground">This Week</span>
                  <span className="text-lg font-display font-bold text-secondary">₹62</span>
                </div>
              </div>
            </div>
          </div>

          {/* Covered disruptions */}
          <div className="bg-card rounded-2xl border border-border card-shadow p-5 mb-6">
            <h2 className="text-sm font-display font-semibold text-foreground mb-4">What Your Policy Covers</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { type: "Heavy Rainfall", threshold: ">50mm/hr", payout: "Up to ₹1,200", status: "active" },
                { type: "Severe Air Pollution", threshold: "AQI >300", payout: "Up to ₹1,200", status: "active" },
                { type: "Zone Closures / Curfew", threshold: "Official notice", payout: "Up to ₹1,200", status: "active" },
                { type: "Platform Outage", threshold: ">3 hrs downtime", payout: "Up to ₹600", status: "active" },
              ].map((c) => (
                <div key={c.type} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.type}</div>
                    <div className="text-xs text-muted-foreground">Trigger: {c.threshold}</div>
                    <div className="text-xs font-medium text-secondary">{c.payout}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-xl bg-muted/40 border border-border flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <strong>Excluded:</strong> Health, life, accidents, vehicle damage, and personal property. Income loss only.
              </p>
            </div>
          </div>

          {/* Upgrade plans */}
          <div className="mb-6">
            <h2 className="text-sm font-display font-semibold text-foreground mb-3">Available Plans</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`bg-card rounded-2xl border-2 p-5 card-shadow transition-all duration-200 ${
                    p.id === activePlan ? "border-secondary ring-2 ring-secondary/20" : "border-border"
                  }`}
                >
                  {p.badge && (
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <div className="mt-2 mb-3">
                    <div className="text-sm font-semibold text-foreground">{p.name}</div>
                    <div className="flex items-end gap-1 mt-1">
                      <span className="text-2xl font-display font-bold text-foreground">₹{p.aiPrice}</span>
                      <span className="text-muted-foreground text-xs mb-1">/week</span>
                    </div>
                    {p.aiPrice !== p.price && (
                      <div className="text-[10px] text-muted-foreground line-through">₹{p.price} base</div>
                    )}
                  </div>
                  <div className="text-xs font-medium text-success mb-3">Max {p.maxPayout} / event</div>
                  <ul className="space-y-1.5 mb-4">
                    {p.types.map((t) => (
                      <li key={t} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-success flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    onClick={() => setActivePlan(p.id)}
                    className={`w-full text-xs font-semibold ${
                      p.id === activePlan
                        ? "bg-secondary text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {p.id === activePlan ? "Current Plan" : "Switch Plan"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Premium history */}
          <div className="bg-card rounded-2xl border border-border card-shadow">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => setShowHistory(!showHistory)}
            >
              <span className="text-sm font-display font-semibold text-foreground">Premium Payment History</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showHistory ? "rotate-180" : ""}`} />
            </button>
            {showHistory && (
              <div className="border-t border-border divide-y divide-border">
                {[
                  { week: "Mar 17–23", premium: 62, status: "paid" },
                  { week: "Mar 10–16", premium: 65, status: "paid" },
                  { week: "Mar 3–9", premium: 67, status: "paid" },
                  { week: "Feb 24–Mar 2", premium: 71, status: "paid" },
                  { week: "Feb 17–23", premium: 69, status: "paid" },
                ].map((row) => (
                  <div key={row.week} className="flex items-center justify-between px-5 py-3">
                    <div className="text-sm text-foreground">{row.week}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">₹{row.premium}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-status-active status-active">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
