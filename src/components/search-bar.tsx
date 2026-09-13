'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults?: number;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  totalResults
}: SearchBarProps) {
  return (
    <div className="w-full rounded-[16px] border border-[#151515] bg-[#E7E3DB] p-4 shadow-[2px_2px_0px_#151515]">
      {/* Search Input - Retro Editorial Style */}
      <div className="relative w-full">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-[#151515]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search actors or dialogue quotes..."
          className="w-full pl-10 pr-24 py-2.5 rounded-[10px] border border-[#151515] bg-[#F3F0E8] text-sm text-[#151515] placeholder:text-[#A8A39A] focus:outline-none focus:ring-1 focus:ring-[#151515] transition-all font-medium"
        />

        {/* Clear & Result Count in Search Bar */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {totalResults !== undefined && (
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E7E3DB] text-[#151515] border border-[#151515] hidden sm:inline-block">
              {totalResults} {totalResults === 1 ? 'VOICE' : 'VOICES'}
            </span>
          )}
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#151515] hover:text-[#D97745] p-1 rounded-full hover:bg-[#E7E3DB] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
