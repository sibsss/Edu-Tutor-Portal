Readdy Next.js PWA Patch
========================
Use this to add PWA support to the Next.js project Readdy exported.

Files included
- public/manifest.webmanifest
- public/sw.js
- public/icons/icon-192.png
- public/icons/icon-512.png
- app/RegisterSW.tsx  (client component that registers the SW)

How to apply
1) Copy the 'public' folder into your project root (merge with existing /public if you have one).
2) Copy 'app/RegisterSW.tsx' into your project's /app folder.
3) Edit your '/app/layout.tsx' to include:
   - In <head>:
       <link rel="manifest" href="/manifest.webmanifest" />
       <meta name="theme-color" content="#0f172a" />
   - In the body, render the SW register component once:
       import RegisterSW from './RegisterSW';
       ...
       <body>
         <RegisterSW />
         {children}
       </body>

4) Ensure you have a root route: /app/page.tsx exists and renders your homepage.
5) Commit & push to GitHub.

Vercel project settings
- Framework Preset: Next.js
- Build Command: next build (default)
- Output Directory: (leave blank)
- Root Directory: the folder that contains package.json (your Next.js project root)

Verify after deploy
- / -> homepage loads
- /manifest.webmanifest -> 200 OK
- /sw.js -> 200 OK
- DevTools -> Application -> Manifest & Service Workers show no errors
