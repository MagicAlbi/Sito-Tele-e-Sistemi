/* Esperimenti del quaderno WLAN. Nessun servizio esterno. */
'use strict';
const M1Models = Object.freeze({
  fspl(distance, frequencyGHz) { return 20 * Math.log10(distance) + 20 * Math.log10(frequencyGHz * 1000) - 27.55; },
  budget(distance, frequencyGHz, dry, concrete, noise = -92) {
    const free = this.fspl(distance, frequencyGHz), walls = dry * 3 + concrete * 12;
    const received = 20 - free - walls;
    return { free, walls, received, snr: received - noise, margin: received + 67 };
  },
  spectrum(a, b, width) { const separation = Math.abs(a - b); return { separation, overlap: Math.max(0, width - separation), same: a === b }; },
  streams(ap, client) { return Math.min(ap, client); }

});

document.addEventListener('DOMContentLoaded', () => {
  // Printable mirrors preserve long answers without clipping textarea scroll areas.
  document.querySelectorAll('textarea').forEach(field => {
    const paper = document.createElement('div');
    paper.className = 'print-answer';
    field.after(paper);
    const sync = () => { paper.textContent = field.value; };
    field.addEventListener('input', sync);
    window.addEventListener('beforeprint', sync);
    sync();
  });
  const $ = (root, selector) => root.querySelector(selector);
  const fmt = (n, digits = 1) => n.toLocaleString('it-IT', { maximumFractionDigits: digits, minimumFractionDigits: digits });
  const heading = (code, title) => `<div class="lab-heading"><span>Esperimento ${code}</span><h3>${title}</h3></div>`;
  const diagram = (label, content, height = 230) => `<svg class="lab-diagram" role="img" aria-label="${label}" viewBox="0 0 700 ${height}">${content}</svg>`;
  const readout = '<div class="lab-readout" aria-live="polite" data-result></div>';
  const button = (action, text) => `<button type="button" class="btn btn-ghost btn-sm" data-action="${action}">${text}</button>`;
  const device = (x, y, label) => `<rect class="device" x="${x-43}" y="${y-24}" width="86" height="48" rx="3"/><text x="${x}" y="${y+5}" text-anchor="middle">${label}</text>`;
  const experiments = {
    ofdma(root) {
      root.innerHTML=heading('02B','Un AP deve inviare dati a tre dispositivi')+
        '<p>Il portatile A, il telefono B e il tablet C aspettano ciascuno un piccolo messaggio. <strong>Chi riceve e chi deve aspettare?</strong> Scegli un caso e premi Avanti.</p><div class="ofdma-modes">'+button('single','1. Uno alla volta')+button('ofdma','2. Con OFDMA')+'</div><div class="ofdma-scene" data-scene></div><div class="ofdma-explanation" aria-live="polite" data-result></div><div class="ofdma-navigation">'+button('back','Indietro')+'<span data-step></span>'+button('next','Avanti')+button('reset','Ricomincia')+'</div><p class="lab-note">Schema semplificato di una trasmissione dall’AP ai client. Un riquadro colorato rappresenta dati, non un pacchetto di durata fissa. Il confronto spiega l’assegnazione delle frequenze: non misura tempi reali o un aumento di velocità garantito. OFDMA richiede dispositivi compatibili.</p>';
      let mode='single',step=0;
      const names=['Portatile A','Telefono B','Tablet C'];
      const story={single:[
        ['Prima di trasmettere','Tre dispositivi sono in attesa. Nel caso monoutente, l’AP userà il canale per un destinatario alla volta.'],
        ['Ora riceve A','Il canale trasporta dati per A. B e C rimangono in attesa: non sono destinatari di questa trasmissione.'],
        ['Ora riceve B','Terminata la trasmissione per A, l’AP ne invia una per B. C aspetta ancora.'],
        ['Ora riceve C','L’AP invia dati a C. I tre dispositivi sono stati serviti in trasmissioni separate.']],
      ofdma:[
        ['Prima di trasmettere','Gli stessi tre dispositivi sono in attesa. Questa volta l’AP può assegnare una porzione del canale a ciascuno.'],
        ['Il canale si divide in tre porzioni','Le bande colorate sono gruppi di sottoportanti: si chiamano Resource Unit, o RU. A usa la porzione azzurra, B quella viola e C quella gialla. Sono porzioni di frequenza, non turni di tempo.'],
        ['A, B e C ricevono insieme','Nella stessa trasmissione l’AP invia dati ai tre destinatari su RU diverse. Guarda le tre porzioni attive nello stesso momento.'],
        ['Che cosa cambia?','Nel caso monoutente i destinatari si alternavano. Con OFDMA più destinatari possono condividere la stessa trasmissione, ciascuno su frequenze assegnate. È utile quando molti client hanno piccoli blocchi da scambiare.']]};
      function draw(){
        const multi=mode==='ofdma';
        const channel=multi?'<div class="ru-stack">'+names.map((n,i)=>'<div class="ru ru-'+i+' '+(step>=1?'allocated':'')+'">'+(step>=1?'RU '+String.fromCharCode(65+i)+' · frequenze assegnate':'porzione non assegnata')+'</div>').join('')+'</div>':'<div class="single-channel ru-'+Math.max(0,step-1)+'">'+(step?'Canale intero → '+names[step-1]:'Canale disponibile')+'</div>';
        let html='<div class="ofdma-ap"><span class="device-outline">AP</span><strong>Access Point</strong><small>Trasmette i messaggi</small></div><div class="ofdma-channel"><span class="scene-label">Lo stesso canale radio</span>'+channel+'<small>'+(multi?'Tre porzioni di frequenza':'Un destinatario per trasmissione')+'</small></div><div class="ofdma-receivers">';
        names.forEach((name,i)=>{const done=multi?step>=2:step>i;const active=multi?step===2:step===i+1;html+='<div class="ofdma-client '+(done?'has-data':'')+'"><span class="client-code ru-'+i+'">'+String.fromCharCode(65+i)+'</span><div><strong>'+name+'</strong><small>'+(active?'← Riceve adesso':done?'Messaggio ricevuto':multi&&step===1?'RU assegnata · pronto':'In attesa')+'</small></div></div>';});
        $(root,'[data-scene]').innerHTML=html+'</div>';
        const [title,text]=story[mode][step];$(root,'[data-result]').innerHTML='<strong>'+title+'</strong><p>'+text+'</p>';
        $(root,'[data-step]').textContent=(step+1)+' / 4';
        $(root,'[data-action="next"]').disabled=step===3;$(root,'[data-action="back"]').disabled=step===0;
        for(const b of root.querySelectorAll('[data-action="single"],[data-action="ofdma"]'))b.setAttribute('aria-pressed',String(b.dataset.action===mode));
      }
      root.addEventListener('click',e=>{const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;if(action==='single'||action==='ofdma'){mode=action;step=0;}else if(action==='next')step=Math.min(3,step+1);else if(action==='back')step=Math.max(0,step-1);else step=0;draw();});draw();
    },
    spectrum(root) {
      root.innerHTML=heading('03','Due AP: separare o condividere?')+`<p>Confronta la frequenza centrale e la larghezza occupata. Prova prima 1/6, poi 1/3, infine 1/1 nella banda 2,4 GHz.</p><div class="lab-controls"><label>Banda<select data-band><option value="2.4">2,4 GHz</option><option value="5">5 GHz</option><option value="6">6 GHz</option></select></label><label>Canale AP A<select data-a></select></label><label>Canale AP B<select data-b></select></label><label>Larghezza canale<select data-width><option value="20">20 MHz</option><option value="40">40 MHz (5/6 GHz)</option></select></label></div><div data-drawing></div>${readout}<p class="lab-note">Rettangoli = occupazione nominale, non misura di uno spettro reale. Nei 40 MHz si confrontano due blocchi adiacenti con centri prestabiliti. I canali mostrati sono un sottoinsieme didattico, non un piano di assegnazione completo.</p>`;
      function options() {
        const band=+$(root,'[data-band]').value, width=+$(root,'[data-width]').value;
        $(root,'[data-width]').options[1].disabled=band===2.4;
        if(band===2.4)$(root,'[data-width]').value='20';
        const channels=band===2.4?Array.from({length:13},(_,i)=>i+1):width===40?(band===5?[38,46]:[3,11]):(band===5?[36,40,44,48]:[1,5,9,13]);
        for(const key of ['a','b'])$(root,'[data-'+key+']').innerHTML=channels.map(c=>`<option value="${c}">${c}</option>`).join('');
        $(root,'[data-b]').value=String(band===2.4?6:channels[1]); update();
      }
      function update() {
        const band=+$(root,'[data-band]').value, a=+$(root,'[data-a]').value, b=+$(root,'[data-b]').value, width=+$(root,'[data-width]').value;
        const frequency=c=>band===2.4?2407+5*c:band===5?5000+5*c:5950+5*c;
        const fa=frequency(a),fb=frequency(b),r=M1Models.spectrum(fa,fb,width);
        const minimum=band===2.4?2397:band===5?5160:5940, scale=5;
        const xa=50+(fa-minimum)*scale,xb=50+(fb-minimum)*scale,w=width*scale;
        let svg=`<text x="25" y="25">Occupazione nominale / ${width} MHz per AP</text><line class="faint" x1="40" y1="180" x2="670" y2="180"/>`;
        svg+=`<rect x="${xa-w/2}" y="50" width="${w}" height="55" fill="var(--primary)" opacity=".45"/><rect x="${xb-w/2}" y="110" width="${w}" height="55" fill="var(--warning)" opacity=".5"/><line class="wire" x1="${xa}" y1="45" x2="${xa}" y2="180"/><line x1="${xb}" y1="105" x2="${xb}" y2="180" stroke="var(--warning)"/><text x="${xa}" y="83" text-anchor="middle">A · ${a}</text><text x="${xb}" y="143" text-anchor="middle">B · ${b}</text><text x="${xa}" y="200" text-anchor="middle" class="caption">${fa} MHz</text><text x="${xb}" y="220" text-anchor="middle" class="caption">${fb} MHz</text>`;
        $(root,'[data-drawing]').innerHTML=diagram('Frequenze occupate dai due access point',svg,240);
        $(root,'[data-result]').innerHTML=`<strong>${r.same?'Stesso canale: tempo da condividere.':r.overlap?'Sovrapposizione parziale: possibile disturbo.':'Bande nominali separate.'}</strong><br>Centri distanti ${r.separation} MHz; sovrapposizione nominale ${r.overlap} MHz. ${r.same?'Gli AP che si sentono possono contendersi il mezzo tramite CSMA/CA. Non è una collisione continua.':r.overlap?'Canali differenti ma parzialmente sovrapposti possono disturbarsi senza coordinarsi bene.':'Non c’è sovrapposizione in questo modello. Questo non esclude rumore, altri AP o limiti del collegamento.'}`;
      }
      root.addEventListener('change',e=>{if(e.target.matches('[data-band], [data-width]'))options();else update();}); options();
    },
    hidden(root) {
      root.innerHTML=heading('04','Fermiamo il tempo sul nodo nascosto')+`<p>A e C ricevono l’AP, ma non si sentono fra loro. Segui chi trasmette, chi ascolta e perché.</p><div class="lab-controls"><label>Scenario<select data-mode><option value="collision">Senza RTS/CTS</option><option value="rts">Con RTS/CTS</option></select></label>${button('next','Passo successivo')}${button('reset','Ricomincia')}</div><div data-drawing></div><div class="timeline" data-timeline></div>${readout}<p class="lab-note">Sequenza esemplificativa: RTS può a sua volta collidere; RTS/CTS riduce il costo di alcune collisioni ma aggiunge overhead. Non è necessario per ogni frame.</p>`;
      const collision=[['Ascolto','A e C ascoltano. Non si sentono fra loro: entrambi credono che il mezzo sia libero.','none'],['Invio simultaneo','In questo esempio i timer scadono insieme: A e C trasmettono DATA verso l’AP.','both'],['Collisione all’AP','I segnali si sovrappongono al ricevitore e i frame non sono decodificati. Nessun ACK.','boom'],['Nuovo tentativo','Dopo l’attesa dell’ACK, entrambi ritentano con backoff casuale. Non sanno direttamente che c’è stata una collisione.','none']];
      const rts=[['Ascolto e contesa','In questo esempio A vince la contesa e invia una breve richiesta RTS all’AP.','a'],['CTS dall’AP','L’AP risponde CTS. Anche C lo riceve e legge per quanto tempo il mezzo è riservato.','cts'],['C aspetta: NAV','C imposta il Network Allocation Vector, un timer di prenotazione virtuale, e rimane in silenzio.','wait'],['DATA da A','A trasmette il frame dati all’AP. C aspetta, anche se non sente A.','a'],['ACK dall’AP','L’AP conferma la ricezione con ACK. Il trasferimento di A termina.','ack'],['Nuova contesa','Scaduta la prenotazione, C può contendersi di nuovo il mezzo.','c']];
      let step=0;
      function draw() {
        const data=$(root,'[data-mode]').value==='rts'?rts:collision, [title,text,signal]=data[step];
        let svg='<text x="350" y="25" text-anchor="middle">A e C non si sentono / entrambi sentono l’AP</text><path class="faint" d="M110 110H590"/>';
        if(['both','boom','a'].includes(signal))svg+='<path class="wire" d="M150 110H305"/><text x="230" y="90" text-anchor="middle">A → AP</text>';
        if(['both','boom','c'].includes(signal))svg+='<path d="M550 110H395" stroke="var(--warning)" stroke-width="3"/><text x="475" y="90" text-anchor="middle">C → AP</text>';
        if(['cts','ack'].includes(signal))svg+=`<path class="wire" d="M350 110H110M350 110H590"/><text x="350" y="70" text-anchor="middle">${signal.toUpperCase()} dall’AP</text>`;
        svg+=device(110,110,'A')+device(350,110,'AP')+device(590,110,'C');
        if(signal==='boom')svg+='<text x="350" y="180" text-anchor="middle" class="warning">Frame illeggibili / nessun ACK</text>';
        if(['wait','a'].includes(signal)&&data===rts)svg+='<text x="590" y="155" text-anchor="middle">NAV: attesa</text>';
        $(root,'[data-drawing]').innerHTML=diagram('Nodo nascosto: stato della trasmissione',svg,210);
        $(root,'[data-timeline]').innerHTML=data.map((d,i)=>`<div class="${i===step?'current':''}"><small>Passo ${i+1}</small>${d[0]}</div>`).join('');
        $(root,'[data-result]').innerHTML=`<strong>${step+1}/${data.length} · ${title}.</strong> ${text}`;
        $(root,'[data-action="next"]').disabled=step===data.length-1;
      }
      root.addEventListener('change',()=>{step=0;draw();}); root.addEventListener('click',e=>{const a=e.target.closest('[data-action]')?.dataset.action;if(a){step=a==='reset'?0:Math.min(($(root,'[data-mode]').value==='rts'?rts:collision).length-1,step+1);draw();}});draw();
    },
    physical(root) {
      root.innerHTML=heading('05A','Più flussi o segnale meglio indirizzato?')+`<p>Sono due obiettivi diversi. Scegli un caso e osserva cosa arriva al ricevitore.</p><div class="lab-controls"><label>Tecnica<select data-mode><option value="siso">Un flusso / antenna singola</option><option value="mimo">MIMO / due flussi spaziali</option><option value="beam">Beamforming / un flusso indirizzato</option></select></label><label>Capacità del ricevitore<select data-rx><option value="1">1 flusso</option><option value="2" selected>2 flussi</option></select></label><label>Posizione del client<input data-angle aria-label="Posizione del client" type="range" min="-40" max="40" value="0"></label></div><div data-drawing></div>${readout}<p class="lab-note">Schema concettuale in pianta: percorsi, larghezza del lobo e frecce non sono una simulazione elettromagnetica. Il beamforming modifica il diagramma di radiazione tramite ampiezza e fase; non crea un raggio laser né isola completamente gli altri ricevitori.</p>`;
      function draw() {
        const mode=$(root,'[data-mode]').value, rx=+$(root,'[data-rx]').value, angle=+$(root,'[data-angle]').value;
        const y=130+angle*1.8, streams=M1Models.streams(2,rx);
        let svg='<text x="95" y="30">Trasmettitore</text><text x="530" y="30">Ricevitore</text>';
        if(mode==='beam')svg+=`<path d="M150 130L570 ${y-46}Q620 ${y} 570 ${y+46}Z" class="signal"/><path class="wire" d="M150 130L560 ${y}"/><text x="340" y="55" text-anchor="middle">Stessi dati / fasi coordinate</text>`;
        else if(mode==='mimo')svg+=`<path class="wire" d="M150 115Q320 35 560 ${y-10}"/><path d="M150 145Q320 240 560 ${y+10}" stroke="var(--warning)" stroke-width="3" fill="none" ${rx===1?'stroke-dasharray="5 6" opacity=".25"':''}/><text x="350" y="82" text-anchor="middle">Flusso A: 1010…</text><text x="350" y="210" text-anchor="middle">${rx===1?'Flusso B: non utilizzato':'Flusso B: 0110…'}</text>`;
        else svg+=`<circle class="signal" cx="150" cy="130" r="95"/><path class="wire" d="M150 130L560 ${y}"/><text x="350" y="90" text-anchor="middle">Un flusso dati: 1010…</text>`;
        svg+=device(110,130,'AP')+device(600,y,'Client');
        $(root,'[data-drawing]').innerHTML=diagram('Confronto concettuale tra SISO, MIMO e beamforming',svg,260);
        $(root,'[data-result]').innerHTML=mode==='mimo'?`<strong>${streams} fluss${streams===1?'o utilizzabile':'i utilizzabili'}.</strong> AP fino a 2 flussi, client fino a ${rx}: il limite è min(2, ${rx}) = ${streams}. ${rx===1?'Il client non può separare due flussi indipendenti: si adatta a un solo flusso.':'Due flussi trasportano dati diversi sullo stesso canale, se le condizioni radio permettono di separarli.'}`:mode==='beam'?'<strong>Un flusso, energia distribuita diversamente.</strong> Il lobo principale segue il client nello schema. Il trasmettitore coordina le antenne usando informazioni sul canale: l’obiettivo è migliorare la ricezione, non aggiungere automaticamente un secondo flusso.':'<strong>Un flusso, una catena spaziale.</strong> Il disegno mostra una sezione idealizzata della copertura. Un’antenna reale non irradia con la stessa intensità in tutte le direzioni.';
      }
      root.addEventListener('input',draw);root.addEventListener('change',draw);draw();
    },
    budget(root) {
      root.innerHTML=heading('06','Dove si perde il segnale?')+`<p>Prima prevedi l’effetto di un muro, poi aggiungilo. I valori delle pareti sono ipotesi didattiche e restano uguali fra le bande per isolare l’effetto della frequenza.</p><div class="lab-controls"><label>Distanza: <output data-distance-label></output><input aria-label="Distanza in metri" data-distance type="range" min="1" max="40" value="12"></label><label>Frequenza<select data-frequency><option value="2.4">2,4 GHz</option><option value="5" selected>5 GHz</option><option value="6">6 GHz</option></select></label><label>Cartongesso / 3 dB a parete<input aria-label="Numero pareti cartongesso" data-dry type="number" min="0" max="4" value="1"></label><label>Cemento / 12 dB a muro<input aria-label="Numero muri cemento" data-concrete type="number" min="0" max="3" value="1"></label><label>Rumore di fondo<select data-noise><option value="-92">−92 dBm</option><option value="-80">−80 dBm</option></select></label></div><div data-drawing></div>${readout}<p class="lab-note">TX = +20 dBm; guadagni delle antenne = 0 dBi. Spazio libero più perdite fisse: non rappresenta riflessioni, persone o tutte le condizioni reali. Il target −67 dBm è un esempio di progetto per la voce, non una sensibilità universale.</p>`;
      function draw(){const d=+$(root,'[data-distance]').value,f=+$(root,'[data-frequency]').value,dry=+$(root,'[data-dry]').value,concrete=+$(root,'[data-concrete]').value,noise=+$(root,'[data-noise]').value;
        $(root,'[data-distance-label]').textContent=d+' m';
        if(!Number.isInteger(dry)||dry<0||dry>4||!Number.isInteger(concrete)||concrete<0||concrete>3){$(root,'[data-result]').textContent='Usa da 0 a 4 pareti e da 0 a 3 muri, in numeri interi.';return;}
        const r=M1Models.budget(d,f,dry,concrete,noise),snrOK=r.snr>=25,signalOK=r.margin>=0;
        $(root,'[data-drawing]').innerHTML=diagram('Bilancio del collegamento: trasmettitore, spazio, pareti e ricevitore',`<path class="faint" d="M90 100H610"/>${device(90,100,'AP')}${device(610,100,'Client')}<rect class="device" x="220" y="65" width="120" height="70"/><rect class="device" x="380" y="65" width="120" height="70"/><text x="90" y="160" text-anchor="middle">+20 dBm</text><text x="280" y="94" text-anchor="middle">Spazio libero</text><text x="280" y="118" text-anchor="middle">−${fmt(r.free)} dB</text><text x="440" y="94" text-anchor="middle">Pareti</text><text x="440" y="118" text-anchor="middle">−${fmt(r.walls,0)} dB</text><text x="610" y="160" text-anchor="middle">${fmt(r.received)} dBm</text><text x="350" y="205" text-anchor="middle">Ricevuto − rumore = ${fmt(r.snr)} dB di SNR</text>`,230);
        $(root,'[data-result]').innerHTML=`<strong>20 − ${fmt(r.free)} − (${dry} × 3 + ${concrete} × 12) = ${fmt(r.received)} dBm.</strong><br>Rispetto al target −67 dBm: ${r.margin>=0?'+':''}${fmt(r.margin)} dB. SNR = ${fmt(r.received)} − (${noise}) = ${fmt(r.snr)} dB.<br>${signalOK&&snrOK?'Entrambi gli obiettivi didattici sono raggiunti: RSSI ≥ −67 dBm e SNR ≥ 25 dB.':`Obiettivo da rivedere: ${!signalOK?'segnale sotto il target. ':''}${!snrOK?'SNR sotto 25 dB.':''}`} La modulazione e la velocità effettive vanno misurate: dipendono anche da apparati, canale e interferenze.`;
      }root.addEventListener('input',draw);root.addEventListener('change',draw);draw();
    }
  };
  document.querySelectorAll('[data-sim]').forEach(root => experiments[root.dataset.sim]?.(root));
});
