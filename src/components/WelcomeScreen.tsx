import { Shield, Search, BarChart3, Newspaper } from "lucide-react";

interface WelcomeScreenProps {
  onExampleClick: (example: string) => void;
}

const examples = [
  "Did Trump say he would be a dictator on day one?",
  "Is it true that Trump was banned from Twitter permanently?",
  "Did Trump claim the 2020 election was stolen?",
  "Has Trump been indicted multiple times?",
];

const features = [
  {
    icon: Search,
    title: "RAG-Powered Search",
    description: "Retrieves relevant articles from multiple news sources in real-time",
  },
  {
    icon: BarChart3,
    title: "Media Bias Analysis",
    description: "Compares how left, center, and right outlets frame the same story",
  },
  {
    icon: Shield,
    title: "Hallucination Detection",
    description: "Ensures every claim is grounded in retrieved sources",
  },
  {
    icon: Newspaper,
    title: "Source Attribution",
    description: "Full transparency with clickable source citations",
  },
];

export function WelcomeScreen({ onExampleClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6 animate-pulse-glow">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Media Bias Analyzer
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Fact-check political claims with AI-powered RAG analysis. 
          Compare how different media outlets report the same story.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl w-full">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
          >
            <feature.icon className="w-6 h-6 text-primary mb-3 mx-auto" />
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Example Queries */}
      <div className="w-full max-w-2xl">
        <p className="text-sm text-muted-foreground mb-3">Try an example:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => onExampleClick(example)}
              className="p-3 text-left text-sm rounded-lg border border-border bg-card/30 hover:bg-card hover:border-primary/50 transition-all text-foreground"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
