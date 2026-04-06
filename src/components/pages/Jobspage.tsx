"use client";

import { useEffect, useState } from "react";

// types
import { JobData } from "@/types";

// components

import JobsTable from "../JobsTable"

// constants
import { ITEMS_PER_PAGE } from "@/constants";

const JobsPage = () => {
    const [jobs, setJobs] = useState<JobData[]>([]);
    console.log(jobs)

    const fetchJobs = async (page: number, limit: number): Promise<JobData[]> => {
        try {
            const response = await fetch(`/api/jobs?page=${page}&limit=${limit}`, {cache: 'no-store'});
            const data = await response.json();
            return data.data
        } catch (error) {
            return [];
        }
    }

    useEffect(() => {
        (async () => {
            const res = await fetchJobs(1, ITEMS_PER_PAGE);
            setJobs(res);
        })()
    }, [])

    return (
        <>
            <JobsTable jobs={jobs} />
        </>
    )
}

export default JobsPage