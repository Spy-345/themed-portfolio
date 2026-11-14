import { ImageResponse } from 'next/og';
export const alt='Shivam Yewle — AI Full Stack Developer';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{background:'#141613',color:'#eeefe6',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:90}}><div style={{color:'#c2f970',fontSize:24}}>SPYY.XYZ / PORTFOLIO</div><div style={{fontSize:80,marginTop:40}}>Shivam Yewle</div><div style={{fontSize:64,color:'#c2f970'}}>AI Full Stack Developer</div><div style={{fontSize:26,marginTop:35}}>Pune, India · Next.js · Node.js · AI integrations</div></div>,size)}
