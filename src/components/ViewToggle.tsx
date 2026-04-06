import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
  view: 'kanban' | 'table';
  onViewChange: (view: 'kanban' | 'table') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange('kanban')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          view === 'kanban'
            ? 'bg-white shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Kanban</span>
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          view === 'table'
            ? 'bg-white shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Table className="w-4 h-4" />
        <span>Table</span>
      </button>
    </div>
  );
}
