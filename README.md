# Shivam Yewle Portfolio

Next.js, TypeScript, Tailwind CSS and a client-rendered Three.js sculpture.

## Run

Use Node.js 22+ and pnpm 12.18.0.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3001. Validate with `pnpm typecheck`, `pnpm lint`, and `pnpm build`; serve a build with `pnpm start`.

Edit portfolio copy and project data in app/page.tsx. Replace public/resume/shivam-yewle-resume.pdf to update the downloadable résumé. The hero scene lives in components/Sculpture.tsx. It pauses outside the viewport and on hidden tabs and uses a static fallback for reduced motion or rendering failures.

Employer project descriptions come from the supplied résumé. Project graphics are illustrative, not product screenshots. No contact backend or credentials are required. Configure metadataBase and canonical URLs when a public deployment domain is available.

## Mobile checks

`pnpm exec playwright install chromium` installs the test browser. Run `pnpm test:mobile` for viewport, navigation and résumé checks at 320, 375, 390, 768 and 1024 pixels. `pnpm audit:mobile` saves screenshots and measurements under `artifacts/mobile-audit/`. Both target https://spyy.xyz by default; set `PLAYWRIGHT_BASE_URL` to test a local or preview deployment. The screenshot audit uses reduced motion for stable captures; this is not a physical-device performance test.
