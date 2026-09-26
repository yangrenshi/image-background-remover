import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "./constants";

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

export function validateImageFile(file: File | null | undefined): ValidationResult {
  if (!file) {
    return { ok: false, message: "No file selected. Please choose a JPG or PNG image." };
  }

  if (file.size === 0) {
    return { ok: false, message: "The selected file is empty. Please upload a valid image." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false,
      message: "Image is larger than 10MB. Please compress it or choose a smaller file.",
    };
  }

  const mimeOk = ACCEPTED_MIME_TYPES.includes(
    file.type as (typeof ACCEPTED_MIME_TYPES)[number],
  );
  const name = file.name.toLowerCase();
  const extOk = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));

  if (!mimeOk && !extOk) {
    return {
      ok: false,
      message: "Unsupported format. Only JPG and PNG images are allowed.",
    };
  }

  return { ok: true };
}
