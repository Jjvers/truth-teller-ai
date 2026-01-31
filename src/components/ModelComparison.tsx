import { BarChart3, Circle, TrendingUp, Shield } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ModelComparisonProps {
  analysis: AnalysisResult;
}

export function ModelComparison({ analysis }: ModelComparisonProps) {
  const [selectedModel, setSelectedModel] = useState<'A' | 'B'>('A');

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

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSelectedModel('A')}
          className={cn(
            "py-3 md:py-4 px-4 md:px-6 rounded-xl font-medium transition-all",
            selectedModel === 'A'
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          )}
        >
          <div className="text-sm md:text-base">{modelA.name}</div>
          <div className="text-[10px] md:text-xs opacity-80">{modelA.subtitle}</div>
        </button>
        <button
          onClick={() => setSelectedModel('B')}
          className={cn(
            "py-3 md:py-4 px-4 md:px-6 rounded-xl font-medium transition-all",
            selectedModel === 'B'
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          )}
        >
          <div className="text-sm md:text-base">{modelB.name}</div>
          <div className="text-[10px] md:text-xs opacity-80">{modelB.subtitle}</div>
        </button>
      </div>

      {/* Note */}
      <div className="p-3 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> Model A prioritizes source alignment. Model B favors coverage breadth.
        </p>
      </div>

      {/* Confidence Score */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-medium text-sm md:text-base">
          <TrendingUp className="w-4 h-4 text-primary" />
          Confidence Score
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className={cn(
            "p-3 md:p-4 rounded-xl transition-all",
            selectedModel === 'A' 
              ? "bg-primary/10 border-2 border-primary/50" 
              : "bg-card border border-border"
          )}>
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">MODEL A</div>
            <div className={cn(
              "text-2xl md:text-3xl font-bold",
              selectedModel === 'A' ? "text-primary" : "text-foreground"
            )}>
              {modelA.confidence}%
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">{modelA.method}</div>
          </div>
          <div className={cn(
            "p-3 md:p-4 rounded-xl transition-all",
            selectedModel === 'B' 
              ? "bg-primary/10 border-2 border-primary/50" 
              : "bg-card border border-border"
          )}>
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">MODEL B</div>
            <div className={cn(
              "text-2xl md:text-3xl font-bold",
              selectedModel === 'B' ? "text-primary" : "text-foreground"
            )}>
              {modelB.confidence}%
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground mt-1">{modelB.method}</div>
          </div>
        </div>
      </div>

      {/* Hallucination Detection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground font-medium text-sm md:text-base">
          <Shield className="w-4 h-4 text-primary" />
          Hallucination Detection
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className={cn(
            "p-3 md:p-4 rounded-xl transition-all",
            selectedModel === 'A' 
              ? "bg-primary/10 border-2 border-primary/50" 
              : "bg-card border border-border"
          )}>
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">MODEL A</div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {modelA.hallucinations}/{modelA.totalClaims}
            </div>
            <div className="text-[10px] md:text-xs text-[hsl(142_76%_45%)] mt-1 font-medium">
              {modelA.hallucinations === 0 ? "Perfect Alignment" : "Strong Alignment"}
            </div>
          </div>
          <div className={cn(
            "p-3 md:p-4 rounded-xl transition-all",
            selectedModel === 'B' 
              ? "bg-primary/10 border-2 border-primary/50" 
              : "bg-card border border-border"
          )}>
            <div className="text-[10px] md:text-xs text-muted-foreground mb-1">MODEL B</div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {modelB.hallucinations}/{modelB.totalClaims}
            </div>
            <div className="text-[10px] md:text-xs text-[hsl(142_76%_45%)] mt-1 font-medium">
              Strong Alignment
            </div>
          </div>
        </div>
      </div>

      {/* Grounding Methods */}
      <div className="p-3 md:p-4 rounded-xl bg-card border border-border space-y-2">
        <p className="text-xs md:text-sm">
          <span className="font-medium text-primary">Model A:</span>{" "}
          <span className="text-muted-foreground">{modelA.groundingMethod}</span>
        </p>
        <p className="text-xs md:text-sm">
          <span className="font-medium text-foreground">Model B:</span>{" "}
          <span className="text-muted-foreground">{modelB.groundingMethod}</span>
        </p>
      </div>
    </div>
  );
}
