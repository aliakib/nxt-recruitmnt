"use client";

import { useRouter } from "next/navigation";

// types
import { JobData } from "@/types";

// utils
import getCapitalisedString from "@/utils/capitalise";

// components
import AddContentButton from "./addContent";

interface JobsTableProps {
    jobs: JobData[];
}

export default function JobsTable({ jobs }: JobsTableProps) {

    const router = useRouter();

    const getStatusColor = (status: string) => {
        const map: Record<string, string> = {
            open: "bg-green-100 text-green-700",
            closed: "bg-red-100 text-red-700",
            hold: "bg-gray-100 text-gray-700",
        };
        return map[status] || "bg-gray-100 text-gray-700";
    };

    return (
        <div className="bg-white rounded-xl border border-border overflow-hidden">

            {/* Header */}
            <AddContentButton text="Job" routeTo="/jobs/add" />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-gray-50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-left">Job Title</th>
                            <th className="px-6 py-4 text-left">Department</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Open Positions</th>
                            <th className="px-6 py-4 text-left">Hiring Manager</th>
                            <th className="px-6 py-4 text-left">Applicants</th>
                            <th className="px-6 py-4 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {jobs.map((job, index) => (
                            <tr
                                key={`${job.title}-${index}`}
                                className={`hover:bg-gray-50 transition-colors ${index !== jobs.length - 1 ? "border-b border-border" : ""
                                    }`}
                                onClick={() => {
                                    if (job.status !== "open") return;
                                    router.push("/")
                                }}
                            >
                                <td className="px-6 py-4 font-medium">{job.title}</td>

                                <td className="px-6 py-4 text-muted-foreground">
                                    {job.department}
                                </td>

                                <td className="px-6 py-4">{job.location}</td>

                                <td className="px-6 py-4 font-medium">
                                    {job.openPositions}
                                </td>

                                <td className="px-6 py-4 text-muted-foreground">
                                    {job.hiringManager}
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {job.totalApplicants}
                                </td>
                                <td className="px-6 font-medium">
                                    <span className={` px-6 py-2 rounded-full w-max ${getStatusColor(job.status)}`}>
                                        {getCapitalisedString(job.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {/* Empty state */}
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No jobs available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground">
                Showing {jobs.length} job{jobs.length > 1 ? "s" : ""}
            </div>
        </div>
    );
}