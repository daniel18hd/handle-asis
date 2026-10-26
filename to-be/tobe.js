// Handle · TO-BE (propuesta de producto, datos ficticios)
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ic=n=>`<i data-lucide="${n}"></i>`;
const icons=()=>{if(window.lucide)lucide.createIcons()};
const f=D.fmt;
const T='data-toast="Interacción de la propuesta"';
const EZ=t=>1-Math.pow(1-t,3);
const SMOOTH='cubic-bezier(.2,.8,.2,1)';
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
let TK=0,CK=-1,PER='mes',ROUTE=null,SWAP=0;
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),1600)}
/* texto que cambia con fundido suave */
function setT(el,txt,anim){if(!el||el.textContent===String(txt))return;el.textContent=txt;if(anim&&!REDUCED)el.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:380,easing:SMOOTH})}
/* tween genérico */
function tween(from,to,ms,step,key,host){if(REDUCED||ms===0){step(to);return}const t0=performance.now();const id=Symbol();if(host)host[key]=id;
  (function fr(t){if(host&&host[key]!==id)return;const p=Math.min(1,(t-t0)/ms),e=EZ(p);step(Array.isArray(from)?from.map((v,i)=>v+(to[i]-v)*e):from+(to-from)*e);if(p<1)requestAnimationFrame(fr)})(t0)}

/* ---------- logo real de Handle (máscara, toma el color del tema) ---------- */
const HLOGO=`<span class="hlogo" aria-label="Handle"><i class="mk"></i><i class="wd"></i></span>`;

/* ---------- mascotas de agentes ---------- */
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
const AG_PREV={asistente:'Pregúntame lo que sea de tu cartera.',cobranza:'Vamos bien: $412K de $753K ya pagados o prometidos.',pagos:'Confirmé 39 pagos. 3 no cuadran.',cotizacion:'Tengo 212 renovaciones listas para enviar.',conciliador:'Me falta el archivo de comisiones de marzo.',siniestros:'3 reportes médicos vencidos en AXA.',extractor:'Actualicé 50 pólizas desde portales.',kyc:'Sin pendientes por ahora.',feedback:'4 clientes respondieron la encuesta.'};

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

function mascot(id,sz=40){const m=MS[id]||MS.asistente;const e=m.e||'#141210';const dx=m.ex||0;
  return `<svg class="masc" width="${sz}" height="${sz}" viewBox="0 0 48 48" aria-hidden="true"><g class="body" fill="${m.c}">${m.s}</g>
  <g class="look"><g class="eyes"><ellipse cx="${19+dx}" cy="22" rx="2.6" ry="3.6" fill="${e}"/><ellipse cx="${29+dx}" cy="22" rx="2.6" ry="3.6" fill="${e}"/>
  <circle cx="${19.8+dx}" cy="20.6" r=".9" fill="#fff" opacity=".85"/><circle cx="${29.8+dx}" cy="20.6" r=".9" fill="#fff" opacity=".85"/></g></g>
  <ellipse cx="${15+dx}" cy="28" rx="2.4" ry="1.3" fill="#fff" opacity=".35"/><ellipse cx="${33+dx}" cy="28" rx="2.4" ry="1.3" fill="#fff" opacity=".35"/></svg>`}

/* ---------- tema ---------- */
const getTheme=()=>{try{return localStorage.getItem('tb-th')||'light'}catch(e){return 'light'}};
function syncTheme(){const th=getTheme();document.documentElement.classList.toggle('dark',th==='dark');$$('#theme button').forEach(b=>b.classList.toggle('on',b.dataset.th===th));$('#theme')?.classList.toggle('isd',th==='dark')}

/* ---------- header (se construye una sola vez) ---------- */
function header(){
  $('#hdr').className='glass';
  $('#hdr').innerHTML=`
    <a class="brand" href="#/os/resumen">${HLOGO}</a><span class="sp"></span>
    <div class="hr">
      <div class="theme" id="theme"><i class="thumb"></i><button data-th="light" title="Modo claro">${ic('sun')}</button><button data-th="dark" title="Modo oscuro">${ic('moon')}</button></div>
      <button class="hbtn" ${T} title="Notificaciones">${ic('bell')}<span class="dot"></span></button>
      <div class="split">
        <a class="me" href="#" ${T} title="David Estrada · Admin"><span class="av">DE</span></a>
        <button class="caret" id="caret" aria-label="Menú">${ic('chevron-down')}</button>
        <div class="menu" id="menu"><div class="mhd"><span class="av">DE</span><div><b>David Estrada</b><small>Grupo Ejemplo · Admin</small></div></div><hr>
          <a href="#" ${T}>${ic('user')} Mi perfil</a><a href="#" ${T}>${ic('building-2')} Organización</a>
          <a href="#" ${T}>${ic('key-round')} Credenciales de aseguradoras</a><a href="#" ${T}>${ic('plug')} Integraciones</a>
          <hr><a href="#" ${T}>${ic('life-buoy')} Ayuda</a><a href="#" ${T}>${ic('log-out')} Cerrar sesión</a></div>
      </div>
    </div>`;
  syncTheme();
}

