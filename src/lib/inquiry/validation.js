/**
 * Inquiry validation — the single definition, shared by the client form and
 * the API route. Pure: no server-only imports, safe to bundle for the client.
 */

export const SERVICE_TYPES = {
  WEB_APPLICATION: "Web Application",
  AUTOMATION: "Automation",
};

export const SERVICE_VALUES = Object.keys(SERVICE_TYPES);

export const LIMITS = {
  name: 100,
  email: 320,
  message: 5000,
};

// Deliberately permissive: catches typos and empty input without rejecting
// valid-but-unusual addresses. Real verification is the reply itself.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * @param {object} input raw form values
 * @returns {{ valid: boolean, errors: Record<string,string>, data: object }}
 *          `data` is trimmed and normalised, safe to pass onward.
 */
export function validateInquiry(input = {}) {
  const data = {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    serviceType: String(input.serviceType ?? "").trim(),
    message: String(input.message ?? "").trim(),
  };

  const errors = {};

  if (!data.name) {
    errors.name = "ENTER YOUR NAME";
  } else if (data.name.length > LIMITS.name) {
    errors.name = "NAME IS TOO LONG";
  }

  if (!data.email) {
    errors.email = "ENTER YOUR EMAIL";
  } else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) {
    errors.email = "ENTER A VALID EMAIL";
  }

  if (!data.serviceType) {
    errors.serviceType = "SELECT A SERVICE TYPE";
  } else if (!SERVICE_VALUES.includes(data.serviceType)) {
    errors.serviceType = "SELECT A SERVICE TYPE";
  }

  if (data.message.length > LIMITS.message) {
    errors.message = "MESSAGE IS TOO LONG";
  }

  return { valid: Object.keys(errors).length === 0, errors, data };
}

/** "WEB_APPLICATION" → "Web Application" */
export function serviceLabel(value) {
  return SERVICE_TYPES[value] ?? value;
}
