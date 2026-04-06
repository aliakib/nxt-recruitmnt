import { NextRequest, NextResponse } from "next/server";
import jobs from "@/data/mockJobs";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = jobs.slice(start, end);

    return NextResponse.json({
        data: paginatedData,
        total: jobs.length,
        page,
        totalPages: Math.ceil(jobs.length / limit),
    });
}