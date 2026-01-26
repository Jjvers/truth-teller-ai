import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Source } from "@/types/analysis";

interface SourceCardProps {
  source: Source;
  index: number;
}

const biasConfig: Record<string, { label: string; className: string }> = {
  left: {
    label: "Left-leaning",
    className: "bg-bias-left/20 text-bias-left border-bias-left/30",
  },
  center: {
    label: "Center",
    className: "bg-bias-center/20 text-bias-center border-bias-center/30",
  },
  right: {
    label: "Right-leaning",
    className: "bg-bias-right/20 text-bias-right border-bias-right/30",
  },
  "fact-check": {
    label: "Fact-Check",
    className: "bg-verdict-fact/20 text-verdict-fact border-verdict-fact/30",
  },
  unknown: {
    label: "Unknown",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export function SourceCard({ source, index }: SourceCardProps) {
  const biasInfo = biasConfig[source.bias || "unknown"];
  const domain = new URL(source.url).hostname.replace("www.", "");

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-all duration-200 hover:border-primary/50 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex-shrink-0 w-5 h-5 rounded bg-primary/20 text-primary text-xs font-mono font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-xs text-muted-foreground font-mono truncate">
            {domain}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "source-badge border",
              biasInfo.className
            )}
          >
            {biasInfo.label}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
      <h4 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {source.title}
      </h4>
      {source.snippet && (
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
          {source.snippet.slice(0, 150)}...
        </p>
      )}
    </a>
  );
}
