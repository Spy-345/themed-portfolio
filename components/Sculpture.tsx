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
  const fit = Math.min(viewport.width / 6.65, viewport.height / 5.15);
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
    // A slim exploration display: dark glass, restrained amber hardware and EVE-blue telemetry.
    ctx.fillStyle='#0b181a';ctx.fillRect(0,0,1100,760);
    const glow=ctx.createRadialGradient(1000,40,0,1000,40,650);glow.addColorStop(0,'#193137');glow.addColorStop(1,'#0b181a');ctx.fillStyle=glow;ctx.fillRect(0,0,1100,760);
    ctx.fillStyle='#111f20';ctx.fillRect(0,0,1100,77);
    ctx.fillStyle='#e9bb62';ctx.fillRect(28,27,4,22);ctx.font='bold 22px monospace';ctx.fillText('spyy / EARTH SYSTEMS',51,46);
    ctx.font='15px monospace';ctx.fillStyle='#789b9c';ctx.fillText('UNIT 07 · SIMULATED FEED',810,45);
    ctx.strokeStyle='#83ddef35';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(27,77);ctx.lineTo(1073,77);ctx.stroke();
    ctx.fillStyle=mode==='debug'?'#e9bb62':'#83ddef';ctx.font='17px monospace';ctx.fillText(mode==='debug'?'◇ DIAGNOSTICS':mode==='build'?'◇ BUILD PIPELINE':'◇ SOURCE MODULE',30,115);
    ctx.fillStyle='#5c7d7e';ctx.font='14px monospace';ctx.fillText('REPAIR / BUILD / RESTORE',835,114);
    ctx.fillStyle='#4a6b681e';ctx.fillRect(29,140,1042,1);
    const lines = scripts[mode]; let budget = Math.floor(clock.current * 37);
    ctx.font = '22px monospace';
    for (let i=0; i<lines.length; i++) {
      const visible = lines[i].slice(0, Math.max(0, budget));
      ctx.fillStyle = '#3c6254';ctx.fillText(String(i+1).padStart(2,'0'),43,186+i*46);
      ctx.fillStyle = lines[i].startsWith('✕') || lines[i].includes('at generate') ? '#ff8396' : lines[i].startsWith('✓') ? '#c2f970' : lines[i].startsWith('//') ? '#628a78' : '#b5e6dc';
      ctx.fillText(visible, 87, 186+i*46);
      if (budget>=0 && budget<=lines[i].length && (paused || Math.floor(clock.current*2)%2===0)) { ctx.fillStyle='#c2f970';ctx.fillRect(87+ctx.measureText(visible).width+5,167+i*46,12,25); }
      budget -= lines[i].length + 12;
    }
    ctx.strokeStyle='#83ddef24';ctx.beginPath();ctx.moveTo(28,698);ctx.lineTo(1072,698);ctx.stroke();
    ctx.fillStyle='#73918b';ctx.font='15px monospace';ctx.fillText('EARTH / '+mode.toUpperCase()+' SEQUENCE',30,732);
    ctx.fillStyle=paused?'#e9bb62':'#83ddef';ctx.beginPath();ctx.arc(890,727,4,0,Math.PI*2);ctx.fill();ctx.fillText(paused?'STANDBY':'SYSTEM ONLINE',905,732);
    ctx.fillStyle='#e9bb62';ctx.fillRect(28,697,70,2);ctx.fillStyle='#83ddef';ctx.fillRect(1022,697,50,2);
    ctx.fillStyle='#0000000a';for(let y=80;y<696;y+=4)ctx.fillRect(0,y,1100,1);
    screen.texture.needsUpdate = true;
  });
  return <group ref={group} scale={fit}>
    <mesh position={[0,0,-.045]}><boxGeometry args={[5.66,3.95,.11]}/><meshStandardMaterial color="#3d4639" metalness={.8} roughness={.4}/></mesh>
    <mesh position={[0,0,.016]}><planeGeometry args={[5.55,3.85]}/><meshBasicMaterial map={screen.texture}/></mesh>
    {[-1,1].flatMap(x=>[-1,1].map(y=><mesh key={`${x}-${y}`} position={[x*2.8,y*1.945,.022]}><circleGeometry args={[.017,10]}/><meshBasicMaterial color="#99855b"/></mesh>))}
    <mesh position={[-2.54,1.985,0]}><boxGeometry args={[.45,.018,.025]}/><meshBasicMaterial color="#e9bb62"/></mesh>
    <mesh position={[2.54,-1.985,0]}><boxGeometry args={[.45,.018,.025]}/><meshBasicMaterial color="#83ddef"/></mesh>
  </group>;
}
export default function Sculpture() {
  const [mode,setMode]=useState<Mode>('code'); const [paused,setPaused]=useState(false); const [run,setRun]=useState(0);
  return <div className="terminal-scene"><Canvas style={{height:'calc(100% - 65px)'}} dpr={[1,1.5]} camera={{position:[0,0,7],fov:42}} aria-label="Slim sci-fi terminal with two red-laser security drones, showing simulated code, builds and diagnostics"><ambientLight intensity={1.5}/><pointLight position={[3,4,5]} intensity={12} color="#83ddef"/><Terminal mode={mode} paused={paused} run={run}/></Canvas><div className="terminal-controls" aria-label="Terminal simulation controls">{(['code','build','debug'] as Mode[]).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>{setMode(m);setRun(r=>r+1)}}>{m==='code'?'⌘ Code':m==='build'?'▷ Build':'⚡ Debug'}</button>)}<button onClick={()=>{setPaused(!paused);window.dispatchEvent(new CustomEvent('patrol-pause',{detail:!paused}))}} aria-label={paused?'Resume terminal':'Pause terminal'}>{paused?'▷':'Ⅱ'}</button><button aria-label="Replay terminal sequence" onClick={()=>setRun(r=>r+1)}>↻</button></div><span className="terminal-hint">EARTH SYSTEMS / UNIT 07 · SIMULATED OUTPUT</span></div>;
}
