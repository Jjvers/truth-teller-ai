import { Search, BarChart3, Shield, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  onExampleClick: (example: string) => void;
}

const examples = [
  {
    text: "How did media cover Prabowo's cabinet formation?",
    category: "Cabinet",
  },
  {
    text: "Media framing of Indonesia's 2024 election results",
    category: "Election",
  },
  {
    text: "Coverage bias on Ganjar vs Prabowo campaigns",
    category: "Campaigns",
  },
  {
    text: "How different outlets reported IKN development?",
    category: "Infrastructure",
  },
];

const features = [
  {
    icon: Search,
    title: "Real-time Sources",
    description: "Retrieves latest news from multiple outlets",
  },
  {
    icon: BarChart3,
    title: "Bias Detection",
    description: "Analyzes media framing across spectrum",
  },
  {
    icon: Shield,
    title: "Fact Grounding",
    description: "Verifies claims against sources",
  },
];

export function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Logo Animation */}
          <div className="relative inline-flex">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome to <span className="text-primary">Sentra</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              Analyze how Indonesian media frames election coverage. Ask any question about media bias and framing.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-3 md:p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all group"
              >
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xs md:text-sm font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Example Queries */}
      <div className="p-4 md:p-6 border-t border-border bg-card/30">
        <p className="text-xs text-muted-foreground mb-3 text-center">
          Try asking about:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
          {examples.map((example) => (
            <button
              key={example.text}
              onClick={() => onExampleClick(example.text)}
              className="group flex items-center justify-between p-3 md:p-4 text-left rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all"
            >
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary mb-1.5">
                  {example.category}
                </span>
                <p className="text-xs md:text-sm text-foreground line-clamp-2">
                  {example.text}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
