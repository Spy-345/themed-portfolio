import RoamingRobot from '../components/RoamingRobot';
import CursorLight from '../components/CursorLight';
import type { Metadata } from 'next';
import './globals.css';
import './movie-theme.css';
export const metadata: Metadata = {title:'Shivam Yewle — AI Full Stack Developer',description:'Full stack developer in Pune building thoughtful web experiences, production APIs and AI-powered products.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<CursorLight/><RoamingRobot/></body></html>}
