"use client";

import Reveal from "@/components/system/Reveal";
import { useInquiryForm } from "@/lib/inquiry/useInquiryForm";
import { SERVICE_TYPES } from "@/lib/inquiry/validation";

/* Presentational only — all state and submission live in useInquiryForm. */

const SERVICES = Object.entries(SERVICE_TYPES).map(([value, label]) => ({
  value,
  label: label.toUpperCase(),
}));

/* Underline fields: transparent bg, 1px hard rule → 2px toxic on focus. */
const FIELD =
  "w-full bg-transparent border-b border-hard pb-3 text-lg text-pure " +
  "placeholder:text-hard/70 focus:border-b-2 focus:border-toxic transition-colors duration-200 " +
  "disabled:opacity-50";

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mono-meta mb-3 block text-toxic">
      {children}_
    </label>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mono-meta mt-3 text-alert">! {children}</p>;
}

export default function Inquiry() {
  const {
    values,
    errors,
    touched,
    status,
    errorMessage,
    isSending,
    setField,
    handleBlur,
    selectService,
    handleSubmit,
    reset,
    directEmail,
  } = useInquiryForm();

  return (
    <section
      id="inquiry"
      className="border-t border-hard bg-void px-6 py-24 sm:px-10 sm:py-32 lg:px-12"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
        {/* LEFT — sticky heading */}
        <div className="lg:border-r lg:border-hard lg:pr-16">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="mono-meta text-toxic">INQUIRY</p>
              <h2 className="headline mt-6 text-6xl text-pure sm:text-7xl lg:text-8xl">
                Let&apos;s Build.
              </h2>
              <p className="mt-8 max-w-sm text-lg text-hard">
                Tell me what you need. I&apos;ll reply within 48 hours.
              </p>
            </Reveal>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="lg:pl-16">
          {status === "success" ? (
            <div className="border border-hard border-l-4 border-l-toxic p-8">
              <p className="text-lg text-pure">
                <span className="headline mr-2 text-toxic">RECEIVED.</span>
                I&apos;ll reply within 48 hours.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mono-meta group mt-8 inline-flex items-center gap-3 text-hard hover:text-toxic"
              >
                SEND ANOTHER
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  →
                </span>
              </button>
            </div>
          ) : status === "error" ? (
            <div className="border border-hard border-l-4 border-l-alert p-8">
              <p className="text-lg text-pure">{errorMessage}</p>
              <a
                href={`mailto:${directEmail}`}
                className="mono-meta mt-6 inline-block text-toxic underline underline-offset-4"
              >
                {directEmail}
              </a>
              <div>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="mono-meta group mt-8 inline-flex items-center gap-3 text-hard hover:text-toxic"
                >
                  TRY AGAIN
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <fieldset disabled={isSending} className="border-0 p-0">
                <div className="mb-12">
                  <Label htmlFor="name">NAME</Label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={setField("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby="name-error"
                    className={FIELD}
                  />
                  <div id="name-error">
                    <FieldError>{touched.name ? errors.name : null}</FieldError>
                  </div>
                </div>

                <div className="mb-12">
                  <Label htmlFor="email">EMAIL</Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={setField("email")}
                    onBlur={handleBlur("email")}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby="email-error"
                    className={FIELD}
                  />
                  <div id="email-error">
                    <FieldError>{touched.email ? errors.email : null}</FieldError>
                  </div>
                </div>

                {/* Segmented control — instant hard fill, 150ms */}
                <div className="mb-12">
                  <p className="mono-meta mb-3 block text-toxic">SERVICE TYPE_</p>
                  <div
                    role="radiogroup"
                    aria-label="Service type"
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {SERVICES.map((s) => {
                      const active = values.serviceType === s.value;
                      return (
                        <button
                          key={s.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => selectService(s.value)}
                          className={`mono-meta border px-5 py-4 transition-colors duration-150 ${
                            active
                              ? "border-toxic bg-toxic text-void"
                              : "border-hard text-pure hover:border-toxic hover:text-toxic"
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                  <FieldError>
                    {touched.serviceType ? errors.serviceType : null}
                  </FieldError>
                </div>

                <div className="mb-14">
                  <Label htmlFor="message">MESSAGE</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={setField("message")}
                    placeholder="What do you need built or automated?"
                    aria-describedby="message-error"
                    className={`${FIELD} resize-y`}
                  />
                  <div id="message-error">
                    <FieldError>{errors.message}</FieldError>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  aria-busy={isSending}
                  className={`group inline-flex items-center gap-4 text-toxic ${
                    isSending ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  <span className="headline text-4xl sm:text-5xl">
                    {isSending ? "Sending..." : "Send"}
                  </span>
                  {!isSending && (
                    <span className="headline text-4xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-5xl">
                      →
                    </span>
                  )}
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
