import { ImageResponse } from 'next/og';
export const alt='Shivam Yewle — AI Full Stack Engineer';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{background:'#141613',color:'#eeefe6',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:90}}><div style={{color:'#c2f970',fontSize:24}}>SHIVAM YEWLE / PUNE, INDIA</div><div style={{fontSize:80,marginTop:40}}>Thoughtful code.</div><div style={{fontSize:80,color:'#c2f970'}}>Real-world impact.</div><div style={{fontSize:26,marginTop:35}}>AI Full Stack Engineer · Web applications · Intelligent APIs</div></div>,size)}
