import Logo from './Logo';
import Link from 'next/link';
import ActiveNav from './ActiveNav';
import { LuArrowUpRight } from 'react-icons/lu';
import { MobileNav } from './Interactive';
export default function SiteHeader() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><header><Link className="brand" href="/" aria-label="Shivam Yewle home"><Logo /></Link><ActiveNav /><a className="resume" href="/resume/shivam-yewle-resume.pdf" target="_blank" rel="noreferrer">Résumé <LuArrowUpRight /></a><MobileNav /></header></>;
}
