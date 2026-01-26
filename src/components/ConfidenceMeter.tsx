import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  value: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ConfidenceMeter({ value, showLabel = true, size = "md" }: ConfidenceMeterProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const getColorClass = () => {
    if (clampedValue >= 70) return "bg-confidence-high";
    if (clampedValue >= 40) return "bg-confidence-medium";
    return "bg-confidence-low";
  };

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className={cn("flex justify-between items-center", textSizes[size])}>
          <span className="text-muted-foreground font-medium">Model Confidence</span>
          <span className="font-mono font-bold text-foreground">{clampedValue}%</span>
        </div>
      )}
      <div className={cn("confidence-meter", sizeClasses[size])}>
        <div
          className={cn("confidence-meter-fill", getColorClass())}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
