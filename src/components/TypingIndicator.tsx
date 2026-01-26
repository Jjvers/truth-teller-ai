import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-secondary border border-border">
        <Bot className="w-5 h-5 text-foreground" />
      </div>
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="text-sm text-muted-foreground">
          Searching sources & analyzing claim...
        </span>
      </div>
    </div>
  );
}
