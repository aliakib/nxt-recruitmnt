"use client";

import { useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd-multi-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { useRef } from "react";
import { Candidate } from "@/types";
import { CandidateCard } from "./CandidateCard";

interface KanbanBoardProps {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, newStage: string) => void;
}

const stages = [
  { id: "applied", label: "Applied", color: "bg-gray-100" },
  { id: "shortlisted", label: "Shortlisted", color: "bg-blue-100" },
  { id: "interview", label: "Interview", color: "bg-yellow-100" },
  { id: "offered", label: "Offered", color: "bg-green-100" },
  { id: "hired", label: "Hired", color: "bg-purple-100" },
];

interface DragItem {
  id: string;
  currentStage: string;
}

/* Draggable Candidate Card */

function DraggableCandidate({
  candidate,
  onClick,
}: {
  candidate: Candidate;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "candidate",
    item: {
      id: candidate.id,
      currentStage: candidate.stage,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={`transition-transform ${isDragging ? "opacity-50 scale-95" : ""
        }`}
    >
      <CandidateCard
        candidate={candidate}
        onClick={onClick}
        isDragging={isDragging}
      />
    </div>
  );
}

/* Column Component */

function Column({
  stage,
  candidates,
  onCandidateClick,
  onDrop,
}: {
  stage: { id: string; label: string; color: string };
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  onDrop: (candidateId: string, newStage: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "candidate",
    drop: (item: DragItem) => {
      if (item.currentStage !== stage.id) {
        onDrop(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
      ref={ref}
      className={`
        flex-shrink-0
        w-[85%] sm:w-[60%] md:w-[45%] lg:w-[320px]
        snap-start
        rounded-xl
        transition-colors
        ${isOver ? "bg-accent/50" : ""}
      `}
    >
      {/* Column Header */}
      <div
        className={`${stage.color} sticky top-0 z-10 rounded-t-xl px-4 py-3 border border-border`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{stage.label}</h3>
          <span className="bg-white px-2 py-1 rounded-md text-sm">
            {candidates.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="bg-gray-50 rounded-b-xl border border-t-0 border-border p-4 space-y-3 min-h-[60vh] md:min-h-[500px]">
        {candidates.length === 0 && (
          <div className="text-sm text-muted-foreground text-center py-6 border border-dashed rounded-lg">
            No candidates
          </div>
        )}

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

/* Main Kanban Board */

export function KanbanBoard({
  candidates,
  onCandidateClick,
  onStageChange,
}: KanbanBoardProps) {
  return (
    <DndProvider options={HTML5toTouch}>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
        {stages.map((stage) => (
          <Column
            key={stage.id}
            stage={stage}
            candidates={candidates.filter(
              (c) => c.stage === stage.id
            )}
            onCandidateClick={onCandidateClick}
            onDrop={onStageChange}
          />
        ))}
      </div>
    </DndProvider>
  );
}