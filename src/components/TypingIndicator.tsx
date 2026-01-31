import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border">
        <Bot className="w-4 h-4 text-foreground" />
      </div>
      <div className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="text-xs text-muted-foreground">
          Searching sources & analyzing...
        </span>
      </div>
    </div>
  );
}
