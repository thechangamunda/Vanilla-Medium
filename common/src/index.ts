import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export type SigninInput = z.infer<typeof signinInput>

export const createpostInput = z.object({
    title: z.string(),
    content: z.string()
})

export type CreatepostInput = z.infer<typeof createpostInput>

export const updatepostInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type UpdatepostInput = z.infer<typeof updatepostInput>

