export default function DroneBody({reverse=false}:{reverse?:boolean}){return ( <group>
  <mesh scale={[1,.85,.85]}><sphereGeometry args={[.21,24,16]}/><meshStandardMaterial color={reverse?'#9caaa5':'#c4ceca'} metalness={.55} roughness={.4}/></mesh>
  <mesh position={[0,.015,.15]} scale={[1.25,.65,.6]}><sphereGeometry args={[.15,20,14]}/><meshStandardMaterial color="#101c20" metalness={.8} roughness={.25}/></mesh>
  <mesh position={[0,.015,.247]}><circleGeometry args={[.051,24]}/><meshBasicMaterial color="#ff4b4b"/></mesh>
  <mesh position={[0,.015,.25]}><ringGeometry args={[.065,.073,24]}/><meshBasicMaterial color="#b64a43"/></mesh>
  <mesh position={[0,.015,.252]}><circleGeometry args={[.022,16]}/><meshBasicMaterial color="#ffd6bd"/></mesh>
  {[-1,1].map(side=><group key={side} position={[side*.22,-.035,0]}><mesh rotation={[0,0,side*.2]}><boxGeometry args={[.12,.15,.15]}/><meshStandardMaterial color="#55635c" metalness={.65} roughness={.45}/></mesh><mesh position={[side*.02,-.1,0]}><cylinderGeometry args={[.04,.055,.06,12]}/><meshStandardMaterial color="#1b2c2c"/></mesh><mesh position={[side*.02,-.15,0]}><coneGeometry args={[.035,.1,12]}/><meshBasicMaterial color="#83ddef" transparent opacity={.12}/></mesh></group>)}
  <mesh position={[0,.19,0]}><boxGeometry args={[.14,.035,.1]}/><meshStandardMaterial color="#384a43"/></mesh>
  <mesh position={[0,-.14,.1]}><boxGeometry args={[.1,.025,.04]}/><meshBasicMaterial color="#c18f50"/></mesh>
 </group>);}
