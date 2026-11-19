import type { CSSProperties } from 'react';
import { SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiNestjs, SiPython, SiPostgresql, SiMongodb, SiTailwindcss, SiPrisma, SiExpress, SiJavascript, SiPaypal, SiMongoose } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { LuBraces, LuCloud, LuDatabase, LuWorkflow, LuPanelsTopLeft } from 'react-icons/lu';
import type { IconType } from 'react-icons';
const logos: Record<string, [IconType, string]> = {
  'Next.js': [SiNextdotjs, '#f5f5f5'], React: [SiReact, '#61dafb'], TypeScript: [SiTypescript, '#5da9f2'], 'Node.js': [SiNodedotjs, '#83cb61'], NestJS: [SiNestjs, '#fb6485'], Python: [SiPython, '#ffd56b'], PostgreSQL: [SiPostgresql, '#80b5dc'], MongoDB: [SiMongodb, '#75cf65'], 'Tailwind CSS': [SiTailwindcss, '#53d7eb'], Prisma: [SiPrisma, '#b8cafa'], Express: [SiExpress, '#ededdf'], JavaScript: [SiJavascript, '#f7df1e'], AWS: [FaAws, '#ffbb65'], 'Amazon Bedrock': [FaAws, '#cfa6ff'], PayPal: [SiPaypal, '#75bfff'], Mongoose: [SiMongoose, '#ea8585'], 'Bubble.io': [LuPanelsTopLeft, '#9eb6ff'], 'REST response': [LuBraces, '#85a7ff'], 'Server Actions': [LuWorkflow, '#85a7ff'], 'Database transaction': [LuDatabase, '#dbc1ff'], Payments: [SiPaypal, '#75bfff'], 'Payment gateways': [SiPaypal, '#75bfff'], 'Web application': [LuCloud, '#a8d6ef'],
};
export default function TechIcon({name, index = 0}:{name:string;index?:number}){
  const [Icon, color] = logos[name] ?? [LuBraces, '#85a7ff'];
  return <span aria-hidden="true" className="tech-icon" style={{'--logo-color':color,'--float-delay':`${index * -.7}s`,'--float-duration':`${4 + index % 3}s`} as CSSProperties}><Icon/></span>;
}
export function ToolIcons({tool}:{tool:string}){
  return <span className="tool-icons">{tool.split(' + ').map((name,i)=><TechIcon key={name} name={name === 'Express middleware' ? 'Express' : name} index={i}/>)}</span>;
}
