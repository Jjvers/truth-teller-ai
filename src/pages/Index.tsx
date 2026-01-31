import { useRef, useEffect, useState } from "react";
import { RotateCcw, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { RightPanel } from "@/components/RightPanel";
import { useAnalyze } from "@/hooks/useAnalyze";

const Index = () => {
  const { messages, isLoading, analyzeClaim, clearMessages, reduceHallucination, setReduceHallucination } = useAnalyze();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  // Get the latest analysis message for the right panel
  const latestAnalysis = messages.filter(m => m.analysis).slice(-1)[0];
  const selectedMessage = selectedMessageId 
    ? messages.find(m => m.id === selectedMessageId && m.analysis)
    : latestAnalysis;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (message: string) => {
    analyzeClaim(message);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-wide">SENTRA</h1>
              <p className="text-xs text-primary">Indonesia Election Media Framing Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(142_76%_45%/0.15)] border border-[hsl(142_76%_45%/0.3)]">
              <Circle className="w-2 h-2 fill-[hsl(142_76%_45%)] text-[hsl(142_76%_45%)]" />
              <span className="text-xs font-medium text-[hsl(142_76%_45%)]">System Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat */}
        <div className="w-1/2 border-r border-border flex flex-col">
          <div className="flex-1 overflow-hidden">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center p-6">
                <WelcomeScreen onExampleClick={handleSubmit} />
              </div>
            ) : (
              <ScrollArea className="h-full" ref={scrollRef}>
                <div className="p-6 space-y-4">
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message}
                      isSelected={selectedMessage?.id === message.id}
                      onSelect={() => message.analysis && setSelectedMessageId(message.id)}
                    />
                  ))}
                  {isLoading && <TypingIndicator />}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-end gap-2 mb-3">
              <Switch
                id="reduce-hallucination"
                checked={reduceHallucination}
                onCheckedChange={setReduceHallucination}
              />
              <label htmlFor="reduce-hallucination" className="text-xs text-muted-foreground cursor-pointer">
                Reduce Hallucination
              </label>
            </div>
            <ChatInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Ask about media framing..."
            />
          </div>
        </div>

        {/* Right Panel - Analysis */}
        <div className="w-1/2 flex flex-col bg-background">
          <RightPanel analysis={selectedMessage?.analysis} />
        </div>
      </main>
    </div>
  );
};

export default Index;
