import { EmailTemplate } from "@/components/shared/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "onboarding@resend.dev";
const TO_EMAIL = "doanhuuquang.dev@gmail.com";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
};

export async function POST(req: NextRequest) {
  const body: Payload = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: `${body.firstName} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `${body.subject}`,
      react: EmailTemplate({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        message: body.message,
      }),
      replyTo: body.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
