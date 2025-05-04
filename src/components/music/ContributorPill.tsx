
import { Badge } from "@/components/ui/badge";
import { Contributor, ContributorType } from "@/types/music";
import { User, Building2 } from "lucide-react";

interface ContributorPillProps {
  contributor: Contributor;
  type: ContributorType;
  percentage?: number;
  showPercentage?: boolean;
}

export const ContributorPill = ({ 
  contributor, 
  type, 
  percentage, 
  showPercentage = false 
}: ContributorPillProps) => {
  return (
    <Badge 
      variant={type === "writer" ? "default" : "secondary"}
      className="flex items-center gap-1.5 py-1 px-3"
    >
      {type === "writer" ? (
        <User className="h-3 w-3" />
      ) : (
        <Building2 className="h-3 w-3" />
      )}
      <span>{contributor.name}</span>
      {showPercentage && percentage !== undefined && (
        <span className="ml-1 opacity-70">{percentage}%</span>
      )}
    </Badge>
  );
};
