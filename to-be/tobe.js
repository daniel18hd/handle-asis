// Handle · TO-BE (propuesta de producto, datos ficticios)
const $ = s => document.querySelector(s);
const ic = n => `<i data-lucide="${n}"></i>`;
const f = D.fmt;
const LOGO = `<svg viewBox="0 0 24 24" width="17" height="17"><path d="M5 18.5 11 5.5M12.5 18.5l6-13" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/></svg>`;
const T = 'data-toast="Interacción de la propuesta"';
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),1600)}


/* ---------- custom iconography (duotone, 24px grid, 1.6 stroke) ---------- */
const SV=(b)=>`<svg class="ci" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
const CI={
  // póliza emitida: documento con sello + flecha de crecimiento
  vendiste:SV(`<path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 .5-.5Z" fill="currentColor" fill-opacity=".14"/><path d="M14 3.5V7.5h4"/><path d="M9 16.5l2.4-2.6 1.8 1.6L16 12.5"/><path d="M14 12.5h2v2"/>`),
  // cobro: moneda con check
  cobraste:SV(`<circle cx="11" cy="12" r="7.5" fill="currentColor" fill-opacity=".14"/><path d="M11 7.5v1.2M11 15.3v1.2"/><path d="M13.2 9.6c-.4-.7-1.2-1.1-2.2-1.1-1.3 0-2.2.7-2.2 1.7 0 2.3 4.6 1.3 4.6 3.6 0 1-1 1.7-2.4 1.7-1.1 0-2-.5-2.4-1.3"/><path d="M17.5 17.8l1.6 1.6 3-3.2"/>`),
  // comisión: sello/medalla con porcentaje
  ganaste:SV(`<path d="M12 2.8l2.1 1.5 2.6-.1.8 2.5 2.1 1.6-.8 2.5.8 2.5-2.1 1.6-.8 2.5-2.6-.1L12 18.8l-2.1-1.5-2.6.1-.8-2.5-2.1-1.6.8-2.5-.8-2.5 2.1-1.6.8-2.5 2.6.1Z" fill="currentColor" fill-opacity=".14"/><path d="M9.6 13.4l4.8-4.8"/><circle cx="9.8" cy="8.9" r=".9" fill="currentColor"/><circle cx="14.2" cy="13.1" r=".9" fill="currentColor"/>`),
  // riesgo: recibo con reloj de vencimiento
  riesgo:SV(`<path d="M6 3.5h9.5a.5.5 0 0 1 .5.5v6"/><path d="M6 3.5v16.5l2-1.3 2 1.3 1.6-1"/><path d="M8.5 8h5M8.5 11h3"/><circle cx="16.5" cy="16" r="4.8" fill="currentColor" fill-opacity=".14"/><path d="M16.5 13.6V16l1.6 1"/>`),
};
// Handle intelligence mark: los dos trazos de Handle + nodo de luz
const AIMARK=`<svg class="aimark" viewBox="0 0 40 40"><defs><linearGradient id="am" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E0FEA2"/><stop offset="1" stop-color="#9FD86B"/></linearGradient></defs><path d="M11 29 18.5 11M21.5 29 29 11" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" fill="none"/><circle class="node" cx="29" cy="11" r="3.4" fill="url(#am)"/><circle class="ring" cx="29" cy="11" r="3.4" fill="none" stroke="#C9F08A" stroke-width="1.2"/></svg>`;


/* ---------- brand: logo real de Handle (máscara, toma el color del tema) ---------- */
const HLOGO=`<span class="hlogo" aria-label="Handle"><i class="mk"></i><i class="wd"></i></span>`;
const HMARK=`<i class="hmk"></i>`;

/* ---------- mascotas de agentes: formas propias, mismo lenguaje (ojos ovalados + brillo) ---------- */
const MS={
  asistente:{c:'#1c1d20',e:'#C8F07A',s:'<rect x="6" y="8" width="36" height="32" rx="16"/>'},
  cobranza:{c:'#C8F07A',s:'<rect x="7" y="7" width="34" height="34" rx="12" transform="rotate(-8 24 24)"/>'},
  pagos:{c:'#8FE3C2',s:'<path d="M24 5c7 3 12 3.5 16 4v13c0 10-7 17-16 21C15 39 8 32 8 22V9c4-.5 9-1 16-4Z"/>'},
  cotizacion:{c:'#A9B8FF',s:'<path d="M24 5c9 0 18 9 18 20s-8 17-18 17S6 36 6 25 15 5 24 5Z"/>'},
  conciliador:{c:'#FFCB6B',s:'<circle cx="18" cy="26" r="13" opacity=".55"/><circle cx="29" cy="22" r="14"/>',ex:5},
  siniestros:{c:'#FF9D8A',s:'<path d="M24 42S6 31 6 18.5C6 12 11 7 17 7c3.5 0 5.6 1.6 7 4 1.4-2.4 3.5-4 7-4 6 0 11 5 11 11.5C42 31 24 42 24 42Z"/>'},
  extractor:{c:'#D4D6DB',s:'<rect x="4" y="12" width="40" height="24" rx="12"/>'},
  kyc:{c:'#E9DAB6',s:'<path d="M24 4l17 10v20L24 44 7 34V14Z"/>'},
  feedback:{c:'#CDBBFF',s:'<path d="M10 8h28a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H22l-9 8v-8h-3a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6Z"/>'}
};
function mascot(id,sz=40){const m=MS[id]||MS.asistente;const e=m.e||'#141210';const dx=m.ex||0;
  return `<svg class="masc" width="${sz}" height="${sz}" viewBox="0 0 48 48"><g fill="${m.c}">${m.s}</g>
  <g class="eyes"><ellipse cx="${19+dx}" cy="22" rx="2.6" ry="3.6" fill="${e}"/><ellipse cx="${29+dx}" cy="22" rx="2.6" ry="3.6" fill="${e}"/>
  <circle cx="${19.8+dx}" cy="20.6" r=".9" fill="#fff" opacity=".85"/><circle cx="${29.8+dx}" cy="20.6" r=".9" fill="#fff" opacity=".85"/></g>
  <ellipse cx="${15+dx}" cy="28" rx="2.4" ry="1.3" fill="#fff" opacity=".35"/><ellipse cx="${33+dx}" cy="28" rx="2.4" ry="1.3" fill="#fff" opacity=".35"/></svg>`}