/* ---------- side (se construye una sola vez; la ruta solo cambia clases) ---------- */
const RAIL_OS=[['os/resumen','house','Inicio'],['os/clientes','users','Clientes'],['os/polizas','scroll-text','Pólizas'],['os/recibos','receipt','Recibos y cobranza','Cobranza'],['os/cotizaciones','file-text','Cotizaciones'],['os/comisiones','chart-pie','Comisiones'],'-',['config','settings','Configuración','Ajustes']];
function rail(){
  const os=RAIL_OS.map(r=>r==='-'?'<span class="sep"></span>':`<a href="#/${r[0]}" data-r="${r[0]}">${ic(r[1])}<span class="tip">${r[2]}</span><span class="ml">${r[3]||r[2]}</span></a>`).join('');
  const withPend=AGENTS.filter(a=>a.cnt),working=AGENTS.filter(a=>a.state==='Trabajando').length;
  $('#rail').innerHTML=`
    <div class="rbox ag">
      <a href="#/agentes" class="agbtn" aria-label="Agentes">${mascot('asistente',34)}<span class="badge">${withPend.length}</span><span class="ml">Agentes</span></a>
      <div class="agfly"><div class="fly glass">
        <div class="fh"><b>Tus agentes</b><span><i class="live"></i>${working} trabajando ahora</span></div>
        ${withPend.map(a=>`<a class="fl" href="#/agentes/${a.id}">${mascot(a.id,28)}<span class="tx"><b>${a.n}</b><small>${AG_PREV[a.id]}</small></span><i class="cnt">${a.cnt}</i></a>`).join('')}
        <a class="fa" href="#/agentes"><span>Abrir agentes</span>${ic('arrow-right')}</a>
      </div></div>
    </div>
    <div class="rbox os glass">${os}</div>`;
}
function railSync(h){$$('#rail .os a').forEach(a=>a.classList.toggle('on',a.dataset.r===h));$('.agbtn')?.classList.toggle('on',h.startsWith('agentes'))}

/* ---------- datos por periodo (cuadran: sumas, %, comisiones) ---------- */
const PD={
  semana:{lbl:['Lun 21','Mar 22','Mié 23','Jue 24','Vie 25','Sáb 26','Dom 27'],em:[3.1,3.6,3.4,3.9,4.2,1.1,0.5],co:[2.0,2.4,2.6,2.7,2.9,0.8,0.4],vs:'vs semana anterior',dv:[5,9,5,3],sub:'Semana del 21 al 27 de julio',vx:'412 pólizas emitidas · 138 renovaciones',rk:.48,rv:74,cn:52,ct:41,hum:3,sh:[.33,.27,.21,.12,.07],ren:['138 pólizas renuevan esta semana','46 cotizaciones de renovación listas para enviar'],cot:['12 cotizaciones esperan respuesta','Faltan datos del cliente en 8; el agente redactó las preguntas']},
  mes:{lbl:['1–4 jul','5–8 jul','9–12 jul','13–16 jul','17–20 jul','21–24 jul','25–28 jul','29–31 jul'],em:[10.2,11.2,12.6,12.3,11.0,12.1,13.4,14.0],co:[6.1,7.1,8.0,8.8,7.4,8.5,8.9,9.4],vs:'vs junio',dv:[8,12,8,4],sub:'Julio 2026',vx:'1,786 pólizas emitidas · 674 renuevan este mes',rk:2.36,rv:360,cn:280,ct:59,hum:7,sh:[.35,.26,.20,.13,.06],ren:['674 pólizas renuevan en julio','Ya hay 212 cotizaciones de renovación listas para enviar'],cot:['48 cotizaciones esperan respuesta','Faltan datos del cliente en 31; el agente redactó las preguntas']},
  ano:{lbl:['Ene','Feb','Mar','Abr','May','Jun','Jul'],em:[78.2,81.5,86.0,84.3,90.1,89.6,96.8],co:[60.1,62.4,65.8,66.0,70.2,68.9,64.2],vs:'vs 2025',dv:[11,14,11,6],sub:'Enero a julio 2026',vx:'12,502 pólizas en cartera · 5,528 activas',rk:14.9,rv:2180,cn:1604,ct:1912,hum:7,sh:[.36,.25,.19,.14,.06],ren:['3,912 pólizas renovadas en el año','674 renuevan en julio; 212 cotizaciones listas'],cot:['195 cotizaciones en el año','48 esperan respuesta; faltan datos en 31']}
};
const INS=[['GNP','var(--p1)'],['Qualitas','var(--p2)'],['Chubb','var(--p3)'],['AXA','var(--p4)'],['Otras (12)','var(--p5)']];
const sum=a=>a.reduce((x,y)=>x+y,0);
const M=v=>v>=100?'$'+v.toFixed(0)+'M':'$'+v.toFixed(1)+'M';
const VU=v=>v<1?['$'+Math.round(v*1000),'K']:[M(v).slice(0,-1),'M'];
const MK=v=>VU(v).join('');
const NF=n=>Math.round(n).toLocaleString('en-US');
const model=d=>{const E=sum(d.em),C=sum(d.co);return{E,C,pc:Math.round(C/E*100),G:E*.149,R:d.rk}};

