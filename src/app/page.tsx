import { BackgroundRemover } from "@/components/BackgroundRemover";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          Free · Private · No watermark
        </p>
        <h1 className="font-display mt-4 text-4xl leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Image Background Remover
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Remove backgrounds from product photos, portraits, and creatives in
          one click. Download a clean transparent PNG — no account, no ads, and
          your images are never stored.
        </p>
      </section>

      <div className="mx-auto mt-10 max-w-4xl">
        <BackgroundRemover />
      </div>

      <section className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          {
            title: "No signup",
            body: "Open the page, upload, download. Zero friction for sellers and creators.",
          },
          {
            title: "Privacy first",
            body: "Images are processed in memory only and discarded when the request ends.",
          },
          {
            title: "Transparent PNG",
            body: "Export a watermark-free PNG ready for storefronts, stickers, and thumbnails.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
