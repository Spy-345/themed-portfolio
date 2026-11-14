# SEO review — spyy.xyz

## Observed before changes

The live homepage returned HTTP 200 and had a name/role title, basic description, social image and server-rendered portfolio content. No canonical link or JSON-LD was present. `/robots.txt` and `/sitemap.xml` returned HTTP 404. Missing robots.txt does not itself prevent Google indexing. Search Console ownership, Google indexing status, query rankings and Core Web Vitals were not available in this review.

## Implemented

- Production metadata base and canonical URL for https://spyy.xyz.
- Concise name/role/location title and a description mentioning verified Next.js, Node.js and Amazon Bedrock work.
- Open Graph/Twitter metadata and updated social artwork highlighting Shivam’s name and role.
- Linked WebSite, ProfilePage and Person JSON-LD, with verified employer, education, skills and social profiles.
- Explicit index/follow directives, robots.txt and a sitemap containing the single homepage. Fragment sections are not separate search landing pages.
- A visible introduction supporting the same expertise; duplicate text removed from decorative flip-letter backs.
- Optional real Google HTML verification token via GOOGLE_SITE_VERIFICATION.

No keyword meta tag was added: Google does not use it for ranking. No fabricated qualifications, ratings or search statistics were added. Structured data supports understanding but does not guarantee a rich result.

## Verification

Production build checks metadata generation and both crawl endpoints. Automated tests check server-rendered canonical metadata, parseable JSON-LD, robots.txt, sitemap.xml and the social image. Existing mobile and animated-hero interaction tests remain part of the suite.

## Owner steps after deployment

1. Verify the domain in Google Search Console using DNS or the optional HTML token.
2. Submit https://spyy.xyz/sitemap.xml and inspect the homepage URL to request indexing.
3. Add a link to spyy.xyz from your GitHub and LinkedIn profiles.
4. Monitor indexing and queries in Search Console. Prioritize substantive case-study pages for Next.js, Node.js API and AI integration work if broader keyword discovery is a goal.
5. Review physical-device usability and Core Web Vitals; these were not measured by this metadata change.

Useful references: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [title guidance](https://developers.google.com/search/docs/appearance/title-link), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [profile structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
