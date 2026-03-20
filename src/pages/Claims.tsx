import { useState } from "react";
import {
  CloudRain, Wind, AlertTriangle, Smartphone, CheckCircle2,
  Clock, Zap, IndianRupee, MapPin, Shield, Loader2,
  ChevronDown, Activity, AlertCircle, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

type ClaimStatus = "processing" | "approved" | "paid" | "rejected" | "pending";

interface Claim {
  id: string;
  event: string;
  type: string;
  zone: string;
  date: string;
  triggerValue: string;
  threshold: string;
  status: ClaimStatus;
  amount: number;
  payoutTime?: string;
  fraudScore: number;
  autoTriggered: boolean;
  icon: React.ReactNode;
}

const claims: Claim[] = [
  {
    id: "C-20260317-001",
    event: "Severe AQI Alert",
    type: "pollution",
    zone: "Delhi NCR · Zone 2",
    date: "Mar 17, 2026 · 9:14 AM",
    triggerValue: "AQI 412",
    threshold: "AQI > 300",
    status: "processing",
    amount: 1200,
    payoutTime: "Est. 13:00 today",
    fraudScore: 98,
    autoTriggered: true,
    icon: <Wind className="w-4 h-4" />,
  },
  {
    id: "C-20260311-003",
    event: "Heavy Rainfall",
    type: "weather",
    zone: "Mumbai · Zone 4",
    date: "Mar 11, 2026 · 2:32 PM",
    triggerValue: "94mm",
    threshold: "> 50mm/hr",
    status: "paid",
    amount: 1100,
    payoutTime: "Paid Mar 11 · 5:47 PM",
    fraudScore: 97,
    autoTriggered: true,
    icon: <CloudRain className="w-4 h-4" />,
  },
  {
    id: "C-20260304-007",
    event: "Zone Closure – Strike",
    type: "social",
    zone: "Delhi NCR · Zone 3",
    date: "Mar 4, 2026 · 8:00 AM",
    triggerValue: "Official Notice",
    threshold: "Govt order",
    status: "paid",
    amount: 650,
    payoutTime: "Paid Mar 4 · 11:20 AM",
    fraudScore: 99,
    autoTriggered: true,
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: "C-20260226-002",
    event: "Heavy Rainfall",
    type: "weather",
    zone: "Delhi NCR · Zone 2",
    date: "Feb 26, 2026 · 3:15 PM",
    triggerValue: "78mm",
    threshold: "> 50mm/hr",
    status: "paid",
    amount: 920,
    payoutTime: "Paid Feb 26 · 7:02 PM",
    fraudScore: 96,
    autoTriggered: true,
    icon: <CloudRain className="w-4 h-4" />,
  },
  {
    id: "C-20260219-004",
    event: "Platform Outage – Zepto",
    type: "app",
    zone: "Delhi NCR (All Zones)",
    date: "Feb 19, 2026 · 10:00 AM",
    triggerValue: "4.5h downtime",
    threshold: "> 3 hrs",
    status: "rejected",
    amount: 0,
    fraudScore: 41,
    autoTriggered: false,
    icon: <Smartphone className="w-4 h-4" />,
  },
];

const statusConfig: Record<ClaimStatus, { label: string; color: string; dotColor: string }> = {
  processing: { label: "Processing", color: "bg-status-warning status-warning", dotColor: "bg-warning" },
  approved:   { label: "Approved", color: "bg-status-active status-active", dotColor: "bg-success" },
  paid:       { label: "Paid", color: "bg-status-active status-active", dotColor: "bg-success" },
  rejected:   { label: "Rejected", color: "bg-status-danger status-danger", dotColor: "bg-destructive" },
  pending:    { label: "Pending", color: "bg-muted text-muted-foreground", dotColor: "bg-muted-foreground" },
};

function ClaimRow({ c }: { c: Claim }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[c.status];

  return (
    <div className="bg-card rounded-xl border border-border card-shadow mb-3 overflow-hidden">
      <button
        className="w-full flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          c.type === "pollution" ? "bg-warning/15 text-warning" :
          c.type === "weather" ? "bg-info/15 text-info" :
          c.type === "social" ? "bg-destructive/15 text-destructive" :
          "bg-secondary/15 text-secondary"
        }`}>
          {c.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-sm font-semibold text-foreground">{c.event}</span>
              {c.autoTriggered && (
                <span className="ml-2 text-[10px] font-semibold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">AUTO</span>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              {c.status !== "rejected" ? (
                <span className="text-sm font-bold text-success">+₹{c.amount.toLocaleString()}</span>
              ) : (
                <span className="text-sm font-medium text-muted-foreground">₹0</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
              <span className={`text-xs font-medium rounded-full ${cfg.color}`}>{cfg.label}</span>
            </div>
            <span className="text-xs text-muted-foreground">{c.date}</span>
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground truncate">{c.zone}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Trigger info */}
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Parametric Trigger</div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Observed value</span>
                <span className="text-xs font-bold text-destructive">{c.triggerValue}</span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">Threshold</span>
                <span className="text-xs font-medium text-foreground">{c.threshold}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                {c.status !== "rejected" ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span className="text-xs text-success font-medium">Trigger confirmed via API</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-xs text-destructive font-medium">Trigger not validated</span>
                  </>
                )}
              </div>
            </div>

            {/* Fraud score */}
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">AI Fraud Score</div>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-display font-bold ${c.fraudScore > 70 ? "text-success" : "text-destructive"}`}>
                  {c.fraudScore}
                </span>
                <span className="text-muted-foreground text-sm mb-1">/ 100</span>
              </div>
              <div className="h-2 bg-muted rounded-full mt-2">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${c.fraudScore > 70 ? "bg-success" : "bg-destructive"}`}
                  style={{ width: `${c.fraudScore}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                {c.fraudScore > 90 ? "GPS validated · No anomaly detected" :
                 c.fraudScore > 70 ? "Location validated · Minor inconsistency" :
                 "GPS spoofing detected · Claim rejected"}
              </p>
            </div>
          </div>

          {/* Payout timeline */}
          {c.status !== "rejected" && (
            <div className="flex items-center gap-2">
              {[
                { label: "Triggered", done: true },
                { label: "Verified", done: c.status === "paid" || c.status === "approved" || c.status === "processing" },
                { label: "Approved", done: c.status === "paid" || c.status === "approved" },
                { label: "Paid via UPI", done: c.status === "paid" },
              ].map((stage, i, arr) => (
                <div key={stage.label} className="flex items-center gap-2 flex-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    stage.done ? "bg-success border-success" : "bg-background border-muted-foreground/30"
                  }`}>
                    {stage.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className={`text-[10px] font-medium ${stage.done ? "text-success" : "text-muted-foreground"}`}>{stage.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`flex-1 h-0.5 ${stage.done && arr[i+1].done ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {c.payoutTime && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
              <Clock className="w-3.5 h-3.5 text-success" />
              <span className="text-xs text-success font-medium">{c.payoutTime}</span>
            </div>
          )}

          {c.status === "rejected" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              <span className="text-xs text-destructive">Claim rejected: GPS spoofing pattern detected. Contact support@gigshield.in to appeal.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Claims() {
  const [filter, setFilter] = useState<"all" | ClaimStatus>("all");
  const filtered = filter === "all" ? claims : claims.filter((c) => c.status === filter);

  const totalPaid = claims.filter((c) => c.status === "paid").reduce((a, b) => a + b.amount, 0);
  const processing = claims.filter((c) => c.status === "processing").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Claims & Payouts</h1>
              <p className="text-muted-foreground text-sm mt-1">All parametric triggers and payout history</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-display font-bold text-success">₹{totalPaid.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total earned back</div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Claims", value: claims.length.toString(), color: "text-foreground" },
              { label: "Paid Out", value: claims.filter((c) => c.status === "paid").length.toString(), color: "status-active" },
              { label: "Processing", value: processing.toString(), color: "status-warning" },
              { label: "Rejected", value: claims.filter((c) => c.status === "rejected").length.toString(), color: "status-danger" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-xl border border-border p-3 text-center card-shadow">
                <div className={`text-xl font-display font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Active processing alert */}
          {processing > 0 && (
            <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/30 rounded-xl mb-5">
              <Loader2 className="w-4 h-4 text-warning animate-spin" />
              <div>
                <div className="text-sm font-semibold text-foreground">1 claim currently being verified</div>
                <div className="text-xs text-muted-foreground">AQI Alert · Delhi NCR · Est. payout in ~1.5 hours</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-lg font-display font-bold text-warning">₹1,200</div>
                <div className="text-xs text-muted-foreground">queued</div>
              </div>
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {(["all", "processing", "paid", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all duration-150 ${
                  filter === f
                    ? "bg-secondary text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== "all" && (
                  <span className="ml-1.5 opacity-70">({claims.filter((c) => c.status === f).length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Claims list */}
          <div>
            {filtered.map((c) => <ClaimRow key={c.id} c={c} />)}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No claims matching this filter.</p>
              </div>
            )}
          </div>

          {/* Info note */}
          <div className="mt-6 p-4 bg-muted/40 rounded-xl border border-border flex items-start gap-2">
            <Zap className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All claims are <strong className="text-foreground">automatically triggered</strong> by our parametric monitoring system. You never need to file a claim manually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
