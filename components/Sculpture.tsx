'use client';
/* eslint-disable react-hooks/immutability -- Three.js canvas textures require imperative GPU updates inside useFrame. */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { CanvasTexture, SRGBColorSpace, type Group } from 'three';

const scripts = {
  code: ['// shivam / intelligent systems', 'import { BedrockRuntime } from "@aws-sdk";', '', 'export async function generate(brief) {', '  const prompt = composePrompt(brief);', '  const response = await model.send(prompt);', '  return { content: response, ready: true };', '}', '', '> API module ready.'],
  build: ['$ pnpm build', '→ Initializing production pipeline…', '✓ TypeScript checks passed', '✓ API routes compiled', '✓ Optimizing application assets', '✓ Generating static pages [5/5]', '━━━━━━━━━━━━━━━━━━━━━━━━ 100%', '✓ BUILD COMPLETE', '→ Ready for the next idea.'],
  debug: ['$ pnpm test', '→ Running API integration checks…', '✕ Error: MODEL_ID is undefined', '  at generate (api/research.ts:12)', '', '> Applying environment configuration…', '✓ MODEL_ID configured', '↻ Retrying request…', '✓ 200 OK · response validated', '✓ RECOVERY COMPLETE'],
};
type Mode = keyof typeof scripts;
function Terminal({ mode, paused, run }: { mode: Mode; paused: boolean; run: number }) {
  const group = useRef<Group>(null);
  const viewport = useThree(state => state.viewport);
  const fit = Math.min(viewport.width / 6.15, viewport.height / 5.1);
  const clock = useRef(0);
  const [screen] = useState(() => {
    const canvas = document.createElement('canvas'); canvas.width = 1100; canvas.height = 760;
    const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
    return { canvas, texture };
  });
  useEffect(() => { clock.current = 0; }, [mode, run]);
  useEffect(() => () => screen.texture.dispose(), [screen]);
  useFrame((state, delta) => {
    if (!paused) clock.current += Math.min(delta, .1);
    if (group.current) { group.current.rotation.y += (state.pointer.x * .045 - .16 - group.current.rotation.y) * .04; group.current.rotation.x += (-state.pointer.y * .03 + .06 - group.current.rotation.x) * .04; }
    const ctx = screen.canvas.getContext('2d'); if (!ctx) return;
    ctx.fillStyle = '#0d1b1e'; ctx.fillRect(0, 0, 1100, 760);
    ctx.fillStyle = '#273027'; ctx.fillRect(0, 0, 1100, 76);
    ['#ff6c85','#ffd56b','#c2f970'].forEach((color, i) => { ctx.fillStyle=color; ctx.beginPath(); ctx.arc(35+i*28,38,7,0,Math.PI*2);ctx.fill(); });
    ctx.font = '20px monospace'; ctx.fillStyle = '#9cb8ac'; ctx.fillText('SY:// EARTH WORKSHOP', 150, 45);
    ctx.fillStyle = '#c2f970'; ctx.fillText('SIMULATION', 905, 45);
    const lines = scripts[mode]; let budget = Math.floor(clock.current * 37);
    ctx.font = '23px monospace';
    for (let i=0; i<lines.length; i++) {
      const visible = lines[i].slice(0, Math.max(0, budget));
      ctx.fillStyle = '#3c6254';ctx.fillText(String(i+1).padStart(2,'0'),30,130+i*49);
      ctx.fillStyle = lines[i].startsWith('✕') || lines[i].includes('at generate') ? '#ff8396' : lines[i].startsWith('✓') ? '#c2f970' : lines[i].startsWith('//') ? '#628a78' : '#b5e6dc';
      ctx.fillText(visible, 87, 130+i*49);
      if (budget>=0 && budget<=lines[i].length && (paused || Math.floor(clock.current*2)%2===0)) { ctx.fillStyle='#c2f970';ctx.fillRect(87+ctx.measureText(visible).width+5,111+i*49,12,25); }
      budget -= lines[i].length + 12;
    }
    ctx.fillStyle='#17382b';ctx.fillRect(25,700,1050,1);ctx.font='17px monospace';ctx.fillStyle='#729b87';ctx.fillText('EARTH SECTOR 07    /     '+mode.toUpperCase()+' SEQUENCE',30,735);
    ctx.fillStyle='#c2f970';ctx.fillText(paused?'PAUSED':'WORKSHOP ONLINE',900,735);
    ctx.fillStyle='#e9bb62';ctx.fillRect(0,76,1100,3);ctx.fillStyle='#83ddef';ctx.fillRect(25,700,190,2);
    ctx.fillStyle='#00000015';for(let y=0;y<760;y+=5)ctx.fillRect(0,y,1100,1);
    screen.texture.needsUpdate = true;
  });
  return <group ref={group} scale={fit}><mesh position={[0,0,-.08]}><boxGeometry args={[5.65,3.98,.18]}/><meshStandardMaterial color="#76643a" metalness={.8} roughness={.3}/></mesh>{[-1,1].flatMap(x=>[-1,1].map(y=><mesh key={`${x}-${y}`} position={[x*2.76,y*1.9,.035]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.035,.035,.025,12]}/><meshStandardMaterial color="#b8ad83" metalness={.85} roughness={.5}/></mesh>))}<mesh position={[0,0,.03]}><planeGeometry args={[5.4,3.73]}/><meshBasicMaterial map={screen.texture}/></mesh><mesh position={[0,-2.12,0]}><boxGeometry args={[3,.035,.04]}/><meshBasicMaterial color="#83ddef"/></mesh>{[-1,1].map(i=><mesh key={i} position={[i*2.95,0,-.1]}><boxGeometry args={[.02,2.7,.02]}/><meshBasicMaterial color="#af9355"/></mesh>)}</group>;
}
export default function Sculpture() {
  const [mode,setMode]=useState<Mode>('code'); const [paused,setPaused]=useState(false); const [run,setRun]=useState(0);
  return <div className="terminal-scene"><Canvas dpr={[1,1.5]} camera={{position:[0,0,7],fov:42}} aria-label="Animated 3D terminal showing simulated code and build output"><ambientLight intensity={1.5}/><pointLight position={[3,4,5]} intensity={20} color="#c2f970"/><Terminal mode={mode} paused={paused} run={run}/></Canvas><div className="terminal-controls" aria-label="Terminal simulation controls">{(['code','build','debug'] as Mode[]).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>{setMode(m);setRun(r=>r+1)}}>{m==='code'?'⌘ Code':m==='build'?'▷ Build':'⚡ Debug'}</button>)}<button onClick={()=>setPaused(!paused)} aria-label={paused?'Resume terminal':'Pause terminal'}>{paused?'▷':'Ⅱ'}</button><button aria-label="Replay terminal sequence" onClick={()=>setRun(r=>r+1)}>↻</button></div><span className="terminal-hint">MOVE TO TILT · CHOOSE A SEQUENCE · SIMULATED OUTPUT</span></div>;
}