/* ---------- gráfica de línea ---------- */
function smooth(pts){let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;d+=` C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2[0]},${p2[1]}`}return d}
const CH={W:720,H:230,pad:42};
const chMax=d=>Math.ceil(Math.max(...d.em)*1.2/5)*5||5;
function geo(d){const {W,H,pad}=CH,mx=chMax(d),n=d.em.length;return{n,mx,x:i=>pad+i*(W-pad-14)/(n-1),y:v=>H-26-(v/mx)*(H-46)}}
function lineSVG(d){
  const {W,H,pad}=CH,{n,mx,x,y}=geo(d);
  const pe=d.em.map((v,i)=>[x(i),y(v)]),pc=d.co.map((v,i)=>[x(i),y(v)]);
  const grid=[0,.25,.5,.75,1].map(t=>t*mx).map(v=>`<line x1="${pad}" x2="${W-14}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" opacity=".07"/><text x="0" y="${y(v)+3}">${v?'$'+(+v.toFixed(1))+'M':'0'}</text>`).join('');
  const lbl=d.lbl.map((t,i)=>`<text x="${x(i)}" y="${H-4}" text-anchor="${i===0?'start':i===n-1?'end':'middle'}">${t}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" style="color:var(--ink)">
    <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6DC5A" stop-opacity=".36"/><stop offset="1" stop-color="#A6DC5A" stop-opacity="0"/></linearGradient></defs>
    ${grid}${lbl}
    <path class="area" d="${smooth(pe)} L${x(n-1)},${H-26} L${pad},${H-26} Z" fill="url(#ga)"/>
    <path class="ln le" d="${smooth(pe)}" fill="none" stroke="#7DBA34" stroke-width="2.6" stroke-linecap="round"/>
    <path class="ln lc2" d="${smooth(pc)}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    <g class="hov"><line class="gl" x1="0" x2="0" y1="14" y2="${H-26}" stroke="currentColor" stroke-opacity=".22" stroke-dasharray="3 4"/><g class="d1"><circle r="5" fill="#7DBA34" stroke="#fff" stroke-width="2"/></g><g class="d2"><circle r="5" fill="currentColor" stroke="#fff" stroke-width="2"/></g></g>
  </svg>`;
}
function drawChart(anim){
  const box=$('#lc');if(!box)return;const d=PD[PER];
  const put=()=>{box.querySelector('svg')?.remove();box.insertAdjacentHTML('afterbegin',lineSVG(d));bindChart();
    if(REDUCED)return;const svg=box.querySelector('svg');
    svg.querySelectorAll('.ln').forEach((p,i)=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.animate([{strokeDashoffset:L},{strokeDashoffset:0}],{duration:900,delay:i*90,easing:SMOOTH,fill:'backwards'}).onfinish=()=>{p.style.strokeDasharray=''}});
    svg.querySelector('.area').animate([{opacity:0},{opacity:1}],{duration:700,delay:220,easing:'ease-out',fill:'backwards'});
  };
  const old=box.querySelector('svg');
  if(anim&&old&&!REDUCED){box.querySelector('.tipc').classList.remove('on');old.animate([{opacity:1},{opacity:0}],{duration:150,easing:'ease-in',fill:'forwards'}).onfinish=put}else put();
}
function bindChart(){
  const box=$('#lc');if(!box)return;const d=PD[PER],svg=box.querySelector('svg'),{W,H,pad}=CH,{n,x,y}=geo(d);
  const g=svg.querySelector('.hov'),gl=g.querySelector('.gl'),d1=g.querySelector('.d1'),d2=g.querySelector('.d2'),tip=box.querySelector('.tipc');let cur=-1;
  const show=i=>{if(i===cur)return;const first=cur<0;cur=i;
    if(first){g.classList.add('nt');tip.classList.add('nt')}
    gl.style.transform=`translateX(${x(i)}px)`;d1.style.transform=`translate(${x(i)}px,${y(d.em[i])}px)`;d2.style.transform=`translate(${x(i)}px,${y(d.co[i])}px)`;
    tip.querySelector('b').textContent=d.lbl[i];
    tip.querySelector('.r1 em').textContent=M(d.em[i]);tip.querySelector('.r2 em').textContent=M(d.co[i]);
    tip.querySelector('.r3').textContent=Math.round(d.co[i]/d.em[i]*100)+'% cobrado';
    const r=svg.getBoundingClientRect();tip.style.left=Math.min(Math.max(x(i)/W*r.width,84),r.width-84)+'px';tip.style.top=(Math.min(y(d.em[i]),y(d.co[i]))/H*r.height)+'px';
    g.classList.add('on');tip.classList.add('on');
    if(first){g.getBoundingClientRect();g.classList.remove('nt');tip.classList.remove('nt')}};
  svg.addEventListener('pointermove',e=>{const r=svg.getBoundingClientRect();const vx=(e.clientX-r.left)/r.width*W;show(Math.max(0,Math.min(n-1,Math.round((vx-pad)/((W-pad-14)/(n-1))))))});
  svg.addEventListener('pointerleave',()=>{cur=-1;g.classList.remove('on');tip.classList.remove('on')});
}

/* ---------- dona ---------- */
const DR=58,DC=2*Math.PI*DR,GAP=2.4;
function donutHTML(){return `<svg width="184" height="184" viewBox="0 0 150 150">
  <circle r="${DR}" cx="75" cy="75" fill="none" stroke="var(--line2)" stroke-width="12"/>
  ${INS.map(([n,c],k)=>`<g class="sg" data-k="${k}"><circle class="arc" r="${DR}" cx="75" cy="75" fill="none" stroke="${c}" stroke-width="12" transform="rotate(-90 75 75)"/></g>`).join('')}
  <g class="ctr"><text class="c1" x="75" y="67" text-anchor="middle">Prima emitida</text><text class="c2" x="75" y="87" text-anchor="middle"></text><text class="c3" x="75" y="102" text-anchor="middle"></text></g></svg>`}
