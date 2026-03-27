"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FilterChip {
  key: string;
  label: string;
  category: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  onRemove: (chip: FilterChip) => void;
  onClearAll: () => void;
}

export function FilterChips({ chips, onRemove, onClearAll }: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Badge
          key={`${chip.category}-${chip.key}`}
          variant="secondary"
          className="cursor-pointer gap-1 pl-2.5 pr-1.5 py-1 h-auto bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-800"
        >
          <span className="text-xs">{chip.label}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(chip);
            }}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