const AG_PREV={asistente:'Pregúntame lo que sea de tu cartera.',cobranza:'Vamos bien: $412K de $753K ya pagados o prometidos.',pagos:'Confirmé 39 pagos. 3 no cuadran.',cotizacion:'Tengo 212 renovaciones listas para enviar.',conciliador:'Me falta el archivo de comisiones de marzo.',siniestros:'3 reportes médicos vencidos en AXA.',extractor:'Actualicé 50 pólizas desde portales.',kyc:'Sin pendientes por ahora.',feedback:'4 clientes respondieron la encuesta.'};

/* iconos de pendientes */
Object.assign(CI,{
  renov:SV(`<path d="M5 12a7 7 0 0 1 12-4.9L19 9" /><path d="M19 4.5V9h-4.5"/><path d="M19 12a7 7 0 0 1-12 4.9L5 15"/><path d="M5 19.5V15h4.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.2" fill="currentColor" fill-opacity=".18"/>`),
  cotiz:SV(`<path d="M6.5 3.5h7.5l4 4v12.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" fill="currentColor" fill-opacity=".14"/><path d="M14 3.5v4h4"/><path d="M10.2 11.2a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>`),
  pagodif:SV(`<rect x="3.5" y="6.5" width="17" height="11" rx="2.5" fill="currentColor" fill-opacity=".14"/><path d="M3.5 10h17"/><path d="M9 14.5h2.2M14.6 13.4l-2 2.6"/><path d="M13 13.6h3M13 15.8h3"/>`),
  llave:SV(`<circle cx="8" cy="14" r="4" fill="currentColor" fill-opacity=".14"/><path d="M11 11.5 17 5.5M15 7.5l2 2M17.5 5l1.5 1.5"/><path d="M15.5 15.5l3 3M18.5 15.5l-3 3"/>`)
});

/* ---------- theme ---------- */
const getTheme=()=>localStorage.getItem('tb-th')||'light';
function applyTheme(){document.documentElement.classList.toggle('dark',getTheme()==='dark')}

/* ---------- header ---------- */
function header(){
  const th=getTheme();
  $('#hdr').className='glass lq sweep';
  $('#hdr').innerHTML=`
    <a class="brand" href="#/os/resumen">${HLOGO}</a>
    <div class="theme"><button data-th="light" class="${th==='light'?'on':''}" title="Modo claro">${ic('sun')}</button><button data-th="dark" class="${th==='dark'?'on':''}" title="Modo oscuro">${ic('moon')}</button></div>
    <button class="hbtn" ${T} title="Notificaciones">${ic('bell')}<span class="dot"></span></button>
    <div class="split">
      <a class="me" href="#" ${T}><span class="av">DE</span><span><b>David Estrada</b><span>Grupo Ejemplo · Admin</span></span></a>
      <button class="caret" id="caret">${ic('chevron-down')}</button>
      <div class="menu glass" id="menu">
        <a href="#" ${T}>${ic('user')} Mi perfil</a>
        <a href="#" ${T}>${ic('building-2')} Organización</a>
        <a href="#" ${T}>${ic('key-round')} Credenciales de aseguradoras</a>
        <a href="#" ${T}>${ic('plug')} Integraciones</a>
        <hr><a href="#" ${T}>${ic('life-buoy')} Ayuda</a><a href="#" ${T}>${ic('log-out')} Cerrar sesión</a>
      </div>
    </div>`;
}

