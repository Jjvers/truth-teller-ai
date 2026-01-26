import type { BiasAnalysis } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface BiasSpectrumProps {
  biasAnalysis: BiasAnalysis;
}

export function BiasSpectrum({ biasAnalysis }: BiasSpectrumProps) {
  const hasLeft = biasAnalysis.leftLeaning.length > 0;
  const hasCenter = biasAnalysis.centerLeaning.length > 0;
  const hasRight = biasAnalysis.rightLeaning.length > 0;

  if (!hasLeft && !hasCenter && !hasRight) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No bias analysis available for this claim.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-gradient-to-r from-bias-left via-bias-center to-bias-right opacity-30" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left-leaning */}
        <div className={cn(
          "p-3 rounded-lg border",
          hasLeft ? "border-bias-left/30 bg-bias-left/5" : "border-border bg-muted/30 opacity-50"
        )}>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-bias-left mb-2">
            <span className="w-2 h-2 rounded-full bg-bias-left" />
            Left-Leaning Sources
          </h4>
          {hasLeft ? (
            <ul className="space-y-1.5">
              {biasAnalysis.leftLeaning.map((point, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No coverage found</p>
          )}
        </div>

        {/* Center */}
        <div className={cn(
          "p-3 rounded-lg border",
          hasCenter ? "border-bias-center/30 bg-bias-center/5" : "border-border bg-muted/30 opacity-50"
        )}>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-bias-center mb-2">
            <span className="w-2 h-2 rounded-full bg-bias-center" />
            Center Sources
          </h4>
          {hasCenter ? (
            <ul className="space-y-1.5">
              {biasAnalysis.centerLeaning.map((point, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No coverage found</p>
          )}
        </div>

        {/* Right-leaning */}
        <div className={cn(
          "p-3 rounded-lg border",
          hasRight ? "border-bias-right/30 bg-bias-right/5" : "border-border bg-muted/30 opacity-50"
        )}>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-bias-right mb-2">
            <span className="w-2 h-2 rounded-full bg-bias-right" />
            Right-Leaning Sources
          </h4>
          {hasRight ? (
            <ul className="space-y-1.5">
              {biasAnalysis.rightLeaning.map((point, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No coverage found</p>
          )}
        </div>
      </div>
    </div>
  );
}
