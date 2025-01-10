import { z } from "zod";

export const createIssueSchema = z.object({ // 'zod' is for data validation
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
})