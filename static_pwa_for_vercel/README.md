# Static PWA for Vercel (via GitHub)

This is a plain HTML/CSS/JS PWA (no Next.js). Vercel can serve it directly.

## How to deploy
1. Create a new GitHub repo (public or private).
2. Put these files at the **repo root** (index.html, manifest.webmanifest, sw.js, offline.html, icons/, vercel.json) and push.
3. In Vercel:
   - "Add New Project" → import this GitHub repo.
   - Framework Preset: **Other**
   - Build Command: **(leave empty)**
   - Output Directory: **(leave empty)**
   - Root Directory: **/** (the repo root)
4. Deploy. Your site root `/` should load index.html (no 404).
5. Check:
   - `/manifest.webmanifest` → 200 OK
   - `/sw.js` → 200 OK
   - DevTools → Application → Manifest & Service Workers show no errors.

## Common 404 causes on Vercel
- Repo has files inside a subfolder; Vercel's **Root Directory** points to the repo root instead of that folder.
- You deployed a Next.js project with `output: 'export'` but didn't set **Output Directory** to `out/`.
- No `index.html` at the root for static sites.

## Custom domain note
After connecting a custom domain, wait for propagation. Use the *.vercel.app preview link to test first.
