'use strict';
// Planimetria di fantasia: 20 pixel logici = 1 metro, indipendenti dallo schermo.
const CoverageModel = Object.freeze({
  walls: [
    {x1:50,y1:40,x2:550,y2:40,loss:12}, {x1:550,y1:40,x2:550,y2:360,loss:12},
    {x1:550,y1:360,x2:50,y2:360,loss:12}, {x1:50,y1:360,x2:50,y2:40,loss:12},
    {x1:220,y1:40,x2:220,y2:240,loss:12},
    {x1:380,y1:160,x2:380,y2:360,loss:3}, {x1:50,y1:200,x2:220,y2:200,loss:3}
  ],
  crosses(a,b,w) {
    const dx=b.x-a.x,dy=b.y-a.y,wx=w.x2-w.x1,wy=w.y2-w.y1;
    const den=dx*wy-dy*wx;
    if(Math.abs(den)<1e-9)return false;
    const t=((w.x1-a.x)*wy-(w.y1-a.y)*wx)/den;
    const u=((w.x1-a.x)*dy-(w.y1-a.y)*dx)/den;
    return t>1e-6 && t<1-1e-6 && u>=0 && u<=1;
  },
  measure(ap,point,freq) {
    const distance=Math.hypot(point.x-ap.x,point.y-ap.y)/20;
    const free=M1Models.fspl(Math.max(1,distance),freq);
    const crossed=this.walls.filter(w=>this.crosses(ap,point,w));
    const loss=crossed.reduce((sum,w)=>sum+w.loss,0);
    return {distance,free,loss,received:10-free-loss,walls:crossed.length};
  },
  color(rssi) {
    const stops=[[-90,[116,45,68]],[-78,[221,100,73]],[-67,[232,183,78]],[-55,[51,173,168]],[-35,[103,212,183]]];
    if(rssi<=-90)return stops[0][1];if(rssi>=-35)return stops[4][1];
    for(let i=1;i<stops.length;i++)if(rssi<=stops[i][0]){
      const t=(rssi-stops[i-1][0])/(stops[i][0]-stops[i-1][0]);
      return stops[i][1].map((c,k)=>Math.round(stops[i-1][1][k]+t*(c-stops[i-1][1][k])));
    }
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  const canvas=document.getElementById('heatmapCanvas');if(!canvas)return;
  const ctx=canvas.getContext('2d'), field=document.createElement('canvas');
  field.width=600;field.height=400;
  const fc=field.getContext('2d'),$=s=>document.querySelector(s);
  let ap={x:280,y:120},probe={x:460,y:260},freq=2.4,mode='ap',dirty=true,scheduled=false;
  const f=n=>n.toLocaleString('it-IT',{maximumFractionDigits:1,minimumFractionDigits:1});
  function request(){updateReadout();if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;draw();});}
  function raster(){
    const image=fc.createImageData(600,400),d=image.data;
    const frequencyLoss=20*Math.log10(freq*1000)-27.55;
    for(let y=0;y<400;y++)for(let x=0;x<600;x++){
      const point={x,y},dist=Math.max(1,Math.hypot(x-ap.x,y-ap.y)/20);
      let loss=0;for(const w of CoverageModel.walls)if(CoverageModel.crosses(ap,point,w))loss+=w.loss;
      const rgb=CoverageModel.color(10-20*Math.log10(dist)-frequencyLoss-loss),i=(y*600+x)*4;
      d[i]=rgb[0];d[i+1]=rgb[1];d[i+2]=rgb[2];d[i+3]=255;
    }fc.putImageData(image,0,0);dirty=false;
  }
  function marker(p,label,color){ctx.beginPath();ctx.arc(p.x,p.y,11,0,Math.PI*2);ctx.fillStyle='#06121d';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=color;ctx.stroke();ctx.fillStyle='#fff';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,p.x,p.y);}
  function draw(){
    const width=canvas.clientWidth;if(!width)return;
    const ratio=Math.min(devicePixelRatio||1,2),height=width*2/3;
    const pixelWidth=Math.round(width*ratio),pixelHeight=Math.round(height*ratio);
    if(canvas.width!==pixelWidth||canvas.height!==pixelHeight){canvas.width=pixelWidth;canvas.height=pixelHeight;}
    ctx.setTransform(canvas.width/600,0,0,canvas.height/400,0,0);
    if(dirty)raster();ctx.imageSmoothingEnabled=true;ctx.drawImage(field,0,0);
    ctx.fillStyle='#07132655';ctx.fillRect(0,0,600,40);ctx.fillRect(0,360,600,40);ctx.fillRect(0,40,50,320);ctx.fillRect(550,40,50,320);
    for(const w of CoverageModel.walls){ctx.beginPath();ctx.moveTo(w.x1,w.y1);ctx.lineTo(w.x2,w.y2);ctx.lineWidth=w.loss===12?6:3;ctx.strokeStyle=w.loss===12?'#142231':'#eef3fa';ctx.stroke();}
    ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.font='bold 12px system-ui';
    for(const [name,x,y]of [['AULA 1',75,70],['LABORATORIO',75,230],['AULA 2',245,70],['AULA 3',405,190]]){
      ctx.fillStyle='#071326cc';ctx.fillRect(x-5,y-15,108,22);ctx.fillStyle='#fff';ctx.fillText(name,x,y);
    }
    ctx.beginPath();ctx.setLineDash([5,4]);ctx.moveTo(ap.x,ap.y);ctx.lineTo(probe.x,probe.y);ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);
    marker(ap,'AP','#72dfff');marker(probe,'P','#fff');
    ctx.beginPath();ctx.moveTo(60,380);ctx.lineTo(160,380);ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#fff';ctx.font='10px system-ui';ctx.textAlign='left';ctx.fillText('5 metri',65,395);
  }
  function updateReadout(){
    const r=CoverageModel.measure(ap,probe,freq);
    $('#measureRSSI').textContent=f(r.received)+' dBm';
    $('#measureDistance').textContent=f(r.distance)+' m';
    $('#measureWalls').textContent=r.walls+' / −'+r.loss+' dB';
    $('#measureEquation').textContent=`10 − ${f(r.free)} − ${r.loss} = ${f(r.received)} dBm`;
    $('#measureMeaning').textContent=r.received>=-67?'Il punto P raggiunge il target didattico di −67 dBm. Questo non garantisce da solo velocità o qualità delle chiamate.':'Il punto P è sotto il target didattico di −67 dBm. Avvicina l’AP o riduci i muri attraversati e osserva il cambiamento.';
    $('#apX').value=fixed(ap.x/20);$('#apY').value=fixed(ap.y/20);
    $('#apPosition').textContent=`x ${f(ap.x/20)} m · y ${f(ap.y/20)} m`;
  }
  const fixed=n=>Math.round(n*10)/10;
  document.querySelectorAll('[data-map-mode]').forEach(b=>b.addEventListener('click',()=>{
    mode=b.dataset.mapMode;document.querySelectorAll('[data-map-mode]').forEach(e=>e.setAttribute('aria-pressed',String(e===b)));
    $('#mapHelp').textContent=mode==='ap'?'Tocca la mappa per spostare AP. Trascina per confrontare le posizioni.':'Tocca la mappa per spostare il punto P. Leggi il segnale ricevuto in quel punto.';
  }));
  $('#mapFrequency').addEventListener('change',e=>{freq=+e.target.value;dirty=true;request();});
  $('#probePreset').addEventListener('change',e=>{const [x,y]=e.target.value.split(',').map(Number);probe={x,y};request();});
  for(const [id,key]of [['apX','x'],['apY','y']])$('#'+id).addEventListener('input',e=>{ap[key]=+e.target.value*20;dirty=true;request();});
  $('#resetMap').addEventListener('click',()=>{ap={x:280,y:120};probe={x:460,y:260};freq=2.4;$('#mapFrequency').value='2.4';$('#probePreset').value='460,260';dirty=true;request();});
  let dragging=false;
  function move(e){const rect=canvas.getBoundingClientRect(),p={x:Math.max(60,Math.min(540,(e.clientX-rect.left)/rect.width*600)),y:Math.max(50,Math.min(350,(e.clientY-rect.top)/rect.height*400))};if(mode==='ap'){ap=p;dirty=true;}else{probe=p;$('#probePreset').value='';}request();}
  canvas.addEventListener('pointerdown',e=>{dragging=true;canvas.setPointerCapture(e.pointerId);move(e);});
  canvas.addEventListener('pointermove',e=>{if(dragging)move(e);});
  canvas.addEventListener('pointerup',()=>{dragging=false;});canvas.addEventListener('pointercancel',()=>{dragging=false;});
  canvas.addEventListener('keydown',e=>{const delta={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]}[e.key];if(!delta)return;e.preventDefault();const p=mode==='ap'?ap:probe;p.x=Math.max(60,Math.min(540,p.x+delta[0]));p.y=Math.max(50,Math.min(350,p.y+delta[1]));if(mode==='ap')dirty=true;else $('#probePreset').value='';request();});
  new ResizeObserver(request).observe(canvas);updateReadout();draw();
});
