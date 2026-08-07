/**
 * Web3Forms delivery — called directly from the browser.
 *
 * Web3Forms' free tier rejects server-to-server calls outright ("Use our API
 * in client side ... Pro plan is required" — HTTP 403). Their access key is
 * therefore designed to be public: it ships in the client bundle via
 * NEXT_PUBLIC_WEB3_FORMS, and spam protection comes from the domain
 * allow-list configured in the Web3Forms dashboard, not from key secrecy.
 * Fields are still fully validated (validation.js) before this ever fires.
 *
 * Destination: Web3Forms delivers to the inbox the access key was created
 * for. There is no recipient field — the key IS the destination, so it must
 * belong to the account registered with matlaharshavardhanaraju@gmail.com.
 */

const ENDPOINT = "https://api.web3forms.com/submit";
const TIMEOUT_MS = 10000;

export class EmailError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "EmailError";
    this.code = code;
  }
}

function getAccessKey() {
  const key = process.env.NEXT_PUBLIC_WEB3_FORMS;
  if (!key) {
    throw new EmailError(
      "MAIL_NOT_CONFIGURED",
      "NEXT_PUBLIC_WEB3_FORMS is not set"
    );
  }
  return key;
}

/** "07 August 2026" / "09:43 PM", in the visitor's local time. */
function formatSubmittedAt(date = new Date()) {
  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return { day, time };
}

/**
 * The scannable body. Web3Forms renders each top-level field as a labelled
 * row in its default template; `message` carries the same content as one
 * readable block for clients that don't use the table layout.
 */
function buildFields({ name, email, service, message, day, time }) {
  return {
    subject: `New Portfolio Inquiry — ${service}`,
    from_name: "Portfolio Website",
    replyto: email,

    Name: name,
    Email: email,
    Service: service,
    Message: message || "(no message provided)",
    Submitted: `${day} · ${time}`,
    Source: "Portfolio Website Inquiry",

    message: [
      "NEW PORTFOLIO INQUIRY",
      "",
      `Name:      ${name}`,
      `Email:     ${email}`,
      `Service:   ${service}`,
      "",
      "Message:",
      message || "(no message provided)",
      "",
      `Submitted: ${day}, ${time}`,
      "",
      "----------------------------------------",
      "Portfolio Website Inquiry",
    ].join("\n"),
  };
}

/**
 * Sends one validated inquiry directly to Web3Forms.
 * Throws EmailError with a classifiable code on failure.
 *
 * @param {{name:string,email:string,service:string,message:string}} data
 *        `service` is already the display label (e.g. "Web Application").
 */
export async function sendInquiryEmail({ name, email, service, message }) {
  const accessKey = getAccessKey();
  const { day, time } = formatSubmittedAt();

  const body = {
    access_key: accessKey,
    ...buildFields({ name, email, service, message, day, time }),
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (cause) {
    const aborted = cause?.name === "AbortError";
    throw new EmailError(
      "NETWORK",
      aborted ? "Web3Forms request timed out" : cause?.message || "Web3Forms request failed"
    );
  } finally {
    clearTimeout(timeout);
  }

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    const msg = result?.message || `Web3Forms responded ${response.status}`;
    const code =
      response.status === 401 || response.status === 403
        ? "MAIL_NOT_CONFIGURED"
        : response.status === 400
          ? "SEND_REJECTED"
          : "SEND_FAILED";
    throw new EmailError(code, msg);
  }

  return { id: null, provider: "web3forms" };
}
