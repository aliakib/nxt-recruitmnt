import { Candidate } from '@/types';
import { GripVertical, MapPin, Briefcase } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
  isDragging?: boolean;
}

export function CandidateCard({ candidate, onClick, isDragging }: CandidateCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-border p-4 cursor-pointer hover:shadow-md transition-all ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="cursor-grab active:cursor-grabbing mt-1">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate">{candidate.name}</h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <Briefcase className="w-3 h-3" />
            <span className="truncate">{candidate.role}</span>
          </div>
          <div className="text-sm text-muted-foreground truncate">{candidate.company}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{candidate.experience}</span>
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getMatchScoreColor(candidate.matchScore)}`}
              style={{ width: `${candidate.matchScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{candidate.matchScore}%</span>
        </div>
      </div>
    </div>
  );
}
