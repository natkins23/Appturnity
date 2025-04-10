import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    
    // Here we would typically save to a database or send an email
    // For this demo, we'll just log it and return success
    console.log("Contact form submission:", validatedData);
    
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully" 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: "Validation failed", 
        errors: error.errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: "An error occurred while processing your request" 
    }, { status: 500 });
  }
}