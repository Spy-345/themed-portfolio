import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { MobileNav } from './Interactive';
export default function SiteHeader({services=false}:{services?:boolean}){
 const home=services?'/':'';
 return <header><Link className="brand" href="/" aria-label="spyy home">spyy<span aria-hidden="true">✳</span></Link><nav className="desktop-nav" aria-label="Main navigation"><a href={`${home}#work`}>Work</a><a href={`${home}#about`}>About</a><a href={`${home}#experience`}>Experience</a><Link href="/services" aria-current={services?'page':undefined}>Services</Link><a href={`${home}#contact`}>Contact</a></nav><div className="header-profile-links"><a className="social-icon" href="https://github.com/Spy-345" target="_blank" rel="noreferrer" aria-label="Shivam on GitHub" title="GitHub"><FaGithub aria-hidden="true"/></a><a className="social-icon" href="https://www.linkedin.com/in/shivam-yewle/" target="_blank" rel="noreferrer" aria-label="Shivam on LinkedIn" title="LinkedIn"><FaLinkedinIn aria-hidden="true"/></a><a className="resume" href="/resume/shivam-yewle-resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></div><MobileNav home={home} services={services}/></header>;
}
