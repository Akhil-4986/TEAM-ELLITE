import { useState, useEffect } from "react";
import {
  Shield, IndianRupee, CloudRain, Wind, AlertTriangle,
  TrendingUp, Clock, CheckCircle2, Bell, ArrowUpRight,
  Zap, MapPin, Calendar, ChevronRight, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const recentPayouts = [
  { id: "p1", event: "Heavy Rainfall", date: "Mar 17, 2026", amount: 1100, status: "paid", icon: <CloudRain className="w-4 h-4" /> },
  { id: "p2", event: "Severe AQI Alert", date: "Mar 11, 2026", amount: 1200, status: "paid", icon: <Wind className="w-4 h-4" /> },
  { id: "p3", event: "Zone Closure", date: "Mar 4, 2026", amount: 650, status: "paid", icon: <AlertTriangle className="w-4 h-4" /> },
  { id: "p4", event: "Heavy Rainfall", date: "Feb 26, 2026", amount: 920, status: "paid", icon: <CloudRain className="w-4 h-4" /> },
];

const weeklyData = [85, 0, 110, 0, 95, 0, 120]; // simulated payout data for mini chart

function MiniBar({ val, max }: { val: number; max: number }) {
  const [h, setH] = useState(0);
  useEffect(() => { setTimeout(() => setH(val), 300); }, [val]);
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full bg-muted rounded-sm relative" style={{ height: 48 }}>
        <div
          className="absolute bottom-0 left-0 right-0 bg-secondary/70 rounded-sm transition-all duration-700 ease-out"
          style={{ height: `${(h / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [pulseActive, setPulseActive] = useState(true);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const maxVal = Math.max(...weeklyData);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Welcome banner */}
          <div className="bg-hero rounded-2xl p-6 mb-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-secondary/10 blur-2xl pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Good morning,</p>
                <h1 className="text-2xl font-display font-bold text-white">Rahul Kumar 👋</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-success text-sm font-medium">Policy Active · Week 12</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-display font-bold text-white">₹67</div>
                <div className="text-white/60 text-xs">This week's premium</div>
                <div className="text-secondary text-xs font-medium mt-0.5">Auto-renewed Monday</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: "Total Protected", value: "₹14,280", icon: <IndianRupee className="w-3.5 h-3.5" /> },
                { label: "Claims Paid", value: "11 events", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
                { label: "Avg Payout", value: "₹1,035", icon: <TrendingUp className="w-3.5 h-3.5" /> },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/60 mb-1">
                    {s.icon}
                    <span className="text-[10px] font-medium uppercase tracking-wide">{s.label}</span>
                  </div>
                  <div className="text-base font-display font-bold text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left col */}
            <div className="lg:col-span-2 space-y-6">

              {/* Live disruption alert */}
              <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0 animate-ping-slow">
                    <Wind className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">🚨 Active Disruption: Severe AQI</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Delhi NCR — AQI 412 (trigger: &gt;300) · Your zone is affected</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-display font-bold text-success">₹1,200</div>
                        <div className="text-xs text-success">Payout queued</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-muted rounded-full h-1.5">
                        <div className="bg-success h-1.5 rounded-full" style={{ width: "75%" }} />
                      </div>
                      <span className="text-xs text-muted-foreground">Verification 75%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Est. payout in ~1.5 hours via UPI</p>
                  </div>
                </div>
              </div>

              {/* Weekly payout chart */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-display font-semibold text-foreground">Weekly Payout History</h2>
                  <span className="text-xs text-muted-foreground">Last 7 weeks</span>
                </div>
                <div className="flex gap-1.5 items-end">
                  {weeklyData.map((v, i) => (
                    <MiniBar key={i} val={v} max={maxVal} />
                  ))}
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  {days.map((d, i) => (
                    <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground">{d}</div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">7-week total</span>
                  <span className="text-sm font-bold text-foreground">₹4,100</span>
                </div>
              </div>

              {/* Recent payouts */}
              <div className="bg-card rounded-2xl border border-border card-shadow">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-display font-semibold text-foreground">Recent Payouts</h2>
                  <Link to="/claims">
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80 gap-1 h-7 text-xs">
                      View all <ChevronRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {recentPayouts.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                        {p.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{p.event}</div>
                        <div className="text-xs text-muted-foreground">{p.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-success">+₹{p.amount.toLocaleString()}</div>
                        <div className="text-[10px] px-2 py-0.5 rounded-full bg-status-active status-active">Paid</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-5">
              {/* Policy card */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-display font-semibold text-foreground">Active Policy</span>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: <Activity className="w-3.5 h-3.5" />, label: "Plan", value: "Pro Shield" },
                    { icon: <MapPin className="w-3.5 h-3.5" />, label: "Zone", value: "Delhi NCR · Zone 2" },
                    { icon: <IndianRupee className="w-3.5 h-3.5" />, label: "Weekly Premium", value: "₹67" },
                    { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Max Payout", value: "₹1,200 / event" },
                    { icon: <Calendar className="w-3.5 h-3.5" />, label: "Renews", value: "Mon, Mar 23" },
                    { icon: <Zap className="w-3.5 h-3.5" />, label: "Coverage", value: "All 4 disruption types" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        {row.icon}
                        {row.label}
                      </div>
                      <span className="text-xs font-semibold text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
                <Link to="/policy">
                  <Button size="sm" variant="outline" className="w-full mt-4 gap-1.5 text-xs">
                    Manage Policy <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>

              {/* Zone risk */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-4 h-4 text-accent" />
                  <span className="text-sm font-display font-semibold text-foreground">Zone Risk This Week</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Rainfall Risk", pct: 72, color: "bg-info" },
                    { label: "AQI Risk", pct: 88, color: "bg-destructive" },
                    { label: "Zone Closure", pct: 24, color: "bg-warning" },
                    { label: "App Outage", pct: 12, color: "bg-secondary" },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-medium text-foreground">{r.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full">
                        <div className={`h-full rounded-full transition-all duration-700 ${r.color}`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-3">AI forecast · Updated 2h ago</p>
              </div>

              {/* Quick actions */}
              <div className="bg-card rounded-2xl border border-border card-shadow p-5">
                <div className="text-sm font-display font-semibold text-foreground mb-3">Quick Actions</div>
                <div className="space-y-2">
                  <Link to="/claims">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                      <CloudRain className="w-3.5 h-3.5 text-secondary" /> View Active Claims
                    </Button>
                  </Link>
                  <Link to="/policy">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                      <Shield className="w-3.5 h-3.5 text-secondary" /> Upgrade Plan
                    </Button>
                  </Link>
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-secondary" /> Insurer Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
