"use client";

import { useCallback, useRef, useState } from "react";
import { validateInquiry, serviceLabel } from "./validation";
import { sendInquiryEmail, EmailError } from "./web3forms";

/**
 * All inquiry form state and submission behaviour, kept out of the view.
 * The component that uses this stays presentational.
 */

const EMPTY = { name: "", email: "", serviceType: "", message: "" };

const DIRECT_EMAIL = "matlaharshavardhanaraju@gmail.com";

/** EmailError codes → user-facing copy. Raw provider errors are never surfaced. */
const ERROR_MESSAGES = {
  MAIL_NOT_CONFIGURED: `EMAIL ISN'T CONFIGURED RIGHT NOW. REACH ME DIRECTLY AT ${DIRECT_EMAIL}.`,
  SEND_REJECTED: `THAT SUBMISSION WAS REJECTED. CHECK YOUR EMAIL, OR WRITE TO ME AT ${DIRECT_EMAIL}.`,
  SEND_FAILED: `THE MESSAGE COULDN'T BE SENT. TRY AGAIN, OR EMAIL ME AT ${DIRECT_EMAIL}.`,
  NETWORK: `COULDN'T REACH THE MAIL SERVICE. CHECK YOUR CONNECTION, OR EMAIL ME AT ${DIRECT_EMAIL}.`,
  UNEXPECTED: `SOMETHING FAILED ON MY END. EMAIL ME DIRECTLY AT ${DIRECT_EMAIL}.`,
};

export function useInquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // Guards against a double submit landing before `status` has re-rendered.
  const inFlight = useRef(false);

  const clearError = useCallback((key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });
  }, []);

  const setField = useCallback(
    (key) => (event) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [key]: value }));
      // Errors clear as they're corrected, never appear on first keystroke.
      clearError(key);
    },
    [clearError]
  );

  const handleBlur = useCallback(
    (key) => () => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      setValues((current) => {
        const { errors: found } = validateInquiry(current);
        setErrors((prev) => (found[key] ? { ...prev, [key]: found[key] } : prev));
        return current;
      });
    },
    []
  );

  const selectService = useCallback(
    (value) => {
      setValues((prev) => ({ ...prev, serviceType: value }));
      clearError("serviceType");
    },
    [clearError]
  );

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (inFlight.current) return; // no duplicate submissions

      const { valid, errors: found, data } = validateInquiry(values);
      setErrors(found);
      setTouched({ name: true, email: true, serviceType: true, message: true });
      if (!valid) return;

      inFlight.current = true;
      setStatus("sending");
      setErrorMessage("");

      try {
        await sendInquiryEmail({
          name: data.name,
          email: data.email,
          service: serviceLabel(data.serviceType),
          message: data.message,
        });

        // Fire-and-forget: n8n automation is a bonus channel, never blocks
        // or fails the user-facing submission (the email above already sent).
        fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(() => {});

        // Clear every field on success.
        setValues(EMPTY);
        setErrors({});
        setTouched({});
        setStatus("success");
      } catch (error) {
        const code = error instanceof EmailError ? error.code : "UNEXPECTED";
        setErrorMessage(ERROR_MESSAGES[code] || ERROR_MESSAGES.UNEXPECTED);
        setStatus("error");
      } finally {
        inFlight.current = false;
      }
    },
    [values]
  );

  return {
    values,
    errors,
    touched,
    status,
    errorMessage,
    isSending: status === "sending",
    setField,
    handleBlur,
    selectService,
    handleSubmit,
    reset,
    directEmail: DIRECT_EMAIL,
  };
}
