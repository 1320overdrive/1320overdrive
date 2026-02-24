import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [2], // Default list ID in Brevo — change if yours is different
        updateEnabled: true, // If they already exist, just update instead of error
      }),
    });

    // 204 = already exists and updated, 201 = newly created — both are success
    if (response.status === 201 || response.status === 204) {
      return NextResponse.json({ success: true });
    }

    const data = await response.json();
    throw new Error(data.message || "Brevo error");
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}