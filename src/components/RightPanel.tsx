import { FileText, Newspaper, BarChart3, Info } from "lucide-react";
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
        <div className="space-y-4 max-w-xs">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-foreground font-medium">No analysis yet</p>
            <p className="text-sm text-muted-foreground">
              Ask a question about media framing to see detailed analysis here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Status */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analysis" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-3 bg-background sticky top-0 z-10">
          <TabsList className="bg-muted/50 p-1 rounded-lg w-full grid grid-cols-3 gap-1">
            <TabsTrigger 
              value="analysis" 
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm py-2 gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sources" 
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm py-2 gap-1.5"
            >
              <Newspaper className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Sources</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-background/50 text-[10px]">
                {analysis.sources.length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm py-2 gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="analysis" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {analysis.explanation}
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs md:text-sm text-muted-foreground italic">
                  <span className="text-primary font-medium">Note:</span> This analysis focuses on media framing and emphasis. Some conclusions are interpretive statements and depend on the scope of retrieved articles.
                </p>
              </div>
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
                <div className="text-center py-12">
                  <Newspaper className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No sources were found for this query
                  </p>
                </div>
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
