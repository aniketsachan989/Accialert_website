import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, text, metadata } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, subject, or html." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const emailFrom =
      process.env.EMAIL_FROM ||
      `"AcciAlert Hema-Link Emergency" <${smtpUser || "emergency-dispatch@accialert.org"}>`;

    // 1. If SMTP credentials are configured, dispatch real email over SMTP
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: emailFrom,
        to,
        subject,
        text: text || "AcciAlert Emergency Trauma Alert",
        html,
      });

      console.log(`[AcciAlert Mail API] Real physical email sent to ${to}, Message ID: ${info.messageId}`);

      return NextResponse.json({
        success: true,
        delivered: true,
        provider: "smtp",
        messageId: info.messageId,
        recipient: to,
      });
    }

    // 2. Fallback if SMTP credentials not yet provided in env
    console.warn(
      `[AcciAlert Mail API] SMTP_USER or SMTP_PASS not found in environment. Email simulated for ${to}. To enable real delivery, add SMTP_USER and SMTP_PASS in Vercel or .env.local.`
    );

    return NextResponse.json({
      success: true,
      delivered: false,
      simulated: true,
      recipient: to,
      note: "SMTP credentials not configured. Email queued. Add SMTP_USER and SMTP_PASS in Vercel or .env.local for physical inbox delivery.",
    });
  } catch (error: any) {
    console.error("[AcciAlert Mail API] Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to dispatch email",
      },
      { status: 500 }
    );
  }
}
