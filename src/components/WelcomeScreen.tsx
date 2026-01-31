import { Hand } from "lucide-react";

interface WelcomeScreenProps {
  onExampleClick: (example: string) => void;
}

export function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-start text-left max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
          <span className="text-lg">👋</span>
        </div>
        <span className="text-xs text-muted-foreground">AI</span>
      </div>
      
      <div className="bg-card border border-border rounded-2xl px-5 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Welcome to Sentra!
        </h2>
        <p className="text-sm text-muted-foreground">
          Ask me about media framing in Indonesia's 2024 election coverage.
        </p>
      </div>
    </div>
  );
}
