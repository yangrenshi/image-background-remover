"use client";

export async function removeBackgroundLocal(file: File): Promise<Blob> {
  const { removeBackground: remove } = await import(
    "@imgly/background-removal"
  );

  try {
    return await remove(file, {
      output: {
        format: "image/png",
        quality: 0.9,
      },
    });
  } catch {
    throw new Error(
      "Background removal failed. The image may be unsupported or the request timed out.",
    );
  }
}
