"use client";

import { useCallback, useRef, useState } from "react";

type UploadZoneProps = {
  disabled?: boolean;
  onFile: (file: File) => void;
};

export function UploadZone({ disabled, onFile }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file) onFile(file);
    },
    [onFile],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onClick={() => {
        if (!disabled) inputRef.current?.click();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(event.dataTransfer.files);
      }}
      className={[
        "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition",
        dragging
          ? "border-teal-500 bg-teal-50"
          : "border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50",
        disabled ? "pointer-events-none opacity-60" : "",
      ].join(" ")}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15.5V17a3 3 0 003 3h12a3 3 0 003-3v-1.5M16 8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </div>
      <p className="text-base font-semibold text-slate-900">
        Drop an image here, or click to upload
      </p>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        JPG or PNG · up to 10MB · processed in memory · never stored
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
    </div>
  );
}
