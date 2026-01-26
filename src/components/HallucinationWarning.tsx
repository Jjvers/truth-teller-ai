import { AlertTriangle, CheckCircle } from "lucide-react";
import type { HallucinationCheck } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface HallucinationWarningProps {
  check: HallucinationCheck;
}

export function HallucinationWarning({ check }: HallucinationWarningProps) {
  if (check.allClaimsGrounded) {
    return (
      <div className="flex items-start gap-3 p-3 rounded-lg border border-verdict-fact/30 bg-verdict-fact/5">
        <CheckCircle className="w-5 h-5 text-verdict-fact flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-verdict-fact">All Claims Grounded</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Every statement in this analysis is directly supported by the retrieved sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-verdict-mixed/30 bg-verdict-mixed/5">
      <AlertTriangle className="w-5 h-5 text-verdict-mixed flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold text-verdict-mixed">Hallucination Warning</h4>
        <p className="text-xs text-muted-foreground mt-1 mb-2">
          Some claims could not be verified against the retrieved sources:
        </p>
        <ul className="space-y-1">
          {check.ungroundedClaims.map((claim, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-verdict-mixed">•</span>
              {claim}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
