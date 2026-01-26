import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Source {
  url: string;
  title: string;
  snippet: string;
  bias?: string;
  publishedAt?: string;
}

interface AnalysisResult {
  verdict: "fact" | "hoax" | "mixed" | "unverified";
  confidence: number;
  summary: string;
  explanation: string;
  sources: Source[];
  biasAnalysis: {
    leftLeaning: string[];
    centerLeaning: string[];
    rightLeaning: string[];
  };
  hallucinationCheck: {
    allClaimsGrounded: boolean;
    ungroundedClaims: string[];
  };
}

async function searchNews(query: string, apiKey: string): Promise<Source[]> {
  console.log("Searching news for:", query);
  
  try {
    const response = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `${query} news politics fact check`,
        limit: 10,
        scrapeOptions: {
          formats: ["markdown"],
        },
      }),
    });

    if (!response.ok) {
      console.error("Firecrawl search failed:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("Search results:", data.data?.length || 0, "articles found");

    return (data.data || []).map((result: any) => ({
      url: result.url,
      title: result.title || "Unknown Title",
      snippet: result.markdown?.slice(0, 500) || result.description || "",
      bias: detectBias(result.url),
      publishedAt: result.publishedAt,
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

function detectBias(url: string): string {
  const domain = url.toLowerCase();
  
  // Left-leaning outlets
  if (domain.includes("msnbc") || domain.includes("huffpost") || 
      domain.includes("theguardian") || domain.includes("nytimes") ||
      domain.includes("washingtonpost") || domain.includes("cnn") ||
      domain.includes("vox") || domain.includes("motherjones")) {
    return "left";
  }
  
  // Right-leaning outlets
  if (domain.includes("foxnews") || domain.includes("breitbart") || 
      domain.includes("dailywire") || domain.includes("newsmax") ||
      domain.includes("oann") || domain.includes("nypost") ||
      domain.includes("washingtontimes") || domain.includes("theblaze")) {
    return "right";
  }
  
  // Center outlets
  if (domain.includes("apnews") || domain.includes("reuters") || 
      domain.includes("bbc") || domain.includes("npr") ||
      domain.includes("politico") || domain.includes("axios") ||
      domain.includes("thehill") || domain.includes("usatoday")) {
    return "center";
  }
  
  // Fact-checking sites
  if (domain.includes("snopes") || domain.includes("politifact") || 
      domain.includes("factcheck.org")) {
    return "fact-check";
  }
  
  return "unknown";
}

async function analyzeWithAI(
  claim: string,
  sources: Source[],
  apiKey: string
): Promise<AnalysisResult> {
  console.log("Analyzing claim with AI...");

  const sourcesContext = sources
    .map((s, i) => `[${i + 1}] ${s.title} (${s.bias} bias)\nURL: ${s.url}\nContent: ${s.snippet}`)
    .join("\n\n");

  const systemPrompt = `You are an expert fact-checker and media bias analyst specializing in political news, particularly about Trump and US politics. Your role is to:

1. Analyze claims for factual accuracy using ONLY the provided sources
2. Detect media bias in how different outlets frame the same story
3. Identify any hallucinations (claims not supported by sources)
4. Provide a confidence percentage based on source quality and agreement

CRITICAL RULES:
- ONLY use information from the provided sources
- If sources disagree, note this and explain why
- Be extremely precise about what is FACT vs OPINION vs UNVERIFIED
- Identify which claims are grounded in sources and which are not

Respond in JSON format with this exact structure:
{
  "verdict": "fact" | "hoax" | "mixed" | "unverified",
  "confidence": <number 0-100>,
  "summary": "<one sentence verdict>",
  "explanation": "<detailed explanation citing sources by number>",
  "biasAnalysis": {
    "leftLeaning": ["<how left sources frame this>"],
    "centerLeaning": ["<how center sources frame this>"],
    "rightLeaning": ["<how right sources frame this>"]
  },
  "hallucinationCheck": {
    "allClaimsGrounded": <boolean>,
    "ungroundedClaims": ["<any claims NOT supported by sources>"]
  }
}`;

  const userPrompt = `CLAIM TO VERIFY: "${claim}"

RETRIEVED SOURCES:
${sourcesContext || "No sources found. Mark as unverified."}

Analyze this claim using ONLY the above sources. If no sources are available, verdict must be "unverified".`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI analysis failed:", response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }

    const analysis = JSON.parse(jsonMatch[0]);
    
    return {
      verdict: analysis.verdict || "unverified",
      confidence: Math.min(100, Math.max(0, analysis.confidence || 0)),
      summary: analysis.summary || "Unable to determine verdict",
      explanation: analysis.explanation || "",
      sources,
      biasAnalysis: analysis.biasAnalysis || {
        leftLeaning: [],
        centerLeaning: [],
        rightLeaning: [],
      },
      hallucinationCheck: analysis.hallucinationCheck || {
        allClaimsGrounded: false,
        ungroundedClaims: ["Analysis could not be completed"],
      },
    };
  } catch (error) {
    console.error("AI analysis error:", error);
    return {
      verdict: "unverified",
      confidence: 0,
      summary: "Analysis could not be completed due to an error",
      explanation: `Error during analysis: ${error instanceof Error ? error.message : "Unknown error"}`,
      sources,
      biasAnalysis: {
        leftLeaning: [],
        centerLeaning: [],
        rightLeaning: [],
      },
      hallucinationCheck: {
        allClaimsGrounded: false,
        ungroundedClaims: ["Analysis could not be completed"],
      },
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { claim } = await req.json();

    if (!claim || typeof claim !== "string") {
      return new Response(
        JSON.stringify({ error: "Claim is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!FIRECRAWL_API_KEY) {
      console.error("FIRECRAWL_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Search API not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI API not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing claim:", claim);

    // Step 1: Search for relevant news articles
    const sources = await searchNews(claim, FIRECRAWL_API_KEY);
    console.log("Found", sources.length, "sources");

    // Step 2: Analyze with AI
    const analysis = await analyzeWithAI(claim, sources, LOVABLE_API_KEY);
    console.log("Analysis complete. Verdict:", analysis.verdict, "Confidence:", analysis.confidence);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
