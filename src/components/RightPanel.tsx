import { FileText, Newspaper, BarChart3 } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SourceCard } from "./SourceCard";
import { ModelComparison } from "./ModelComparison";

interface RightPanelProps {
  analysis?: AnalysisResult;
}

export function RightPanel({ analysis }: RightPanelProps) {
  if (!analysis) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Ask a question to see the analysis here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Status */}
      <div className="p-4 border-b border-border">
        <p className="text-foreground font-medium">{analysis.summary}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analysis" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-4">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-1 h-auto p-0">
            <TabsTrigger 
              value="analysis" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm gap-2"
            >
              <FileText className="w-4 h-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="sources" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm gap-2"
            >
              <Newspaper className="w-4 h-4" />
              Sources
              <span className="ml-1 px-1.5 py-0.5 rounded bg-muted text-xs">
                {analysis.sources.length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-2 text-sm gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Model Comparison
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analysis" className="flex-1 overflow-hidden mt-0 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-4">
              <p className="text-muted-foreground leading-relaxed">
                {analysis.explanation}
              </p>
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-4">
                This analysis focuses on media framing and emphasis. Some conclusions are interpretive statements and depend on the scope of retrieved articles.
              </p>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sources" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {analysis.sources.length > 0 ? (
                analysis.sources.map((source, index) => (
                  <SourceCard key={source.url} source={source} index={index} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center py-8">
                  No sources were found for this claim.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="comparison" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ModelComparison analysis={analysis} />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
