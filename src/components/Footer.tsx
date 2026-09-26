import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Free image background remover — no signup, no watermark, no storage.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="transition hover:text-teal-700">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-teal-700">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
