'use strict';
const BeamPreviewModel=Object.freeze({
  // Four ideal elements along z, separated by half a wavelength.
  power(direction,azimuth,beam=true){
    if(!beam)return Math.max(0,1-direction.y*direction.y);
    const delta=Math.PI*(direction.z-Math.sin(azimuth));let real=0,imag=0;
    for(let n=0;n<4;n++){real+=Math.cos(n*delta);imag+=Math.sin(n*delta);}
    return (real*real+imag*imag)/16*Math.max(0,1-direction.y*direction.y);
  }
});
document.addEventListener('DOMContentLoaded',()=>{
  const canvas=document.getElementById('beam3dCanvas');if(!canvas)return;
  const ctx=canvas.getContext('2d'),$=s=>document.querySelector(s);
  let yaw=.65,pitch=.42,angle=0,beam=true;
  function project(p){const x=p.x*Math.cos(yaw)-p.z*Math.sin(yaw),z=p.x*Math.sin(yaw)+p.z*Math.cos(yaw);const y=p.y*Math.cos(pitch)-z*Math.sin(pitch),depth=p.y*Math.sin(pitch)+z*Math.cos(pitch);const k=58*10/(10+depth);return{x:400+x*k,y:235-y*k,depth};}
  function path(points,color,width=1,close=false,fill=''){ctx.beginPath();for(let i=0;i<points.length;i++){const p=project(points[i]);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}if(close)ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
  function label(p,text,color='#b4c8dc',size=13){const s=project(p);ctx.fillStyle=color;ctx.font=size+'px system-ui';ctx.textAlign='center';ctx.fillText(text,s.x,s.y);}
  function draw(){
    const ratio=Math.min(devicePixelRatio||1,2),width=canvas.clientWidth;if(!width)return;
    const projected=Boolean(canvas.closest(".lim-demo"));
    const labelSize=projected?22:13;
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(width*ratio*10/16);ctx.setTransform(canvas.width/800,0,0,canvas.height/500,0,0);ctx.clearRect(0,0,800,500);
    for(let i=-5;i<=5;i++){path([{x:i,y:-1,z:-5},{x:i,y:-1,z:5}],'#1b3046');path([{x:-5,y:-1,z:i},{x:5,y:-1,z:i}],'#1b3046');}
    const faces=[],rows=20,cols=48;
    const point=(t,p)=>{const d={x:Math.sin(t)*Math.cos(p),y:Math.cos(t),z:Math.sin(t)*Math.sin(p)};const r=.08+3.7*Math.sqrt(BeamPreviewModel.power(d,angle,beam));return{x:d.x*r,y:d.y*r+.35,z:d.z*r};};
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const ps=[point(i*Math.PI/rows,j*2*Math.PI/cols),point((i+1)*Math.PI/rows,j*2*Math.PI/cols),point((i+1)*Math.PI/rows,(j+1)*2*Math.PI/cols),point(i*Math.PI/rows,(j+1)*2*Math.PI/cols)];faces.push({points:ps,depth:ps.reduce((s,p)=>s+project(p).depth,0)/4});}
    faces.sort((a,b)=>b.depth-a.depth);
    const meshStroke=beam?(projected?'#56ceff65':'#56ceff25'):(projected?'#a78bfa65':'#a78bfa20');
    const meshFill=beam?(projected?'#38bdf81a':'#38bdf80b'):(projected?'#a78bfa18':'#a78bfa08');
    for(const face of faces)path(face.points,meshStroke,projected?1:.5,true,meshFill);
    const top=[{x:-.65,y:-.65,z:-1.05},{x:.65,y:-.65,z:-1.05},{x:.65,y:-.65,z:1.05},{x:-.65,y:-.65,z:1.05}];path(top,'#7b9ab8',2,true,'#122b42');
    for(const z of [-.75,-.25,.25,.75]){path([{x:0,y:-.65,z},{x:0,y:.6,z}],'#bdefff',4);label({x:0,y:.95,z},String(z*2+2.5),'#bdefff',labelSize);}
    const phone={x:Math.cos(angle)*4.3,y:.35,z:Math.sin(angle)*4.3};ctx.setLineDash([5,5]);path([{x:0,y:.35,z:0},phone],'#fbbf24',2);ctx.setLineDash([]);
    path([{x:phone.x,y:phone.y-.4,z:phone.z-.2},{x:phone.x,y:phone.y+.4,z:phone.z-.2},{x:phone.x,y:phone.y+.4,z:phone.z+.2},{x:phone.x,y:phone.y-.4,z:phone.z+.2}],'#fbbf24',2,true,'#332b16');label({x:phone.x,y:1,z:phone.z},'Client','#fbbf24',labelSize);label({x:0,y:-1.4,z:0},'AP / 4 antenne','#b4c8dc',labelSize);
    $('#beam3dState').textContent=beam?'Fasi coordinate: il diagramma favorisce la direzione del client. Il modello lineare produce anche un lobo posteriore e lobi secondari.':'Riferimento senza coordinamento: diagramma normalizzato del singolo elemento. Non ci sono quattro flussi dati: stiamo confrontando la distribuzione spaziale dello stesso segnale.';
  }
  $('#beam3dToggle').addEventListener('click',e=>{beam=!beam;e.currentTarget.setAttribute('aria-pressed',String(beam));e.currentTarget.textContent=beam?'Beamforming attivo':'Riferimento senza coordinamento';draw();});
  $('#beam3dAngle').addEventListener('input',e=>{angle=+e.target.value*Math.PI/180;$('#beam3dAngleValue').textContent=e.target.value+'°';draw();});
  $('#beam3dReset').addEventListener('click',()=>{yaw=.65;pitch=.42;draw();});
  let origin=null;canvas.addEventListener('pointerdown',e=>{origin={x:e.clientX,y:e.clientY,yaw,pitch};canvas.setPointerCapture(e.pointerId);});canvas.addEventListener('pointermove',e=>{if(!origin)return;yaw=origin.yaw+(e.clientX-origin.x)*.009;pitch=Math.max(-.6,Math.min(1.2,origin.pitch+(e.clientY-origin.y)*.009));draw();});for(const name of ['pointerup','pointercancel'])canvas.addEventListener(name,()=>{origin=null;});
  canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')yaw-=.1;if(e.key==='ArrowRight')yaw+=.1;if(e.key==='ArrowUp')pitch=Math.min(1.2,pitch+.1);if(e.key==='ArrowDown')pitch=Math.max(-.6,pitch-.1);draw();});
  new ResizeObserver(draw).observe(canvas);draw();
});
