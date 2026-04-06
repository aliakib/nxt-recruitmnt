import { JobData } from "@/types";

const mockJobs: JobData[] = [
    {
        id: "1",
        title: 'Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        openPositions: 3,
        hiringManager: 'Sarah Johnson',
        totalApplicants: 127,
        status: 'open'
    },
    {
        id: "2",
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'Remote',
        openPositions: 2,
        hiringManager: 'Elison Musk',
        totalApplicants: 127,
        status: 'closed'
    },
    {
        id: "3",
        title: 'Cloud Engineer',
        department: 'DevOps',
        location: 'Office - New York',
        openPositions: 1,
        hiringManager: 'Dexter Morg',
        totalApplicants: 127,
        status: 'hold'
    }
]

export default mockJobs;