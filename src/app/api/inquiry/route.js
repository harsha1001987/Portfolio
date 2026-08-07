import { validateInquiry, serviceLabel } from "@/lib/inquiry/validation";

/**
 * Forwards a validated inquiry to the n8n automation webhook. Server-only:
 * N8N_WEBHOOK_URL has no NEXT_PUBLIC_ prefix, so it never reaches the client
 * bundle. This runs alongside (not instead of) the direct Web3Forms send —
 * see useInquiryForm.js.
 */
export async function POST(request) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ success: false, error: "NOT_CONFIGURED" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const { valid, errors, data } = validateInquiry(body ?? {});
  if (!valid) {
    return Response.json({ success: false, error: "INVALID", errors }, { status: 400 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        service: serviceLabel(data.serviceType),
        message: data.message,
        submittedAt: new Date().toISOString(),
        source: "Portfolio Website Inquiry",
      }),
    });

    if (!response.ok) {
      return Response.json({ success: false, error: "WEBHOOK_FAILED" }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "WEBHOOK_FAILED" }, { status: 502 });
  }
}
