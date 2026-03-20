import { useState, useEffect } from "react";
import {
  TrendingUp, Users, IndianRupee, Shield, AlertTriangle,
  CheckCircle2, XCircle, Brain, BarChart2, MapPin, Activity,
  CloudRain, Wind, Clock, Zap, ChevronRight, ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/Navbar";

function MetricCard({ label, value, sub, icon, trend, color = "text-secondary" }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; trend?: string; color?: string;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border card-shadow p-5 hover:card-shadow-hover transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className={`text-2xl font-display font-bold mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">{icon}</div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="text-xs text-success font-medium">{trend}</span>
        </div>
      )}
    </div>
  );
}

type FraudFlag = "high" | "medium" | "clear";

interface FraudAlert {
  id: string;
  worker: string;
  claim: string;
  reason: string;
  flag: FraudFlag;
  amount: number;
}

const fraudAlerts: FraudAlert[] = [
  { id: "f1", worker: "Kiran B. (ID 8821)", claim: "C-20260317-009", reason: "GPS coordinates inconsistent with claimed zone during disruption window", flag: "high", amount: 1200 },
  { id: "f2", worker: "Suresh M. (ID 4432)", claim: "C-20260316-044", reason: "Multiple claims filed within same hour from different zones", flag: "high", amount: 2400 },
  { id: "f3", worker: "Deepa R. (ID 2291)", claim: "C-20260315-017", reason: "Historical delivery data shows activity during claimed disruption", flag: "medium", amount: 650 },
  { id: "f4", worker: "Anil S. (ID 7714)", claim: "C-20260314-032", reason: "Minor timestamp discrepancy in platform activity log", flag: "medium", amount: 920 },
];

const zoneRisk = [
  { zone: "Delhi NCR", disruptions: 4, workers: 12400, lossRatio: 0.67, riskNext: 84 },
  { zone: "Mumbai", disruptions: 2, workers: 9800, lossRatio: 0.43, riskNext: 58 },
  { zone: "Bengaluru", disruptions: 1, workers: 7200, lossRatio: 0.31, riskNext: 42 },
  { zone: "Hyderabad", disruptions: 3, workers: 5600, lossRatio: 0.54, riskNext: 61 },
  { zone: "Chennai", disruptions: 0, workers: 3100, lossRatio: 0.18, riskNext: 27 },
];

function MiniBarH({ pct, color }: { pct: number; color: string }) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(pct), 300); }, [pct]);
  return (
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ease-out ${color}`} style={{ width: `${w}%` }} />
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState<"overview" | "fraud" | "zones" | "predict">("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-secondary" />
                <h1 className="text-2xl font-display font-bold text-foreground">Insurer Dashboard</h1>
                <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-full font-semibold">Admin</span>
              </div>
              <p className="text-muted-foreground text-sm">GigShield · Delivery Partner Insurance Analytics</p>
            </div>
            <div className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live · Updated 2m ago
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-muted rounded-xl p-1 w-fit">
            {[
              { id: "overview", label: "Overview" },
              { id: "fraud", label: "Fraud Detection" },
              { id: "zones", label: "Zone Analytics" },
              { id: "predict", label: "AI Predictions" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  tab === t.id
                    ? "bg-primary text-white shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  label="Active Policies"
                  value="47,241"
                  sub="+1,842 this week"
                  icon={<Users className="w-5 h-5 text-secondary" />}
                  trend="+4.1% vs last week"
                />
                <MetricCard
                  label="Total Premiums (Wk)"
                  value="₹31.7L"
                  sub="₹67 avg per policy"
                  icon={<IndianRupee className="w-5 h-5 text-success" />}
                  trend="+3.2% growth"
                  color="text-success"
                />
                <MetricCard
                  label="Claims Paid (Wk)"
                  value="₹21.2L"
                  sub="1,847 events processed"
                  icon={<CheckCircle2 className="w-5 h-5 text-warning" />}
                  color="text-warning"
                />
                <MetricCard
                  label="Loss Ratio"
                  value="66.9%"
                  sub="Target: <72%"
                  icon={<BarChart2 className="w-5 h-5 text-info" />}
                  trend="3.4pp improvement"
                  color="text-info"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Claims breakdown */}
                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">Claims This Week by Type</h2>
                  <div className="space-y-4">
                    {[
                      { label: "Heavy Rainfall", count: 812, payout: "₹8.9L", pct: 72, color: "bg-info" },
                      { label: "Severe AQI", count: 634, payout: "₹7.6L", pct: 88, color: "bg-warning" },
                      { label: "Zone Closures", count: 289, payout: "₹3.2L", pct: 35, color: "bg-destructive" },
                      { label: "Platform Outage", count: 112, payout: "₹1.5L", pct: 15, color: "bg-secondary" },
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-foreground">{r.label} ({r.count} events)</span>
                          <span className="font-bold text-foreground">{r.payout}</span>
                        </div>
                        <MiniBarH pct={r.pct} color={r.color} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly trend */}
                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">Key Performance Metrics</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Auto-Claim Rate", value: "98.4%", note: "No manual intervention needed", good: true },
                      { label: "Avg Payout Time", value: "3.7 hrs", note: "Target <4hrs", good: true },
                      { label: "Fraud Blocked Rate", value: "2.1%", note: "41 claims blocked this week", good: true },
                      { label: "Worker Retention", value: "91.3%", note: "Weekly auto-renewals", good: true },
                      { label: "Payout Accuracy", value: "99.8%", note: "No wrongful payouts", good: true },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{m.label}</div>
                          <div className="text-xs text-muted-foreground">{m.note}</div>
                        </div>
                        <span className={`text-sm font-bold ${m.good ? "text-success" : "status-warning"}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live disruption status */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <h2 className="text-sm font-display font-semibold text-foreground mb-4">Live Disruption Monitor — API Sources</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { source: "IMD Weather API", status: "active", lastRead: "2m ago", events: 2 },
                    { source: "CPCB AQI API", status: "active", lastRead: "4m ago", events: 1 },
                    { source: "Govt. Alerts RSS", status: "active", lastRead: "12m ago", events: 0 },
                    { source: "Zomato Status API", status: "active", lastRead: "1m ago", events: 0 },
                    { source: "Swiggy Status API", status: "active", lastRead: "1m ago", events: 0 },
                    { source: "Zepto Status API", status: "degraded", lastRead: "18m ago", events: 0 },
                  ].map((s) => (
                    <div key={s.source} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 border border-border">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${s.status === "active" ? "bg-success" : "bg-warning"}`} />
                      <div>
                        <div className="text-xs font-semibold text-foreground">{s.source}</div>
                        <div className="text-[10px] text-muted-foreground">Last: {s.lastRead}</div>
                        {s.events > 0 && (
                          <div className="text-[10px] font-bold text-destructive">{s.events} active event(s)</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FRAUD DETECTION ── */}
          {tab === "fraud" && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-4 gap-4 mb-2">
                <MetricCard label="Scanned This Week" value="1,894" icon={<Brain className="w-5 h-5 text-secondary" />} />
                <MetricCard label="Flagged High" value="7" sub="Requires review" icon={<AlertTriangle className="w-5 h-5 text-destructive" />} color="text-destructive" />
                <MetricCard label="Auto-Rejected" value="41" sub="₹48,200 saved" icon={<XCircle className="w-5 h-5 text-warning" />} color="text-warning" />
                <MetricCard label="Fraud Rate" value="2.1%" sub="Industry avg: 8.4%" icon={<Shield className="w-5 h-5 text-success" />} color="text-success" trend="6.3pp below avg" />
              </div>

              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-secondary" />
                  <h2 className="text-sm font-display font-semibold text-foreground">Active Fraud Alerts</h2>
                  <span className="ml-auto text-xs text-muted-foreground">AI-scored · Real-time</span>
                </div>
                <div className="space-y-3">
                  {fraudAlerts.map((f) => (
                    <div key={f.id} className={`rounded-xl border p-4 ${
                      f.flag === "high" ? "bg-destructive/8 border-destructive/25" : "bg-warning/8 border-warning/25"
                    }`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${f.flag === "high" ? "text-destructive" : "text-warning"}`} />
                          <div>
                            <div className="text-sm font-semibold text-foreground">{f.worker}</div>
                            <div className="text-xs text-muted-foreground mb-1">Claim {f.claim}</div>
                            <p className="text-xs text-foreground">{f.reason}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                            f.flag === "high" ? "bg-status-danger status-danger" : "bg-status-warning status-warning"
                          }`}>
                            {f.flag === "high" ? "High Risk" : "Medium Risk"}
                          </div>
                          <div className="text-sm font-bold text-foreground mt-1">₹{f.amount.toLocaleString()}</div>
                          <div className="text-[10px] text-muted-foreground">claim value</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fraud detection methods */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <h2 className="text-sm font-display font-semibold text-foreground mb-4">AI Fraud Detection Methods</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { method: "GPS Validation", desc: "Checks worker location vs disruption zone", accuracy: 96 },
                    { method: "Activity Crosscheck", desc: "Platform API confirms delivery stoppage", accuracy: 94 },
                    { method: "Duplicate Detection", desc: "Prevents multiple claims same event", accuracy: 99 },
                    { method: "Historical Anomaly", desc: "ML model vs 12-month baseline", accuracy: 91 },
                  ].map((m) => (
                    <div key={m.method} className="p-3 rounded-xl bg-muted/50 border border-border">
                      <div className="text-xs font-bold text-foreground mb-1">{m.method}</div>
                      <div className="text-[10px] text-muted-foreground mb-2">{m.desc}</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-bold text-success">{m.accuracy}%</span>
                      </div>
                      <MiniBarH pct={m.accuracy} color="bg-success" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ZONE ANALYTICS ── */}
          {tab === "zones" && (
            <div className="space-y-5">
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <h2 className="text-sm font-display font-semibold text-foreground">Zone Performance & Risk</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {["Zone", "Workers", "Disruptions (Wk)", "Loss Ratio", "Next Wk Risk", "Action"].map((h) => (
                          <th key={h} className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider py-2 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {zoneRisk.map((z) => (
                        <tr key={z.zone} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 pr-4 font-semibold text-foreground">{z.zone}</td>
                          <td className="py-3 pr-4 text-muted-foreground">{z.workers.toLocaleString()}</td>
                          <td className="py-3 pr-4">
                            <span className={`font-semibold ${z.disruptions > 2 ? "text-destructive" : z.disruptions > 0 ? "text-warning" : "text-success"}`}>
                              {z.disruptions}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`font-semibold ${z.lossRatio > 0.65 ? "text-destructive" : z.lossRatio > 0.45 ? "text-warning" : "text-success"}`}>
                              {(z.lossRatio * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 pr-4 min-w-[100px]">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-muted rounded-full">
                                <div className={`h-full rounded-full ${z.riskNext > 70 ? "bg-destructive" : z.riskNext > 50 ? "bg-warning" : "bg-success"}`} style={{ width: `${z.riskNext}%` }} />
                              </div>
                              <span className="text-xs font-bold text-foreground">{z.riskNext}%</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <button className="text-xs text-secondary font-medium hover:underline flex items-center gap-1">
                              Details <ChevronRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">Loss Ratio by Platform</h2>
                  <div className="space-y-3">
                    {[
                      { platform: "Zepto / Blinkit (Q-Commerce)", ratio: 0.72, workers: 14200 },
                      { platform: "Zomato / Swiggy (Food)", ratio: 0.61, workers: 21800 },
                      { platform: "Amazon Flex (E-commerce)", ratio: 0.44, workers: 8900 },
                      { platform: "Other platforms", ratio: 0.38, workers: 2341 },
                    ].map((r) => (
                      <div key={r.platform}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground font-medium">{r.platform}</span>
                          <span className={`font-bold ${r.ratio > 0.7 ? "text-destructive" : r.ratio > 0.5 ? "text-warning" : "text-success"}`}>
                            {(r.ratio * 100).toFixed(0)}% LR
                          </span>
                        </div>
                        <MiniBarH pct={r.ratio * 100} color={r.ratio > 0.7 ? "bg-destructive" : r.ratio > 0.5 ? "bg-warning" : "bg-success"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">Premium vs Claims This Week</h2>
                  <div className="space-y-3">
                    {zoneRisk.map((z) => {
                      const premium = Math.round(z.workers * 67 / 1000);
                      const claims = Math.round(premium * z.lossRatio);
                      return (
                        <div key={z.zone} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <span className="text-xs font-medium text-foreground">{z.zone}</span>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-success">₹{premium}K premium</span>
                            <span className="text-destructive">₹{claims}K claims</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AI PREDICTIONS ── */}
          {tab === "predict" && (
            <div className="space-y-5">
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-secondary" />
                  <h2 className="text-sm font-display font-semibold text-foreground">Next Week Disruption Forecast</h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-secondary/10 px-2 py-0.5 rounded-full text-secondary font-medium">
                    AI model · 87% confidence
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { city: "Delhi NCR", disruption: "AQI Severe", prob: 91, event: "Pollution season peak", type: "critical", icon: <Wind className="w-4 h-4" /> },
                    { city: "Mumbai", disruption: "Heavy Rainfall", prob: 74, event: "Pre-monsoon system", type: "high", icon: <CloudRain className="w-4 h-4" /> },
                    { city: "Hyderabad", disruption: "Extreme Heat", prob: 62, event: "Temperature >44°C", type: "moderate", icon: <Activity className="w-4 h-4" /> },
                    { city: "Bengaluru", disruption: "Zone Closure", prob: 18, event: "Low probability", type: "low", icon: <AlertTriangle className="w-4 h-4" /> },
                  ].map((p) => (
                    <div key={p.city} className={`p-4 rounded-xl border ${
                      p.type === "critical" ? "bg-destructive/8 border-destructive/25" :
                      p.type === "high" ? "bg-warning/8 border-warning/25" :
                      p.type === "moderate" ? "bg-info/8 border-info/25" :
                      "bg-muted/50 border-border"
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            p.type === "critical" ? "bg-destructive/20 text-destructive" :
                            p.type === "high" ? "bg-warning/20 text-warning" :
                            p.type === "moderate" ? "bg-info/20 text-info" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {p.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{p.city}</div>
                            <div className="text-xs text-muted-foreground">{p.disruption}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-display font-bold ${
                            p.type === "critical" ? "text-destructive" :
                            p.type === "high" ? "text-warning" :
                            "text-muted-foreground"
                          }`}>
                            {p.prob}%
                          </div>
                          <div className="text-[10px] text-muted-foreground">probability</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{p.event}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                  <Zap className="w-4 h-4 text-secondary" />
                  <p className="text-xs text-foreground">
                    Predicted claims exposure next week: <strong>₹28.4L – ₹41.2L</strong> (75% confidence interval). 
                    Recommend adjusting Delhi NCR premiums by +₹8/week.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">Churn Risk Workers</h2>
                  <div className="space-y-2">
                    {[
                      { worker: "Group A (Wk 1–3)", count: 2841, risk: "High churn risk", prob: 82, reason: "No disruption events yet" },
                      { worker: "Group B (4–8 weeks)", count: 8400, risk: "Moderate", prob: 34, reason: "Saw 1 payout — retained" },
                      { worker: "Group C (9+ weeks)", count: 36000, risk: "Low", prob: 8, reason: "Strong payout history" },
                    ].map((g) => (
                      <div key={g.worker} className="p-3 rounded-xl bg-muted/50 border border-border">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="text-xs font-semibold text-foreground">{g.worker}</div>
                            <div className="text-[10px] text-muted-foreground">{g.count.toLocaleString()} workers · {g.reason}</div>
                          </div>
                          <span className={`text-xs font-bold ${g.prob > 60 ? "text-destructive" : g.prob > 30 ? "text-warning" : "text-success"}`}>
                            {g.prob}%
                          </span>
                        </div>
                        <MiniBarH pct={g.prob} color={g.prob > 60 ? "bg-destructive" : g.prob > 30 ? "bg-warning" : "bg-success"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                  <h2 className="text-sm font-display font-semibold text-foreground mb-4">AI Recommendations</h2>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Raise Delhi AQI threshold",
                        desc: "Current AQI >300 triggers 8,100 claims. Model suggests >350 reduces false positives by 31%.",
                        priority: "high",
                        impact: "Save ₹8.4L/week",
                      },
                      {
                        title: "Loyalty discount automation",
                        desc: "Workers in 10+ weeks should auto-receive 5% premium reduction to reduce churn.",
                        priority: "medium",
                        impact: "+3.2% retention",
                      },
                      {
                        title: "Hyderabad heat cover add-on",
                        desc: "April forecast shows 44°C+ days. Proactively offer coverage upsell to 5,600 workers.",
                        priority: "medium",
                        impact: "+₹2.1L revenue",
                      },
                    ].map((r) => (
                      <div key={r.title} className={`p-3 rounded-xl border ${
                        r.priority === "high" ? "bg-warning/8 border-warning/25" : "bg-muted/50 border-border"
                      }`}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-foreground">{r.title}</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{r.desc}</div>
                          </div>
                        </div>
                        <div className="mt-1.5">
                          <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">{r.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
