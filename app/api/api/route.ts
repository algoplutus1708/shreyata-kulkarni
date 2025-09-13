// File: app/api/submit-form/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Get the form data from the client's request
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 2. Get your secret IDs from environment variables
    const GOOGLE_FORM_ID = process.env.GOOGLE_FORM_ID;
    const NAME_ENTRY_ID = process.env.NAME_ENTRY_ID;
    const EMAIL_ENTRY_ID = process.env.EMAIL_ENTRY_ID;
    const SUBJECT_ENTRY_ID = process.env.SUBJECT_ENTRY_ID;
    const MESSAGE_ENTRY_ID = process.env.MESSAGE_ENTRY_ID;

    // This is the same URL your code was trying to use
    const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

    // 3. Create the FormData to send to Google
    const formData = new FormData();
    formData.append(NAME_ENTRY_ID as string, name);
    formData.append(EMAIL_ENTRY_ID as string, email);
    formData.append(SUBJECT_ENTRY_ID as string, subject);
    formData.append(MESSAGE_ENTRY_ID as string, message);

    // 4. Send the data from your server to Google's server
    const res = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formData,
    });

    // 5. Check Google's response and tell the client if it was successful
    if (res.ok) {
      return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
    } else {
      // Log the error from Google for debugging
      console.error('Google Form submission failed:', res.statusText);
      return NextResponse.json({ message: 'Google Form submission failed' }, { status: res.status });
    }

  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'An error occurred on the server' }, { status: 500 });
  }
}