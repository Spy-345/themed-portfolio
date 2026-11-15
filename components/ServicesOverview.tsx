import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';
import { services } from '../lib/services';
export default function ServicesOverview(){return <section className="services-overview" id="services"><div className="services-overview-heading"><div><span className="eyebrow">THE WORKSHOP / SERVICES</span><h2>More ways to<br/><em>bring ideas to life.</em></h2></div><Link className="text-link" href="/services">Explore all services <LuArrowUpRight aria-hidden="true"/></Link></div><div className="services-overview-grid">{services.map(s=><Link className="service-preview" href={`/services#${s.id}`} key={s.id}><div><Image src={s.image} alt={s.alt} width={1536} height={1024} sizes="(max-width: 600px) 88vw, (max-width: 1000px) 44vw, 22vw"/><span>DEMO CONCEPT / {s.number}</span></div><h3>{s.title}<LuArrowUpRight aria-hidden="true"/></h3><p>{s.short}</p></Link>)}</div></section>}