function catsHTML(){return INS.map(([n,c],k)=>`<div class="cat" data-k="${k}"><span class="nm"><i class="dot" style="background:${c}"></i>${n}</span><span class="tr"><i style="background:${c}"></i></span><b></b><small></small></div>`).join('')}
let DSH=null,DTOT=0,DHOV=-1;
function layoutDonut(sh){const dn=$('#dn');if(!dn)return;let s=0;dn.querySelectorAll('.sg').forEach((g,k)=>{const p=sh[k],L=Math.max(p*DC-GAP,.01);const a=g.querySelector('.arc');a.setAttribute('stroke-dasharray',`${L} ${DC}`);a.setAttribute('stroke-dashoffset',-(s*DC+GAP/2));const th=(s+p/2)*2*Math.PI;g.style.setProperty('--tx',(Math.sin(th)*3.6).toFixed(2)+'px');g.style.setProperty('--ty',(-Math.cos(th)*3.6).toFixed(2)+'px');s+=p})}
function centerDonut(anim){const dn=$('#dn');if(!dn)return;const sv=dn.querySelector('svg');
  const c1=sv.querySelector('.c1'),c2=sv.querySelector('.c2'),c3=sv.querySelector('.c3');
  if(DHOV<0){setT(c1,'Prima emitida',anim);setT(c2,M(DTOT),anim);setT(c3,'',false)}
  else{const p=DSH[DHOV];setT(c1,INS[DHOV][0],anim);setT(c2,M(DTOT*p),anim);setT(c3,Math.round(p*100)+'% del total',anim)}}
function paintDonut(anim){const d=PD[PER],tot=model(d).E,to=d.sh.slice();const from=DSH?DSH.slice():to.slice(),t0=DTOT||tot;
  tween([...from,t0],[...to,tot],anim?700:0,v=>{DSH=v.slice(0,5);DTOT=v[5];layoutDonut(DSH);if(DHOV<0)$('#dn .c2').textContent=M(DTOT)},'_tw',paintDonut);
  const mx=Math.max(...to);$$('#cats .cat').forEach((r,k)=>{r.querySelector('.tr i').style.width=(to[k]/mx*100)+'%';setT(r.querySelector('b'),M(tot*to[k]),anim);setT(r.querySelector('small'),Math.round(to[k]*100)+'%',anim)});
  if(DHOV>=0)centerDonut(false)}
function bindDonut(){const dn=$('#dn');if(!dn)return;const sv=dn.querySelector('svg'),cats=$$('#cats .cat');
  const hov=k=>{if(k===DHOV)return;DHOV=k;dn.classList.toggle('act',k>=0);dn.querySelectorAll('.sg').forEach(g=>g.classList.toggle('on',+g.dataset.k===k));cats.forEach(c=>c.classList.toggle('on',+c.dataset.k===k));$('#cats').classList.toggle('act',k>=0);centerDonut(true)};
  sv.addEventListener('pointermove',e=>{const r=sv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*150-75,py=(e.clientY-r.top)/r.height*150-75,dd=Math.hypot(px,py);
    if(dd<42||dd>74){hov(-1);return}const a=((Math.atan2(py,px)+Math.PI/2)/(2*Math.PI)+1)%1;let acc=0,k=0;for(;k<4;k++){acc+=DSH[k];if(a<acc)break}hov(k)});
  sv.addEventListener('pointerleave',()=>hov(-1));
  cats.forEach(c=>{c.addEventListener('pointerenter',()=>hov(+c.dataset.k));c.addEventListener('pointerleave',()=>hov(-1))});}

/* ---------- resumen ---------- */
const ATT=[
  {i:'receipt-text',t:'hot',h:'agentes/cobranza',ti:d=>`${NF(d.rv)} recibos vencidos · ${MK(d.rk)}`,su:d=>`El agente de cobranza ya contactó ${NF(d.ct)}; ${d.hum} piden a un humano`,cta:d=>`Revisar ${d.hum}`},
  {i:'refresh-cw',h:'agentes/cotizacion',ti:d=>d.ren[0],su:d=>d.ren[1],cta:()=>'Aprobar envío'},
  {i:'file-question',h:'agentes/cotizacion',ti:d=>d.cot[0],su:d=>d.cot[1],cta:()=>'Ver preguntas'},
  {i:'scale',h:'agentes/pagos',ti:()=>'3 pagos con diferencia de monto',su:()=>'Validador encontró pago parcial en GNP y Chubb',cta:()=>'Validar'},
  {i:'plug-zap',h:'config',ti:()=>'10 accesos a portales fallando',su:()=>'Bloquea la conciliación de AXA, Banorte y Chubb',cta:()=>'Reconectar'}];
