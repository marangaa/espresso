export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    projectType: z.string().optional(),
    message: z.string().min(10)
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = contactSchema.parse(body);

        // Send email using Resend
        await resend.emails.send({
            from: 'Contact Form <contact@yourdomain.com>',
            to: ['team@yourdomain.com'],
            subject: `New Contact Form Submission from ${validatedData.name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.projectType ? `<p><strong>Project Type:</strong> ${validatedData.projectType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `
        });

        // Optional: Store in database ?

        return NextResponse.json(
            { message: 'Form submitted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Invalid form data', errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Failed to send message' },
            { status: 500 }
        );
    }
}