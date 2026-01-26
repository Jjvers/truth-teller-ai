export interface Source {
  url: string;
  title: string;
  snippet: string;
  bias?: string;
  publishedAt?: string;
}

export interface BiasAnalysis {
  leftLeaning: string[];
  centerLeaning: string[];
  rightLeaning: string[];
}

export interface HallucinationCheck {
  allClaimsGrounded: boolean;
  ungroundedClaims: string[];
}

export interface AnalysisResult {
  verdict: "fact" | "hoax" | "mixed" | "unverified";
  confidence: number;
  summary: string;
  explanation: string;
  sources: Source[];
  biasAnalysis: BiasAnalysis;
  hallucinationCheck: HallucinationCheck;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  analysis?: AnalysisResult;
  timestamp: Date;
}