const kpiS=(id,l,bar,risk)=>`<div class="card kpi ${risk?'risk':''}" id="k-${id}"><div class="hd">${l}</div><div class="v"><span class="n"></span><small class="u"></small></div><div class="dl"><span class="delta ${risk?'dn':'up'}"></span><span class="cmp"></span></div>${bar?'<div class="bar"><i></i></div>':''}<div class="expl"></div></div>`;
function resumenHTML(){return `
  <div class="ttl"><div><h1>Tu cartera, hoy</h1><p data-f="sub"></p></div><span class="sp"></span>
    <div class="seg" id="per"><i class="thumb"></i>${[['semana','Semana'],['mes','Mes'],['ano','Año']].map(([k,t])=>`<button data-per="${k}" class="${PER===k?'on':''}">${t}</button>`).join('')}</div>
    <a class="btn pri" href="#" ${T}>${ic('download')} Exportar</a></div>
  <div class="grid k4">${kpiS('e','Vendiste')}${kpiS('c','Cobraste',1)}${kpiS('g','Ganaste')}${kpiS('r','En riesgo',0,1)}</div>
  <div class="grid row2">
    <div class="card"><div class="chd"><div><h3>Prima emitida vs cobrada</h3><div class="sub" data-f="sub"></div></div><span class="sp"></span><div class="legend"><span><i class="dot" style="background:#7DBA34"></i>Emitida · <b id="lg-e"></b></span><span><i class="dot" style="background:var(--ink)"></i>Cobrada · <b id="lg-c"></b></span></div></div>
      <div class="lc" id="lc"><div class="tipc"><b></b><span class="r1"><i style="background:#7DBA34"></i>Emitida<em></em></span><span class="r2"><i style="background:var(--ink)"></i>Cobrada<em></em></span><span class="r3"></span></div></div></div>
    <div class="card"><h3>Prima por aseguradora</h3><div class="sub" data-f="sub"></div><div class="dnut" id="dn">${donutHTML()}</div><div class="cats" id="cats">${catsHTML()}</div></div>
  </div>
  <div class="grid row3">
    <div class="card"><div class="chd"><h3>Necesita tu atención</h3><span class="sp"></span><span class="pill warn">5 pendientes</span></div><div class="sub" style="margin-bottom:4px">Ordenado por dinero en juego. Cada uno abre al agente responsable.</div>
      <div id="att">${ATT.map(a=>`<a class="act ${a.t||''}" href="#/${a.h}"><span class="ai2">${ic(a.i)}</span><span class="tx"><b></b><span></span></span><span class="go btn sm"></span></a>`).join('')}</div></div>
    <div class="card"><div class="chd"><h3>Tus agentes hoy</h3><span class="sp"></span><a class="btn sm" href="#/agentes/cobranza">Abrir agentes ${ic('arrow-right')}</a></div><div class="sub" style="margin-bottom:4px">Trabajo hecho por la IA desde las 7:00 am.</div>
      ${AGENTS.slice(0,6).map(a=>`<a class="agentline" href="#/agentes/${a.id}">${mascot(a.id,36)}<span><b>${a.n}</b><small>${a.today}</small></span><span class="st"><i class="live ${a.state==='Esperando acceso'?'wait':''}"></i>${a.state}</span></a>`).join('')}</div>
  </div>`}
function setNum(card,val,anim){const v=card.querySelector('.v'),n=v.querySelector('.n'),u=v.querySelector('.u');const from=card._v??val;card._v=val;
  tween(from,val,anim?750:0,x=>{const [a,b]=VU(x);n.textContent=a;u.textContent=b},'_tw',card)}
function paintResumen(anim){
  const d=PD[PER],m=model(d);if(!$('#k-e'))return;
  const K=[['e',m.E,d.dv[0],d.vs,d.vx],['c',m.C,d.dv[1],d.vs,`${m.pc}% de lo emitido · faltan ${MK(m.E-m.C)}`],['g',m.G,d.dv[2],'en comisiones','Comisión promedio de 14.9% sobre lo emitido'],['r',m.R,d.dv[3],d.vs,`${NF(d.rv)} recibos vencidos · ${NF(d.cn)} pólizas canceladas`]];
  K.forEach(([id,val,dv,cmp,ex])=>{const c=$('#k-'+id);setNum(c,val,anim);setT(c.querySelector('.delta'),'↑ '+dv+'%',anim);setT(c.querySelector('.cmp'),cmp,anim);setT(c.querySelector('.expl'),ex,anim)});
  $('#k-c .bar i').style.width=m.pc+'%';
  $$('[data-f=sub]').forEach(e=>setT(e,d.sub,anim));setT($('#lg-e'),M(m.E),anim);setT($('#lg-c'),M(m.C),anim);
  $$('#att .act').forEach((el,i)=>{const a=ATT[i];setT(el.querySelector('.tx b'),a.ti(d),anim);setT(el.querySelector('.tx span'),a.su(d),anim);setT(el.querySelector('.go'),a.cta(d),anim)});
  drawChart(anim);paintDonut(anim);
}
function segThumb(){const s=$('#per');if(!s)return;const b=s.querySelector('button.on'),t=s.querySelector('.thumb');t.style.width=b.offsetWidth+'px';t.style.transform=`translateX(${b.offsetLeft-3}px)`}

