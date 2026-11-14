'use client';
import { useEffect, useRef, useState } from 'react';

function RobotFigure(){return <svg viewBox="0 0 120 140" fill="none" aria-hidden="true"><defs><linearGradient id="eve-shell" x1="30" y1="30" x2="96" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff"/><stop offset=".5" stopColor="#eaf4f4"/><stop offset="1" stopColor="#9cb5bc"/></linearGradient><radialGradient id="eve-thrust"><stop stopColor="#8df7ff" stopOpacity=".5"/><stop offset="1" stopColor="#8df7ff" stopOpacity="0"/></radialGradient></defs><ellipse cx="60" cy="132" rx="25" ry="4" fill="#000" opacity=".15"/><ellipse cx="60" cy="120" rx="20" ry="13" fill="url(#eve-thrust)"/><path d="M35 64Q60 57 85 64C88 81 80 113 60 121C40 113 32 81 35 64Z" fill="url(#eve-shell)" stroke="#96b5bc" strokeWidth="1.2"/><path d="M38 68Q60 73 82 68" stroke="#a8bec2"/><path d="M31 72C23 75 20 95 24 104C30 105 34 88 35 76" fill="url(#eve-shell)" stroke="#a0bac0"/><g className="robot-arm"><path d="M87 72C97 75 101 94 97 103C90 104 85 87 85 76" fill="url(#eve-shell)" stroke="#a0bac0"/></g><path d="M57 84Q63 77 68 82Q71 88 62 93Q52 89 53 85Q54 82 57 84Z" fill="#8ccf77"/><path d="M61 92v6" stroke="#85b76d" strokeWidth="1.5"/><g className="robot-head"><path d="M27 41C27 18 43 10 60 10C80 10 94 21 94 41C94 59 77 65 60 65C41 65 27 57 27 41Z" fill="url(#eve-shell)" stroke="#a0bac0" strokeWidth="1.2"/><path d="M34 35C35 23 84 21 87 35L86 46C82 59 39 59 35 46Z" fill="#0b1722"/><g className="robot-pupils"><ellipse cx="48" cy="40" rx="8" ry="10" fill="#57cfff"/><ellipse cx="73" cy="40" rx="8" ry="10" fill="#57cfff"/><ellipse cx="48" cy="38" rx="4" ry="6" fill="#a0edff"/><ellipse cx="73" cy="38" rx="4" ry="6" fill="#a0edff"/></g><path d="M41 20Q51 16 61 17" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".8"/></g></svg>}
function describeScan(element:Element){
 if(element.matches('[data-eve-plant]'))return 'Plant life detected! A living seedling found in WALL-E’s scrap box. Mission accomplished!';
 const label=(element.getAttribute('aria-label')||element.textContent||'').replace(/\s+/g,' ').trim();
 const short=label.length>100?label.slice(0,97)+'…':label;
 if(element.matches('input,textarea,select'))return 'Input field detected. Ready for your input.';
 if(element.closest('.skill-token'))return `Technology identified: ${short}.`;
 const project=element.closest('.project');if(project)return `Project found: ${project.querySelector('h3')?.textContent||short}.`;
 if(element.closest('.opportunity-card'))return `Opportunity detected: ${element.closest('.opportunity-card')?.querySelector('h3')?.textContent||short}`;
 const link=element.closest('a');if(link){const href=link.getAttribute('href')||'';if(href.startsWith('mailto:'))return 'Contact channel found: email Shivam.';if(href.includes('/resume/'))return 'Résumé detected. Developer profile ready to explore.';if(href.includes('github.com'))return 'Code repository link detected.';return `Navigation link found: ${short||'Explore destination'}.`}
 if(element.matches('button,summary'))return `Interactive control detected: ${short||'Button'}.`;
 return `Content identified: “${short||'Portfolio section'}”`;
}
export default function RoamingRobot(){
 const robot=useRef<HTMLButtonElement>(null);const scan=useRef<SVGSVGElement>(null);const pausedRef=useRef(false);const followRef=useRef(false);const [following,setFollowing]=useState(false);const reactionUntil=useRef(0);const [paused,setPaused]=useState(false);const [message,setMessage]=useState('');const [result,setResult]=useState('');
 useEffect(()=>{
  const el=robot.current;if(!el)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  type Point={x:number;y:number};
  const pad=9;let free:Point[]=[];let previousScroll=window.scrollY,lastScroll=-Infinity,catchUp=false;
  let x=32,y=innerHeight-170,px=x,py=y,lastPointer=-Infinity,lastTime=0,nextPlan=0,frame=0,dirty=true,route:Point[]=[];let lastMood='';let blocked=false;let nextScan=7000,scanUntil=0;let velocity=0;let scanTarget:DOMRect|undefined;let textTargets:{rect:DOMRect;element:Element}[]=[];let interactionScan=false;let pendingResult='';let scanSeen=false;let pendingPlant:Element|undefined;
  const size=()=>({w:el.offsetWidth,h:el.offsetHeight});
  const clamp=(p:Point):Point=>({x:Math.max(pad,Math.min(p.x,innerWidth-size().w-pad)),y:Math.max(pad,Math.min(p.y,innerHeight-size().h-pad))});
  const clear=(p:Point)=>p.x>=pad&&p.y>=pad&&p.x+size().w<=innerWidth-pad&&p.y+size().h<=innerHeight-pad;
  const refresh=()=>{
   x=clamp({x,y}).x;
   free=[{x,y}];blocked=false;dirty=false;
   textTargets=Array.from(document.querySelectorAll('h2,h3,p,[data-eve-plant]')).map(element=>({element,rect:element.getBoundingClientRect()})).filter(({rect:r})=>r.width&&r.top>20&&r.bottom<innerHeight-20);
   if(textTargets.some(t=>t.element.matches('[data-eve-plant]:not([data-discovered])')))nextScan=Math.min(nextScan,performance.now()+2500);
   scanUntil=0;interactionScan=false;pendingResult='';scanSeen=false;pendingPlant=undefined;
   el.style.transform=`translate3d(${x}px,${y+window.scrollY}px,0)`;el.style.visibility='visible';
  };
  const plan=(target?:Point)=>{
   route=[clamp(target??{x:pad+Math.random()*Math.max(0,innerWidth-size().w-pad*2),y:pad+Math.random()*Math.max(0,innerHeight-size().h-pad*2)})];
  };
  const pointer=(e:PointerEvent)=>{if(e.pointerType==='mouse'){px=e.clientX;py=e.clientY;lastPointer=performance.now()}};
  const inspect=(event:Event)=>{
   if(!followRef.current||pausedRef.current||motion.matches||!(event.target instanceof Element))return;
   const target=event.target.closest('a,button,input,textarea,select,summary,.journey,.opportunity-card,.skill-token,[data-eve-plant]');
   if(!target||target.closest('.robot-companion,.robot-toggle'))return;
   if(event instanceof PointerEvent&&event.type==='pointerover'&&event.relatedTarget instanceof Node&&target.contains(event.relatedTarget))return;
   const rect=target.getBoundingClientRect();if(!rect.width||!rect.height)return;
   pendingResult=describeScan(target);pendingPlant=target.matches('[data-eve-plant]')?target:undefined;scanSeen=false;
   scanTarget=rect;scanUntil=performance.now()+2400;interactionScan=true;route=[];nextPlan=scanUntil;
   el.dataset.scanMode='interaction';
  };
  const invalidate=()=>{dirty=true};
  const onScroll=()=>{const current=window.scrollY;y-=current-previousScroll;previousScroll=current;lastScroll=performance.now();catchUp=true;route=[];nextPlan=lastScroll+1100;scanUntil=0;pendingResult='';scanSeen=false;dirty=true};
  const tick=(time:number)=>{
   const dt=Math.min((time-lastTime)/1000,.05);lastTime=time;if(dirty)refresh();
   const stopped=pausedRef.current||motion.matches;let mood='idle';
   if(catchUp&&!stopped&&time-lastScroll>1100){
    // Re-enter from just outside the screen after a large scroll, never snap visibly.
    if(y+size().h<0)y=-size().h-20;else if(y>innerHeight)y=innerHeight+20;
    route=[clamp({x,y})];catchUp=false;nextPlan=time+5000;
   }
   const plants=textTargets.filter(t=>t.element.matches('[data-eve-plant]:not([data-discovered])'));
   if(!stopped&&!catchUp&&!blocked&&time>nextScan&&((!followRef.current&&time-lastPointer>2400)||plants.length>0)&&textTargets.length){const nearby=plants.length?plants:textTargets.filter(({rect:r})=>Math.hypot(r.left+r.width/2-x,r.top+r.height/2-y)<650);if(nearby.length){const found=nearby[Math.floor(Math.random()*nearby.length)];pendingPlant=found.element.matches('[data-eve-plant]')?found.element:undefined;scanTarget=found.rect;pendingResult=describeScan(found.element)+(pendingPlant?'':' No plant life detected. Search continues!');scanSeen=false;scanUntil=time+3600;interactionScan=!!pendingPlant;el.dataset.scanMode='plant';route=[]}nextScan=time+14000+Math.random()*6000}
   const scanning=!stopped&&clear({x,y})&&!blocked&&time<scanUntil&&(interactionScan||time-lastPointer>1800)&&time>reactionUntil.current&&!!scanTarget;
   if(scanning)scanSeen=true;
   if(!stopped&&scanSeen&&pendingResult&&time>=scanUntil){setResult(pendingResult);if(pendingPlant){pendingPlant.setAttribute('data-discovered','true');el.dataset.foundPlant='true';reactionUntil.current=time+2400;setMessage('🌱 Eee-va! Plant found!');pendingPlant=undefined}pendingResult='';scanSeen=false;nextPlan=time+2000}
   if(scan.current){scan.current.style.opacity=scanning?'1':'0';if(scanning&&scanTarget){const w=size().w,h=size().h;const sx=x+w*.5,sy=y+h*.29;const ex=scanTarget.left+scanTarget.width*(.15+.7*(Math.max(0,1-(scanUntil-time)/(interactionScan&&!pendingPlant?2400:3600)))),ey=scanTarget.top+scanTarget.height*.5;scan.current.querySelectorAll('path').forEach((p,i)=>{const ox=sx+(i===0?-7:7);p.setAttribute('d',`M ${ox} ${sy} L ${ex} ${ey-16} L ${ex} ${ey+16} Z`)});const line=scan.current.querySelector('line');line?.setAttribute('x1',String(ex));line?.setAttribute('x2',String(ex));line?.setAttribute('y1',String(scanTarget.top));line?.setAttribute('y2',String(scanTarget.bottom))}}

   if(!stopped&&!scanning&&!catchUp&&free.length){const following=followRef.current;if(time>nextPlan&&(following||route.length===0)){nextPlan=time+(following?1400:3500+Math.random()*3000);plan(following?{x:px-size().w/2,y:py+45}:undefined)}
    const next=route[0];if(next){const distance=Math.hypot(next.x-x,next.y-y);if(distance<1){route.shift();if(route.length===0){velocity=0;nextPlan=time+3500+Math.random()*3000}}else{velocity=Math.min(42,velocity+dt*45);const amount=Math.min(distance,dt*Math.min(velocity,Math.max(10,distance*1.2)));const p={x:x+(next.x-x)/distance*amount,y:y+(next.y-y)/distance*amount};if(clear(p)||!clear({x,y})){x=p.x;y=p.y;mood='walking'}else{route=[];nextPlan=0}}}}
   if(mood!=='walking')velocity=0;if(scanning)mood='scanning';if(time<reactionUntil.current)mood='happy';el.style.transform=`translate3d(${x}px,${y+window.scrollY}px,0)`;el.style.setProperty('--look',`${Math.max(-3,Math.min(3,(px-x-50)/70))}px`);if(mood!==lastMood){el.dataset.mood=mood;lastMood=mood}frame=requestAnimationFrame(tick);
  };
  const update=()=>{if(scan.current)scan.current.style.opacity='0';cancelAnimationFrame(frame);if(!document.hidden){dirty=true;lastTime=performance.now();frame=requestAnimationFrame(tick)}};
  const resize=new ResizeObserver(invalidate);resize.observe(document.body);
  window.addEventListener('pointerover',inspect,{passive:true});window.addEventListener('pointerdown',inspect,{passive:true});window.addEventListener('focusin',inspect);window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',invalidate);document.addEventListener('visibilitychange',update);motion.addEventListener('change',invalidate);update();
  return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('pointerover',inspect);window.removeEventListener('pointerdown',inspect);window.removeEventListener('focusin',inspect);window.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',invalidate);document.removeEventListener('visibilitychange',update);motion.removeEventListener('change',invalidate)};
 },[]);
 useEffect(()=>{if(!result)return;const timer=setTimeout(()=>setResult(''),7000);return()=>clearTimeout(timer)},[result]);
 useEffect(()=>{if(!message)return;const timer=setTimeout(()=>setMessage(''),2200);return()=>clearTimeout(timer)},[message]);
 return <>{result&&<aside className={'eve-result'+(result.startsWith('Plant life detected')?' plant-result':'')} aria-label="EVE scan result"><div role="status"><span className="eve-result-title">⌖ EVE / SCAN COMPLETE</span><p>{result}</p></div><button onClick={()=>setResult('')} aria-label="Dismiss scan result">×</button></aside>}<svg ref={scan} className="eve-scanner" aria-hidden="true"><path fill="#57cfff" opacity=".07"/><path fill="#57cfff" opacity=".07"/><line stroke="#86e8ff" strokeWidth="2"/></svg><button ref={robot} className="robot-companion" data-paused={paused} aria-label={following?'Stop EVE following your pointer':'Ask EVE to follow your pointer'} aria-pressed={following} onClick={()=>{const next=!followRef.current;followRef.current=next;setFollowing(next);reactionUntil.current=performance.now()+800;setMessage(next?'Following you! Scanning interactions…':'Back to exploring!')}}><span className="robot-speech" role="status">{message}</span><span className="eve-scan-label" aria-hidden="true"><span className="plant-scan-copy">⌖ PLANT LIFE?<br/>SCANNING…</span><span className="interaction-scan-copy">⌖ INTERACTION<br/>SCANNING…</span></span><RobotFigure/></button><button className="robot-toggle" aria-pressed={paused} onClick={()=>{pausedRef.current=!paused;setPaused(!paused)}}>{paused?'▷ Wake EVE':'Ⅱ Pause EVE'}</button></>;
}
