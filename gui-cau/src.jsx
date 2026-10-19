import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
import './style.css';

const scenes=[
{theme:'hello',duration:9000,tag:'MỘT CHIẾC THIỆP NHỎ GỬI THƯ',title:<>Thư ơi, <em>20/10 nè!</em></>,note:'Chúc cậu một ngày thật vui, đầy năng lượng và nhiều điều tốt lành.',aside:'Mong hôm nay sẽ có thật nhiều điều khiến Thư mỉm cười.'},
{theme:'garden',duration:10000,tag:'CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM',title:<>Chúc cậu một ngày <em>thật vui.</em></>,note:'Có món ngon để ăn, có thời gian nghỉ và có thật nhiều tiếng cười.',aside:'Hôm nay nhớ tự thưởng cho mình một món yêu thích nha.'},
{theme:'stars',duration:10000,tag:'THÊM MỘT VÀI LỜI CHÚC NỮA NÈ',title:<>Chúc những dự định <em>đều thuận lợi.</em></>,note:'Mong những kế hoạch của Thư, từ học tập đến công việc, đều có những bước tiến mới.',aside:'Cứ từ từ mà làm, từng chút một cũng là tiến bộ rồi!'},
{theme:'heart',duration:10000,tag:'SỨC KHỎE VẪN LÀ QUAN TRỌNG NHẤT',title:<>Chúc cậu luôn <em>khỏe mạnh.</em></>,note:'Ăn uống đầy đủ, ngủ ngon và bớt những hôm thức khuya nhé.',aside:'Bận đến mấy cũng nhớ dành thời gian nghỉ ngơi.'},
{theme:'bloom',duration:10000,tag:'TỰ TIN LÀ CHÍNH MÌNH',title:<>Luôn xinh tươi, <em>luôn tự tin.</em></>,note:'Mặc bộ đồ mình thích, làm điều mình giỏi, thử điều mình muốn.',aside:'Chúc Thư ngày càng hài lòng với phiên bản của chính mình.'},
{theme:'smile',duration:11000,tag:'BỚT ÁP LỰC, THÊM NIỀM VUI',title:<>Cười nhiều hơn, <em>lo ít lại.</em></>,note:'Chúc cậu gặp nhiều chuyện vui và bớt những chuyện đau đầu.',aside:'Mong mỗi ngày của Thư đều có một niềm vui nho nhỏ.'},
{theme:'letter',duration:18000,tag:'THÊM NHỮNG ĐIỀU TỐT LÀNH',title:<>Chúc cậu luôn <em>bình an, may mắn.</em></>,note:'Mong Thư có nhiều cơ hội mới, đủ tự tin để thử những điều mình thích và đủ kiên trì để theo đuổi những mục tiêu của riêng mình.',aside:'Chúc cậu tận hưởng những ngày vui và nhẹ nhàng vượt qua những ngày khó.'},
{theme:'finale',duration:14000,tag:'GỬI THƯ MỘT CHÚT NIỀM VUI',title:<>Chúc mừng <em>ngày 20/10!</em></>,note:'Chúc Thư vui vẻ, khỏe mạnh, may mắn và làm được những điều mình muốn.',aside:'Nhận lời chúc xong thì nhớ có một ngày thật vui nha, cậu! ✨'}
];
const total=scenes.reduce((sum,s)=>sum+s.duration,0);
function sceneAt(time){let start=0;for(let i=0;i<scenes.length;i++){if(time<start+scenes[i].duration)return{index:i,local:time-start};start+=scenes[i].duration}return{index:0,local:0}}

