import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAILS = [
  "sara.palacios@gildhq.com",
  "dianne.erwin@gildhq.com",
  "antonio.moreno@gildhq.com",
];

function formatField(label: string, value: unknown): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return "";
  const display = Array.isArray(value) ? value.join(", ") : String(value);
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;color:#6b7280;width:180px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:8px 12px;font-size:14px;color:#111827;vertical-align:top;">${display}</td>
  </tr>`;
}

export async function POST(request: Request) {
  const body = await request.json();

  // Always log for debugging
  console.log("GILD application submission", body);

  // Skip email sending if no API key is configured yet
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_REPLACE")) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  const {
    firstName, lastName, workEmail, linkedinUrl,
    jobTitle, company, cities, location,
    companyType, engagement, aiWork,
    pressingChallenge, networkGoals, memberContribution,
    challenge, community, source,
  } = body;

  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";
  const subject = `New GILD Application — ${fullName}${company ? ` · ${company}` : ""}`;

  const rows = [
    formatField("Name", fullName),
    formatField("Email", workEmail),
    formatField("Job Title", jobTitle),
    formatField("Company", company),
    formatField("LinkedIn", linkedinUrl ? `<a href="${linkedinUrl}" style="color:#5a9a9b;">${linkedinUrl}</a>` : ""),
    formatField("Location", location),
    formatField("Company Type", companyType),
    formatField("Cities", cities),
    formatField("Engagement", engagement),
    formatField("Community", community),
    formatField("AI Work", aiWork),
    formatField("Pressing Challenge", pressingChallenge || challenge),
    formatField("Network Goals", networkGoals),
    formatField("Member Contribution", memberContribution),
    formatField("Source", source),
  ].filter(Boolean).join("\n");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="background:#0d1822;padding:24px 32px;">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.5);">GILD Network</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#ffffff;">New Application</h1>
          </td>
        </tr>

        <!-- Applicant highlight -->
        <tr>
          <td style="padding:24px 32px 0;border-bottom:1px solid #f3f4f6;">
            <p style="margin:0 0 4px;font-size:20px;font-weight:600;color:#111827;">${fullName}</p>
            ${jobTitle ? `<p style="margin:0 0 2px;font-size:14px;color:#6b7280;">${jobTitle}${company ? ` · ${company}` : ""}</p>` : ""}
            ${workEmail ? `<p style="margin:0 0 16px;font-size:13px;color:#5a9a9b;">${workEmail}</p>` : ""}
          </td>
        </tr>

        <!-- Fields table -->
        <tr>
          <td style="padding:16px 20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f3f4f6;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">Submitted via gildhq.com · GILD application form</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "GILD Applications <onboarding@resend.dev>",
      to: NOTIFY_EMAILS,
      subject,
      html,
      replyTo: workEmail || undefined,
    });
  } catch (err) {
    console.error("Failed to send notification email:", err);
    // Don't fail the user-facing request if email fails
  }

  return NextResponse.json({ success: true });
}
