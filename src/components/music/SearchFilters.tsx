
import { useState } from "react";
import { Check, ChevronDown, Filter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SearchFiltersType } from "@/types/music";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
}

export const SearchFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  
  const handleFilterTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      type,
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 min-w-4 text-center">
                {activeFilterCount}
              </Badge>
            )}
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-4" align="start">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Filter Results</h3>
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearFilters}
                  className="h-7 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-1.5">
              <h4 className="text-sm font-medium">Content Type</h4>
              <div className="grid grid-cols-2 gap-1 pt-1">
                <Button
                  variant={filters.type === "songs" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleFilterTypeChange("songs")}
                >
                  {filters.type === "songs" && (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  )}
                  Songs
                </Button>
                
                <Button
                  variant={filters.type === "writers" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleFilterTypeChange("writers")}
                >
                  {filters.type === "writers" && (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  )}
                  Writers
                </Button>
                
                <Button
                  variant={filters.type === "publishers" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleFilterTypeChange("publishers")}
                >
                  {filters.type === "publishers" && (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  )}
                  Publishers
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="pt-1">
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Display active filters */}
      {activeFilterCount > 0 && (
        <div className="flex gap-1 flex-wrap">
          {filters.type && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-background"
            >
              <span>Type: {filters.type}</span>
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFilterChange({ ...filters, type: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
