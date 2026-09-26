import { NextRequest, NextResponse } from "next/server";
import {
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "@/lib/constants";

/**
 * Background removal API — intended for Cloudflare Worker / Pages deployment.
 *
 * When Cloudflare credentials are configured, this route proxies to
 * Cloudflare Images `segment=foreground` (memory-only, no persistence).
 * Locally without credentials it returns 501 so the client falls back
 * to in-browser processing (same privacy model: no disk storage).
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Upload a JPG or PNG image using multipart form data." },
        { status: 400 },
      );
    }

    const form = await request.formData();
    const image = form.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "No image uploaded. Please choose a JPG or PNG file." },
        { status: 400 },
      );
    }

    if (image.size === 0) {
      return NextResponse.json(
        { error: "The selected file is empty. Please upload a valid image." },
        { status: 400 },
      );
    }

    if (image.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image is larger than 10MB. Please choose a smaller file." },
        { status: 400 },
      );
    }

    const mimeOk = ACCEPTED_MIME_TYPES.includes(
      image.type as (typeof ACCEPTED_MIME_TYPES)[number],
    );
    if (!mimeOk && image.type !== "") {
      return NextResponse.json(
        { error: "Unsupported format. Only JPG and PNG images are allowed." },
        { status: 400 },
      );
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountHash = process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH;

    if (!accountId || !apiToken || !accountHash) {
      return NextResponse.json(
        {
          error: "Cloudflare Images is not configured.",
          fallback: true,
        },
        { status: 501 },
      );
    }

    const bytes = new Uint8Array(await image.arrayBuffer());
    const png = await removeWithCloudflareImages({
      accountId,
      apiToken,
      accountHash,
      bytes,
      contentType: image.type || "image/jpeg",
    });

    return new NextResponse(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Background removal timed out or failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Upload briefly to Cloudflare Images, transform with segment=foreground,
 * return PNG bytes, then delete the temporary image so nothing persists.
 */
async function removeWithCloudflareImages(options: {
  accountId: string;
  apiToken: string;
  accountHash: string;
  bytes: Uint8Array;
  contentType: string;
}): Promise<ArrayBuffer> {
  const { accountId, apiToken, accountHash, bytes, contentType } = options;

  const uploadForm = new FormData();
  uploadForm.append(
    "file",
    new Blob([new Uint8Array(bytes)], { type: contentType }),
    "upload.jpg",
  );

  const uploadRes = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiToken}` },
      body: uploadForm,
    },
  );

  const uploadJson = (await uploadRes.json()) as {
    success: boolean;
    result?: { id: string };
    errors?: { message: string }[];
  };

  if (!uploadRes.ok || !uploadJson.success || !uploadJson.result?.id) {
    const detail = uploadJson.errors?.[0]?.message || "Cloudflare upload failed";
    throw new Error(detail);
  }

  const imageId = uploadJson.result.id;

  try {
    const transformUrl = `https://imagedelivery.net/${accountHash}/${imageId}/segment=foreground`;
    const transformRes = await fetch(transformUrl, {
      headers: { Accept: "image/png" },
    });

    if (!transformRes.ok) {
      throw new Error(
        "Cloudflare background removal failed. Please try another image.",
      );
    }

    return await transformRes.arrayBuffer();
  } finally {
    // Best-effort cleanup — never keep user images
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${apiToken}` },
      },
    ).catch(() => undefined);
  }
}
