import { ImageResponse } from 'next/og';
export const alt='Shivam Yewle — AI Full Stack Developer';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{background:'#0b0f17',color:'#eef2ff',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:90}}><div style={{color:'#85a7ff',fontSize:24}}>SPYY.XYZ / PORTFOLIO</div><div style={{fontSize:80,marginTop:40}}>Shivam Yewle</div><div style={{fontSize:64,color:'#85a7ff'}}>AI Full Stack Developer</div><div style={{fontSize:26,marginTop:35}}>Pune, India · Next.js · Node.js · AI integrations</div></div>,size)}
