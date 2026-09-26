import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Image Background Remover",
  description:
    "Privacy Policy for Image Background Remover. We process images in memory only and do not store, log, or share your uploads.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
        Legal
      </p>
      <h1 className="font-display mt-3 text-4xl tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: September 26, 2026</p>

      <div className="prose-legal mt-10 space-y-8 text-base leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          <p>
            Image Background Remover (“we”, “our”, or “the Service”) is a free
            online tool that removes image backgrounds. This Privacy Policy
            explains how we handle information when you use the Service. We
            designed the product around a simple rule:{" "}
            <strong>your images are processed in memory and are not retained.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Images and file contents
          </h2>
          <p>
            When you upload an image, it is transferred over HTTPS and processed
            in memory to generate a transparent PNG. We do{" "}
            <strong>not</strong> write uploaded images or results to a database,
            object storage bucket, or long-term log archive. After processing
            completes (or fails), image data associated with that request is
            discarded.
          </p>
          <p>
            We do not use your images to train models, build portfolios, or
            share samples with third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Personal data we do not collect
          </h2>
          <p>
            The Service does not require registration. We do not ask for your
            name, email address, phone number, or account credentials. We do not
            intentionally collect device fingerprints for advertising profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Technical and hosting data
          </h2>
          <p>
            Like most websites, our hosting and CDN providers (for example
            Cloudflare) may process standard request metadata such as IP
            address, user agent, and timestamps to deliver content securely,
            prevent abuse, and keep the Service available. That infrastructure
            telemetry is separate from your image pixels and is not used to
            reconstruct or retain your uploads.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Cookies</h2>
          <p>
            The MVP does not use advertising cookies or analytics cookies. If
            essential cookies are required by the hosting platform for security
            or load balancing, they are limited to operating the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            International users (GDPR / CCPA)
          </h2>
          <p>
            Because image contents are not persisted, we generally do not store
            personal data derived from your uploads. If you believe we hold
            information about you through hosting logs, you may contact us to
            request clarification. California residents may request information
            about categories of personal information collected; for this MVP,
            we do not sell personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Changes to this policy
          </h2>
          <p>
            We may update this Privacy Policy as the Service evolves. The
            “Last updated” date at the top of this page will change when we do.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p>
            Questions about privacy can be opened via the project repository on
            GitHub:{" "}
            <a
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
              href="https://github.com/yangrenshi/image-background-remover"
              target="_blank"
              rel="noreferrer"
            >
              yangrenshi/image-background-remover
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-12">
        <Link href="/" className="text-sm font-semibold text-teal-700 hover:underline">
          ← Back to Image Background Remover
        </Link>
      </p>
    </article>
  );
}