function osView(sec){
  let body='';
  if(sec==='resumen')body=resumenHTML();
  else{
  if(sec==='clientes') body=listView('Clientes','6,056 clientes · 2,241 con póliza activa · $16.2M en cartera',['Todos','Con vencidos','Renuevan este mes','Personas morales'],
    ['Cliente','Pólizas','Prima anual','Estado','Siguiente paso'],D.clientes.slice(0,12).map((c,i)=>`<tr><td><span class="who"><span class="av">${c.n.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><span><b style="font-weight:600">${c.n}</b><br><span style="color:var(--mut);font-size:11px">${c.tipo} · ${c.rfc}</span></span></span></td><td class="m">${c.pol||1}</td><td class="m">$${f(8000+i*3471.5)}</td><td>${i%4===1?'<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Recibo vencido</span>':i%3===0?'<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">Renueva en 12 días</span>':'<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Al corriente</span>'}</td><td style="color:var(--mut)">${i%4===1?'Cobranza llamó ayer · promesa de pago':'—'}</td></tr>`).join(''));
  else if(sec==='polizas') body=listView('Pólizas','12,502 pólizas · 5,528 activas · $17.0M de prima activa',['Activas','Pendientes','Por renovar','Canceladas'],
    ['Póliza','Cliente','Aseguradora','Ramo','Prima','Vence'],D.polizas.slice(0,12).map(x=>`<tr><td class="m">${x.no}</td><td>${x.cli}</td><td>${x.ins}</td><td style="color:var(--mut)">${x.tipo}</td><td class="m">$${f(x.prima)}</td><td style="color:var(--mut)">${x.vence}</td></tr>`).join(''));
  else if(sec==='recibos') body=listView('Recibos y cobranza','Esta semana $753K · Próximos $3.08M · Vencidos $16.4M',['Esta semana','Próximos','Vencidos','Pagados'],
    ['Cliente','Aseguradora','Monto','Vence','Estado del agente'],D.pend.map((x,i)=>`<tr><td><b style="font-weight:600">${x.cli}</b></td><td>${x.ins}</td><td class="m">$${f(x.m)}</td><td style="color:var(--mut)">Hoy</td><td>${['<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Pago confirmado</span>','<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">WhatsApp enviado</span>','<span class="pill" style="background:rgba(242,185,59,.2);color:#9a6f10">Promesa de pago</span>','<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Escalado a ti</span>'][i%4]}</td></tr>`).join(''));
  else if(sec==='comisiones') body=listView('Comisiones','4,703 comisiones · $4.19M en el periodo',['Julio','Junio','Por aseguradora','Por agente'],
    ['Póliza','Aseguradora','Agente','Tasa','Monto','IVA'],D.comisiones.slice(0,12).map(x=>`<tr><td class="m">${x.pol}</td><td>${x.ins.toUpperCase()}</td><td class="m">${x.ag}</td><td class="m">${x.tasa?x.tasa.toFixed(1)+'%':'—'}</td><td class="m">$${f(x.monto)}</td><td class="m">$${f(x.iva)}</td></tr>`).join(''));
  else if(sec==='cotizaciones') body=listView('Cotizaciones','195 solicitudes · 48 esperan tu respuesta · 120 cotizadas',['Requieren atención','En proceso','Cotizadas','Cerradas'],
    ['Solicitud','Ramo','Aseguradoras','Mejor precio','Estado'],D.cotizaciones.map((c,i)=>`<tr><td><b style="font-weight:600">${c.n}</b><br><span class="m" style="color:var(--mut)">${c.id}</span></td><td style="color:var(--mut)">${c.ramo}</td><td class="m">${c.c}</td><td class="m">${i%2?'—':'$'+f(32076+i*1200)}</td><td>${c.est.startsWith('REQ')||i===0?'<span class="pill" style="background:rgba(217,68,58,.13);color:var(--red)">Falta info del cliente</span>':c.est==='COTIZADO'?'<span class="pill" style="background:rgba(47,158,91,.14);color:var(--grn)">Lista para enviar</span>':'<span class="pill" style="background:rgba(74,108,247,.14);color:var(--blu)">Cotizando</span>'}</td></tr>`).join(''));
  }
  return `<div class="scroll">${body}</div>`;
}
function listView(t,s,chips,cols,rows){return `<div class="ttl"><div><h1>${t}</h1><p>${s}</p></div><span class="sp"></span><label class="search">${ic('search')}<input placeholder="Buscar o preguntar…"></label><a class="btn pri" href="#" ${T}>${ic('plus')} Nuevo</a></div>
  <div class="chips" style="margin-bottom:12px">${chips.map((c,i)=>`<span class="chip ${i?'':'on'}">${c}</span>`).join('')}</div>
  <div class="card" style="padding:6px 12px"><table class="tbl"><thead><tr>${cols.map((c,i)=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`}

/* ---------- Agentes ---------- */
function agentOf(id){return AGENTS.find(x=>x.id===id)||{id:'asistente',n:'Asistente Handle',state:'Listo',today:''}}
function chatHTML(id){
  const a=agentOf(id);
  const cv=CONVOS[id]||{title:'Sin conversaciones',body:`<div class="a-msg"><p>Estoy al día. ${a.today}.</p></div>`,side:[['Estado',a.state]],pend:[]};
  return `<section class="cx-chat" data-id="${id}">
      <div class="cx-hd glass"><a class="back back-m" href="#/agentes" aria-label="Volver">${ic('chevron-left')}</a><span class="mini">${mascot(a.id,26)}</span><b>${a.n}</b><span class="st"><i class="live"></i>${a.state}</span><span class="sp"></span><button class="hbtn sm2" id="infoBtn" title="Cómo trabaja">${ic('sliders-horizontal')}</button></div>
      <div class="cx-body" id="cb"><div class="cx-day">Hoy</div>${cv.body}</div>
      <form class="cx-comp glass" id="cmp"><button type="button" class="hbtn sm2">${ic('plus')}</button><textarea rows="1" placeholder="Escríbele a ${a.n}…"></textarea><button type="button" class="hbtn sm2">${ic('mic')}</button><button class="voice" title="Enviar">${ic('arrow-up')}</button></form>
      <div class="drawer glass" id="drawer"><div class="dh"><h3>Cómo trabaja</h3><span class="sp"></span><span class="toggle"></span></div>${cv.side.map(([k,v])=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('')}
        ${cv.pend.length?`<h3 style="margin-top:16px">Necesita tu aprobación</h3>${cv.pend.map(([k,v])=>`<div class="kv"><span style="color:var(--ink)">${k}</span><b style="color:var(--org)">${v}</b></div>`).join('')}`:''}
        <a class="btn sm" style="margin-top:12px" href="#" ${T}>${ic('sliders-horizontal')} Ajustar en lenguaje natural</a></div>
    </section>`}
