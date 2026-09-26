import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white shadow-sm shadow-teal-600/30 transition group-hover:bg-teal-500">
            IR
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
            Image Background Remover
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <a
            href="#tool"
            className="hidden transition hover:text-teal-700 sm:inline"
          >
            Try it free
          </a>
          <Link href="/privacy" className="transition hover:text-teal-700">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-teal-700">
            Terms
          </Link>
        </nav>
      </div>
    </header>
  );
}
