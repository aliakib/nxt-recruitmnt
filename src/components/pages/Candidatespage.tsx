"use client";

import { useEffect, useState } from "react";

// types
import { Candidate } from "@/types";

// components
import { CandidateTable } from "../CandidateTable"
import { CandidateDrawer } from "../drawers/CandidateDrawer";

// constants
import { ITEMS_PER_PAGE } from "@/constants";

const Candidatespage = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalData, setTotalData] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    const handleStageChange = (candidateId: string, newStage: string) => {
        setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
        );
        if (selectedCandidate?.id === candidateId) {
            setSelectedCandidate((prev) => prev ? { ...prev, stage: newStage } : null);
        }
    };

    const loadCandidates = async (page: number) => {
        const response = await fetch(`/api/candidates?page=${page}&limit=${ITEMS_PER_PAGE}`)
        const data = await response.json();
        setCandidates(data.data);
        setTotalPages(data.totalPages);
        setTotalData(data.total);
        setPage(data.page);
    }

    useEffect(() => {
        loadCandidates(page);
    }, []);

    return (
        <>
            <CandidateTable
                candidates={candidates}
                onCandidateClick={setSelectedCandidate}
                withActions={false}
                pagination={{
                    currentPage: page,
                    totalPages,
                    totalItems: totalData,
                    onPageChange: loadCandidates
                }}
            />
            <CandidateDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} onStageChange={handleStageChange} />
        </>
    )
}

export default Candidatespage