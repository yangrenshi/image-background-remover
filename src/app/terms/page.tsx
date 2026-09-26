import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Image Background Remover",
  description:
    "Terms of Service for Image Background Remover. Free tool provided as-is for lawful background removal use.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
        Legal
      </p>
      <h1 className="font-display mt-3 text-4xl tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: September 26, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Agreement</h2>
          <p>
            By using Image Background Remover (the “Service”), you agree to
            these Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Description of the Service
          </h2>
          <p>
            The Service lets you upload an image, remove its background, preview
            the result, and download a transparent PNG. No account is required.
            The Service is provided free of charge during the MVP stage and may
            change, pause, or end at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Acceptable use
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Upload unlawful, infringing, or harmful content</li>
            <li>Attempt to overload, scrape, or abuse the Service or its APIs</li>
            <li>Bypass rate limits, security controls, or access restrictions</li>
            <li>Reverse engineer the Service except where permitted by law</li>
          </ul>
          <p>
            You must have the rights needed to upload and process each image you
            submit.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            No storage guarantee
          </h2>
          <p>
            Uploaded images and generated outputs are processed in memory and are
            not intended to be retained by the Service. Do not rely on the
            Service as a backup, archive, or file hosting platform. Download
            results you need before leaving the page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Disclaimer of warranties
          </h2>
          <p>
            The Service is provided “as is” and “as available” without warranties
            of any kind, whether express or implied, including merchantability,
            fitness for a particular purpose, and non-infringement. Background
            removal quality may vary by image, and results are not guaranteed to
            be perfect.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, we are not liable for any
            indirect, incidental, special, consequential, or punitive damages, or
            any loss of data, profits, or business arising from your use of the
            Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Changes to the Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes become effective constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p>
            For questions about these Terms, open an issue on{" "}
            <a
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
              href="https://github.com/yangrenshi/image-background-remover"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
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