function NightSky({theme,paused}){
const ref=useRef(),current=useRef(theme),pauseRef=useRef(paused);
useEffect(()=>{current.current=theme},[theme]);useEffect(()=>{pauseRef.current=paused},[paused]);
useEffect(()=>{const canvas=ref.current,ctx=canvas.getContext('2d');let w,h,raf,last=0,t=0,burstAt=0;
const points=Array.from({length:150},()=>({x:Math.random(),y:Math.random(),r:.4+Math.random()*1.8,p:Math.random()*7,s:.3+Math.random()}));
const petals=Array.from({length:55},()=>({x:Math.random(),y:Math.random(),r:2+Math.random()*5,p:Math.random()*7,s:22+Math.random()*35}));
let sparks=[];
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}resize();addEventListener('resize',resize);
function draw(now){const dt=document.hidden||pauseRef.current?0:Math.min((now-last)/1000||0,.04);last=now;t+=dt;ctx.clearRect(0,0,w,h);
const gold=['garden','smile','finale'].includes(current.current),blue=current.current==='stars';
points.forEach(p=>{const a=.22+(Math.sin(t*p.s*2+p.p)+1)*.32,x=p.x*w+Math.sin(t*.2+p.p)*15,y=(p.y*h+t*(3+p.s*3))%h;ctx.fillStyle='rgba('+(blue?'158,228,255':'255,229,214')+','+a+')';ctx.shadowColor=blue?'#83e9ff':'#ffbccc';ctx.shadowBlur=p.r*4;ctx.beginPath();ctx.arc(x,y,p.r,0,Math.PI*2);ctx.fill();if(p.r>1.8){ctx.fillRect(x-4,y-.4,8,.8);ctx.fillRect(x-.4,y-4,.8,8)}});ctx.shadowBlur=0;
petals.forEach(p=>{p.y+=dt*p.s/h;p.x+=dt*(8+Math.sin(t+p.p)*13)/w;if(p.y>1.05){p.y=-.05;p.x=Math.random()}if(p.x>1.05)p.x=-.05;ctx.save();ctx.translate(p.x*w,p.y*h);ctx.rotate(t*.8+p.p);ctx.scale(Math.cos(t*1.8+p.p)*.65+.8,1);ctx.fillStyle=gold?'rgba(255,202,110,.65)':blue?'rgba(129,217,255,.4)':'rgba(250,126,175,.65)';ctx.beginPath();ctx.moveTo(-p.r,0);ctx.quadraticCurveTo(0,-p.r*1.8,p.r,0);ctx.quadraticCurveTo(0,p.r*.7,-p.r,0);ctx.fill();ctx.restore()});
for(let i=0;i<3;i++){const phase=(t+i*2.7)%8;if(phase<1.5){const x=w*(.1+i*.3)+phase*220,y=h*.08+phase*130,g=ctx.createLinearGradient(x-130,y-76,x,y);g.addColorStop(0,'transparent');g.addColorStop(1,blue?'#a4f3ff':'#ffe1ee');ctx.strokeStyle=g;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(x-130,y-76);ctx.lineTo(x,y);ctx.stroke()}}
if(['smile','finale'].includes(current.current)&&t>burstAt){burstAt=t+1.6;const x=w*(.12+Math.random()*.76),y=h*(.15+Math.random()*.6);for(let i=0;i<42;i++){const a=i/42*Math.PI*2,s=35+Math.random()*65;sparks.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1})}}
sparks=sparks.filter(s=>s.life>0);sparks.forEach(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=dt*12;s.life-=dt*.5;ctx.fillStyle='rgba(255,205,152,'+Math.max(0,s.life)*.7+')';ctx.beginPath();ctx.arc(s.x,s.y,1.5,0,Math.PI*2);ctx.fill()});raf=requestAnimationFrame(draw)}
raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)}},[]);
return <canvas ref={ref} className="night-sky" aria-hidden="true"/>}

function Flower({x,y,i}){return <g transform={'translate('+x+' '+y+') scale('+(.65+i%3*.2)+')'}><g className="flower-sway" style={{animationDelay:'-'+i*.43+'s'}}><path d="M0 0 Q-18 90 0 180 M-5 95 Q-52 65 -38 50 Q-8 58 -5 95 M-3 130 Q45 94 34 80 Q5 85 -3 130"/><g className="petals">{Array.from({length:7},(_,n)=><ellipse key={n} cx="0" cy="-18" rx="9" ry="22" transform={'rotate('+n*360/7+')'}/>)}</g><circle r="7"/></g></g>}
function Scenery({theme}){const flowers=['garden','bloom','smile','finale'].includes(theme);return <div className={'scenery scenery-'+theme} aria-hidden="true"><div className="halo halo-one"/><div className="halo halo-two"/>
<svg viewBox="0 0 1400 850" preserveAspectRatio="xMidYMax slice" className="landscape" fill="none">
{flowers&&<g className="flower-field">{Array.from({length:24},(_,i)=><Flower key={i} i={i} x={i*63-20} y={680+Math.sin(i*2)*55}/>)}{Array.from({length:65},(_,i)=><path className="grass" key={i} style={{animationDelay:'-'+i*.11+'s'}} d={'M'+i*23+' 850 Q'+(i*23-25)+' 790 '+(i*23+(i%2?20:-20))+' '+(740+i%5*14)}/>)}</g>}
{theme==='stars'&&<g className="constellations"><path d="M65 260 L170 150 L270 290 L130 410 Z M1120 310 L1240 180 L1330 350 L1200 470 Z"/>{[[65,260],[170,150],[270,290],[130,410],[1120,310],[1240,180],[1330,350],[1200,470]].map(([x,y])=><circle key={x} cx={x} cy={y} r="4"/>)}</g>}
{theme==='heart'&&<g className="heart-drawing"><path className="heart-outline" d="M1140 510 C950 380 1020 240 1100 290 Q1135 310 1140 345 Q1190 240 1250 300 C1350 400 1190 490 1140 510 Z"/><path className="heartbeat-line" d="M20 610 H120 L145 580 L170 655 L200 550 L225 610 H350"/><path d="M220 410 C120 340 160 270 220 325 C290 270 330 340 220 410Z"/></g>}
</svg>
{theme==='stars'&&<div className="wish-gem"><span/><i/><i/></div>}
{['heart','smile','finale'].includes(theme)&&<div className="floating-hearts">{Array.from({length:14},(_,i)=><span key={i} style={{'--x':(i*31)%100+'%','--delay':-i*1.3+'s','--flight':7+i%4+'s'}}>♡</span>)}</div>}
{flowers&&<div className="butterflies">{Array.from({length:6},(_,i)=><div className="butterfly" key={i} style={{'--x':10+i*16+'%','--delay':-i*2+'s'}}><i/><i/></div>)}</div>}
</div>}

