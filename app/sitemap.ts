import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/seo';
export default function sitemap(): MetadataRoute.Sitemap {
  // Only actual pages belong here; homepage sections are anchor links.
  return [{ url: `${siteUrl}/` }];
}
