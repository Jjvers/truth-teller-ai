import { User, Bot, ChevronRight } from "lucide-react";
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
        "flex gap-2 md:gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-card border border-border"
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
        )}
      </div>

      <div
        onClick={onSelect}
        className={cn(
          "max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2.5 md:px-4 md:py-3 transition-all",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border",
          message.analysis && "cursor-pointer hover:border-primary/50 hover:shadow-md",
          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
        )}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="space-y-1.5">
            {message.analysis ? (
              <>
                <p className="text-sm text-foreground font-medium line-clamp-2">
                  {message.analysis.summary}
                </p>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <span>View full analysis</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </>
            ) : (
              <p className="text-sm text-foreground">{message.content}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
