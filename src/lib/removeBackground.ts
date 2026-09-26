/**
 * Remove image background via the server API (Cloudflare Worker path).
 * Falls back to in-browser processing when Cloudflare is not configured.
 * Images stay in memory only — never written to disk or object storage.
 */
export async function removeBackground(file: File): Promise<Blob> {
  const form = new FormData();
  form.append("image", file);

  let response: Response;
  try {
    response = await fetch("/api/remove-background", {
      method: "POST",
      body: form,
    });
  } catch {
    return removeBackgroundLocally(file);
  }

  if (response.ok) {
    return response.blob();
  }

  if (response.status === 501) {
    return removeBackgroundLocally(file);
  }

  const data = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  throw new Error(data?.error || "Background removal failed. Please try again.");
}

async function removeBackgroundLocally(file: File): Promise<Blob> {
  // Dynamic import kept behind a client-only call path so the Workers
  // server bundle never pulls in the ONNX/WASM package.
  const { removeBackgroundLocal } = await import("./removeBackgroundLocal");
  return removeBackgroundLocal(file);
}

export function buildDownloadFilename(): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  return `background-removed-${stamp}.png`;
}
