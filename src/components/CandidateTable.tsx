import { MoreVertical, ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Candidate } from '@/types';
import { ITEMS_PER_PAGE } from '@/constants';
import AddContentButton from './addContent';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void
}

interface CandidateTableProps {
  candidates: Candidate[];
  onCandidateClick: (candidate: Candidate) => void;
  withActions?: boolean;
  pagination: Pagination
}

export function CandidateTable({
  candidates,
  onCandidateClick,
  withActions = true,
  pagination
}: CandidateTableProps) {

  const { currentPage, totalPages, totalItems, onPageChange } = pagination || {};

  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      applied: 'bg-gray-100 text-gray-700',
      shortlisted: 'bg-blue-100 text-blue-700',
      interview: 'bg-yellow-100 text-yellow-700',
      offered: 'bg-green-100 text-green-700',
      hired: 'bg-purple-100 text-purple-700',
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      applied: 'Applied',
      shortlisted: 'Shortlisted',
      interview: 'Interview',
      offered: 'Offered',
      hired: 'Hired',
    };
    return labels[stage] || stage;
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <AddContentButton text='Candidate' routeTo='/candidates/add' />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <span>Candidate Name</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">Current Role / Company</th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('experience')}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <span>Experience</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('matchScore')}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <span>Match Score</span>
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Last Activity</th>
              {withActions && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr
                key={candidate.id}
                onClick={() => onCandidateClick(candidate)}
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${index !== candidates.length - 1 ? 'border-b border-border' : ''
                  }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div>{candidate.role}</div>
                    <div className="text-sm text-muted-foreground">{candidate.company}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{candidate.experience}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${candidate.matchScore >= 90
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
                    <span className="font-medium">{candidate.matchScore}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStageColor(candidate.stage)}`}>
                    {getStageLabel(candidate.stage)}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm">{candidate.lastActivity}</td>
                {withActions && <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={pagination?.currentPage === 1}
            className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: pagination?.totalPages || ITEMS_PER_PAGE }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => pagination?.onPageChange(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages || ITEMS_PER_PAGE))}
            disabled={currentPage === pagination?.totalPages}
            className="px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