function agView(id){
  const mList=!id;if(!id)id='asistente';
  const list=[{id:'asistente',n:'Asistente Handle',cnt:0},...AGENTS];
  return `<div class="cx ${mList?'m-list':'m-chat'}">
    <aside class="cx-list">
      <div class="cx-top"><a class="back" href="#/os/resumen" title="Volver">${ic('arrow-left')}</a><b class="cx-title">Agentes</b><span class="sp"></span><button class="hbtn sm2" ${T}>${ic('search')}</button><button class="hbtn sm2" ${T}>${ic('plus')}</button></div>
      <div class="cx-items">${list.map(x=>`<a class="cx-it ${x.id===id&&!mList?'on':''}" data-id="${x.id}" href="#/agentes/${x.id}">${mascot(x.id,42)}<span class="tx"><b>${x.n}</b><span>${AG_PREV[x.id]||''}</span></span>${x.cnt?`<i class="cnt">${x.cnt}</i>`:''}</a>`).join('')}</div>
      <div class="cx-me"><span class="av">DE</span><span><b>David Estrada</b><small>Grupo Ejemplo</small></span><span class="sp"></span><a class="hbtn sm2" href="#/config">${ic('settings')}</a></div>
    </aside>${chatHTML(id)}</div>`;
}
function swapChat(id){
  $$('.cx-it').forEach(x=>x.classList.toggle('on',x.dataset.id===id));
  const old=$('.cx-chat');if(!old||old.dataset.id===id)return;const my=++SWAP;
  const fin=()=>{if(my!==SWAP)return;old.insertAdjacentHTML('afterend',chatHTML(id));old.remove();icons();mountChat();
    if(!REDUCED){$('#cb').animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:420,easing:SMOOTH});$('.cx-hd b').animate([{opacity:0},{opacity:1}],{duration:300})}};
  if(REDUCED){fin();return}
  old.querySelector('.cx-body').animate([{opacity:1},{opacity:0,transform:'translateY(-4px)'}],{duration:140,easing:'ease-in',fill:'forwards'}).onfinish=fin;
}
function mountChat(){
  $('#infoBtn')&&($('#infoBtn').onclick=()=>$('#drawer').classList.toggle('on'));
  const cmp=$('#cmp');if(cmp)cmp.onsubmit=e=>{e.preventDefault();const ta=cmp.querySelector('textarea');if(!ta.value.trim())return;const cb=$('#cb');
    cb.insertAdjacentHTML('beforeend',`<div class="u-msg in">${ta.value.replace(/</g,'&lt;')}</div><div class="a-msg in"><p class="typing"><i></i><i></i><i></i></p></div>`);ta.value='';cb.scrollTo({top:cb.scrollHeight,behavior:'smooth'});
    setTimeout(()=>{cb.lastElementChild.innerHTML=step('database','Consulté tus registros','0.7s','sor_policy · sor_receipt')+'<p>Listo. En la versión real aquí respondo con datos de tu cartera y, si hace falta, le paso la tarea al agente correcto.</p>';icons();cb.scrollTo({top:cb.scrollHeight,behavior:'smooth'})},1100)};
}

/* ---------- asistente flotante ---------- */
function assistDock(){return `<div class="adock glass" id="adock"><div class="ad-panel" id="adp">
    <div class="ad-hd">${mascot('asistente',30)}<div><b>Asistente Handle</b><small>Pregunta a tus pólizas, recibos y comisiones</small></div><span class="sp"></span><button class="hbtn sm2" id="adx" aria-label="Cerrar">${ic('x')}</button></div>
    <div class="ad-body" id="adb"><div class="a-msg"><p>Hola, David. ¿Qué quieres saber hoy?</p></div><div class="chips">${['¿Quién no ha pagado esta semana?','Renovaciones de agosto','Comisiones por aseguradora'].map(c=>`<button class="chip" data-ask="${c}">${c}</button>`).join('')}</div></div></div>
  <form class="ad-bar" id="adf"><input id="adi" placeholder="Pregúntale a Handle…" autocomplete="off"><button type="button" class="hbtn sm2" aria-label="Dictar">${ic('mic')}</button><button class="voice" aria-label="Enviar">${ic('arrow-up')}</button></form></div>`}
function askDock(q){const b=$('#adb');$('#adock').classList.add('open');b.insertAdjacentHTML('beforeend',`<div class="u-msg in">${q.replace(/</g,'&lt;')}</div><div class="a-msg in"><p class="typing"><i></i><i></i><i></i></p></div>`);b.scrollTo({top:b.scrollHeight,behavior:'smooth'});
  setTimeout(()=>{b.lastElementChild.innerHTML='<p>Esta semana vencen <b>93 recibos por $753K</b>. 55% ya está pagado o prometido; los 7 que piden a un humano están en Cobranza.</p><a class="btn sm" href="#/agentes/cobranza">Abrir en Cobranza →</a>';b.scrollTo({top:b.scrollHeight,behavior:'smooth'})},900)}

/* ---------- configuración ---------- */
function cfgView(){return `<div class="scroll"><div class="ttl"><div><h1>Configuración</h1><p>Lo que tus agentes necesitan para trabajar, en un solo lugar.</p></div></div>
  <div class="grid" style="grid-template-columns:1fr 1fr">
    <div class="card"><h3>Accesos a portales</h3><div class="sub">17 de 19 conectados</div>${D.aseg.slice(0,8).map(([n,c,k,a])=>`<div class="kv"><span style="color:var(--ink)"><i class="dot" style="background:${c}"></i> ${n}</span><b style="color:${a?'var(--red)':'var(--grn)'}">${a?'Reconectar':'Conectado'}</b></div>`).join('')}</div>
    <div class="card"><h3>Integraciones</h3><div class="sub">4 activas</div>${['Google Drive','Google Sheets','Quattro CRM','WhatsApp','SICAS','APRO Sistema'].map((n,i)=>`<div class="kv"><span style="color:var(--ink)">${n}</span><b style="color:${i<4?'var(--grn)':'var(--mut)'}">${i<4?'Activa':'Conectar'}</b></div>`).join('')}</div>
    <div class="card"><h3>Marca de tus propuestas</h3><div class="sub">BrandAgent lee tu sitio y aplica logo, colores y tono.</div></div>
    <div class="card"><h3>Equipo y permisos</h3><div class="sub">Quién puede aprobar lo que hacen los agentes.</div></div>
  </div></div>`}

