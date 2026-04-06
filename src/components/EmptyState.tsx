import { UserPlus, Users } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-candidates' | 'no-results';
  onAction?: () => void;
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  if (type === 'no-candidates') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No candidates yet</h3>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          Start building your talent pipeline by adding candidates to this position
        </p>
        <button
          onClick={onAction}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Seed Data
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Users className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No results found</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        We couldn't find any candidates matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={onAction}
        className="px-6 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
