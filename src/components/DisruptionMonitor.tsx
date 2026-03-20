import { useEffect, useState } from "react";
import { CloudRain, Thermometer, Wind, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

type DisruptionLevel = "none" | "moderate" | "severe" | "critical";

interface Disruption {
  id: string;
  type: "weather" | "pollution" | "social";
  icon: React.ReactNode;
  title: string;
  description: string;
  level: DisruptionLevel;
  value: string;
  trigger: string;
  affected: string;
}

const levelColors: Record<DisruptionLevel, string> = {
  none: "bg-status-active status-active border-success/20",
  moderate: "bg-status-warning status-warning border-warning/20",
  severe: "bg-status-danger status-danger border-destructive/20",
  critical: "bg-status-danger status-danger border-destructive/30",
};

const levelLabels: Record<DisruptionLevel, string> = {
  none: "Normal",
  moderate: "Moderate",
  severe: "Severe Alert",
  critical: "Critical",
};

export const disruptions: Disruption[] = [
  {
    id: "d1",
    type: "weather",
    icon: <CloudRain className="w-4 h-4" />,
    title: "Heavy Rainfall",
    description: "Mumbai - Zone 4",
    level: "severe",
    value: "87mm",
    trigger: "Triggered at >50mm",
    affected: "~2,400 workers",
  },
  {
    id: "d2",
    type: "pollution",
    icon: <Wind className="w-4 h-4" />,
    title: "AQI Alert",
    description: "Delhi NCR - All Zones",
    level: "critical",
    value: "AQI 412",
    trigger: "Triggered at AQI >300",
    affected: "~8,100 workers",
  },
  {
    id: "d3",
    type: "weather",
    icon: <Thermometer className="w-4 h-4" />,
    title: "Extreme Heat",
    description: "Hyderabad - Zone 2",
    level: "moderate",
    value: "44°C",
    trigger: "Triggered at >42°C",
    affected: "~1,200 workers",
  },
  {
    id: "d4",
    type: "social",
    icon: <AlertTriangle className="w-4 h-4" />,
    title: "Zone Closure",
    description: "Bengaluru - Zone 7",
    level: "none",
    value: "Resolved",
    trigger: "N/A",
    affected: "Cleared",
  },
];

export default function DisruptionMonitor() {
  const [scanning, setScanning] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScanning(false), 1500);
    const t2 = setTimeout(() => setVisible(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="rounded-2xl bg-card border border-border card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-semibold text-white/90 font-display uppercase tracking-wider">
            Live Disruption Monitor
          </span>
        </div>
        {scanning ? (
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            Scanning APIs…
          </div>
        ) : (
          <span className="text-xs text-secondary font-medium">4 zones tracked</span>
        )}
      </div>

      {/* Disruption list */}
      <div className="divide-y divide-border">
        {disruptions.map((d, i) => (
          <div
            key={d.id}
            className={`flex items-start gap-3 px-4 py-3 transition-all duration-500 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${levelColors[d.level]}`}>
              {d.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground truncate">{d.title}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${levelColors[d.level]}`}>
                  {d.value}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-muted-foreground">{d.description}</span>
                <span className={`text-xs font-medium ${d.level === "none" ? "status-active" : d.level === "moderate" ? "status-warning" : "status-danger"}`}>
                  {levelLabels[d.level]}
                </span>
              </div>
              {d.level !== "none" && (
                <p className="text-[10px] text-muted-foreground mt-1">{d.trigger} · {d.affected}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-muted/50 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span className="text-xs text-muted-foreground">3 auto-claims initiated</span>
        </div>
        <span className="text-xs text-muted-foreground">Updated 2m ago</span>
      </div>
    </div>
  );
}