/* ---------- router con transiciones ---------- */
function mount(){
  TK=0;
  if($('#k-e')){segThumb();paintResumen(false);bindDonut()}
  mountChat();
}
function swapStage(html,first){
  const st=$('#stage'),old=st.firstElementChild,my=++SWAP;
  const put=()=>{if(my!==SWAP)return;DSH=null;DTOT=0;DHOV=-1;st.innerHTML=html;icons();mount();st.classList.remove('enter');void st.offsetWidth;st.classList.add('enter')};
  if(first||!old||REDUCED){put();return}
  old.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px)'}],{duration:170,easing:'ease-in',fill:'forwards'}).onfinish=put;
}
function route(){
  const h=location.hash.replace(/^#\/?/,'')||'os/resumen',p=h.split('/'),prev=ROUTE;ROUTE=h;
  const mob=innerWidth<=820,isAg=p[0]==='agentes';
  railSync(h);$('#menu')?.classList.remove('on');
  document.body.classList.toggle('immersive',isAg&&!(mob&&!p[1]));
  const cx=$('.cx');
  if(prev&&prev.split('/')[0]==='agentes'&&isAg&&cx){
    if(!mob&&p[1]){swapChat(p[1]);return}
    if(!mob&&!p[1]){swapChat('asistente');return}
  }
  swapStage(isAg?agView(p[1]||(mob?'':'asistente')):p[0]==='config'?cfgView():osView(p[1]||'resumen'),!prev);
}

/* ---------- eventos ---------- */
document.addEventListener('click',e=>{
  const pb=e.target.closest('[data-per]');if(pb){if(pb.dataset.per!==PER){PER=pb.dataset.per;$$('#per button').forEach(b=>b.classList.toggle('on',b===pb));segThumb();paintResumen(true)}return}
  if(e.target.closest('#adx')){$('#adock').classList.remove('open');return}
  const q=e.target.closest('[data-ask]');if(q){askDock(q.dataset.ask);return}
  const t=e.target.closest('[data-th]');if(t){try{localStorage.setItem('tb-th',t.dataset.th)}catch(_){}syncTheme();return}
  if(e.target.closest('#caret')){$('#menu').classList.toggle('on');return}
  if(!e.target.closest('#menu'))$('#menu')?.classList.remove('on');
  if(!e.target.closest('#adock')&&$('#adock')?.classList.contains('open')&&!$('#adi').value)$('#adock').classList.remove('open');
  const a=e.target.closest('[data-toast]');if(a){e.preventDefault();toast(a.dataset.toast)}
});
document.addEventListener('submit',e=>{if(e.target.id==='adf'){e.preventDefault();const i=$('#adi');if(i.value.trim()){askDock(i.value);i.value=''}}});
document.addEventListener('pointerdown',e=>{if(e.target.closest('#adf')&&!e.target.closest('.voice')){$('#adock').classList.add('open');if(!e.target.closest('input'))setTimeout(()=>$('#adi').focus(),0)}},true);
document.addEventListener('focusin',e=>{if(e.target.id==='adi')$('#adock').classList.add('open')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#adock')?.classList.remove('open');$('#menu')?.classList.remove('on');$('#drawer')?.classList.remove('on')}});
/* scroll: cualquier .scroll alimenta la compactación del header y el side */
document.addEventListener('scroll',e=>{const s=e.target;if(s.classList&&s.classList.contains('scroll'))TK=Math.min(1,s.scrollTop/140)},{capture:true,passive:true});
/* luz que sigue al cursor + ojos del agente que te miran */
let MX=0,MY=0;
document.addEventListener('pointermove',e=>{MX=e.clientX;MY=e.clientY;
  const c=e.target.closest&&e.target.closest('.card,.lq');if(c){const b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px')}
  const lk=$('.agbtn .look');if(lk){const b=$('.agbtn').getBoundingClientRect(),dx=MX-(b.left+b.width/2),dy=MY-(b.top+b.height/2),dd=Math.hypot(dx,dy)||1,k=Math.min(1,dd/160);lk.style.transform=`translate(${(dx/dd*2.6*k).toFixed(2)}px,${(dy/dd*2.1*k).toFixed(2)}px)`}
},{passive:true});
window.addEventListener('resize',()=>segThumb());
/* compactación continua (interpolada) */
(function loop(){CK=CK<0?TK:CK+(TK-CK)*.16;if(Math.abs(TK-CK)<.0005)CK=TK;const v=CK.toFixed(4);if(v!==loop.v){document.documentElement.style.setProperty('--k',v);loop.v=v}requestAnimationFrame(loop)})();

/* ---------- arranque ---------- */
header();rail();document.body.insertAdjacentHTML('beforeend',assistDock());icons();
window.addEventListener('hashchange',route);route();
document.fonts&&document.fonts.ready.then(()=>segThumb());
requestAnimationFrame(()=>document.body.classList.add('ready'));
