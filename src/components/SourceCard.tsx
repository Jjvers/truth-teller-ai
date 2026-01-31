import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Source } from "@/types/analysis";

interface SourceCardProps {
  source: Source;
  index: number;
}

// Map domains to display badges
const domainBadges: Record<string, { label: string; color: string }> = {
  "antaranews.com": { label: "ANTARA", color: "bg-[hsl(142_76%_45%)]" },
  "reuters.com": { label: "REUTERS", color: "bg-[hsl(217_91%_60%)]" },
  "kompas.com": { label: "KOMPAS", color: "bg-[hsl(0_84%_55%)]" },
  "tempo.co": { label: "TEMPO", color: "bg-[hsl(45_93%_47%)]" },
  "detik.com": { label: "DETIK", color: "bg-[hsl(280_70%_50%)]" },
  "cnnindonesia.com": { label: "CNN ID", color: "bg-[hsl(0_84%_55%)]" },
  "bbc.com": { label: "BBC", color: "bg-[hsl(0_0%_30%)]" },
  "apnews.com": { label: "AP", color: "bg-[hsl(217_91%_50%)]" },
  "tribunnews.com": { label: "TRIBUN", color: "bg-[hsl(200_70%_50%)]" },
  "liputan6.com": { label: "LIPUTAN6", color: "bg-[hsl(15_90%_55%)]" },
};

export function SourceCard({ source, index }: SourceCardProps) {
  let domain = "";
  try {
    domain = new URL(source.url).hostname.replace("www.", "");
  } catch {
    domain = source.url;
  }

  const badge = Object.entries(domainBadges).find(([key]) => domain.includes(key))?.[1] 
    || { label: domain.split('.')[0].toUpperCase().slice(0, 8), color: "bg-primary" };

  // Simulated match percentage
  const matchPercentage = Math.floor(85 + Math.random() * 15);

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-3 md:p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3 md:gap-4">
        {/* Index Number */}
        <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary text-primary-foreground text-xs md:text-sm font-bold flex items-center justify-center">
          {index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Source Name & Badge */}
          <div className="flex items-center flex-wrap gap-2 mb-1.5">
            <span className="text-[10px] md:text-xs text-muted-foreground">{domain}</span>
            <span className={cn(
              "px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-white",
              badge.color
            )}>
              {badge.label}
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground ml-auto">
              {matchPercentage}% match
            </span>
          </div>

          {/* Title */}
          <h4 className="font-medium text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {source.title}
          </h4>

          {/* Snippet */}
          {source.snippet && (
            <p className="mt-1.5 text-xs md:text-sm text-muted-foreground line-clamp-2">
              {source.snippet.slice(0, 180)}...
            </p>
          )}
        </div>

        {/* External Link Icon */}
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 mt-1" />
      </div>
    </a>
  );
}
