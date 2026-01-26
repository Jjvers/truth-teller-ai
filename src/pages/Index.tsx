import { useRef, useEffect } from "react";
import { Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useAnalyze } from "@/hooks/useAnalyze";

const Index = () => {
  const { messages, isLoading, analyzeClaim, clearMessages } = useAnalyze();
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">VerifyAI</h1>
              <p className="text-xs text-muted-foreground">Media Bias Analyzer</p>
            </div>
          </div>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6 flex flex-col">
        {messages.length === 0 ? (
          <WelcomeScreen onExampleClick={handleSubmit} />
        ) : (
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        <div className="mt-auto pt-4">
          <ChatInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Enter a political claim to fact-check..."
          />
          <p className="text-xs text-muted-foreground text-center mt-3">
            Powered by RAG with real-time source retrieval. Results may vary based on available sources.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
