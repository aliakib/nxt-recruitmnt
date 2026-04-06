import { Candidate } from '@/types';
import { X, Mail, Phone, MapPin, Calendar, MessageSquare, MoveRight } from 'lucide-react';

interface CandidateDrawerProps {
  candidate: Candidate | null;
  onClose: () => void;
  onStageChange: (candidateId: string, newStage: string) => void;
}

const stages = ['applied', 'shortlisted', 'interview', 'offered', 'hired'];

export function CandidateDrawer({ candidate, onClose, onStageChange }: CandidateDrawerProps) {
  if (!candidate) return null;

  const currentStageIndex = stages.indexOf(candidate.stage);

  const handleMoveStage = (direction: 'forward' | 'backward') => {
    const newIndex = direction === 'forward' ? currentStageIndex + 1 : currentStageIndex - 1;
    if (newIndex >= 0 && newIndex < stages.length) {
      onStageChange(candidate.id, stages[newIndex]);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full sm:w-full md:w-[480px] lg:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold">Candidate Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-medium flex-shrink-0">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-1">{candidate.name}</h3>
              <p className="text-muted-foreground">{candidate.role}</p>
              <p className="text-muted-foreground">{candidate.company}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{candidate.email || 'john.doe@email.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{candidate.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(candidate.skills || ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker']).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Match Score</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    candidate.matchScore >= 90
                      ? 'bg-green-500'
                      : candidate.matchScore >= 75
                      ? 'bg-blue-500'
                      : candidate.matchScore >= 60
                      ? 'bg-yellow-500'
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${candidate.matchScore}%` }}
                ></div>
              </div>
              <span className="text-xl font-semibold">{candidate.matchScore}%</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Interview Status Timeline</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div className="w-0.5 h-12 bg-green-500"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium">Application Submitted</p>
                  <p className="text-sm text-muted-foreground">March 15, 2024</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div className="w-0.5 h-12 bg-green-500"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium">Shortlisted</p>
                  <p className="text-sm text-muted-foreground">March 18, 2024</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    ⏳
                  </div>
                  <div className="w-0.5 h-12 bg-gray-200"></div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium">Technical Interview</p>
                  <p className="text-sm text-muted-foreground">Scheduled for March 25, 2024</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    ○
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-muted-foreground">Final Interview</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Notes</h4>
            <textarea
              className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none resize-none"
              rows={4}
              placeholder="Add notes about this candidate..."
              defaultValue="Strong technical background with experience in modern web frameworks. Good communication skills demonstrated during initial screening call."
            ></textarea>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => handleMoveStage('backward')}
                disabled={currentStageIndex === 0}
                className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Stage
              </button>
              <button
                onClick={() => handleMoveStage('forward')}
                disabled={currentStageIndex === stages.length - 1}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Stage</span>
                <MoveRight className="w-4 h-4" />
              </button>
            </div>
            <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Interview
            </button>
            <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </button>
            <button className="w-full px-4 py-3 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
              Reject Candidate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
