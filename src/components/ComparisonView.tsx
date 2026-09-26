"use client";

type ComparisonViewProps = {
  originalUrl: string;
  resultUrl: string;
};

export function ComparisonView({ originalUrl, resultUrl }: ComparisonViewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Original
        </div>
        <div className="flex min-h-56 items-center justify-center bg-slate-50 p-4 sm:min-h-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt="Original uploaded image"
            className="max-h-80 w-auto max-w-full object-contain"
          />
        </div>
      </figure>

      <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Background removed
        </div>
        <div className="checkerboard flex min-h-56 items-center justify-center p-4 sm:min-h-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="Image with background removed"
            className="max-h-80 w-auto max-w-full object-contain"
          />
        </div>
      </figure>
    </div>
  );
}
