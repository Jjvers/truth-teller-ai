import { FileText, BarChart3, Shield, Newspaper } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { VerdictBadge } from "./VerdictBadge";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { SourceCard } from "./SourceCard";
import { BiasSpectrum } from "./BiasSpectrum";
import { HallucinationWarning } from "./HallucinationWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisPanelProps {
  analysis: AnalysisResult;
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Verdict */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <VerdictBadge verdict={analysis.verdict} size="lg" />
        <div className="w-full sm:w-48">
          <ConfidenceMeter value={analysis.confidence} size="md" />
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg bg-card border border-border">
        <p className="text-foreground font-medium">{analysis.summary}</p>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="explanation" className="flex items-center gap-2 text-xs sm:text-sm">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center gap-2 text-xs sm:text-sm">
            <Newspaper className="w-4 h-4" />
            <span className="hidden sm:inline">Sources</span>
            <span className="text-xs opacity-70">({analysis.sources.length})</span>
          </TabsTrigger>
          <TabsTrigger value="bias" className="flex items-center gap-2 text-xs sm:text-sm">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Bias</span>
          </TabsTrigger>
          <TabsTrigger value="grounding" className="flex items-center gap-2 text-xs sm:text-sm">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Grounding</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="explanation" className="mt-4">
          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {analysis.explanation}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="mt-4">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {analysis.sources.length > 0 ? (
                analysis.sources.map((source, index) => (
                  <SourceCard key={source.url} source={source} index={index} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No sources were found for this claim.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="bias" className="mt-4">
          <BiasSpectrum biasAnalysis={analysis.biasAnalysis} />
        </TabsContent>

        <TabsContent value="grounding" className="mt-4">
          <HallucinationWarning check={analysis.hallucinationCheck} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
