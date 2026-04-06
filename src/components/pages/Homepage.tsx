"use client";

import { useEffect, useState } from "react";

// types
import { Candidate } from "@/types";

// components
import { FilterBar, FilterState } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { JobOverview } from "@/components/JobOverview";
import { KanbanBoard } from "@/components/KanbanBoard";
import { CandidateDrawer } from "../drawers/CandidateDrawer";

// data
import mockCandidates from "@/data/mockCandidates";

// constants
import { ITEMS_PER_PAGE } from "@/constants";

export default function Homepage() {
    const [searchValue, setSearchValue] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        stage: '',
        experience: '',
        minMatchScore: 0,
    });
    const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showEmptyState, setShowEmptyState] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            candidate.role.toLowerCase().includes(searchValue.toLowerCase()) ||
            candidate.company.toLowerCase().includes(searchValue.toLowerCase());

        const matchesStage = !filters.stage || candidate.stage === filters.stage;

        const matchesExperience = !filters.experience || candidate.experience.includes(filters.experience);

        const matchesScore = candidate.matchScore >= filters.minMatchScore;

        return matchesSearch && matchesStage && matchesExperience && matchesScore;
    });

    const handleStageChange = (candidateId: string, newStage: string) => {
        setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
        );
        if (selectedCandidate?.id === candidateId) {
            setSelectedCandidate((prev) => prev ? { ...prev, stage: newStage } : null);
        }
    };

    const handleClearFilters = () => {
        setSearchValue('');
        setFilters({ stage: '', experience: '', minMatchScore: 0 });
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (showEmptyState) {
        return (
            <>
                <EmptyState
                    type="no-candidates"
                    onAction={() => setShowEmptyState(false)}
                />
            </>
        );
    }

    return (
        <>
            <JobOverview />
            <FilterBar onFilterChange={setFilters} />

            {filteredCandidates.length <= 0 && (
                <EmptyState type="no-results" onAction={handleClearFilters} />
            )}
            {filteredCandidates.length > 0 && (
                <KanbanBoard
                    candidates={filteredCandidates}
                    onCandidateClick={setSelectedCandidate}
                    onStageChange={handleStageChange}
                />
            )}

            <CandidateDrawer
                candidate={selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
                onStageChange={handleStageChange}
            />
        </>
    );
}
