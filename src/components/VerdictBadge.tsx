import { CheckCircle2, XCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerdictBadgeProps {
  verdict: "fact" | "hoax" | "mixed" | "unverified";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const verdictConfig = {
  fact: {
    icon: CheckCircle2,
    label: "VERIFIED FACT",
    className: "verdict-fact",
  },
  hoax: {
    icon: XCircle,
    label: "HOAX / FALSE",
    className: "verdict-hoax",
  },
  mixed: {
    icon: AlertTriangle,
    label: "MIXED / PARTLY TRUE",
    className: "verdict-mixed",
  },
  unverified: {
    icon: HelpCircle,
    label: "UNVERIFIED",
    className: "verdict-unverified",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs gap-1",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-base gap-2",
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function VerdictBadge({ verdict, size = "md", showLabel = true }: VerdictBadgeProps) {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md font-semibold uppercase tracking-wide animate-scale-in",
        config.className,
        sizeClasses[size]
      )}
    >
      <Icon size={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}
