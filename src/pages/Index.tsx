import { useRef, useEffect, useState } from "react";
import { RotateCcw, Circle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { RightPanel } from "@/components/RightPanel";
import { useAnalyze } from "@/hooks/useAnalyze";
import { cn } from "@/lib/utils";

const Index = () => {
  const { messages, isLoading, analyzeClaim, clearMessages, reduceHallucination, setReduceHallucination } = useAnalyze();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false);

  // Get the latest analysis message for the right panel
  const latestAnalysis = messages.filter(m => m.analysis).slice(-1)[0];
  const selectedMessage = selectedMessageId 
    ? messages.find(m => m.id === selectedMessageId && m.analysis)
    : latestAnalysis;

  // Auto-show right panel when there's an analysis
  useEffect(() => {
    if (latestAnalysis?.analysis) {
      setShowRightPanel(true);
    }
  }, [latestAnalysis]);

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
        <div className="px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-foreground tracking-wide">SENTRA</h1>
              <p className="text-[10px] md:text-xs text-primary hidden sm:block">Indonesia Election Media Framing Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearMessages}
                className="text-muted-foreground hover:text-foreground text-xs md:text-sm px-2 md:px-3"
              >
                <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">New Analysis</span>
                <span className="sm:hidden">New</span>
              </Button>
            )}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(142_76%_45%/0.15)] border border-[hsl(142_76%_45%/0.3)]">
              <Circle className="w-2 h-2 fill-[hsl(142_76%_45%)] text-[hsl(142_76%_45%)]" />
              <span className="text-xs font-medium text-[hsl(142_76%_45%)]">System Ready</span>
            </div>
            {/* Mobile toggle for right panel */}
            {selectedMessage?.analysis && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowRightPanel(!showRightPanel)}
                className="md:hidden"
              >
                {showRightPanel ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Panel - Chat */}
        <div className={cn(
          "flex flex-col transition-all duration-300",
          selectedMessage?.analysis ? "w-full md:w-1/2" : "w-full",
          showRightPanel && selectedMessage?.analysis && "hidden md:flex"
        )}>
          <div className="flex-1 overflow-hidden">
            {messages.length === 0 ? (
              <div className="h-full">
                <WelcomeScreen onExampleClick={handleSubmit} />
              </div>
            ) : (
              <ScrollArea className="h-full" ref={scrollRef}>
                <div className="p-4 md:p-6 space-y-4">
                  {messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message}
                      isSelected={selectedMessage?.id === message.id}
                      onSelect={() => {
                        if (message.analysis) {
                          setSelectedMessageId(message.id);
                          setShowRightPanel(true);
                        }
                      }}
                    />
                  ))}
                  {isLoading && <TypingIndicator />}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 border-t border-border bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-end gap-2 mb-2 md:mb-3">
              <Switch
                id="reduce-hallucination"
                checked={reduceHallucination}
                onCheckedChange={setReduceHallucination}
                className="scale-90 md:scale-100"
              />
              <label htmlFor="reduce-hallucination" className="text-[10px] md:text-xs text-muted-foreground cursor-pointer">
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
        {selectedMessage?.analysis && (
          <div className={cn(
            "absolute md:relative inset-0 md:inset-auto md:w-1/2 flex flex-col bg-background border-l border-border transition-transform duration-300",
            showRightPanel ? "translate-x-0" : "translate-x-full md:translate-x-0"
          )}>
            {/* Mobile back button */}
            <div className="md:hidden flex items-center gap-2 p-3 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRightPanel(false)}
                className="text-muted-foreground"
              >
                <X className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
            </div>
            <RightPanel analysis={selectedMessage?.analysis} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
