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

Employer project descriptions come from the supplied résumé. Project graphics are illustrative, not product screenshots. No contact backend or credentials are required. Production metadata and canonical URLs use https://spyy.xyz.

## Mobile checks

`pnpm exec playwright install chromium` installs the test browser. Run `pnpm test:mobile` for viewport, navigation and résumé checks at 320, 375, 390, 768 and 1024 pixels. `pnpm audit:mobile` saves screenshots and measurements under `artifacts/mobile-audit/`. Both target https://spyy.xyz by default; set `PLAYWRIGHT_BASE_URL` to test a local or preview deployment. The screenshot audit uses reduced motion for stable captures; this is not a physical-device performance test.

## Search visibility

Production SEO settings live in `lib/seo.ts` and `app/layout.tsx`. The site publishes `/robots.txt`, `/sitemap.xml`, social previews, and linked WebSite/ProfilePage/Person JSON-LD. Keep profile facts and social URLs current. The sitemap lists the homepage and services page; section anchors are not standalone pages.

After deployment, verify `spyy.xyz` in Google Search Console (prefer DNS verification), submit `https://spyy.xyz/sitemap.xml`, and use URL Inspection to request homepage indexing. If using HTML-tag verification, set `GOOGLE_SITE_VERIFICATION` in Vercel to the exact verification token Google provides, then redeploy. No token is fabricated or required for normal site operation. Vercel preview deployments may remain noindex through Vercel’s response headers.

Metadata and structured data improve clarity and discovery; they do not guarantee indexing, rich results, or rankings. Monitor Search Console queries and indexing. Dedicated substantive case studies and reputable profile links back to this domain are the next opportunities for broader role/technology searches.

## Services

`/services` lists Custom Business Websites, Graphic Design, Basic Video Editing, and Mobile App Development. Edit offerings and enquiry subjects in `lib/services.ts`; the homepage overview uses the same data. Generated demo artwork lives in `public/images/services/`. All four examples are clearly labeled illustrative concepts, not client engagements or functional live products. No pricing or delivery promises are hard-coded. Services has its own canonical metadata and structured service catalog, and is included in the sitemap.
