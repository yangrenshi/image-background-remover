# Image Background Remover

Free online **image background remover**. Upload a JPG/PNG, get a transparent PNG — no signup, no watermark, no persistent storage.

## Stack

- Next.js (App Router) + Tailwind CSS
- `/api/remove-background` for Cloudflare Images `segment=foreground` (when configured)
- Local fallback: in-browser `@imgly/background-removal` (memory-only)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloudflare (optional)

Copy `.env.example` to `.env.local` and set:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_IMAGES_ACCOUNT_HASH`

Without these, the app automatically uses the local in-browser remover so MVP features still work.

## MVP pages

- `/` — upload, remove, preview, download
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

## License

MIT