/* ---------- rail ---------- */
const RAIL_OS=[
  ['os/resumen','house','Inicio'],
  ['os/clientes','users','Clientes'],
  ['os/polizas','scroll-text','Pólizas'],
  ['os/recibos','receipt','Recibos y cobranza',0,'Cobranza'],
  ['os/cotizaciones','file-text','Cotizaciones'],
  ['os/comisiones','chart-pie','Comisiones'],
  '-',
  ['config','settings','Configuración',0,'Ajustes']
];
function railAgents(){return [['agentes/asistente','sparkles','Asistente Handle',0,'Asistente'],...AGENTS.map(a=>['agentes/'+a.id,a.i,a.n,a.cnt,a.n.split(' ')[0]])]}
function rail(h){
  const R=$('#rail');R.className='rail2';
  const os=RAIL_OS.map(r=>r==='-'?'<span class="sep"></span>':`<a href="#/${r[0]}" class="${h===r[0]?'on':''}">${ic(r[1])}<span class="tip">${r[2]}</span><span class="ml">${r[4]||r[2]}</span></a>`).join('');
  const pend=AGENTS.reduce((a,x)=>a+(x.cnt?1:0),0);
  R.innerHTML=`<div class="rbox ag glass lq"><a href="#/agentes" class="agbtn ${h.startsWith('agentes')?'on':''}">${mascot('asistente',26)}<span class="badge">${pend}</span><span class="tip">Agentes · ${pend} con pendientes</span><span class="ml">Agentes</span></a></div><div class="rbox glass lq">${os}</div>`;
}
/* ---------- helpers ---------- */
function smooth(pts){let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`}return d}
/* ---------- datos por periodo (cuadrados: sumas, % y comisiones coinciden) ---------- */
let PER='mes';
const PD={
  semana:{lbl:['Lun 21','Mar 22','Mié 23','Jue 24','Vie 25','Sáb 26','Dom 27'],em:[3.1,3.6,3.4,3.9,4.2,1.1,0.5],co:[2.0,2.4,2.6,2.7,2.9,0.8,0.4],vs:'vs semana anterior',dv:[5,9,5,3],sub:'Semana del 21 al 27 de julio',vx:'412 pólizas emitidas · 138 renovaciones'},
  mes:{lbl:['1–4 jul','5–8 jul','9–12 jul','13–16 jul','17–20 jul','21–24 jul','25–28 jul','29–31 jul'],em:[10.2,11.2,12.6,12.3,11.0,12.1,13.4,14.0],co:[6.1,7.1,8.0,8.8,7.4,8.5,8.9,9.4],vs:'vs junio',dv:[8,12,8,4],sub:'Julio 2026',vx:'1,786 pólizas emitidas · 674 renuevan este mes'},
  ano:{lbl:['Ene','Feb','Mar','Abr','May','Jun','Jul'],em:[78.2,81.5,86.0,84.3,90.1,89.6,96.8],co:[60.1,62.4,65.8,66.0,70.2,68.9,64.2],vs:'vs 2025',dv:[11,14,11,6],sub:'Enero a julio 2026',vx:'12,502 pólizas en cartera · 5,528 activas'}
};
const SHARE=[['GNP',.35,'var(--p1)'],['Qualitas',.26,'var(--p2)'],['Chubb',.20,'var(--p3)'],['AXA',.13,'var(--p4)'],['Otras (12)',.06,'var(--p5)']];
const sum=a=>a.reduce((x,y)=>x+y,0);
const M=v=>v>=100?'$'+v.toFixed(0)+'M':'$'+v.toFixed(1)+'M';
const CH={W:720,H:230,pad:42};
function chMax(d){return Math.ceil(Math.max(...d.em)*1.2/5)*5||5}
function lineChart(d){
  const {W,H,pad}=CH,mx=chMax(d),n=d.em.length;
  const x=i=>pad+i*(W-pad-14)/(n-1),y=v=>H-26-(v/mx)*(H-46);
  const pe=d.em.map((v,i)=>[x(i),y(v)]),pc=d.co.map((v,i)=>[x(i),y(v)]);
  const grid=[0,.25,.5,.75,1].map(t=>t*mx).map(v=>`<line x1="${pad}" x2="${W-14}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" opacity=".07"/><text x="0" y="${y(v)+3}">${v?'$'+(+v.toFixed(1))+'M':'0'}</text>`).join('');
  const lbl=d.lbl.map((t,i)=>`<text x="${x(i)}" y="${H-4}" text-anchor="${i===0?'start':i===n-1?'end':'middle'}">${t}</text>`).join('');
  return `<div class="lc"><svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" style="color:var(--ink)">
    <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6DC5A" stop-opacity=".38"/><stop offset="1" stop-color="#A6DC5A" stop-opacity="0"/></linearGradient></defs>
    ${grid}${lbl}
    <path class="area" d="${smooth(pe)} L${x(n-1)},${H-26} L${pad},${H-26} Z" fill="url(#ga)"/>
    <path class="ln" d="${smooth(pe)}" fill="none" stroke="#7DBA34" stroke-width="2.6" stroke-linecap="round"/>
    <path class="ln" d="${smooth(pc)}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    <g class="hov" opacity="0"><line class="gl" y1="14" y2="${H-26}" stroke="currentColor" opacity=".25" stroke-dasharray="3 4"/><circle class="d1" r="5" fill="#7DBA34" stroke="#fff" stroke-width="2"/><circle class="d2" r="5" fill="currentColor" stroke="#fff" stroke-width="2"/></g>
    <rect class="hit" x="${pad}" y="0" width="${W-pad-14}" height="${H-26}" fill="transparent"/>
  </svg><div class="tipc"><b></b><span class="r1"></span><span class="r2"></span><span class="r3"></span></div></div>`;
}
function bindChart(){
  const box=$('.lc');if(!box)return;const d=PD[PER],svg=box.querySelector('svg'),n=d.em.length,{W,H,pad}=CH,mx=chMax(d);
  const x=i=>pad+i*(W-pad-14)/(n-1),y=v=>H-26-(v/mx)*(H-46);const g=svg.querySelector('.hov'),tip=box.querySelector('.tipc');
  const set=(el,a)=>Object.entries(a).forEach(([k,v])=>el.setAttribute(k,v));
  const show=i=>{g.setAttribute('opacity',1);set(g.querySelector('.gl'),{x1:x(i),x2:x(i)});set(g.querySelector('.d1'),{cx:x(i),cy:y(d.em[i])});set(g.querySelector('.d2'),{cx:x(i),cy:y(d.co[i])});
    tip.querySelector('b').textContent=d.lbl[i];
    tip.querySelector('.r1').innerHTML=`<i style="background:#7DBA34"></i>Emitida<em>${M(d.em[i])}</em>`;
    tip.querySelector('.r2').innerHTML=`<i style="background:var(--ink)"></i>Cobrada<em>${M(d.co[i])}</em>`;
    tip.querySelector('.r3').textContent=Math.round(d.co[i]/d.em[i]*100)+'% cobrado';
    const r=svg.getBoundingClientRect(),px=x(i)/W*r.width;tip.style.left=Math.min(Math.max(px,80),r.width-80)+'px';tip.style.top=(Math.min(y(d.em[i]),y(d.co[i]))/H*r.height)+'px';tip.classList.add('on')};
  svg.addEventListener('mousemove',e=>{const r=svg.getBoundingClientRect();const vx=(e.clientX-r.left)/r.width*W;let i=Math.round((vx-pad)/((W-pad-14)/(n-1)));show(Math.max(0,Math.min(n-1,i)))});
  svg.addEventListener('mouseleave',()=>{g.setAttribute('opacity',0);tip.classList.remove('on')});
}
function donutI(total){const R=58,C=2*Math.PI*R;let off=0;
  const segs=SHARE.map(([n,p,c],k)=>{const l=C*p;const sg=`<circle class="seg" data-k="${k}" r="${R}" cx="75" cy="75" fill="none" stroke="${c}" stroke-width="18" stroke-dasharray="${Math.max(l-3,1)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 75 75)" stroke-linecap="round"/>`;off+=l;return sg}).join('');
  return `<div class="dnut" data-total="${total}"><svg width="180" height="180" viewBox="0 0 150 150">${segs}<text class="c1" x="75" y="66" text-anchor="middle" font-size="9.5" style="fill:var(--mut)">Prima emitida</text><text class="c2" x="75" y="86" text-anchor="middle" font-size="19" font-weight="700" style="fill:var(--ink)">${M(total)}</text><text class="c3" x="75" y="101" text-anchor="middle" font-size="8.5" style="fill:var(--mut)">100% · 17 aseguradoras</text></svg></div>
  <div class="cats">${SHARE.map(([n,p,c],k)=>`<div class="cat" data-k="${k}"><span><i class="dot" style="background:${c}"></i> ${n}</span><span class="tr"><i style="width:${p/.35*100}%;background:${c}"></i></span><b>${M(total*p)}</b><small>${Math.round(p*100)}%</small></div>`).join('')}</div>`}
function bindDonut(){const box=$('.dnut');if(!box)return;const tot=+box.dataset.total,cats=document.querySelectorAll('.cat[data-k]');
  const lab=(a,b,c)=>{box.querySelector('.c1').textContent=a;box.querySelector('.c2').textContent=b;box.querySelector('.c3').textContent=c};
  const on=k=>{box.classList.add('act');box.querySelectorAll('.seg').forEach(s=>s.classList.toggle('on',+s.dataset.k===k));cats.forEach(c=>c.classList.toggle('on',+c.dataset.k===k));const [n,p]=SHARE[k];lab(n,M(tot*p),Math.round(p*100)+'% de la prima')};
  const off=()=>{box.classList.remove('act');box.querySelectorAll('.seg').forEach(s=>s.classList.remove('on'));cats.forEach(c=>c.classList.remove('on'));lab('Prima emitida',M(tot),'100% · 17 aseguradoras')};
  box.querySelectorAll('.seg').forEach(s=>{s.onmouseenter=()=>on(+s.dataset.k);s.onmouseleave=off});cats.forEach(c=>{c.onmouseenter=()=>on(+c.dataset.k);c.onmouseleave=off});}
const story=(l,v,u,d,up,cmp,expl,prog,risk)=>`<div class="card kpi clean ${risk?'risk':''}"><div class="hd">${l}</div><div class="v">${v}<small>${u||''}</small></div><div class="dl"><span class="delta ${up?'up':'dn'}">↑ ${d}%</span><span class="cmp">${cmp}</span></div>${prog!=null?`<div class="bar"><i style="width:${prog}%"></i></div>`:''}<div class="expl">${expl}</div></div>`;
const kpi=(icn,l,v,u,d,up,cmp)=>`<div class="card kpi"><div class="hd"><span class="ic">${ic(icn)}</span>${l}</div><div class="v">${v}<small>${u||''}</small></div><span class="delta ${up?'up':'dn'}">${up?'↑':'↓'} ${d}</span><span class="cmp">${cmp}</span></div>`;

/* ---------- OS ---------- */
const OS_TABS=[['resumen','Resumen'],['clientes','Clientes'],['polizas','Pólizas'],['recibos','Recibos'],['comisiones','Comisiones'],['cotizaciones','Cotizaciones']];
function stageHead(active){return '';`<div class="stage-hd"><div class="tabs-main"><a href="#/os/resumen" class="${active==='os'?'on':''}">${ic('layout-grid')} OS</a><a href="#/agentes/cobranza" class="${active==='ag'?'on':''}">${ic('sparkles')} Agentes IA <span class="n">8</span></a></div><span class="sp"></span><span style="color:var(--mut);font-size:12px">Sincronizado hace 2 min · 17 aseguradoras</span></div>`}
function osView(sec){
  let body='';
  if(sec==='resumen'){const d=PD[PER],E=sum(d.em),C=sum(d.co),pc=Math.round(C/E*100);body=`
    <div class="ttl"><div><h1>Tu cartera, hoy</h1><p>${d.sub}</p></div><span class="sp"></span>
      <div class="seg" id="per">${[['semana','Semana'],['mes','Mes'],['ano','Año']].map(([k,t])=>`<button data-per="${k}" class="${PER===k?'on':''}">${t}</button>`).join('')}</div><a class="btn pri" href="#" ${T}>${ic('download')} Exportar</a></div>
    <div class="grid k4">
      ${story('Vendiste',M(E).slice(0,-1),'M',d.dv[0],1,d.vs,d.vx,null)}
      ${story('Cobraste',M(C).slice(0,-1),'M',d.dv[1],1,d.vs,`${pc}% de lo emitido · faltan ${M(E-C)}`,pc)}
      ${story('Ganaste',M(E*.149).slice(0,-1),'M',d.dv[2],1,'en comisiones','Comisión promedio de 14.9% sobre lo emitido',null)}
      ${story('En riesgo','$2.36','M',d.dv[3],0,'vs periodo anterior','360 recibos vencidos · 280 pólizas canceladas',null,1)}
    </div>
    <div class="grid row2">
      <div class="card"><div style="display:flex;align-items:flex-start"><div><h3>Prima emitida vs cobrada</h3><div class="sub">${d.sub}</div></div><span class="sp"></span><div class="legend"><span><i class="dot" style="background:#7DBA34"></i>Emitida · ${M(E)}</span><span><i class="dot" style="background:var(--ink)"></i>Cobrada · ${M(C)}</span></div></div>${lineChart(d)}</div>
      <div class="card"><h3>Prima por aseguradora</h3><div class="sub">${d.sub}</div>${donutI(E)}</div>
    </div>
    <div class="grid row3">
      <div class="card"><div style="display:flex;align-items:center"><h3>Necesita tu atención</h3><span class="sp"></span><span class="pill" style="background:rgba(232,104,63,.15);color:var(--org)">5 pendientes</span></div><div class="sub" style="margin-bottom:6px">Ordenado por dinero en juego. Cada uno abre al agente responsable.</div>
        ${[['riesgo','t-riesgo','360 recibos vencidos · $2.36M','El agente de cobranza ya contactó 59; 7 piden a un humano','agentes/cobranza','Revisar 7'],
           ['renov','t-cobraste','674 pólizas renuevan en julio','Ya hay 212 cotizaciones de renovación listas para enviar','agentes/cotizacion','Aprobar envío'],
           ['cotiz','t-ganaste','48 cotizaciones esperan respuesta','Faltan datos del cliente en 31; el agente redactó las preguntas','agentes/cotizacion','Ver preguntas'],
           ['pagodif','t-vendiste','3 pagos con diferencia de monto','Validador encontró pago parcial en GNP y Chubb','agentes/pagos','Validar'],
           ['llave','t-neutral','10 accesos a portales fallando','Bloquea la conciliación de AXA, Banorte y Chubb','config','Reconectar']]
          .map(([i,t,ti,su,h,cta])=>`<a class="act ${t}" href="#/${h}"><span class="ai ci-wrap">${CI[i]}</span><span><b>${ti}</b><span>${su}</span></span><span class="go btn sm">${cta}</span></a>`).join('')}
      </div>
      <div class="card"><div style="display:flex;align-items:center"><h3>Tus agentes hoy</h3><span class="sp"></span><a class="btn sm" href="#/agentes/cobranza">Abrir agentes ${ic('arrow-right')}</a></div><div class="sub" style="margin-bottom:6px">Trabajo hecho por la IA desde las 7:00 am.</div>
        ${AGENTS.slice(0,6).map(a=>`<a class="agentline" href="#/agentes/${a.id}">${mascot(a.id,36)}<span><b style="font-weight:600">${a.n}</b><br><span style="color:var(--mut);font-size:11.5px">${a.today}</span></span><span class="st"><i class="live"></i>${a.state}</span></a>`).join('')}
      </div>
    </div>`;}
  else if(sec==='clientes') body=listView('Clientes','6,056 clientes · 2,241 con póliza activa · $16.2M en cartera',['Todos','Con vencidos','Renuevan este mes','Personas morales'],
    ['Cliente','Pólizas','Prima anual','Estado','Siguiente paso'],D.clientes.slice(0,12).map((c,i)=>`<tr><td><span class="who"><span class="av">${c.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><span><b style="font-weight:600">${c.n}</b><br><span style="color:var(--mut);font-size:11px">${c.tipo} · ${c.rfc}</span></span></span></td><td class="m">${c.pol||1}</td><td class="m">$${f(8000+i*3471.5)}</td><td>${i%4===1?'<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Recibo vencido</span>':i%3===0?'<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">Renueva en 12 días</span>':'<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Al corriente</span>'}</td><td style="color:var(--mut)">${i%4===1?'Cobranza llamó ayer · promesa de pago':'—'}</td></tr>`).join(''));
  else if(sec==='polizas') body=listView('Pólizas','12,502 pólizas · 5,528 activas · $17.0M de prima activa',['Activas','Pendientes','Por renovar','Canceladas'],
    ['Póliza','Cliente','Aseguradora','Ramo','Prima','Vence'],D.polizas.slice(0,12).map(x=>`<tr><td class="m">${x.no}</td><td>${x.cli}</td><td>${x.ins}</td><td style="color:var(--mut)">${x.tipo}</td><td class="m">$${f(x.prima)}</td><td style="color:var(--mut)">${x.vence}</td></tr>`).join(''));
  else if(sec==='recibos') body=listView('Recibos y cobranza','Esta semana $753K · Próximos $3.08M · Vencidos $16.4M',['Esta semana','Próximos','Vencidos','Pagados'],
    ['Cliente','Aseguradora','Monto','Vence','Estado del agente'],D.pend.map((x,i)=>`<tr><td><b style="font-weight:600">${x.cli}</b></td><td>${x.ins}</td><td class="m">$${f(x.m)}</td><td style="color:var(--mut)">Hoy</td><td>${['<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Pago confirmado</span>','<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">WhatsApp enviado</span>','<span class="pill" style="background:rgba(242,185,59,.2);color:#9a6f10">Promesa de pago</span>','<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Escalado a ti</span>'][i%4]}</td></tr>`).join(''));
  else if(sec==='comisiones') body=listView('Comisiones','4,703 comisiones · $4.19M en el periodo',['Julio','Junio','Por aseguradora','Por agente'],
    ['Póliza','Aseguradora','Agente','Tasa','Monto','IVA'],D.comisiones.slice(0,12).map(x=>`<tr><td class="m">${x.pol}</td><td>${x.ins.toUpperCase()}</td><td class="m">${x.ag}</td><td class="m">${x.tasa?x.tasa.toFixed(1)+'%':'—'}</td><td class="m">$${f(x.monto)}</td><td class="m">$${f(x.iva)}</td></tr>`).join(''));
  else if(sec==='cotizaciones') body=listView('Cotizaciones','195 solicitudes · 48 esperan tu respuesta · 120 cotizadas',['Requieren atención','En proceso','Cotizadas','Cerradas'],
    ['Solicitud','Ramo','Aseguradoras','Mejor precio','Estado'],D.cotizaciones.map((c,i)=>`<tr><td><b style="font-weight:600">${c.n}</b><br><span class="m" style="color:var(--mut)">${c.id}</span></td><td style="color:var(--mut)">${c.ramo}</td><td class="m">${c.c}</td><td class="m">${i%2?'—':'$'+f(32076+i*1200)}</td><td>${c.est.startsWith('REQ')||i===0?'<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Falta info del cliente</span>':c.est==='COTIZADO'?'<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Lista para enviar</span>':'<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">Cotizando</span>'}</td></tr>`).join(''));
  return stageHead('os')+`<div class="scroll">${body}</div>`;
}
function listView(t,s,chips,cols,rows){return `<div class="ttl"><div><h1>${t}</h1><p>${s}</p></div><span class="sp"></span><label class="search">${ic('search')}<input placeholder="Buscar o preguntar…"></label><a class="btn pri" href="#" ${T}>${ic('plus')} Nuevo</a></div>
  <div class="chips" style="margin-bottom:12px">${chips.map((c,i)=>`<span class="chip ${i?'':'on'}">${c}</span>`).join('')}</div>
  <div class="card" style="padding:6px 12px"><table class="tbl"><thead><tr>${cols.map((c,i)=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`}

/* ---------- Agentes ---------- */
const AGENTS=[
  {id:'cobranza',n:'Cobranza',i:'phone',bg:'rgba(232,104,63,.16)',c:'var(--org)',today:'59 contactos · 12 promesas · 7 escalados',state:'Trabajando',cnt:7},
  {id:'pagos',n:'Validador de pagos',i:'shield-check',bg:'rgba(47,158,91,.15)',c:'var(--grn)',today:'39 pagos confirmados en portales',state:'Al día',cnt:3},
  {id:'cotizacion',n:'Cotización',i:'file-text',bg:'rgba(74,108,247,.15)',c:'var(--blu)',today:'14 cotizaciones · 212 renovaciones listas',state:'Trabajando',cnt:48},
  {id:'conciliador',n:'Conciliador',i:'git-compare-arrows',bg:'rgba(242,185,59,.2)',c:'#a77a14',today:'Comisiones de marzo: 2/2 tareas',state:'Esperando acceso',cnt:0},
  {id:'siniestros',n:'Siniestros',i:'heart-pulse',bg:'rgba(217,68,58,.13)',c:'var(--red)',today:'3 reportes médicos vencidos',state:'Al día',cnt:3},
  {id:'extractor',n:'Extractor de pólizas',i:'scan-text',bg:'rgba(20,18,16,.08)',c:'var(--ink2)',today:'50 pólizas actualizadas desde portales',state:'Al día',cnt:0},
  {id:'kyc',n:'KYC',i:'user-check',bg:'rgba(20,18,16,.08)',c:'var(--ink2)',today:'Sin pendientes',state:'En pausa',cnt:0},
  {id:'feedback',n:'Feedback',i:'message-circle',bg:'rgba(20,18,16,.08)',c:'var(--ink2)',today:'4 respuestas de clientes',state:'Al día',cnt:0}
];
const step=(i,t,tm,out)=>`<details class="step"><summary>${ic(i)} ${t}<span class="tm">${tm}</span></summary>${out?`<pre>${out}</pre>`:''}</details>`;
const CONVOS={
  cobranza:{title:'Cobranza de esta semana',threads:['Cobranza de esta semana','Escalados de ayer','Ajustar tono para corporativos','Plan de recuperación vencidos >24d'],
    body:`<div class="u-msg">¿Cómo va la cobranza de esta semana y qué necesitas de mí?</div>
    <div class="a-msg">
      ${step('database','Leí 4,285 recibos pendientes del sistema de registro','0.8s','sor_receipt · estatus=pendiente · vence<=2026-07-12\n→ 93 recibos esta semana · 89 clientes · $753,142.44 MXN')}
      ${step('phone-outgoing','Revisé 59 contactos de hoy (llamada + WhatsApp)','1.2s','42 contestaron · 12 promesas de pago · 7 piden hablar con un humano')}
      ${step('shield-check','Crucé con pagos confirmados por el Validador','0.4s','8 clientes ya pagaron → los saqué de la cola')}
      <p>Vamos bien: <b>$412K de los $753K de esta semana ya están pagados o prometidos</b> (55%). Lo que necesito de ti:</p>
      <div class="todo"><div class="done">${ic('circle-check')} Llamar a vencidos 1–14 días (59/59)</div><div class="done">${ic('circle-check')} Quitar de la cola a los 8 que ya pagaron</div><div>${ic('circle')} <b>Atender 7 clientes que pidieron a un humano</b> · $96K</div><div>${ic('circle')} Aprobar el cambio de tono para personas morales</div></div>
      <p style="margin-top:10px">Para los corporativos, propongo este ajuste al tier <b>“Vencido 15–24 días”</b>. Hoy contestan 30% menos que personas físicas:</p>
      <div class="diff"><div class="h">${ic('file-pen-line')} Estrategia · Vencido 15–24 días<span class="sp2"><span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">+2</span><span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">−1</span></span></div>
        <div class="l del">- Tono cercano, recordar fecha de vencimiento.</div>
        <div class="l add">+ Si es persona moral: tono formal, dirigido a finanzas, con folio y monto.</div>
        <div class="l add">+ Si tiene varias pólizas vencidas, mencionarlas en un solo mensaje.</div></div>
      <div class="approve"><a class="btn pri sm" href="#" data-toast="Cambio aplicado al agente">${ic('check')} Aplicar</a><a class="btn sm" href="#" ${T}>Editar</a><a class="btn sm" href="#" ${T}>Descartar</a></div>
    </div>`,
    side:[['Autonomía','Supervisada'],['Canales','Llamada · WhatsApp'],['Horario','Lun–Sáb 9:00–19:00'],['Contactos hoy','59'],['Tasa de respuesta','71%'],['Cobrado por el agente (mes)','$1.9M']],
    pend:[['7 clientes piden un humano','$96K'],['Cambio de tono corporativos','Estrategia'],['Número de salida sin verificar','Twilio']]},
  pagos:{title:'Pagos con diferencia',threads:['Pagos con diferencia','Validación de esta mañana','Portales con error'],
    body:`<div class="u-msg">¿Qué pagos no cuadran hoy?</div><div class="a-msg">
      ${step('globe','Entré a 14 portales de aseguradoras','2m 10s','GNP ✓ · Qualitas ✓ · Chubb ✓ · Banorte ✗ (credencial) · AXA ✗ (credencial)')}
      ${step('scale','Comparé monto pagado vs recibo','0.6s','39 coinciden · 3 con diferencia')}
      <p>Confirmé <b>39 pagos</b>. Hay <b>3 con diferencia</b> que no voy a marcar como pagados sin ti:</p>
      <div class="card" style="padding:4px 12px;background:var(--glass2)"><table class="tbl"><tbody>
      <tr><td>Claudia Lorena López</td><td>Chubb</td><td class="m r">$21,861 recibido de $23,400</td></tr>
      <tr><td>Héctor Alonso Martínez</td><td>Inbursa</td><td class="m r">Pago parcial 1/2</td></tr>
      <tr><td>Transportes Arios</td><td>Qualitas</td><td class="m r">Pagó 2 recibos en 1 depósito</td></tr></tbody></table></div>
      <div class="approve"><a class="btn pri sm" href="#" data-toast="Marcado para revisión">${ic('check')} Validar los 3 conmigo</a><a class="btn sm" href="#/config">Reconectar Banorte y AXA</a></div></div>`,
    side:[['Autonomía','Autónoma con umbral'],['Portales conectados','17 de 19'],['Corre','Diario 7:00 am'],['Confirmados hoy','39'],['Precisión (30 días)','99.2%']],
    pend:[['3 pagos con diferencia','$5.1K'],['2 portales sin acceso','Banorte · AXA']]},
  cotizacion:{title:'Renovaciones de julio',threads:['Renovaciones de julio','Rafael Álvarez · Autos','METALMEX · GMM','Preguntas pendientes a clientes'],
    body:`<div class="u-msg">Prepara las renovaciones de julio.</div><div class="a-msg">
      ${step('database','Busqué pólizas que vencen en julio','0.5s','674 pólizas · $41.2M de prima')}
      ${step('globe','Cotizé en 6 aseguradoras','14m','Mapfre, Chubb, AXA, GNP, Qualitas, Banorte → 212 comparativos completos')}
      ${step('file-text','Generé propuestas con tu marca','2m','212 PDF · plantilla “Renovación”')}
      <p>Tengo <b>212 renovaciones listas</b>. En 61 encontré una opción más barata con la misma cobertura (ahorro promedio para el cliente: <b>11%</b>). Las otras 462 esperan respuesta de portales.</p>
      <div class="approve"><a class="btn pri sm" href="#" data-toast="Envío programado">${ic('send')} Enviar 212 propuestas</a><a class="btn sm" href="#" ${T}>Ver comparativos</a></div></div>`,
    side:[['Autonomía','Supervisada'],['Aseguradoras','6 conectadas'],['Tiempo por cotización','6 min'],['Cotizadas (mes)','120']],
    pend:[['212 propuestas por enviar','$12.8M'],['31 clientes con datos faltantes','Preguntas listas']]},
  conciliador:{title:'Conciliación de comisiones',threads:['Conciliación de comisiones','Marzo 2026','Diferencias GNP'],
    body:`<div class="u-msg">¿Por qué la coincidencia está en 0%?</div><div class="a-msg">
      ${step('database','Comparé 14,983 registros de portales contra tu base','3.1s','0 exactos · 0 parciales · 14,983 faltan en base de datos')}
      <p>No es que todo esté mal: <b>tu base de datos no tiene cargadas las comisiones de marzo</b>, por eso nada coincide. Si me das acceso al Excel de comisiones de Drive, concilio en ~10 minutos.</p>
      <div class="approve"><a class="btn pri sm" href="#" data-toast="Solicitud enviada">${ic('folder-open')} Conectar archivo de Drive</a></div></div>`,
    side:[['Autonomía','Solo lectura'],['Última ejecución','21 may · Completado'],['Fuentes','Portales + Drive']],pend:[['Falta fuente de comisiones','Marzo 2026']]},
  siniestros:{title:'Reportes médicos vencidos',threads:['Reportes médicos vencidos','SIN-MIULI1 · Pamela Martínez'],
    body:`<div class="u-msg">¿Qué siniestros se pueden caer?</div><div class="a-msg">
      ${step('heart-pulse','Revisé vigencia de 11 reportes médicos','0.3s','3 vencidos (492 días) · 8 vigentes')}
      <p>Hay <b>3 siniestros de AXA con reporte médico vencido</b>; sin uno nuevo, los gastos posteriores no se cubren. Redacté la solicitud al médico tratante.</p>
      <div class="approve"><a class="btn pri sm" href="#" data-toast="Solicitudes enviadas">${ic('send')} Enviar 3 solicitudes</a><a class="btn sm" href="#" ${T}>Ver borrador</a></div></div>`,
    side:[['Casos abiertos','19'],['Reportes vigentes','8 de 11']],pend:[['3 reportes vencidos','AXA']]},
  asistente:{title:'Nueva conversación',threads:['Nueva conversación','Resumen del mes','Pólizas activas y prima total'],
    body:`<div class="a-msg"><p><b>Hola, David.</b> Pregúntame lo que sea de tus pólizas, recibos y comisiones, o pídeme que un agente haga algo por ti.</p>
      <div class="chips"><span class="chip">Resumen del mes</span><span class="chip">¿Quién no ha pagado esta semana?</span><span class="chip">Renovaciones de agosto</span><span class="chip">Comisiones por aseguradora</span></div></div>`,
    side:[['Acceso','Toda la cartera'],['Agentes disponibles','8']],pend:[]}
};
function agView(id){
  const mList=!id;if(!id)id='asistente';
  const a=AGENTS.find(x=>x.id===id)||{id:'asistente',n:'Asistente Handle',state:'Listo',today:''};
  const cv=CONVOS[id]||{title:'Sin conversaciones',threads:['Nueva conversación'],body:`<div class="a-msg"><p>Estoy al día. ${a.today}.</p></div>`,side:[['Estado',a.state]],pend:[]};
  const list=[{id:'asistente',n:'Asistente Handle',cnt:0},...AGENTS];
  return `<div class="cx ${mList?'m-list':'m-chat'}">
    <aside class="cx-list card no-lift">
      <div class="cx-top"><a class="back" href="#/os/resumen" title="Volver">${ic('arrow-left')}</a><b class="cx-title">Agentes</b><span class="sp"></span><button class="hbtn sm2" ${T}>${ic('search')}</button><button class="hbtn sm2" ${T}>${ic('plus')}</button></div>
      <div class="cx-items">${list.map(x=>`<a class="cx-it ${x.id===id?'on':''}" href="#/agentes/${x.id}">${mascot(x.id,42)}<span class="tx"><b>${x.n}</b><span>${AG_PREV[x.id]||''}</span></span>${x.cnt?`<i class="cnt">${x.cnt}</i>`:''}</a>`).join('')}</div>
      <div class="cx-me"><span class="av">DE</span><span><b>David Estrada</b><small>Grupo Ejemplo</small></span><span class="sp"></span><a class="hbtn sm2" href="#/config">${ic('settings')}</a></div>
    </aside>
    <section class="cx-chat">
      <div class="cx-hd glass"><a class="back back-m" href="#/agentes">${ic('chevron-left')}</a><span class="mini">${mascot(a.id,26)}</span><b>${a.n}</b><span class="st"><i class="live"></i>${a.state}</span><span class="sp"></span><button class="hbtn sm2" id="infoBtn" title="Cómo trabaja">${ic('sliders-horizontal')}</button></div>
      <div class="cx-body" id="cb"><div class="cx-day">Hoy</div>${cv.body}</div>
      <form class="cx-comp glass" id="cmp"><button type="button" class="hbtn sm2">${ic('plus')}</button><textarea rows="1" placeholder="Escríbele a ${a.n}…"></textarea><button type="button" class="hbtn sm2">${ic('mic')}</button><button class="voice" title="Enviar">${ic('arrow-up')}</button></form>
      <div class="drawer glass" id="drawer"><div style="display:flex;align-items:center;margin-bottom:8px"><h3>Cómo trabaja</h3><span class="sp"></span><span class="toggle"></span></div>${cv.side.map(([k,v])=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('')}
        ${cv.pend.length?`<h3 style="margin-top:16px">Necesita tu aprobación</h3>${cv.pend.map(([k,v])=>`<div class="kv"><span style="color:var(--ink)">${k}</span><b style="color:var(--org)">${v}</b></div>`).join('')}`:''}
        <a class="btn sm" style="margin-top:12px" href="#" ${T}>${ic('sliders-horizontal')} Ajustar en lenguaje natural</a></div>
    </section></div>`;
}

/* ---------- asistente flotante ---------- */
function assistDock(){return `<div class="adock glass" id="adock"><div class="ad-panel" id="adp">
    <div class="ad-hd">${mascot('asistente',30)}<div><b>Asistente Handle</b><small>Pregunta a tus pólizas, recibos y comisiones</small></div><span class="sp"></span><button class="hbtn sm2" id="adx">${ic('x')}</button></div>
    <div class="ad-body" id="adb"><div class="a-msg"><p>Hola, David. ¿Qué quieres saber hoy?</p></div><div class="chips">${['¿Quién no ha pagado esta semana?','Renovaciones de agosto','Comisiones por aseguradora'].map(c=>`<button class="chip" data-ask="${c}">${c}</button>`).join('')}</div></div></div>
  <form class="ad-bar" id="adf">${mascot('asistente',30)}<input id="adi" placeholder="Pregúntale a Handle…" autocomplete="off"><button type="button" class="hbtn sm2">${ic('mic')}</button><button class="voice">${ic('arrow-up')}</button></form></div>`}
function askDock(q){const b=$('#adb');$('#adock').classList.add('open');b.insertAdjacentHTML('beforeend',`<div class="u-msg">${q.replace(/</g,'&lt;')}</div><div class="a-msg"><p class="typing"><i></i><i></i><i></i></p></div>`);b.scrollTop=b.scrollHeight;setTimeout(()=>{b.lastElementChild.innerHTML='<p>Esta semana vencen <b>93 recibos por $753K</b>. 55% ya está pagado o prometido; los 7 que piden a un humano están en Cobranza.</p><a class="btn sm" href="#/agentes/cobranza">Abrir en Cobranza →</a>';b.scrollTop=b.scrollHeight},900)}

/* ---------- config ---------- */
function cfgView(){return stageHead('')+`<div class="scroll"><div class="ttl"><div><h1>Configuración</h1><p>Lo que tus agentes necesitan para trabajar, en un solo lugar.</p></div></div>
  <div class="grid" style="grid-template-columns:1fr 1fr">
    <div class="card"><h3>Accesos a portales</h3><div class="sub">17 de 19 conectados</div>${D.aseg.slice(0,8).map(([n,c,k,a])=>`<div class="kv"><span style="color:var(--ink)"><i class="dot" style="background:${c}"></i> ${n}</span><b style="color:${a?'var(--red)':'var(--grn)'}">${a?'Reconectar':'Conectado'}</b></div>`).join('')}</div>
    <div class="card"><h3>Integraciones</h3><div class="sub">4 activas</div>${['Google Drive','Google Sheets','Quattro CRM','WhatsApp','SICAS','APRO Sistema'].map((n,i)=>`<div class="kv"><span style="color:var(--ink)">${n}</span><b style="color:${i<4?'var(--grn)':'var(--mut)'}">${i<4?'Activa':'Conectar'}</b></div>`).join('')}</div>
    <div class="card"><h3>Marca de tus propuestas</h3><div class="sub">BrandAgent lee tu sitio y aplica logo, colores y tono.</div></div>
    <div class="card"><h3>Equipo y permisos</h3><div class="sub">Quién puede aprobar lo que hacen los agentes.</div></div>
  </div></div>`}

/* ---------- router ---------- */
function render(){
  const h=location.hash.replace(/^#\/?/,'')||'os/resumen';const p=h.split('/');
  header();rail(h);document.body.classList.toggle('immersive',p[0]==='agentes'&&!(innerWidth<=820&&!p[1]));
  const st=$('#stage');st.className='glass';
  st.innerHTML=p[0]==='agentes'?agView(p[1]||(innerWidth<=820?'':'asistente')):p[0]==='config'?cfgView():osView(p[1]||'resumen');
  document.querySelectorAll('#mode a').forEach(x=>x.classList.toggle('on',(x.dataset.m==='ag')===(p[0]==='agentes')));
  st.classList.remove('enter');void st.offsetWidth;st.classList.add('enter');
  if(!$('#adock'))document.body.insertAdjacentHTML('beforeend',assistDock());
  $('#infoBtn')&&($('#infoBtn').onclick=()=>$('#drawer').classList.toggle('on'));
  if(window.lucide)lucide.createIcons();bindChart();bindDonut();
  const sc=$('#stage .scroll');document.body.classList.remove('compact');if(sc)sc.addEventListener('scroll',()=>document.body.classList.toggle('compact',sc.scrollTop>24),{passive:true});
  const cmp=$('#cmp');if(cmp)cmp.onsubmit=e=>{e.preventDefault();const ta=cmp.querySelector('textarea');if(!ta.value.trim())return;const cb=$('#cb');cb.insertAdjacentHTML('beforeend',`<div class="u-msg">${ta.value.replace(/</g,'&lt;')}</div><div class="a-msg">${step('loader','Pensando…','')}</div>`);ta.value='';cb.scrollTop=cb.scrollHeight;lucide.createIcons();setTimeout(()=>{cb.lastElementChild.innerHTML=step('database','Consulté tus registros','0.7s','sor_policy · sor_receipt')+'<p>Listo. En la versión real aquí respondo con datos de tu cartera y, si hace falta, le paso la tarea al agente correcto.</p>';lucide.createIcons();cb.scrollTop=cb.scrollHeight},1100)};
}
document.addEventListener('click',e=>{
  const pb=e.target.closest('[data-per]');if(pb){PER=pb.dataset.per;const y=$('#stage .scroll')?.scrollTop||0;render();$('#stage .scroll').scrollTop=y;return}
  if(e.target.closest('#adx')){$('#adock').classList.remove('open');return}
  const q=e.target.closest('[data-ask]');if(q){askDock(q.dataset.ask);return}
  if(e.target.closest('#adi'))$('#adock').classList.add('open');
  const t=e.target.closest('[data-th]');if(t){localStorage.setItem('tb-th',t.dataset.th);applyTheme();header();lucide.createIcons();return}
  if(e.target.closest('#caret')){$('#menu').classList.toggle('on');return}
  if(!e.target.closest('#menu'))$('#menu')?.classList.remove('on');
  const a=e.target.closest('[data-toast]');if(a){e.preventDefault();toast(a.dataset.toast)}
});
applyTheme();window.addEventListener('hashchange',render);render();

/* ---------- motion: dock magnify on rail, cursor light on cards ---------- */
document.addEventListener('mousemove',e=>{
  const r=$('#rail');if(r&&innerWidth>820&&!document.body.classList.contains('immersive')){const rb=r.getBoundingClientRect();const near=e.clientX<rb.right+40&&e.clientY>rb.top-40&&e.clientY<rb.bottom+40;r.querySelectorAll('a').forEach(a=>{const b=a.getBoundingClientRect();const d=Math.abs(e.clientY-(b.top+b.height/2));const sc=near?Math.max(1,1.22-d/110):1;const px=Math.round(36*sc);a.style.width=px+'px';a.style.height=px+'px'})}
  const c=e.target.closest('.card,.lq');if(c){const b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px')}
});
document.addEventListener('mouseleave',()=>{document.querySelectorAll('#rail a').forEach(a=>{a.style.width='';a.style.height=''})});

document.addEventListener('submit',e=>{if(e.target.id==='adf'){e.preventDefault();const i=$('#adi');if(i.value.trim()){askDock(i.value);i.value=''}}});