function MusicButton(){
const audio=useRef(null),[playing,setPlaying]=useState(false),[pending,setPending]=useState(false),[error,setError]=useState('');
useEffect(()=>{audio.current.volume=.45},[]);
async function toggle(){
 const player=audio.current;
 if(!player.paused){player.pause();return}
 setError('');setPending(true);
 try{await player.play()}catch{setError('Chưa phát được nhạc. Cậu thử lại nhé.')}finally{setPending(false)}
}
return <div className="music-control">
 <audio ref={audio} src={`${import.meta.env.BASE_URL}nhac-nen.mp3`} preload="none" loop onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setPlaying(false);setError('Không tải được nhạc. Cậu thử tải lại trang nhé.')}}/>
 <button type="button" className={'music-button'+(playing?' is-playing':'')} onClick={toggle} disabled={pending} aria-label={playing?'Tắt nhạc nền':'Bật nhạc nền'} aria-pressed={playing} aria-describedby={error?'music-error':undefined}>
 <span className="music-equalizer" aria-hidden="true"><i/><i/><i/><i/></span>
 <span>{pending?'Đang tải…':playing?'Tắt nhạc':'Bật nhạc'}</span>
 </button>
 {error&&<p id="music-error" className="music-error" role="status">{error}</p>}
 </div>
}

function App(){const [clock,setClock]=useState(0),[paused,setPaused]=useState(false),[hidden,setHidden]=useState(document.hidden);const pauseRef=useRef(false);
useEffect(()=>{const onVisibility=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',onVisibility);return()=>document.removeEventListener('visibilitychange',onVisibility)},[]);
useEffect(()=>{pauseRef.current=paused},[paused]);
useEffect(()=>{let raf,last=0,elapsed=0,lastRender=0;function tick(now){if(last&&!document.hidden&&!pauseRef.current)elapsed+=Math.min(now-last,100);last=now;if(now-lastRender>60){setClock(elapsed%total);lastRender=now}raf=requestAnimationFrame(tick)}raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
useEffect(()=>{const key=e=>{if(e.key==='Escape')setPaused(p=>!p)};addEventListener('keydown',key);return()=>removeEventListener('keydown',key)},[]);
const{index,local}=sceneAt(clock),scene=scenes[index];
return <main className={'film theme-'+scene.theme+(paused||hidden?' paused':'')} aria-label="Thiệp chúc mừng ngày 20 tháng 10 tự động"><div className="aurora aurora-one"/><div className="aurora aurora-two"/><NightSky theme={scene.theme} paused={paused}/><div className="vignette"/>
<div className="film-brand">gửi Thư<span>✦</span></div><div className="date-mark">20 <span>·</span> 10</div>
<MusicButton/>
<section key={index} className={'scene scene-'+scene.theme} style={{'--duration':scene.duration+'ms'}} aria-live="polite"><Scenery theme={scene.theme}/>
<div className="message"><p className="eyebrow">{scene.tag}</p><h1>{scene.title}</h1><p className="note">{scene.note}</p></div>
<div className={'face face-'+scene.theme} aria-hidden="true"><div className="eye-wrap"><div className="eye"/><span className="blush">///</span></div><div className="eye-wrap"><div className="eye"/><span className="blush">///</span></div><span className="mouth"/></div>
<p className="aside">{scene.aside}</p>{scene.theme==='finale'&&<div className="final-date">20<span>✦</span>10</div>}</section>
<div className="film-footer"><span>CHÚC CẬU MỘT NGÀY 20/10 THẬT VUI</span><div className="timeline" aria-hidden="true">{scenes.map((s,i)=><span key={s.theme}><i style={{transform:'scaleX('+(i<index?1:i===index?local/s.duration:0)+')'}}/></span>)}</div><span>LUÔN VUI VẺ NHÉ ✦</span></div></main>}
createRoot(document.getElementById('root')).render(<App/>);

