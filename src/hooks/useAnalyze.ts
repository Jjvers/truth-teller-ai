import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult, ChatMessage } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";

export function useAnalyze() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const analyzeClaim = async (claim: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: claim,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<AnalysisResult>(
        "analyze-claim",
        {
          body: { claim },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No response from analysis");
      }

      // Add assistant message with analysis
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        analysis: data,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Analysis error:", error);
      
      // Check for specific error types
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMessage.includes("402") || errorMessage.includes("Payment")) {
        toast({
          title: "Credits Required",
          description: "Please add credits to your workspace to continue using AI analysis.",
          variant: "destructive",
        });
      } else if (errorMessage.includes("429") || errorMessage.includes("Rate")) {
        toast({
          title: "Rate Limited",
          description: "Too many requests. Please wait a moment and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      // Add error message
      const errorAssistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `I encountered an error while analyzing your claim: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorAssistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    analyzeClaim,
    clearMessages,
  };
}
