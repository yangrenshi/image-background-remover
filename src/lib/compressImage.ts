import { COMPRESS_QUALITY, MAX_IMAGE_DIMENSION } from "./constants";

/**
 * Compress oversized images in the browser before processing.
 * Keeps output as JPEG for smaller upload / Worker payload size.
 */
export async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const longest = Math.max(width, height);
  const needsResize = longest > MAX_IMAGE_DIMENSION;
  // Re-encode when file is large even if dimensions are fine
  const needsReencode = file.size > 1.5 * 1024 * 1024;

  if (!needsResize && !needsReencode && file.type === "image/jpeg") {
    bitmap.close();
    return file;
  }

  const scale = needsResize ? MAX_IMAGE_DIMENSION / longest : 1;
  const targetW = Math.max(1, Math.round(width * scale));
  const targetH = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not prepare the image for compression.");
  }

  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error("Image compression failed. Please try another file."));
      },
      "image/jpeg",
      COMPRESS_QUALITY,
    );
  });

  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}
