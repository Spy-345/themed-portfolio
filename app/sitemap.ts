import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  // Sections are anchors on one page, not separately indexable URLs.
  return [{ url: `${siteUrl}/` }];
}
