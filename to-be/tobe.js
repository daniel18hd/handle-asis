// Handle · TO-BE (propuesta de producto, datos ficticios)
const $ = s => document.querySelector(s);
const ic = n => `<i data-lucide="${n}"></i>`;
const f = D.fmt;
const LOGO = `<svg viewBox="0 0 24 24" width="17" height="17"><path d="M5 18.5 11 5.5M12.5 18.5l6-13" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/></svg>`;
const T = 'data-toast="Interacción de la propuesta"';
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),1600)}

/* ---------- theme ---------- */
const getTheme=()=>localStorage.getItem('tb-th')||'light';
function applyTheme(){document.documentElement.classList.toggle('dark',getTheme()==='dark')}

/* ---------- header ---------- */
function header(){
  const th=getTheme();
  $('#hdr').className='glass lq sweep';
  $('#hdr').innerHTML=`
    <a class="brand" href="#/os/resumen"><span class="lg">${LOGO}</span><span>Handle<small>Hola, David</small></span></a>
    <nav class="mode" id="mode"><span class="pill-bg"></span><a href="#/os/resumen" data-m="os">${ic('layout-grid')}<span>OS</span></a><a href="#/agentes/asistente" data-m="ag">${ic('sparkles')}<span>Agentes IA</span><i class="n">3</i></a></nav>
    <button class="hbtn srch" onclick="location.hash='#/agentes/asistente'" title="Buscar o preguntar (⌘K)">${ic('search')}<span>Buscar o preguntar</span><span class="kbd">⌘K</span></button>
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
  const items=h.startsWith('agentes')?railAgents():RAIL_OS;
  $('#rail').className='glass lq'+(h.startsWith('agentes')?' ag-mode':'');
  $('#rail').innerHTML=items.map(r=>r==='-'?'<span class="sep"></span>':`<a href="#/${r[0]}" class="${h===r[0]?'on':''}">${ic(r[1])}${r[3]?`<span class="badge">${r[3]}</span>`:''}<span class="tip">${r[2]}</span><span class="ml">${r[4]||r[2]}</span></a>`).join('');
}
/* ---------- helpers ---------- */
function smooth(pts){let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`}return d}
function lineChart(){
  const W=720,H=230,pad=34,em=[42,55,61,48,72,66,58,80,74,69,86,78],co=[30,38,41,44,47,52,49,55,58,57,61,63];
  const x=i=>pad+i*(W-pad-10)/(em.length-1),y=v=>H-24-(v/100)*(H-44);
  const pe=em.map((v,i)=>[x(i),y(v)]),pc=co.map((v,i)=>[x(i),y(v)]);
  const grid=[0,25,50,75,100].map(v=>`<line x1="${pad}" x2="${W-10}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" opacity=".08"/><text x="0" y="${y(v)+3}">${v?('$'+v+'M'):'0'}</text>`).join('');
  const lbl=['1 jul','4','7','10','13','16','19','22','25','28','30','31'].map((t,i)=>i%2?'':`<text x="${x(i)-10}" y="${H-4}">${i?t+' jul':t}</text>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" style="color:var(--ink)">
    <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8683f" stop-opacity=".28"/><stop offset="1" stop-color="#e8683f" stop-opacity="0"/></linearGradient></defs>
    ${grid}${lbl}
    <path d="${smooth(pe)} L${x(em.length-1)},${H-24} L${pad},${H-24} Z" fill="url(#ga)"/>
    <path d="${smooth(pe)}" fill="none" stroke="#e8683f" stroke-width="2.6" stroke-linecap="round"/>
    <path d="${smooth(pc)}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="${x(7)}" cy="${y(80)}" r="5" fill="#e8683f" stroke="#fff" stroke-width="2"/>
    <g transform="translate(${x(7)-58},${y(80)-46})"><rect width="116" height="34" rx="10" fill="rgba(255,255,255,.85)"/><text x="10" y="14" style="fill:#6f665d">22 jul · emitida</text><text x="10" y="27" style="fill:#141210;font-weight:600">$80.2M · cobrada $55M</text></g>
  </svg>`;
}
function donut(parts,center,sub){const R=58,C=2*Math.PI*R;let off=0;return `<svg width="170" height="170" viewBox="0 0 150 150">${parts.map(([p,c])=>{const l=C*p;const s=`<circle r="${R}" cx="75" cy="75" fill="none" stroke="${c}" stroke-width="18" stroke-dasharray="${Math.max(l-3,1)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 75 75)" stroke-linecap="round"/>`;off+=l;return s}).join('')}<text x="75" y="68" text-anchor="middle" font-size="9.5" style="fill:var(--mut)">${sub}</text><text x="75" y="88" text-anchor="middle" font-size="20" font-weight="700" style="fill:var(--ink)">${center}</text><text x="75" y="102" text-anchor="middle" font-size="8.5" style="fill:var(--mut)">este mes</text></svg>`}
const story=(icn,l,v,u,d,up,cmp,expl,prog,risk)=>`<div class="card kpi ${risk?'risk':''}"><div class="hd"><span class="ic">${ic(icn)}</span>${l}</div><div class="v">${v}<small>${u||''}</small></div><span class="delta ${up?'up':'dn'}">${up?'↑':'↑'} ${d}</span><span class="cmp">${cmp}</span>${prog!=null?`<div class="bar" style="margin-top:12px"><i style="width:${prog}%"></i></div>`:''}<div class="expl">${expl}</div></div>`;
const kpi=(icn,l,v,u,d,up,cmp)=>`<div class="card kpi"><div class="hd"><span class="ic">${ic(icn)}</span>${l}</div><div class="v">${v}<small>${u||''}</small></div><span class="delta ${up?'up':'dn'}">${up?'↑':'↓'} ${d}</span><span class="cmp">${cmp}</span></div>`;

/* ---------- OS ---------- */
const OS_TABS=[['resumen','Resumen'],['clientes','Clientes'],['polizas','Pólizas'],['recibos','Recibos'],['comisiones','Comisiones'],['cotizaciones','Cotizaciones']];
function stageHead(active){return '';`<div class="stage-hd"><div class="tabs-main"><a href="#/os/resumen" class="${active==='os'?'on':''}">${ic('layout-grid')} OS</a><a href="#/agentes/cobranza" class="${active==='ag'?'on':''}">${ic('sparkles')} Agentes IA <span class="n">8</span></a></div><span class="sp"></span><span style="color:var(--mut);font-size:12px">Sincronizado hace 2 min · 17 aseguradoras</span></div>`}
function osView(sec){
  let body='';
  if(sec==='resumen') body=`
    <div class="ttl"><div><h1>Tu cartera, hoy</h1><p>Lo que entra, lo que falta cobrar y lo que tus agentes ya resolvieron.</p></div><span class="sp"></span>
      <div class="seg"><button>Semana</button><button class="on">Mes</button><button>Año</button></div><a class="btn pri" href="#" ${T}>${ic('download')} Exportar</a></div>
    <div class="card brief"><span class="orb"></span><p><b>En una línea:</b> vendiste 8% más que en junio, pero solo has cobrado <b>1 de cada 3 pesos</b> emitidos. Lo urgente hoy son <b>$2.36M vencidos</b>; tus agentes ya están trabajando 59 de esos casos.</p><a class="btn sm" href="#/agentes/asistente">Preguntar ${ic('arrow-right')}</a></div>
    <div class="grid k4">
      ${story('trending-up','Vendiste','$968.4','M','8%',1,'vs junio','5,528 pólizas activas · 674 renuevan este mes',null)}
      ${story('wallet','Cobraste','$43.4','M','12%',1,'vs junio','Falta cobrar $29.1M de lo emitido',33)}
      ${story('badge-dollar-sign','Ganaste','$4.0','M','6%',1,'en comisiones','Comisión promedio 14.9% · +US$179K',null)}
      ${story('triangle-alert','En riesgo','$2.36','M','4%',0,'más que junio','360 recibos vencidos · 280 pólizas canceladas',null,1)}
    </div>
    <div class="grid row2">
      <div class="card"><div style="display:flex;align-items:flex-start"><div><h3>Prima emitida vs cobrada</h3><div class="sub">Pasa el cursor para comparar cualquier día.</div></div><span class="sp"></span><div class="legend"><span><i class="dot" style="background:#e8683f"></i>Emitida</span><span><i class="dot" style="background:var(--ink)"></i>Cobrada</span></div></div>${lineChart()}</div>
      <div class="card"><h3>Prima por aseguradora</h3><div style="display:flex;justify-content:center;margin:8px 0 2px">${donut([[.35,'#e8683f'],[.26,'var(--ink)'],[.2,'#f2b93b'],[.13,'#4a6cf7'],[.06,'#2f9e5b']],'$968M','Prima neta')}</div>
        ${[['GNP','#e8683f',35],['Qualitas','var(--ink)',26],['Chubb','#f2b93b',20],['AXA','#4a6cf7',13],['Otras (12)','#2f9e5b',6]].map(([n,c,p])=>`<div class="cat"><span><i class="dot" style="background:${c}"></i> ${n}</span><span class="tr"><i style="width:${p*2.6}%;background:${c}"></i></span><b>${p}%</b></div>`).join('')}</div>
    </div>
    <div class="grid row3">
      <div class="card"><div style="display:flex;align-items:center"><h3>Necesita tu atención</h3><span class="sp"></span><span class="pill" style="background:rgba(232,104,63,.15);color:var(--org)">5 pendientes</span></div><div class="sub" style="margin-bottom:6px">Ordenado por dinero en juego. Cada uno abre al agente responsable.</div>
        ${[['alarm-clock','rgba(217,68,58,.14)','var(--red)','360 recibos vencidos · $2.36M','El agente de cobranza ya contactó 59; 7 piden a un humano','agentes/cobranza','Revisar 7'],
           ['refresh-cw','rgba(74,108,247,.14)','var(--blu)','674 pólizas renuevan en julio','Ya hay 212 cotizaciones de renovación listas para enviar','agentes/cotizacion','Aprobar envío'],
           ['file-text','rgba(242,185,59,.18)','#b7861c','48 cotizaciones esperan respuesta','Faltan datos del cliente en 31; el agente redactó las preguntas','agentes/cotizacion','Ver preguntas'],
           ['shield-check','rgba(47,158,91,.14)','var(--grn)','3 pagos con diferencia de monto','Validador encontró pago parcial en GNP y Chubb','agentes/pagos','Validar'],
           ['key-round','rgba(20,18,16,.08)','var(--ink2)','10 accesos a portales fallando','Bloquea la conciliación de AXA, Banorte y Chubb','config','Reconectar']]
          .map(([i,bg,c,t,s,h,cta])=>`<a class="act" href="#/${h}"><span class="ai" style="background:${bg};color:${c}">${ic(i)}</span><span><b>${t}</b><span>${s}</span></span><span class="go btn sm">${cta}</span></a>`).join('')}
      </div>
      <div class="card"><div style="display:flex;align-items:center"><h3>Tus agentes hoy</h3><span class="sp"></span><a class="btn sm" href="#/agentes/cobranza">Abrir agentes ${ic('arrow-right')}</a></div><div class="sub" style="margin-bottom:6px">Trabajo hecho por la IA desde las 7:00 am.</div>
        ${AGENTS.slice(0,6).map(a=>`<a class="agentline" href="#/agentes/${a.id}"><span class="ag aic" style="padding:0"><span class="aic" style="background:${a.bg};color:${a.c};width:30px;height:30px;border-radius:10px;display:grid;place-items:center">${ic(a.i)}</span></span><span><b style="font-weight:600">${a.n}</b><br><span style="color:var(--mut);font-size:11.5px">${a.today}</span></span><span class="st"><i class="live"></i>${a.state}</span></a>`).join('')}
      </div>
    </div>`;
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
  const a=AGENTS.find(x=>x.id===id)||{id:'asistente',n:'Asistente Handle',i:'sparkles',bg:'rgba(122,92,255,.15)',c:'#6b4ff0',state:'Listo'};
  const cv=CONVOS[id]||{title:'Sin conversaciones',threads:['Nueva conversación'],body:`<div class="a-msg"><p>El agente <b>${a.n}</b> está al día. ${a.today}.</p></div>`,side:[['Estado',a.state]],pend:[]};
  return stageHead('ag')+`<div class="ag-wrap">
    <div class="card ag-list"><div class="agent-id"><span class="aic big" style="background:${a.bg};color:${a.c}">${ic(a.i)}</span><b>${a.n}</b><span><i class="live"></i> ${a.state}</span>${a.today?`<p>${a.today}</p>`:''}</div>
      <a class="btn pri sm" style="justify-content:center;margin:4px 6px 6px" href="#" ${T}>${ic('plus')} Nueva conversación</a>
      <div class="lbl" style="margin-top:6px">Conversaciones</div><div class="threads">${cv.threads.map((t,i)=>`<a class="thr ${i?'':'on'}" href="#" ${T}>${t}<small>${['Ahora','Ayer','Lun','15 jul'][i]||''}</small></a>`).join('')}</div>
    </div>
    <div class="card chat"><div class="chat-hd"><span class="aic" style="width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:${a.bg};color:${a.c}">${ic(a.i)}</span><div><b>${cv.title}</b><br><span>${a.n} · ${a.state}</span></div><span class="sp"></span><a class="btn sm" href="#" ${T}>${ic('history')} Historial</a><a class="btn sm" href="#" ${T}>${ic('plus')} Nueva</a></div>
      <div class="chat-body" id="cb">${cv.body}</div>
      <form class="composer" id="cmp"><div class="ctx"><span>${ic('at-sign')} ${a.n}</span><span>${ic('calendar')} Julio 2026</span><span>${ic('plus')} Contexto</span></div>
        <textarea placeholder="Pídele algo a ${a.n.toLowerCase()}… (@ para contexto, / para acciones)"></textarea>
        <div class="bar2"><span class="md">${ic('infinity')} Agente ${ic('chevron-down')}</span><span class="md">${ic('cpu')} handle-1 ${ic('chevron-down')}</span><span class="md">${ic('paperclip')}</span><button class="send">${ic('arrow-up')}</button></div></form>
    </div>
    <div class="side"><div class="card"><div style="display:flex;align-items:center"><h3>Cómo trabaja</h3><span class="sp"></span><span class="toggle" title="Activo"></span></div><div style="margin-top:10px">${cv.side.map(([k,v])=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('')}</div><a class="btn sm" style="margin-top:12px" href="#" ${T}>${ic('sliders-horizontal')} Ajustar en lenguaje natural</a></div>
      ${cv.pend.length?`<div class="card"><h3>Necesita tu aprobación</h3><div style="margin-top:8px">${cv.pend.map(([k,v])=>`<div class="kv"><span style="color:var(--ink)">${k}</span><b style="color:var(--org)">${v}</b></div>`).join('')}</div></div>`:''}
    </div></div>`;
}

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
  header();rail(h);
  const st=$('#stage');st.className='glass';
  st.innerHTML=p[0]==='agentes'?agView(p[1]||'cobranza'):p[0]==='config'?cfgView():osView(p[1]||'resumen');
  document.querySelectorAll('#mode a').forEach(x=>x.classList.toggle('on',(x.dataset.m==='ag')===(p[0]==='agentes')));
  st.classList.remove('enter');void st.offsetWidth;st.classList.add('enter');
  if(window.lucide)lucide.createIcons();
  const cmp=$('#cmp');if(cmp)cmp.onsubmit=e=>{e.preventDefault();const ta=cmp.querySelector('textarea');if(!ta.value.trim())return;const cb=$('#cb');cb.insertAdjacentHTML('beforeend',`<div class="u-msg">${ta.value.replace(/</g,'&lt;')}</div><div class="a-msg">${step('loader','Pensando…','')}</div>`);ta.value='';cb.scrollTop=cb.scrollHeight;lucide.createIcons();setTimeout(()=>{cb.lastElementChild.innerHTML=step('database','Consulté tus registros','0.7s','sor_policy · sor_receipt')+'<p>Listo. En la versión real aquí respondo con datos de tu cartera y, si hace falta, le paso la tarea al agente correcto.</p>';lucide.createIcons();cb.scrollTop=cb.scrollHeight},1100)};
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-th]');if(t){localStorage.setItem('tb-th',t.dataset.th);applyTheme();header();lucide.createIcons();return}
  if(e.target.closest('#caret')){$('#menu').classList.toggle('on');return}
  if(!e.target.closest('#menu'))$('#menu')?.classList.remove('on');
  const a=e.target.closest('[data-toast]');if(a){e.preventDefault();toast(a.dataset.toast)}
});
applyTheme();window.addEventListener('hashchange',render);render();

/* ---------- motion: dock magnify on rail, cursor light on cards ---------- */
document.addEventListener('mousemove',e=>{
  const r=$('#rail');if(r&&innerWidth>820){const rb=r.getBoundingClientRect();const near=e.clientX<rb.right+60;r.querySelectorAll('a').forEach(a=>{const b=a.getBoundingClientRect();const d=Math.abs(e.clientY-(b.top+b.height/2));const sc=near?Math.max(1,1.45-d/110):1;a.style.transform=`scale(${sc.toFixed(3)}) translateX(${((sc-1)*14).toFixed(1)}px)`})}
  const c=e.target.closest('.card,.lq');if(c){const b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px');c.style.setProperty('--my',(e.clientY-b.top)+'px')}
});
document.addEventListener('mouseleave',()=>{document.querySelectorAll('#rail a').forEach(a=>a.style.transform='')});
