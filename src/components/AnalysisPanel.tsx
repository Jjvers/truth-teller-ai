import { FileText, BarChart3, Shield, Newspaper, ChevronDown } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { VerdictBadge } from "./VerdictBadge";
import { ConfidenceMeter } from "./ConfidenceMeter";
import { SourceCard } from "./SourceCard";
import { BiasSpectrum } from "./BiasSpectrum";
import { HallucinationWarning } from "./HallucinationWarning";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnalysisPanelProps {
  analysis: AnalysisResult;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, badge, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors group">
        <div className="flex items-center gap-3">
          <div className="text-primary">{icon}</div>
          <span className="font-medium text-foreground">{title}</span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 pl-2">
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with Verdict & Confidence */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-gradient-to-r from-card to-muted/30 border border-border">
        <VerdictBadge verdict={analysis.verdict} size="lg" />
        <div className="w-full sm:w-48">
          <ConfidenceMeter value={analysis.confidence} size="md" />
        </div>
      </div>

      {/* Summary - Always visible */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-foreground font-medium leading-relaxed">{analysis.summary}</p>
      </div>

      {/* All Sections in Single Scrollable View */}
      <div className="space-y-3">
        {/* Analysis Section */}
        <Section
          title="Detailed Analysis"
          icon={<FileText className="w-5 h-5" />}
          defaultOpen={true}
        >
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
            {analysis.explanation}
          </p>
        </Section>

        {/* Sources Section */}
        <Section
          title="Sources"
          icon={<Newspaper className="w-5 h-5" />}
          badge={`${analysis.sources.length}`}
          defaultOpen={true}
        >
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
        </Section>

        {/* Bias Analysis Section */}
        <Section
          title="Media Bias Analysis"
          icon={<BarChart3 className="w-5 h-5" />}
          defaultOpen={true}
        >
          <BiasSpectrum biasAnalysis={analysis.biasAnalysis} />
        </Section>

        {/* Grounding Check Section */}
        <Section
          title="Hallucination Check"
          icon={<Shield className="w-5 h-5" />}
          defaultOpen={true}
        >
          <HallucinationWarning check={analysis.hallucinationCheck} />
        </Section>
      </div>
    </div>
  );
}
