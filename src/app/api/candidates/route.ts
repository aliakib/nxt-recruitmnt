import { NextRequest, NextResponse } from "next/server";
import candidates from "@/data/mockCandidates";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = candidates.slice(start, end);

    return NextResponse.json({
        data: paginatedData,
        total: candidates.length,
        page,
        totalPages: Math.ceil(candidates.length / limit),
    });
}