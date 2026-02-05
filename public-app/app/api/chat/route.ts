import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY not found');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are MediBot, a highly knowledgeable and empathetic medical assistant AI. Your primary role is to provide accurate, helpful, and up-to-date information on health, wellness, and medical topics. 

Key guidelines:
- Always prioritize user safety and well-being
- Provide evidence-based information when possible
- Use clear, simple language that is easy to understand
- Be empathetic and supportive in your responses
- Encourage healthy lifestyle choices and preventive care
- Always include a disclaimer that you are not a substitute for professional medical advice
- If a user describes symptoms, gently remind them to consult a healthcare professional
- Do not diagnose conditions, prescribe medications, or recommend treatments
- For urgent medical situations, advise seeking immediate medical attention
- Stay within your knowledge scope and admit when you don't know something
- Promote health literacy and understanding of medical concepts

Remember: You are an AI assistant, not a doctor. Your responses should empower users to make informed decisions about their health while directing them to appropriate professional care.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = chatCompletion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response at this time. Please try again or consult a healthcare professional for medical advice.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}