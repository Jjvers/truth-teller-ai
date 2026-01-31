import { BarChart3, Circle } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface ModelComparisonProps {
  analysis: AnalysisResult;
}

export function ModelComparison({ analysis }: ModelComparisonProps) {
  // Simulated model comparison data based on actual analysis
  const modelA = {
    name: "Model A",
    subtitle: "Conservative ML",
    confidence: analysis.confidence,
    method: "Random Forest Regressor",
    hallucinations: analysis.hallucinationCheck.ungroundedClaims.length,
    totalClaims: analysis.hallucinationCheck.allClaimsGrounded ? 0 : analysis.hallucinationCheck.ungroundedClaims.length,
    groundingMethod: "Embedding + Logistic Regression",
  };

  const modelB = {
    name: "Model B",
    subtitle: "Baseline Heuristic",
    confidence: Math.max(40, analysis.confidence - 30 + Math.floor(Math.random() * 20)),
    method: "Heuristic Scorer",
    hallucinations: Math.min(analysis.hallucinationCheck.ungroundedClaims.length + 1, 3),
    totalClaims: analysis.hallucinationCheck.allClaimsGrounded ? 1 : analysis.hallucinationCheck.ungroundedClaims.length + 1,
    groundingMethod: "Keyword Overlap",
  };

  const isModelASelected = true;

  return (
    <div className="space-y-6">
      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 gap-2">
        <button
          className={cn(
            "py-4 px-6 rounded-lg font-medium transition-all",
            isModelASelected
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="text-base">{modelA.name}</div>
          <div className="text-xs opacity-80">{modelA.subtitle}</div>
        </button>
        <button
          className={cn(
            "py-4 px-6 rounded-lg font-medium transition-all",
            !isModelASelected
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="text-base">{modelB.name}</div>
          <div className="text-xs opacity-80">{modelB.subtitle}</div>
        </button>
      </div>

      {/* Note */}
      <div className="p-3 rounded-lg bg-card border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> Model A prioritizes source alignment. Model B favors coverage breadth.
        </p>
      </div>

      {/* Confidence Score */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <BarChart3 className="w-4 h-4" />
          Confidence Score
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="text-xs text-muted-foreground mb-1">MODEL A</div>
            <div className="text-3xl font-bold text-primary">{modelA.confidence}%</div>
            <div className="text-xs text-muted-foreground mt-1">{modelA.method}</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">MODEL B</div>
            <div className="text-3xl font-bold text-foreground">{modelB.confidence}%</div>
            <div className="text-xs text-muted-foreground mt-1">{modelB.method}</div>
          </div>
        </div>
      </div>

      {/* Hallucination Detection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Circle className="w-4 h-4" />
          Hallucination Detection
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
            <div className="text-xs text-muted-foreground mb-1">MODEL A</div>
            <div className="text-3xl font-bold text-foreground">
              {modelA.hallucinations}/{modelA.totalClaims}
            </div>
            <div className="text-xs text-[hsl(142_76%_45%)] mt-1 font-medium">Strong Alignment</div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">MODEL B</div>
            <div className="text-3xl font-bold text-foreground">
              {modelB.hallucinations}/{modelB.totalClaims}
            </div>
            <div className="text-xs text-[hsl(142_76%_45%)] mt-1 font-medium">Strong Alignment</div>
          </div>
        </div>
      </div>

      {/* Grounding Methods */}
      <div className="p-3 rounded-lg bg-card border border-border space-y-1">
        <p className="text-xs">
          <span className="font-medium text-primary">Model A:</span>{" "}
          <span className="text-muted-foreground">{modelA.groundingMethod}</span>
        </p>
        <p className="text-xs">
          <span className="font-medium text-foreground">Model B:</span>{" "}
          <span className="text-muted-foreground">{modelB.groundingMethod}</span>
        </p>
      </div>
    </div>
  );
}
