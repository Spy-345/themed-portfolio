'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3, type Group, type Mesh } from 'three';
import DroneBody from './DroneBody';

function Reader({offset,paused}:{offset:number;paused:React.RefObject<boolean>}){
 const drone=useRef<Group>(null),beam=useRef<Group>(null),hit=useRef<Mesh>(null);
 const {size}=useThree();const clock=useRef(offset*8);const position=useRef(new Vector3());const initialized=useRef(false);
 const [vectors]=useState(()=>({end:new Vector3(),direction:new Vector3(),up:new Vector3(0,1,0)}));
 useFrame((_,delta)=>{
  if(paused.current)return;const dt=Math.min(delta,.05);clock.current+=dt;
  const hero=document.querySelector('.hero');if(!hero||!drone.current)return;
  const host=hero.getBoundingClientRect();const targets=['.flip-name','.hero-designation','.hero-art'];
  const step=Math.floor(clock.current/12)%3;const target=hero.querySelector(targets[(step+offset)%3]);if(!target)return;const rect=target.getBoundingClientRect();
  const left=rect.left-host.left,top=rect.top-host.top;
  // Park beside a reading area. Translation stops before the scan begins.
  const terminal=target.matches('.hero-art');
  const anchorX=Math.max(30,Math.min(size.width-30,terminal?left+rect.width-27:left+rect.width+24));
  const anchorY=Math.max(35,Math.min(size.height-55,top+(terminal?rect.height*.28:rect.height*.5)+(offset?28:-25)));
  const goalX=anchorX-size.width/2,goalY=size.height/2-anchorY;
  if(!initialized.current){position.current.set(goalX+(offset?40:-40),goalY+35,70);initialized.current=true}
  const dx=goalX-position.current.x,dy=goalY-position.current.y,distance=Math.hypot(dx,dy);const amount=Math.min(distance,dt*Math.min(65,Math.max(12,distance*.9)));
  if(distance>1){position.current.x+=dx/distance*amount;position.current.y+=dy/distance*amount}
  drone.current.position.copy(position.current);drone.current.rotation.z=Math.max(-.08,Math.min(.08,dx*.001));
  const reading=distance<5;
  if(beam.current)beam.current.visible=reading;if(hit.current)hit.current.visible=reading;
  if(reading&&beam.current){const progress=(clock.current%12)/12;const sweep=(Math.sin(progress*Math.PI*4-Math.PI/2)+1)/2;
   const tx=left+rect.width*(.08+.82*sweep);const ty=top+(terminal?rect.height*(.25+.32*Math.floor(progress*3)/3):rect.height*(.35+.25*Math.floor(progress*2)));
   vectors.end.set(tx-size.width/2,size.height/2-ty,55);vectors.direction.subVectors(vectors.end,position.current);const length=vectors.direction.length();beam.current.position.copy(position.current).add(vectors.end).multiplyScalar(.5);beam.current.scale.y=length;beam.current.quaternion.setFromUnitVectors(vectors.up,vectors.direction.normalize());hit.current?.position.copy(vectors.end);
   drone.current.rotation.y=Math.max(-.25,Math.min(.25,(vectors.end.x-position.current.x)*.002));
  }
 });
 return <><group ref={drone} scale={53}><DroneBody reverse={offset===1}/></group><group ref={beam}><mesh><cylinderGeometry args={[.55,.55,1,6]}/><meshBasicMaterial color="#ff5555" transparent opacity={.5} depthWrite={false}/></mesh><mesh><cylinderGeometry args={[2.5,2.5,1,6]}/><meshBasicMaterial color="#ff4040" transparent opacity={.035} depthWrite={false}/></mesh></group><mesh ref={hit}><ringGeometry args={[2,3,16]}/><meshBasicMaterial color="#ff6a62" transparent opacity={.65}/></mesh></>;
}
export default function HeroPatrol(){
 const paused=useRef(false);
 useEffect(()=>{const onPause=(e:Event)=>{paused.current=(e as CustomEvent<boolean>).detail};window.addEventListener('patrol-pause',onPause);return()=>window.removeEventListener('patrol-pause',onPause)},[]);
 return <div className="hero-patrol" aria-hidden="true" inert><Canvas orthographic camera={{position:[0,0,1000],zoom:1,near:.1,far:2000}} dpr={[1,1.5]}><ambientLight intensity={2}/><directionalLight position={[0,200,500]} intensity={2}/><Reader offset={0} paused={paused}/><Reader offset={1} paused={paused}/></Canvas></div>;
}
