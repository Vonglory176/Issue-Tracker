import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../prisma/client";

const createIssueSchema = z.object({ // 'zod' is for data validation
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
})

export async function POST(request: NextRequest) {
    // console.log("Hello World")
    // const body = await request.json()
    // return NextResponse.json("Hello World", { status: 200 })

    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)

    // If request has bad data, return 400
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        },
    })

    return NextResponse.json(newIssue, { status: 201 })
}