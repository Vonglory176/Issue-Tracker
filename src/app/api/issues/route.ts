import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { createIssueSchema } from "../../validationSchemas";

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