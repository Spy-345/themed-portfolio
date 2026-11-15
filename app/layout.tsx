import RoamingRobot from '../components/RoamingRobot';
import CursorLight from '../components/CursorLight';
import type { Metadata } from 'next';
import { siteUrl, siteTitle, siteDescription } from '../lib/seo';
import './globals.css';
import './movie-theme.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'spyy',
  authors: [{ name: 'Shivam Yewle', url: siteUrl }],
  creator: 'Shivam Yewle',
  category: 'technology',
  alternates: { canonical: '/' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website', url: '/', siteName: 'spyy — Shivam Yewle',
    title: siteTitle, description: siteDescription, locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: [{url: '/opengraph-image', alt: 'Shivam Yewle — AI Full Stack Developer in Pune'}] },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? {verification: {google: process.env.GOOGLE_SITE_VERIFICATION}} : {}),
};
export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}<CursorLight/><RoamingRobot/></body></html>;
}
