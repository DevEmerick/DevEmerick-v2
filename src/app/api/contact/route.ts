import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getMissingEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESENT_API_KEY;
  const missing: string[] = [];

  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!process.env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
  if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");

  return missing;
}

export async function POST(request: Request) {
  const missingConfig = getMissingEmailConfig();

  if (missingConfig.length > 0) {
    return NextResponse.json(
      {
        error: `Email service is not configured yet. Missing: ${missingConfig.join(", ")}.`,
      },
      { status: 500 }
    );
  }

  const apiKey = (process.env.RESEND_API_KEY || process.env.RESENT_API_KEY) as string;

  if (!process.env.RESEND_API_KEY && process.env.RESENT_API_KEY) {
    console.warn("Using RESENT_API_KEY fallback. Rename it to RESEND_API_KEY in your environment settings.");
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim() || "";
  const email = payload.email?.trim() || "";
  const message = payload.message?.trim() || "";

  if (name.length < 3) {
    return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL as string;
  const fromEmail = process.env.CONTACT_FROM_EMAIL as string;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        {
          error:
            typeof error === "object" && error !== null && "message" in error
              ? String((error as { message?: unknown }).message)
              : "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
