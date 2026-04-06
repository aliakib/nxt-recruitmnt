import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  stage: string;
  experience: string;
  minMatchScore: number;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    stage: '',
    experience: '',
    minMatchScore: 0,
  });

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilter = (key: keyof FilterState) => {
    const defaultValue = key === 'minMatchScore' ? 0 : '';
    updateFilter(key, defaultValue);
  };

  const hasActiveFilters = filters.stage || filters.experience || filters.minMatchScore > 0;

  const clearAllFilters = () => {
    const defaultFilters = { stage: '', experience: '', minMatchScore: 0 };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters:</span>
        </div>

        <select
          value={filters.stage}
          onChange={(e) => updateFilter('stage', e.target.value)}
          className="px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none"
        >
          <option value="">All Stages</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview</option>
          <option value="offered">Offered</option>
          <option value="hired">Hired</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => updateFilter('experience', e.target.value)}
          className="px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none"
        >
          <option value="">All Experience</option>
          <option value="0-2">0-2 years</option>
          <option value="2-4">2-4 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-7">5-7 years</option>
          <option value="10+">10+ years</option>
        </select>

        <div className="flex items-center gap-3">
          <label className="text-sm text-muted-foreground">Match Score:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minMatchScore}
            onChange={(e) => updateFilter('minMatchScore', parseInt(e.target.value))}
            className="w-32"
          />
          <span className="text-sm font-medium w-12">{filters.minMatchScore}%</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="ml-auto px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.stage && (
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              <span>Stage: {filters.stage}</span>
              <button onClick={() => clearFilter('stage')} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.experience && (
            <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <span>Experience: {filters.experience} years</span>
              <button onClick={() => clearFilter('experience')} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.minMatchScore > 0 && (
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              <span>Match Score: {filters.minMatchScore}%+</span>
              <button onClick={() => clearFilter('minMatchScore')} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
