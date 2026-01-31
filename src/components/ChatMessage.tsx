import { User, Bot } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ChatMessage({ message, isSelected, onSelect }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-card border border-border"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-foreground" />
        )}
      </div>

      <div
        onClick={onSelect}
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 transition-all",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border",
          message.analysis && "cursor-pointer hover:border-primary/50",
          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
        )}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="space-y-1">
            {message.content && (
              <p className="text-sm text-foreground font-medium">{message.content}</p>
            )}
            {message.analysis && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {message.analysis.summary.slice(0, 100)}...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
