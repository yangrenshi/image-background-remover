"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { compressImage } from "@/lib/compressImage";
import {
  buildDownloadFilename,
  removeBackground,
} from "@/lib/removeBackground";
import { validateImageFile } from "@/lib/validateImage";
import { ComparisonView } from "./ComparisonView";
import { UploadZone } from "./UploadZone";

type Status = "idle" | "processing" | "done" | "error";

export function BackgroundRemover() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [progressLabel, setProgressLabel] = useState("");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const originalUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    originalUrlRef.current = originalUrl;
  }, [originalUrl]);

  useEffect(() => {
    resultUrlRef.current = resultUrl;
  }, [resultUrl]);

  useEffect(() => {
    return () => {
      if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const clearObjectUrls = () => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setOriginalUrl(null);
    setResultUrl(null);
    setResultBlob(null);
  };

  const reset = () => {
    clearObjectUrls();
    setError(null);
    setProgressLabel("");
    setStatus("idle");
  };

  const handleFile = useCallback(async (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.ok) {
      setError(validation.message);
      setStatus("error");
      return;
    }

    clearObjectUrls();
    setError(null);
    setStatus("processing");

    const previewUrl = URL.createObjectURL(file);
    originalUrlRef.current = previewUrl;
    setOriginalUrl(previewUrl);

    try {
      setProgressLabel("Compressing image…");
      const compressed = await compressImage(file);

      setProgressLabel("Removing background…");
      const blob = await removeBackground(compressed);
      const outUrl = URL.createObjectURL(blob);

      resultUrlRef.current = outUrl;
      setResultBlob(blob);
      setResultUrl(outUrl);
      setProgressLabel("");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setProgressLabel("");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while removing the background.",
      );
    }
  }, []);

  const handleDownload = () => {
    if (!resultBlob || !resultUrl) return;
    const anchor = document.createElement("a");
    anchor.href = resultUrl;
    anchor.download = buildDownloadFilename();
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  return (
    <section id="tool" className="scroll-mt-24">
      {status === "idle" || status === "error" ? (
        <UploadZone onFile={handleFile} />
      ) : null}

      {status === "processing" ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-teal-100 bg-white px-6 py-16 text-center shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-teal-200 border-t-teal-600" />
          <p className="mt-5 text-base font-semibold text-slate-900">
            {progressLabel || "Working…"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Your image stays in memory and is discarded when processing ends.
          </p>
          {originalUrl ? (
            <div className="mt-8 max-w-xs opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Uploading preview"
                className="max-h-40 w-auto rounded-lg object-contain"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {status === "done" && originalUrl && resultUrl ? (
        <div className="space-y-5">
          <ComparisonView originalUrl={originalUrl} resultUrl={resultUrl} />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Upload another
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-600/25 transition hover:bg-teal-500"
            >
              Download transparent PNG
            </button>
          </div>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {error}
        </div>
      ) : null}
    </section>
  );
}
