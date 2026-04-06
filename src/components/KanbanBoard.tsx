import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CandidateCard } from './CandidateCard';
import { Candidate } from "@/types"
import { useRef } from 'react';

interface KanbanBoardProps {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, newStage: string) => void;
}

const stages = [
  { id: 'applied', label: 'Applied', color: 'bg-gray-100' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'bg-blue-100' },
  { id: 'interview', label: 'Interview', color: 'bg-yellow-100' },
  { id: 'offered', label: 'Offered', color: 'bg-green-100' },
  { id: 'hired', label: 'Hired', color: 'bg-purple-100' },
];

interface DraggableCandidateProps {
  candidate: Candidate;
  onClick: () => void;
}

function DraggableCandidate({ candidate, onClick }: DraggableCandidateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'candidate',
    item: { id: candidate.id, currentStage: candidate.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref)

  return (
    <div ref={ref}>
      <CandidateCard candidate={candidate} onClick={onClick} isDragging={isDragging} />
    </div>
  );
}

interface ColumnProps {
  stage: { id: string; label: string; color: string };
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  onDrop: (candidateId: string, newStage: string) => void;
}

function Column({ stage, candidates, onCandidateClick, onDrop }: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'candidate',
    drop: (item: { id: string; currentStage: string }) => {
      if (item.currentStage !== stage.id) {
        onDrop(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(ref)

  return (
    <div
      ref={ref}
      className={`flex-1 min-w-[280px] ${isOver ? 'bg-accent/50' : ''} rounded-xl transition-colors`}
    >
      <div className={`${stage.color} rounded-t-xl px-4 py-3 border border-border`}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{stage.label}</h3>
          <span className="bg-white px-2 py-1 rounded-md text-sm">{candidates.length}</span>
        </div>
      </div>
      <div className="bg-gray-50 rounded-b-xl border border-t-0 border-border p-4 space-y-3 min-h-[600px]">
        {candidates.map((candidate) => (
          <DraggableCandidate
            key={candidate.id}
            candidate={candidate}
            onClick={() => onCandidateClick(candidate)}
          />
        ))}
      </div>
    </div>
  );
}

export function KanbanBoard({ candidates, onCandidateClick, onStageChange }: KanbanBoardProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <Column
            key={stage.id}
            stage={stage}
            candidates={candidates.filter((c) => c.stage === stage.id)}
            onCandidateClick={onCandidateClick}
            onDrop={onStageChange}
          />
        ))}
      </div>
    </DndProvider>
  );
}
