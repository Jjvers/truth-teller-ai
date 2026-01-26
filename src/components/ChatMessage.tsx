import { User, Bot } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types/analysis";
import { AnalysisPanel } from "./AnalysisPanel";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-secondary border border-border"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-foreground" />
        )}
      </div>

      <div
        className={cn(
          "flex-1 max-w-[85%] rounded-xl p-4",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border"
        )}
      >
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="space-y-4">
            {message.content && (
              <p className="text-sm text-muted-foreground">{message.content}</p>
            )}
            {message.analysis && <AnalysisPanel analysis={message.analysis} />}
          </div>
        )}
      </div>
    </div>
  );
}
