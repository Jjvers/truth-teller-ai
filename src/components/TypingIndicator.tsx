import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-2 md:gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-card border border-border">
        <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2 md:gap-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="text-[10px] md:text-xs text-muted-foreground">
          Analyzing sources...
        </span>
      </div>
    </div>
  );
}
