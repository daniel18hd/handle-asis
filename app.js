// Handle · réplica as-is (front estático, datos ficticios)
const $ = s => document.querySelector(s);
const ic = (n, cls = '') => `<i data-lucide="${n}" class="${cls}"></i>`;
const LOGO = `<svg viewBox="0 0 24 24"><path d="M5 18.5 11 5.5M12.5 18.5l6-13" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" fill="none"/><circle cx="5" cy="18.5" r="2.2" fill="currentColor"/><circle cx="18.5" cy="5.5" r="2.2" fill="currentColor"/></svg>`;
const f = D.fmt;

/* ---------------- sidebar ---------------- */
const NAV = {
  agentes: [
    ['agentes/cotizacion', 'file-text', 'Agente de Cotización'],
    ['agentes/pagos', 'shield-check', 'Agente Validador de Pagos'],
    ['agentes/conciliador', 'git-compare-arrows', 'Agente Conciliador'],
    ['agentes/cobranza', 'phone', 'Agente de Cobranza'],
    ['agentes/extractor', 'file-scan', 'Extractor de Pólizas'],
    ['agentes/siniestros', 'file-heart', 'Agente de Siniestros'],
    ['agentes/kyc', 'user-check', 'Agente KYC'],
    ['agentes/feedback', 'message-circle', 'Agente de Feedback']
  ],
  servicios: [['servicios', 'layers', 'Servicios disponibles']],
  registro: [
    ['inicio', 'layout-grid', 'Inicio'],
    ['chat', 'message-square-text', 'Chatea con tus Registros'],
    ['clientes', 'users', 'Clientes'],
    ['polizas', 'scroll-text', 'Pólizas'],
    ['endosos', 'file-plus', 'Endosos'],
    ['recibos', 'receipt', 'Recibos'],
    ['comisiones', 'percent', 'Comisiones'],
    ['cotizaciones', 'clipboard-list', 'Cotizaciones'],
    ['facturas', 'file-badge', 'Facturas']
  ]
};
const SEC = {agentes: 'Agentes', servicios: 'Servicios', registro: 'Sistema de Registro'};
let open = {agentes: true, servicios: false, registro: true};

function sidebar(route) {
  const item = ([h, i, t]) => `<a class="sb-item ${route === h || route.startsWith(h + '/') ? 'on' : ''}" href="#/${h}">${ic(i)}<span>${t}</span></a>`;
  const sec = k => `<div class="sb-sec ${open[k] ? '' : 'closed'}" data-sec="${k}">${SEC[k]} ${ic('chevron-down')}</div><div class="sb-list ${open[k] ? '' : 'closed'}">${NAV[k].map(item).join('')}</div>`;
  const th = localStorage.getItem('th') || 'light';
  $('#sb').innerHTML = `
    <div class="sb-top"><a class="brand" href="#/chat">${LOGO}Handle <span class="tag">DEV</span></a><span class="sb-ic">${ic('panel-left')}</span></div>
    ${sec('agentes')}${sec('servicios')}${sec('registro')}
    <div class="sb-grow"></div>
    <div class="sb-bottom">
      <a class="sb-item" href="#/ayuda">${ic('life-buoy')}<span>Centro de Ayuda</span></a>
      <a class="sb-item" href="#/preguntas">${ic('message-circle-question')}<span>Mis Preguntas</span><span class="cnt">3</span></a>
      <a class="sb-item sb-help" href="#/ayuda">${ic('message-square-plus')}<span>Pedir Ayuda</span></a>
      <a class="sb-item ${route.startsWith('config') || route === 'seguridad' ? 'on' : ''}" href="#/config/general">${ic('settings')}<span>Configuración</span></a>
      <div class="themes">${[['light','sun'],['system','monitor'],['dark','moon']].map(([k,i]) => `<button data-th="${k}" class="${th === k ? 'on' : ''}">${ic(i)}</button>`).join('')}</div>
      <div class="user"><span class="av">DE</span><div><b>David Estrada</b><span>Handle</span></div>${ic('chevron-up')}</div>
    </div>`;
}
document.addEventListener('click', e => {
  const s = e.target.closest('[data-sec]');
  if (s) { open[s.dataset.sec] = !open[s.dataset.sec]; render(); }
  const t = e.target.closest('[data-th]');
  if (t) { localStorage.setItem('th', t.dataset.th); applyTheme(); render(); }
  const a = e.target.closest('[data-toast]');
  if (a) { e.preventDefault(); toast(a.dataset.toast); }
});
function applyTheme() {
  const t = localStorage.getItem('th') || 'light';
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}
function toast(m) { let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.textContent = m; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1800); }
const T = 'data-toast="Acción no mostrada en el demo"';

/* ---------------- helpers ---------------- */
const kpis = (arr, n) => `<div class="kpis" style="--n:${n || arr.length}">${arr.map(([l, v, s, cls]) => `<div class="kpi ${cls || ''}"><div class="lbl">${l}</div><div class="v">${v}</div>${s ? `<div class="s">${s}</div>` : ''}</div>`).join('')}</div>`;
const stat = (arr) => `<div class="statcards" style="--n:${arr.length}">${arr.map(([l, v]) => `<div class="statcard"><div class="lbl">${l}</div><div class="v">${v}</div></div>`).join('')}</div>`;
const dd = (k, v) => `<span class="dd">${k ? `<span class="k">${k}</span>` : ''}${v} ${ic('chevron-down')}</span>`;
const search = p => `<label class="search">${ic('search')}<input placeholder="${p}"></label>`;
const topb = (crumbs, btns = '') => `<div class="topbar"><div class="crumbs">${crumbs}</div>${btns}</div>`;
const crumb = (...p) => p.map((x, i) => i === p.length - 1 ? `<b>${x}</b>` : `<span>${x}</span>${ic('chevron-right')}`).join('');
const tabs = (base, list, cur, cls = '') => `<div class="tabs ${cls}">${list.map(([k, t, c, ic2]) => `<a href="#/${base}/${k}" class="${cur === k ? 'on' : ''}">${ic2 ? ic(ic2) : ''}${t}${c != null ? `<span class="cnt ${cur === k ? '' : 'g'}">${c}</span>` : ''}</a>`).join('')}</div>`;
const pager = (txt, pages = 4) => `<div class="tfoot"><span>${txt}</span><div class="pager"><span class="chev">‹</span>${Array.from({length: pages}, (_, i) => `<span class="${i ? '' : 'on'}">${i + 1}</span>`).join('')}<span class="chev">›</span></div></div>`;
function donut(parts, center, sub) {
  const R = 46, C = 2 * Math.PI * R; let off = 0;
  const segs = parts.map(([p, col]) => { const l = C * p; const s = `<circle r="${R}" cx="60" cy="60" fill="none" stroke="${col}" stroke-width="16" stroke-dasharray="${l - 1.5} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 60 60)"/>`; off += l; return s; }).join('');
  return `<div class="donut"><svg width="132" height="132" viewBox="0 0 120 120">${segs}<text x="60" y="60" text-anchor="middle" font-family="JetBrains Mono" font-size="15" font-weight="500" fill="currentColor">${center}</text><text x="60" y="76" text-anchor="middle" font-size="8.5" fill="#a1a1aa">${sub}</text></svg></div>`;
}
const page = (html) => `<div class="page">${html}</div>`;

/* ---------------- views ---------------- */
const V = {};

V.chat = (p) => {
  if (p[1] === 'resumen') return chatAnswer();
  return `<div class="chat-home"><div class="halftone"></div>
    <a class="btn sm history" href="#/chat/resumen">${ic('history')} History <span class="mono" style="color:var(--mut)">1</span></a>
    <div class="chat-center">
      <div class="logo">${LOGO.replace('<svg', '<svg width="18" height="18"')}</div>
      <h1>Pregunta a tus registros</h1>
      <p>Encuentra pólizas, clientes, recibos y más. Respuestas con tablas, gráficas y métricas al instante.</p>
      <form class="composer" onsubmit="location.hash='#/chat/resumen';return false">
        <input placeholder="Pregunta sobre tus registros..." value="">
        <div class="row"><span class="chipbtn on">${ic('search')} Consultar</span><span class="chipbtn">${ic('pencil')} Ingesta</span><span class="sp"></span><span class="chipbtn">${ic('paperclip')}</span><button class="sendb">${ic('arrow-up')}</button></div>
      </form>
      <div class="sugs">${[['bar-chart-3','Pólizas activas y prima total'],['file-text','Cotizaciones recientes'],['bar-chart-3','Primas por aseguradora'],['users','Clientes con más pólizas']].map(([i, t]) => `<a class="sug" href="#/chat/resumen">${ic(i)}${t}</a>`).join('')}</div>
    </div></div>`;
};
function chatAnswer() {
  const tr = ['Counting sor_policy','Summing sor_policy','Summing sor_receipt','Summing sor_receipt','Counting sor_policy','Found 674 · sor_policy','Calling group_by_field','Calling group_by_field','Calling group_by_field','Counting sor_receipt','Found 607 · sor_receipt','Calling group_by_field · Found 5,528','Counting sor_policy · Done','Done · sor_receipt'];
  return `<div class="chat-layout">
    <div class="convs"><a class="btn" href="#/chat" style="justify-content:flex-start">${ic('plus')} New conversation</a>${search('Search chats').replace('min-width:220px','')}
      <div class="lbl" style="margin:8px 4px 2px">Today</div><div class="conv-item on">Resumen Del Mes <span>${ic('pencil')} ${ic('trash-2')}</span></div>
      <div class="lbl" style="margin:8px 4px 2px">Older</div><div class="conv-item">Pólizas Activas y Prima Total</div></div>
    <div class="chat-body"><div class="chat-scroll">
      <div class="msg-user"><span>Hazme un resumen del mes</span></div>
      <div style="display:flex;gap:6px;align-items:center;color:var(--mut);font-size:11.5px">${LOGO.replace('<svg', '<svg width="14" height="14"')} Reading your records…</div>
      <div class="trace">${tr.map(t => `<div><span class="ok">✓</span> ${t}</div>`).join('')}</div>
      <div class="sources"><span class="lbl">Sources</span><span class="sug">${ic('scroll-text')} Pólizas</span><span class="sug">${ic('receipt')} Recibos</span></div>
      <div class="answer">
        <h3>📊 Resumen del mes — Julio 2026</h3>
        <p>Aquí tienes un panorama general de tu cartera al día de hoy (<b>7 de julio 2026</b>):</p>
        <h3>Pólizas</h3><ul><li>Tu cartera total tiene <b>12,502 pólizas</b>, de las cuales <b>5,528 están activas</b>.</li><li><b>674 pólizas vencen este mes</b> (julio 2026), lo que representa una oportunidad importante de renovación.</li><li>Hay <b>6,608 pólizas en estatus pendiente</b> y <b>280 canceladas</b>.</li></ul>
        <h3>Cobranza</h3><ul><li><b>607 recibos vencen en julio 2026</b>, representando el flujo de cobranza del mes.</li><li>A nivel global, tienes <b>4,285 recibos pendientes</b> por un total de <b>$29,083,278.83 MXN</b>.</li><li>Hay <b>360 recibos vencidos (overdue)</b> que suman <b>$2,363,052.91 MXN</b> — estos requieren atención inmediata.</li><li>Se han cobrado <b>3,831 recibos</b> por un total de <b>$43,420,005.81 MXN</b> en el histórico.</li></ul>
        <h3>⚠️ Puntos de atención</h3><ol><li><b>Renovaciones</b>: Con <b>674 pólizas</b> que vencen este mes, es clave priorizar el contacto con esos clientes.</li><li><b>Cartera vencida</b>: Los <b>$2.36M en recibos vencidos</b> deben gestionarse para evitar cancelaciones.</li><li><b>Pendientes de cobro</b>: Casi <b>$29.1M</b> en recibos pendientes — revisa los que están próximos a vencer.</li></ol>
        <div class="kpis boxed" style="--n:4;margin-top:16px">${[['Pólizas activas','5,528'],['Vencen en julio','674'],['Recibos del mes','607'],['Cartera vencida','$2.36M']].map(([l, v]) => `<div class="kpi"><div class="lbl">${l}</div><div class="v sm">${v}</div></div>`).join('')}</div>
        <div class="grid g2"><div class="card"><h3>Pólizas por estatus</h3>${donut([[.53,'#3b82f6'],[.44,'#bef264'],[.02,'#6366f1']], '53%', 'Pendiente')}<div class="legend"><div><span class="dot" style="background:#3b82f6"></span>Pendiente<span class="n">53%</span></div><div><span class="dot" style="background:#bef264"></span>Activa<span class="n">44%</span></div><div><span class="dot" style="background:#6366f1"></span>Cancelada<span class="n">2%</span></div></div></div>
        <div class="card"><h3>Recibos por estatus (monto en MXN)</h3>${[['Pagado',43.4],['Pendiente',29.1],['Vencido',2.36],['Cancelado',8.1]].map(([t, v]) => `<div class="hbar"><span class="t">${t}</span><span class="tr"><i style="width:${v / 43.4 * 100}%"></i></span><span class="n">$${v}M</span></div>`).join('')}</div></div>
      </div></div>
      <div class="chat-input"><div class="composer"><input placeholder="Pregunta sobre tus registros..."><div class="row"><span class="chipbtn on">${ic('search')} Consultar</span><span class="chipbtn">${ic('pencil')} Ingesta</span><span class="sp"></span><button class="sendb">${ic('arrow-up')}</button></div></div></div>
    </div></div>`;
}

V.inicio = () => page(`
  <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px"><div><h1>Hola, David</h1><div class="mono" style="color:var(--mut);font-size:11px">7 de julio de 2026</div></div><span class="sp"></span>${dd('', 'Todas las aseguradoras')}${dd('', 'Mes de estado de cuenta')}${dd('Periodo', ic('calendar') + ' Cualquier fecha')}<a class="btn sm" href="#/agentes/cobranza/docs">API Docs</a></div>
  <div class="banner"><span class="dot" style="background:var(--red)"></span>360 recibos vencidos · $2.4M + US$119 por cobrar<span class="x"><a href="#/recibos">Revisar →</a>${ic('x')}</span></div>
  <div class="alert-red"><div class="hd"><span class="ic">!</span><div><b>Credenciales que requieren atención</b><small>10 credenciales de portal están fallando al iniciar sesión</small></div></div>
    ${D.cred.map(([a, b]) => `<div class="row"><b>${a}</b><span style="color:var(--mut)">${b}</span><span class="b red">Falló la autenticación</span><span class="ag">COBRANZA</span></div>`).join('')}</div>
  <div class="grid" style="grid-template-columns:1.6fr 1fr 1fr;margin-bottom:6px">
    <div class="hero-dark"><div class="lbl" style="color:#a1a1aa">Prima neta · en el periodo</div><a class="meth" href="#" ${T}>Metodología</a><div class="v">$968.4M</div><div class="s">+ US$6,203 USD</div></div>
    <div class="card"><div class="lbl">Comisión · en el periodo</div><div style="font:500 22px var(--mono);margin-top:10px">$4M</div><div class="mono" style="font-size:10.5px;color:var(--mut)">+ US$179,248 USD</div></div>
    <div class="card"><div class="lbl">Cobranza</div><div style="font:500 22px var(--mono);margin-top:10px">33%</div><div class="prog"><i style="width:33%"></i></div><div class="mono" style="font-size:10.5px;color:var(--mut);margin-top:6px">3,831 de 11,498 recibos pagados</div></div>
  </div>
  <div class="mono" style="font-size:11px;color:var(--mut);margin:8px 0 14px">12,502 pólizas · 5,528 activas (44%) · 6,608 pendientes · 9 vencen en 30 días</div>
  <div class="grid g3" style="margin-bottom:12px">
    <div class="card"><h3>Estado de Pólizas ${ic('download')}</h3>${donut([[.45,'#a3e635'],[.023,'#dc2626'],[.527,'#d4d4d8']], '45%', 'Activa')}<div class="legend"><div><span class="dot" style="background:#a3e635"></span>Activa<span class="n">5,528 · 45%</span></div><div><span class="dot" style="background:#dc2626"></span>Cancelada<span class="n">280 · 2.3%</span></div><div><span class="dot" style="background:#d4d4d8"></span>Pendiente<span class="n">6,608 · 53%</span></div></div></div>
    <div class="card"><h3>Recibos por Estado ${ic('download')}</h3>${[['Pendiente',4285,'#d4d4d8'],['Pagado',3831,'var(--ink)'],['Cancelada',3012,'#e4e4e7'],['Vencido',360,'#dc2626']].map(([t, v, c]) => `<div class="hbar"><span class="t">${t}</span><span class="tr"><i style="width:${v / 4285 * 100}%;background:${c}"></i></span><span class="n">${v.toLocaleString()}</span></div>`).join('')}</div>
    <div class="card"><h3>Prima neta por aseguradora ${ic('download')}</h3>${donut([[.98,'#3f3f46'],[.015,'#a3e635'],[.005,'#d4d4d8']], '98%', 'Sancor')}<div class="legend"><div><span class="dot" style="background:#3f3f46"></span>Sancor<span class="n">98%</span></div><div><span class="dot" style="background:#a3e635"></span>Qualitas<span class="n">1.3%</span></div><div><span class="dot" style="background:#d4d4d8"></span>Otras (9)<span class="n">0.7%</span></div></div></div>
  </div>
  <div class="grid" style="grid-template-columns:1.7fr 1fr;margin-bottom:12px">
    <div class="card" style="padding:0"><h3 style="padding:14px 16px 0"><span><span class="dot" style="background:var(--red)"></span> Recibos Vencidos</span><a class="mono" style="font-size:10px;color:var(--mut)" href="#/recibos">VER</a></h3><table><thead><tr><th>Vence</th><th>Cliente</th><th>Póliza</th><th class="r">Monto</th></tr></thead><tbody>${D.pendTabla.slice(0, 7).map(x => `<tr><td class="m">${x.v}</td><td><span class="blur">${x.cli}</span></td><td class="m">${x.pol}</td><td class="r m">${x.m}</td></tr>`).join('')}</tbody></table></div>
    <div class="card"><h3>Actividad</h3>${['50 pólizas actualizadas','12 recibos conciliados','3 cotizaciones enviadas','8 pagos confirmados'].map((t, i) => `<div style="padding:8px 0;border-top:1px solid var(--line);font-size:12px"><span class="dot" style="background:var(--mut2)"></span> ${t}<div class="mono" style="font-size:10px;color:var(--mut);margin-left:12px">portal-sync · hace ${i * 2 + 1} min</div></div>`).join('')}</div>
  </div>
  <div class="card" style="padding:0;margin-bottom:20px"><h3 style="padding:14px 16px 0">Ranking de aseguradoras</h3><table><thead><tr><th>Aseguradora</th><th>Participación</th><th class="r">Pólizas</th><th class="r">Prima neta ▾</th></tr></thead><tbody>${[['Sancor',5570,947449067],['Qualitas',1336,12994675],['GNP',121,2652828],['Zurich',844,2272324],['Chubb',2271,1259101],['AXA',109,853712]].map(([a, p, m]) => `<tr><td><b>${a}</b></td><td><div class="tr" style="height:6px;background:var(--bg3);border-radius:4px;width:220px;overflow:hidden"><i style="display:block;height:100%;background:var(--ink);width:${Math.max(2, m / 947449067 * 100)}%"></i></div></td><td class="r m">${p.toLocaleString()}</td><td class="r m">$${m.toLocaleString()}</td></tr>`).join('')}</tbody></table></div>
  <div class="bar-dock"><form class="dark-bar" onsubmit="location.hash='#/chat/resumen';return false"><input placeholder="Pregúntale lo que sea a tus registros..."><button>${ic('arrow-right')}</button></form><small>Las respuestas salen directo de tus pólizas, recibos y comisiones.</small></div>`);

V.clientes = () => page(`<h1>Clientes</h1><div style="height:10px"></div>
  ${stat([['Clientes','6056'],['Pólizas activas','2241'],['Valor de cartera','$16,179,876.40'],['Recibos vencidos','360']])}
  <div class="toolbar">${search('Buscar cliente, RFC, email...')}</div>
  <div class="tbl-wrap"><table><thead><tr><th>Cliente ▴</th><th>Tipo</th><th>RFC</th><th>Email</th><th>Teléfono</th><th class="r">Pólizas</th></tr></thead><tbody>
  ${D.clientes.slice(0, 14).map(c => `<tr><td style="display:flex;align-items:center"><span class="ini">${c.n.split(' ').map(x => x[0]).slice(0, 2).join('')}</span><span>${c.n}</span></td><td style="color:var(--mut)">${c.tipo}</td><td class="m">${c.rfc}</td><td style="color:var(--mut)">—</td><td style="color:var(--mut)">—</td><td class="r m">${c.pol}</td></tr>`).join('')}
  </tbody></table>${pager('6056 registros', 5)}</div>`);

const recTable = (title, k, cols, rows, extraStats) => page(`<h1>${title}</h1><div style="height:10px"></div>${extraStats}
  <div class="toolbar">${search('Buscar...')}${k.map(x => dd(x, 'Todos')).join('')}${dd('Vence', ic('calendar') + ' Cualquier fecha')}<span class="sp"></span><span class="ico-btn">${ic('list-filter')}</span><span class="ico-btn">${ic('download')}</span><span class="ico-btn">${ic('columns-3')}</span><a class="btn pri sm" href="#" ${T}>${ic('plus')} Nueva ${title.replace(/s$/, '').replace('Póliza', 'Póliza')}</a></div>
  <div class="toolbar" style="margin-top:-4px">${dd('Agrupar', 'Sin agrupar')}</div>
  <div class="tbl-wrap"><table><thead><tr>${cols.map(c => `<th class="${c[1] || ''}">${c[0]}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>${pager('Mostrando 1–50', 5)}</div>`);

V.polizas = () => recTable('Pólizas', ['Aseguradora', 'Tipo', 'Estado'], [['No. póliza'], ['Cliente'], ['Aseguradora'], ['Tipo'], ['Estado'], ['Prima', 'r'], ['Vence']],
  D.polizas.slice(0, 14).map(x => `<tr><td class="m">${x.no}</td><td>${x.cli}</td><td>${x.ins}</td><td style="color:var(--mut)">${x.tipo}</td><td><span class="b ${x.est === 'Activa' ? 'lime' : x.est === 'Cancelada' ? 'red' : 'gray'} soft">${x.est}</span></td><td class="r m">$${f(x.prima)}</td><td class="m" style="color:var(--mut)">${x.vence}</td></tr>`).join(''),
  stat([['Pólizas', '12502'], ['Activas', '5528'], ['Prima activa', '$17,029,291.47']]));

V.comisiones = () => recTable('Comisiones', ['Aseguradora', 'Clave de agente'], [['No. póliza'], ['No. recibo'], ['Aseguradora'], ['Clave de agente'], ['Tasa %', 'r'], ['Monto', 'r'], ['IVA', 'r'], ['Fecha']],
  D.comisiones.slice(0, 14).map(x => `<tr><td class="m">${x.pol}</td><td class="m" style="color:var(--mut)">${x.rec}</td><td>${x.ins}</td><td class="m">${x.ag}</td><td class="r m">${x.tasa ? x.tasa.toFixed(2) + '%' : '—'}</td><td class="r m">${x.usd ? f(x.monto) + ' USD' : '$' + f(x.monto)}</td><td class="r m">$${f(x.iva)}</td><td class="m" style="color:var(--mut)">${x.fecha}</td></tr>`).join(''),
  stat([['Comisiones', '4703'], ['Comisión total', '$4,194,372.17']])).replace('Nueva Comisione', 'Nueva Comisión');

const simple = (t, s) => page(`<h1>${t}</h1><p class="sub">${s}</p><div class="ph">Pantalla no mostrada en el demo de 8:22 — se deja como placeholder del as-is.</div>`);
V.endosos = () => simple('Endosos', 'Sistema de registro');
V.recibos = () => simple('Recibos', 'Sistema de registro');
V.cotizaciones = () => simple('Cotizaciones', 'Sistema de registro');
V.facturas = () => simple('Facturas', 'Sistema de registro');
V.servicios = () => simple('Servicios', 'Sección colapsada en el demo');
V.ayuda = () => simple('Centro de Ayuda', 'No mostrado en el demo');
V.preguntas = () => simple('Mis Preguntas', 'No mostrado en el demo');

/* ---- Agentes ---- */
V.agentes = (p) => (A[p[1]] || A.ph)(p);
const A = {};
A.ph = (p) => topb(crumb('Agentes', NAV.agentes.find(x => x[0] === 'agentes/' + p[1])?.[2] || 'Agente')) + simple(NAV.agentes.find(x => x[0] === 'agentes/' + p[1])?.[2] || 'Agente', 'Agente listado en el menú, sin pantalla en el demo');

A.cotizacion = (p) => {
  if (p[2] === 'rafael') return cotDetail(p[3] || 'contactos');
  return topb('', `<a class="btn" href="#" ${T}>Configuración</a><a class="btn pri" href="#" ${T}>+ Nueva Solicitud</a>`) + page(`<h1>Agente de Cotización</h1><div style="height:6px"></div>
    ${tabs('agentes/cotizacion', [['', 'Solicitudes'], ['bitacora', 'Bitácora'], ['desempeno', 'Desempeño']], '')}
    ${kpis([['Activas', '134'], ['Requieren tu atención', '48', '', 'hl'], ['Solicitudes', '195'], ['Cotizaciones', '120']])}
    <div class="toolbar">${search('Buscar...')}${dd('', 'Todos los Estados')}${dd('', 'Todos los Ramos')}${dd('', 'Todos los Ejecutivos')}<span class="sp"></span>${dd('Fecha', 'Cualquier fecha')}</div>
    <div class="mono" style="font-size:10.5px;color:var(--mut);margin:0 0 8px">Mostrando 195 de 195</div>
    <div class="tbl-wrap"><table><thead><tr><th>Solicitud</th><th>Estado</th><th>Cotizaciones</th><th>Ramo</th><th>Inicio</th><th>Ejecutivo</th></tr></thead><tbody>
    ${D.cotizaciones.map(c => `<tr style="cursor:pointer" onclick="location.hash='#/agentes/cotizacion/rafael'"><td><b>${c.n}</b><span class="s2">${c.id}</span></td><td><span class="b ${c.est === 'INICIADO' ? 'blue' : c.est === 'COTIZADO' ? 'grn' : c.est.startsWith('REQ') ? 'red' : 'gray'}">${c.est}</span></td><td class="m">${c.c}</td><td><span class="mono" style="font-size:10px;color:var(--mut)">${c.ramo}</span></td><td style="color:var(--mut)">${c.ini}</td><td>${c.ej}</td></tr>`).join('')}
    </tbody></table></div>`);
};
function cotDetail(tab) {
  const t = tabs('agentes/cotizacion/rafael', [['contactos', 'Contactos'], ['cotizaciones', 'Cotizaciones'], ['validacion', 'Validación'], ['agente', 'Agente']], tab, 'mono');
  let body = '';
  if (tab === 'contactos') body = `<div class="toolbar">${dd('', 'Tabla')}<span class="sp"></span><a class="btn sm" href="#" ${T}>${ic('copy')} Copiar</a><a class="btn sm" href="#" ${T}>${ic('download')} Excel</a></div>
    <div class="tbl-wrap"><table><thead><tr><th>Aseguradora</th><th>Paquete</th><th>Folio</th><th>Estado</th><th>Próx. seguimiento</th><th># Seg</th><th>Preguntas</th><th>Últ. actividad</th></tr></thead><tbody>${D.cotAseg.map(a => `<tr><td><b>${a.a}</b></td><td class="m">${a.p}</td><td class="m">${a.f}</td><td><span class="b ${a.e === 'COTIZADO' ? 'grn' : 'redt'}" style="background:none;border:0">${a.e}</span></td><td>—</td><td class="m">0</td><td class="m">${a.q || '—'}</td><td style="color:var(--mut)">5 days ago</td></tr>`).join('')}</tbody></table></div>`;
  if (tab === 'cotizaciones') body = `<div class="toolbar"><span class="seg"><button class="on">Tabla</button><button>Configuración</button></span><span style="color:var(--mut)">Plantilla:</span>${dd('', 'Autos')}<span class="seg"><button class="on">Compacto</button><button>Detallado</button></span></div>
    <div class="toolbar"><a class="btn sm" href="#" ${T}>Exportar CSV</a><a class="btn sm" href="#" ${T}>Exportar Excel</a><a class="btn pri sm" href="#" ${T}>Exportar PDF</a><a class="btn pri sm" href="#" ${T}>Generar Propuesta</a></div>
    <div class="tbl-wrap cmp"><table><thead><tr><th>Cobertura</th><th>Mapfre — Premium <span class="best">MEJOR PRECIO</span></th></tr></thead><tbody>${[['Prima Neta', '<b class="green">$32,076.39</b>'], ['Prima Total', '$38,125.01'], ['Deducible', 'Daños Materiales: 5% | Robo Total: 10% | Robo Parcial: 10%'], ['Límite de Cobertura', 'Valor Comercial'], ['Condiciones', 'PREMIUM'], ['Daños Materiales', 'VALOR COMERCIAL — Ded. 5%'], ['Robo Total', 'VALOR COMERCIAL — Ded. 10%'], ['Robo Parcial', '$10,000 — Ded. 10%'], ['Rotura de Cristales', 'No Amparada'], ['RC Bienes', '$1,500,000'], ['RC Personas', '$3,000,000'], ['Gastos Médicos Ocupantes', '$200,000']].map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div>`;
  if (tab === 'validacion') body = `<div class="ph">Tab visible en el demo, contenido no mostrado.</div>`;
  if (tab === 'agente') body = `<div class="steps">${['Get Insurance Lines', 'Crear solicitud <span style="color:var(--mut2)">(Rafael Álvarez, Autos)</span>', 'Get Insurer Options'].map(s => `<div>${ic('circle-check')}${s}</div>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;max-width:560px;margin:14px 0 6px"><span class="mono" style="font-size:10px;color:var(--blu)">AGENTE IA · TO ⓘ</span><span class="mono" style="font-size:10px;color:var(--mut)">Tue, 5:00 pm</span></div>
    <div class="mail"><div>Subject: <b>Submission - Autos - Rafael Álvarez</b></div><div class="meta">From: cotizador@handle.example<br>To: ejecutivo@broker.example</div>
    <p>Good afternoon, Carlos,</p><p>I've received and registered the auto insurance quote request for Rafael Álvarez. Here's a summary of the details on file:</p><p><b>Vehicle:</b></p><ul><li>Make / Model: Volkswagen Jetta</li><li>Year: 2022</li><li>Trim: Trendline L4 1.4 T Standard</li><li>Use: Personal</li></ul><p><b>Driver:</b></p><ul><li>Age: 34 · CP 03100</li></ul></div>
    <div class="composer" style="max-width:560px;margin-top:14px"><input placeholder="Escribe al agente..."><div class="row"><span class="sp"></span><span class="chipbtn">${ic('paperclip')}</span><button class="sendb">${ic('arrow-up')}</button></div></div>`;
  return topb(crumb('Agente de Cotización', 'Rafael Álvarez')) + `<div class="page"><div style="display:flex;align-items:flex-start"><div><h1>Rafael Álvarez</h1><div class="mono" style="font-size:10.5px;color:var(--mut)">0332_2730 · AUTOS · 6 days ago</div></div><span class="sp"></span><a class="btn pri" href="#" ${T}>Marcar Completado</a><span class="ico-btn" style="margin-left:6px">${ic('ellipsis')}</span></div>${t}
    <div class="detail"><div>${body}</div><div class="side">
      <div class="card"><h4>Estado</h4><div class="prog"><i style="width:50%;background:var(--ink)"></i></div><small>50% completado</small><div style="color:var(--red);font-size:11.5px;margin-top:8px">Requiere atención</div><small>Detalle: 3 aseguradoras con preguntas</small></div>
      <div class="card"><h4>Persona</h4><div style="display:flex;gap:8px;align-items:center"><span class="ini">RA</span><div><b style="font-size:12px">Rafael Álvarez</b><br><small>Autos · CDMX</small></div></div></div>
      <div class="card"><h4>Seguimiento</h4><small>Sin seguimiento programado</small></div>
      <div class="card"><h4>Archivos</h4>${['Ana Seguros · Económico', 'Mapfre', 'Banorte'].map(x => `<div style="margin-bottom:8px"><span class="lbl">${x}</span><div style="font-size:11.5px;margin-top:3px"><span class="tag">PDF</span> Cotizacion_${x.split(' ')[0]}.pdf</div></div>`).join('')}</div>
      <div class="card"><h4 style="display:flex;justify-content:space-between">Actividad <span class="mono" style="color:var(--mut)">21</span></h4><small>Mapfre cotizó · hace 5d</small></div>
    </div></div></div>`;
}

A.pagos = (p) => {
  if (p[2] === 'config') return pagosConfig(p[3] || 'credenciales', p[4] || '0');
  const tab = p[2] || 'pendientes', sub = p[3] || (tab === 'pagados' ? 'resumen' : 'cobranza');
  const base = 'agentes/pagos';
  let body = '';
  if (tab === 'pendientes') {
    const s = `<div class="toolbar"><span class="seg">${['cobranza', 'calendario', 'tabla'].map(k => `<a href="#/${base}/pendientes/${k}" class="${sub === k ? 'on' : ''}">${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</span><span class="sp"></span>${search('Buscar póliza o cliente...').replace('min-width:220px', '')}<span class="ico-btn">${ic('list-filter')}</span></div>`;
    if (sub === 'cobranza') body = s + `<div class="buckets"><div class="bucket on"><div class="lbl">Esta semana</div><div class="amt">$753,142.44<small>MXN</small></div><div class="amt">436.46<small>UDI</small></div><div class="s">93 pagos · 89 clientes</div></div>
      <div class="bucket"><div class="lbl">Próximos</div><div class="amt">$3,079,067.30<small>MXN</small></div><div class="amt">9,559.64<small>UDI</small></div><div class="amt">$5,614.45<small>USD</small></div><div class="s">383 pagos · 356 clientes</div></div>
      <div class="bucket"><div class="lbl">Vencidos</div><div class="amt">$16,399,806.13<small>MXN</small></div><div class="amt">$66,910.87<small>USD</small></div><div class="s">1715 pagos · 1201 clientes</div></div></div>
      <div class="tbl-wrap"><table><thead><tr><th style="width:30px"></th><th>Cliente</th><th>Aseguradora</th><th class="r">Monto</th><th>Días</th></tr></thead><tbody>${D.pend.map(x => `<tr><td class="chev">›</td><td><b>${x.cli}</b> <span class="tag">${x.n}</span></td><td class="m">${x.ins}</td><td class="r m">$${f(x.m)} MXN</td><td><span class="hoy">Hoy</span></td></tr>`).join('')}</tbody></table>${pager('Mostrando 1-10 de 89 resultados')}</div>`;
    if (sub === 'calendario') body = s + `<div class="card"><div class="loading">${LOGO.replace('<svg', '<svg width="26" height="26"')}<span>Cargando calendario...</span><small style="color:var(--mut2)">(En el demo esta vista nunca termina de cargar)</small></div></div>`;
    if (sub === 'tabla') body = s + `<div class="tbl-wrap"><table><thead><tr><th>Cliente</th><th>Aseguradora</th><th>Póliza</th><th>Endoso</th><th>Serie</th><th>Recibo</th><th class="r">Monto</th><th>Vencimiento</th><th>Estado</th></tr></thead><tbody>${D.pendTabla.map(x => `<tr><td><b>${x.cli}</b></td><td>${x.ins}</td><td class="m">${x.pol}</td><td class="m">${x.end}</td><td class="m">${x.serie}</td><td class="m">${x.rec}</td><td class="r m">${x.m}</td><td class="m" style="color:var(--mut)">${x.v}</td><td><span class="dot" style="background:var(--red)"></span></td></tr>`).join('')}</tbody></table></div>`;
  } else if (tab === 'pagados') {
    body = `<div class="toolbar"><span class="seg">${['resumen', 'tabla'].map(k => `<a href="#/${base}/pagados/${k}" class="${sub === k ? 'on' : ''}">${k[0].toUpperCase() + k.slice(1)}</a>`).join('')}</span><span class="sp"></span>${search('Buscar...')}</div>
      <div class="buckets" style="grid-template-columns:2fr 1fr"><div class="bucket on"><div class="lbl">Este mes</div><div class="amt">$0.00<small>MXN</small></div><div class="s">0 pagos</div></div><div class="bucket"><div class="lbl">Anteriores</div><div class="amt">$0.00<small>MXN</small></div><div class="s">0 pagos</div></div></div>`;
  } else body = `<div class="ph">Tab "${tab}" visible en el demo, contenido no mostrado.</div>`;
  return topb('', `<a class="btn" href="#/${base}/config">${ic('settings')} Configuración</a><a class="btn" href="#" ${T}>${ic('history')} Actividad</a><a class="btn pri" href="#" ${T}>${ic('refresh-cw')} Ejecutar Validación</a>`) + page(`<h1>Agente Validador de Pagos</h1><div style="height:10px"></div>
    ${kpis([['Recibos monitoreados', '3321'], ['Pagos confirmados hoy', '39'], ['Recibos pendientes', '1600'], ['Recibos vencidos', '1707']])}
    ${tabs(base, [['pendientes', 'Pendientes', null, 'clock'], ['pagados', 'Pagados', null, 'circle-check'], ['cancelados', 'Cancelados', null, 'ban'], ['renovaciones', 'Renovaciones', null, 'refresh-cw']], tab)}${body}`);
};
function pagosConfig(tab, sel) {
  const pv = D.provs[+sel] || D.provs[0];
  const body = tab === 'credenciales' ? `<div class="set-wrap" style="grid-template-columns:200px 1fr"><div class="prov"><div class="lbl" style="padding:10px 12px;display:flex;justify-content:space-between">Proveedores <span>31</span></div>${D.provs.map(([n, c], i) => `<a href="#/agentes/pagos/config/credenciales/${i}" class="${+sel === i ? 'on' : ''}"><b><span class="dot" style="background:${c ? 'var(--grn)' : 'var(--org)'}"></span>${n}</b><small>${c} credencial${c === 1 ? '' : 'es'}</small></a>`).join('')}</div>
    <div class="set-body"><div style="display:flex;gap:10px;align-items:center;margin-bottom:14px">${ic('globe')}<div><b style="font-size:14px">${pv[0]}</b><div class="lbl">Portal de aseguradora</div></div></div>
    <div class="card" style="margin-bottom:12px;padding:10px 14px"><div class="lbl">Credenciales</div><div style="margin:4px 0 10px">${pv[1]} (${pv[1]} activas)</div><div class="lbl">Slug del proveedor</div><div class="mono">${pv[0].split(' ')[0].toLowerCase()}</div></div>
    <div class="lbl" style="margin-bottom:6px">Credenciales</div><div class="tbl-wrap"><table><thead><tr><th>Etiqueta</th><th>Estado</th><th>Último uso</th><th>Creada</th></tr></thead><tbody>${Array.from({length: pv[1] || 1}, (_, i) => `<tr><td><span class="dot" style="background:var(--grn)"></span> ${pv[0]} - ${45850 + i * 311}</td><td><span class="b grn">Activa</span></td><td class="m">${28 - i}-05-2026 08:0${i}</td><td class="m">22-05-2026 06:03</td></tr>`).join('')}</tbody></table></div></div></div>`
    : `<div class="ph">Tab "${tab}" visible en el demo, contenido no mostrado.</div>`;
  return topb(crumb('Agente Validador de Pagos', 'Configuración')) + page(tabs('agentes/pagos/config', [['credenciales', 'Credenciales'], ['general', 'General'], ['programacion', 'Programación'], ['notificaciones', 'Notificaciones']], tab, 'mono') + body);
}

A.conciliador = () => topb('', `<a class="btn" href="#" ${T}>${ic('settings')} Configuración</a><a class="btn" href="#" ${T}>${ic('database')} Fuentes</a><a class="btn pri" href="#" ${T}>${ic('play')} Ejecutar Conciliación</a>`) + page(`<h1>Agente Conciliador</h1><p class="sub">Concilia información de pólizas entre portales y la base de datos interna</p>
  ${kpis([['Registros procesados', '0'], ['Coincidencia exacta', '0.00%'], ['Credenciales activas', '31<span class="of">/31</span>'], ['Última ejecución', '21 may']])}
  <div class="kpis" style="--n:4">${[['Base de datos', '<span class="dot" style="background:var(--blu)"></span> Conectada'], ['Credenciales', '<span class="dot" style="background:var(--blu)"></span> 21/21 activas'], ['Última ejecución', 'Marzo 2026 · Comisiones'], ['Tasa de coincidencia exacta', '0.00%']].map(([l, v]) => `<div class="kpi"><div class="lbl">${l}</div><div style="margin-top:8px;font-size:12.5px">${v}</div></div>`).join('')}</div>
  <div class="kpis" style="--n:2">${[['Prima neta', '$28,045,344'], ['Comisión', '$1,819,845']].map(([l, v]) => `<div class="kpi"><div class="lbl" style="color:var(--ink)">${l}</div><div style="display:flex;gap:24px;margin-top:8px">${[['Aseguradora', v, ''], ['Base de datos', '---', ''], ['Diferencia', v, 'color:var(--org)']].map(([a, b, st]) => `<div><div class="lbl" style="font-size:8.5px">${a}</div><div class="mono" style="font-size:12px;${st}">${b}</div></div>`).join('')}</div></div>`).join('')}</div>
  <div class="kpis" style="--n:4">${[['Coincidencia exacta', '0', '0.00%', 'var(--blu)'], ['Coincidencia parcial', '0', '0.00%', 'var(--org)'], ['Falta en base de datos', '14983', '100.00%', 'var(--red)'], ['Falta en aseguradora', '0', '0.00%', 'var(--ink)']].map(([l, v, pc, c]) => `<div class="kpi"><div class="lbl"><span class="dot" style="background:${c}"></span> ${l}</div><div class="v sm">${v} <span class="mono" style="font-size:10px;color:var(--mut)">${pc}</span></div><div class="prog"><i style="width:${parseFloat(pc)}%;background:${c}"></i></div>${v !== '0' ? '<div class="mono" style="font-size:9.5px;color:var(--mut);margin-top:6px">VER DETALLES ›</div>' : ''}</div>`).join('')}</div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin:18px 0 8px"><h2>Ejecuciones Recientes</h2><span class="lbl">Ver todas</span></div>
  <div class="tbl-wrap"><table><thead><tr><th>Periodo</th><th>Estado</th><th>Tareas</th><th>Duración</th><th>Fecha</th></tr></thead><tbody>${[['Marzo 2026 · Comisiones', 'Completado', '2/2', '8m 37s', '2026-05-21'], ['Marzo 2026 · Comisiones', 'Completado', '2/2', '12m 24s', '2026-05-21'], ['Marzo 2026 · Comisiones', 'Completado', '1/1', '2m 06s', '2026-05-21'], ['Marzo 2026 · Comisiones', 'Completado', '2/2', '19m 04s', '2026-05-21'], ['Abril 2026 · Comisiones', 'Fallido', '0/1', '1m 04s', '2026-04-23']].map(([a, b, c, d, e]) => `<tr><td>${a}</td><td><span class="dot" style="background:${b === 'Fallido' ? 'var(--red)' : 'var(--blu)'}"></span> ${b}</td><td class="m">${c}</td><td class="m">${d}</td><td class="m" style="color:var(--mut)">${e}</td></tr>`).join('')}</tbody></table></div>`);

A.cobranza = (p) => {
  if (p[2] === 'docs') return cobDocs();
  if (p[2] === 'config') return cobConfig(p[3] || 'general', p[4] || 'estrategia');
  const tab = p[2] || 'activos';
  return topb('', `<a class="btn" href="#" ${T}>Ver ejecuciones</a><a class="btn" href="#/agentes/cobranza/docs">API docs</a><a class="btn" href="#/agentes/cobranza/config">Configuración</a><a class="btn pri" href="#" ${T}>Ejecutar ahora</a>`) + page(`<h1>Agente de Cobranza</h1><div style="height:10px"></div>
    ${kpis([['Activos', '59', '$293,214.02'], ['Hoy', '0'], ['Promesas', '0', '$0.00'], ['Escalados', '7'], ['Pagados', '12', '$22,510.00']])}
    ${tabs('agentes/cobranza', [['activos', 'Activos', 59], ['sin-contacto', 'Sin datos de contacto', 1200], ['excluidas', 'Excluidas por reglas', 37]], tab)}
    <div class="toolbar">${search('Buscar...')}${dd('', 'Todos los estatus')}${dd('', 'Todas las aseguradoras')}</div>
    ${tab === 'activos' ? `<div class="tbl-wrap"><table><thead><tr><th>Póliza</th><th>Estatus</th><th class="r">Monto</th><th>Intentos</th><th>Vencimiento</th></tr></thead><tbody>${D.cobranza.map(x => `<tr><td><b>${x.cli}</b><span class="s2">${x.ins} · ${x.pol} · ${x.rec}</span></td><td><span class="b redt" style="padding:0"><span class="dot" style="background:var(--red)"></span> ${x.est}</span></td><td class="r m">$${f(x.m)}</td><td>${x.int}<span class="s2">${x.ult}</span></td><td style="color:var(--mut)">${x.prox}</td></tr>`).join('')}</tbody></table></div>` : `<div class="tbl-wrap"><table><thead><tr><th>Póliza</th><th>Estatus</th><th>Monto</th><th>Intentos</th><th>Vencimiento</th></tr></thead><tbody><tr><td colspan="5" style="text-align:center;color:var(--mut)">—</td></tr></tbody></table><div class="tfoot">0 de 0 mostrados</div></div>`}`);
};
function cobConfig(tab, sec) {
  const menu = [['estrategia', 'sparkles', 'Estrategia'], ['filtros', 'users', 'Filtros'], ['horario', 'clock', 'Horario'], ['informacion', 'info', 'Información'], ['notificaciones', 'bell', 'Notificaciones'], ['pruebas', 'flask-conical', 'Pruebas'], ['demo', 'database', 'Demo']];
  let body;
  if (tab === 'canales') {
    const ch = sec === 'estrategia' ? 'telefono' : sec;
    body = `<div class="set-wrap"><div class="set-nav"><div class="lbl" style="padding:4px 8px 8px">Canales habilitados</div>${[['telefono', 'phone', 'Teléfono', 'Activo'], ['email', 'mail', 'Email', 'Inactivo'], ['whatsapp', 'message-circle', 'WhatsApp', 'Inactivo']].map(([k, i, t, s]) => `<a href="#/agentes/cobranza/config/canales/${k}" class="${ch === k ? 'on' : ''}"><span class="dot" style="background:${s === 'Activo' ? 'var(--grn)' : 'var(--line2)'}"></span>${ic(i)}<span>${t}<br><small class="lbl" style="font-size:8px">${s}</small></span></a>`).join('')}</div>
      <div class="set-body">${ch === 'telefono' ? `<h2 style="margin-bottom:2px">${ic('phone')} Teléfono</h2><p class="sub">Llamadas automáticas vía IA</p>
      <div class="field"><div class="lbl">Instrucciones para llamadas</div><div class="hint" style="margin-top:6px">Guía para cómo el agente debe manejar las llamadas telefónicas.</div><textarea class="inp">Estimado Ramiro queríamos recordarle que su póliza vence en 15 días.</textarea></div>
      <div class="field"><div class="lbl">Número de salida</div><div class="hint" style="margin-top:6px">Número que verán los clientes al recibir la llamada</div><div style="font-size:12px;color:var(--mut)">Usando número por defecto de Twilio <a class="btn sm" href="#" ${T}>Verificar mi número</a></div></div>
      <div class="field"><div class="lbl">Test</div><div style="display:flex;gap:8px;margin-top:8px"><input class="inp" placeholder="Nombre" style="width:140px"><input class="inp" placeholder="Número destino" style="width:160px"><a class="btn sm" href="#" ${T}>${ic('play')} Probar</a></div></div>` : `<div class="ph">Canal inactivo en el demo.</div>`}</div></div>
      <a class="mono" style="display:inline-flex;gap:6px;margin-top:12px;font-size:11px" href="#" ${T}>${ic('phone')} Ver agente ↗</a>`;
  } else {
    let inner = '';
    if (sec === 'estrategia') inner = `<h2>Estrategia</h2><div class="field"><label>Reglas generales de cobranza ⓘ</label><textarea class="inp" placeholder="Ej. Firmar correos con el nombre del ejecutivo. Para clientes corporativos usar tono formal. Si el cliente tiene varias pólizas vencidas, mencionarlas juntas."></textarea></div>
      <div class="field"><label>Tiers de seguimiento ⓘ</label>${[['Por vencer en más de 15 días', 'var(--mut2)'], ['Por vencer entre 0 y 15 días', 'var(--mut2)'], ['Vencido entre 1 y 14 días', 'var(--org)'], ['Vencido entre 15 y 24 días', 'var(--org)'], ['Vencido más de 24 días', 'var(--red)']].map(([t, c]) => `<div class="tier"><span class="dot" style="background:${c}"></span><div><b>${t}</b><i>Sin prompt configurado</i></div>${ic('chevron-right')}</div>`).join('')}<a class="btn sm" href="#" ${T}>+ Agregar tier</a></div>
      <div class="field"><label>Reglas de re-contacto ⓘ</label><div class="grid g2"><div><div class="hint">Máximo de intentos por recibo ⓘ</div><input class="inp" value="5" style="width:80px"></div><div><div class="hint">Días de gracia tras promesa de pago ⓘ</div><input class="inp" value="1" style="width:80px"></div></div></div>`;
    else if (sec === 'informacion') inner = `<h2>Información</h2><div class="field"><label>Datos del Ejecutivo</label><div class="grid g2"><div><div class="hint">Nombre</div><input class="inp" placeholder="Ej. Antonio García"></div><div><div class="hint">Email</div><input class="inp" placeholder="antonio@ejemplo.com"></div></div></div><div class="field"><label>Idioma ⓘ</label><input class="inp" value="Español"></div>`;
    else inner = `<h2>${menu.find(m => m[0] === sec)[2]}</h2><div class="ph">Sección del menú visible en el demo, contenido no mostrado.</div>`;
    body = `<div class="set-wrap"><div class="set-nav">${menu.map(([k, i, t]) => `<a href="#/agentes/cobranza/config/general/${k}" class="${sec === k ? 'on' : ''}">${ic(i)}${t}</a>`).join('')}</div><div class="set-body">${inner}</div></div>`;
  }
  return topb(crumb('Agente de Cobranza', 'Configuración'), `<a class="btn" href="#/agentes/cobranza">Atrás</a>`) + page(tabs('agentes/cobranza/config', [['general', 'General'], ['canales', 'Canales']], tab) + body);
}
function cobDocs() {
  const nav = [['Getting started', ['Introduction', 'Authentication', 'Errors', 'Pagination', 'Activity log']], ['Settings', ['Get settings', 'Update settings']], ['Runs', ['Trigger a run', 'Get run detail', 'Cron trigger (internal)']], ['Policies', ['List policies', 'Retrieve a policy']], ['Universe', ['Get universe']], ['Phone numbers', ['List phone numbers', 'Verify a phone number']]];
  return topb(crumb('Agente de Cobranza', 'Referencia de API')) + `<div class="docs"><nav><div style="display:flex;gap:6px;align-items:center;font-weight:600;padding:0 8px">Collections API <span class="b lime">v1</span></div>${nav.map(([h, l], i) => `<div class="lbl">⌄ ${h}</div>${l.map((x, j) => `<a class="${!i && !j ? 'on' : ''}">${x}</a>`).join('')}`).join('')}</nav>
    <article><div class="lbl">Insurance · Collections Agent</div><h1>Run <span class="hl-acc">collections</span> on autopilot</h1><p style="color:var(--ink2);line-height:1.6">Configure once, then trigger calls, emails, and WhatsApp messages on a schedule. The Collections Agent (Agente de Cobranza) reads your receipt universe from SOR, contacts the right customers in the channel they prefer, and writes every step to the activity log.</p>
    <div class="base"><i>BASE</i>https://app.handle.example/api/insurance/collection-agent</div><div style="display:flex;gap:8px"><a class="btn pri" href="#" ${T}>${ic('key-round')} Get an API key →</a><a class="btn" href="#" ${T}>${ic('printer')} Print / Save as PDF</a></div>
    <div style="border-top:1px solid var(--line);margin-top:30px;padding-top:24px"><div class="lbl">Getting started</div><h2 style="font-size:22px;margin-top:8px">Authentication</h2><p style="color:var(--ink2);line-height:1.6">Every request authenticates with a Handle API key in the <code>Authorization</code> header. Generate keys at <u>/org/api-keys</u>. The Collections Agent additionally exposes a single internal cron endpoint — <code>POST /trigger</code> — that uses <code>X-Internal-Key</code>.</p></div></article>
    <div class="code"><div class="t"><span class="on">CURL</span><span>JAVASCRIPT</span><span>PYTHON</span></div><div style="color:#a3e635">🔑 REQUIRED HEADERS</div><br>Authorization<br><span style="color:#71717a">Bearer &lt;your-api-key&gt;</span><br><br>Content-Type<br><span style="color:#71717a">application/json</span><br><br><span style="color:#71717a">ⓘ Need help? support@handle.example</span></div></div>`;
}

A.siniestros = (p) => {
  if (p[2] === 'reportes') return topb(crumb('Agente de Siniestros', 'Reportes médicos'), `<a class="btn sm" href="#/agentes/siniestros">← Regresar a casos</a>`) + page(`<h1 style="font-size:24px">Seguimiento de reportes médicos</h1><p class="sub" style="max-width:520px">Todos los reportes médicos de todos los siniestros, con su estado de vigencia. Cada reporte ancla la ventana de cobertura de los gastos; al vencer se requiere uno nuevo.</p>
    <div class="toolbar"><span class="pill" style="background:#16a34a;color:#fff">Vigente <span class="tag">6</span></span><span class="pill" style="background:#f97316;color:#fff">Por vencer <span class="tag">0</span></span><span class="pill" style="background:#dc2626;color:#fff">Vencido <span class="tag">3</span></span><span class="pill" style="border:1px solid var(--line2)"><span class="dot" style="background:var(--mut2)"></span>Reemplazado <span class="tag">0</span></span><span class="sp"></span>${search('Buscar paciente, folio o médico...')}${dd('', 'Todas las aseguradoras')}</div>
    <div class="mono" style="font-size:10px;color:var(--mut);margin-bottom:8px">11 REPORTES</div>
    <div class="tbl-wrap"><table><thead><tr><th>Estado</th><th>Paciente</th><th>Siniestro</th><th>Aseguradora</th><th>Médico</th><th>Emitido</th><th>Vence el</th><th>Días</th></tr></thead><tbody>${D.reportes.map(x => `<tr><td><span class="b ${x[0] === 'Vencido' ? 'red' : 'grn'} soft">${x[0]}</span></td><td>${x[1]}</td><td class="m">${x[2]}</td><td>${x[3]}</td><td>${x[4]}</td><td class="m">${x[5]}</td><td class="m">${x[6]}</td><td class="m" style="color:${x[0] === 'Vencido' ? 'var(--red)' : 'var(--grn)'}">${x[7]}</td></tr>`).join('')}</tbody></table></div>`);
  return topb('', `<a class="btn" href="#/agentes/siniestros/reportes">Reportes médicos</a><a class="btn pri" href="#" ${T}>+ Nuevo Caso</a><a class="btn" href="#" ${T}>Configuración</a>`) + page(`<h1>Siniestros</h1><div style="height:10px"></div>
    ${kpis([['Total de casos', '19'], ['Abiertos', '19'], ['Cerrados', '0'], ['Archivados', '0']])}
    <div class="card" style="display:flex;gap:22px;align-items:flex-end;margin-bottom:12px;padding:12px 16px"><div><div class="lbl" style="margin-bottom:6px">Estado</div><span class="seg"><button class="on">Abierto</button><button>Cerrado</button><button>Archivado</button></span></div><div><div class="lbl" style="margin-bottom:6px">Aseguradora</div>${dd('', 'Todas')}</div><div><div class="lbl" style="margin-bottom:6px">Fecha del evento</div><span class="dd">dd/mm/aaaa ${ic('calendar')}</span> — <span class="dd">dd/mm/aaaa ${ic('calendar')}</span></div><div><div class="lbl" style="margin-bottom:6px">Reportes</div><label style="font-size:12px"><input type="checkbox"> Solo por vencer/vencidos</label></div></div>
    <div class="tbl-wrap"><table><thead><tr><th>Folio</th><th>Paciente</th><th>Aseguradora</th><th>Fecha del evento</th><th>Estado</th><th>Última actividad ▴</th><th>Reporte</th></tr></thead><tbody>${D.siniestros.map(x => `<tr><td class="m">${x.f}</td><td>${x.p}</td><td>${x.ins === '*' ? '<span class="b org soft">Sin aseguradora</span>' : x.ins}</td><td class="m">${x.fe}</td><td><span class="b blue">Open</span></td><td style="color:var(--mut)">${x.act}</td><td style="color:var(--mut)">—</td></tr>`).join('')}</tbody></table></div>`);
};

/* ---- Configuración de organización ---- */
V.config = (p) => {
  const tab = p[1] || 'general';
  let body = '';
  if (tab === 'general') body = `<div class="card" style="margin-bottom:12px"><h2>Idioma de la Interfaz</h2><p class="sub" style="margin-bottom:8px">Idioma utilizado para la interfaz de la aplicación. Esto aplica a todos los miembros de tu organización.</p><input class="inp" value="Español"></div>
    <div class="card" style="margin-bottom:12px"><h2>Logo de la Organización</h2><p class="sub" style="margin-bottom:8px">Se usa en PDFs y documentos generados.</p><a class="btn sm" href="#" ${T}>${ic('upload')} Subir Logo</a></div>
    <h2 style="margin-top:18px">Identidad de Marca</h2><p class="sub">Conecta el dominio de tu empresa. BrandAgent rastrea tu sitio y extrae colores, fuentes y logo para que las propuestas generadas reflejen tu marca.</p>
    <div class="card" style="margin-bottom:12px"><div style="font-weight:600;font-size:12px;margin-bottom:6px">Dominio de la Empresa</div><input class="inp mono" value="https://broker-ejemplo.mx/"><p class="sub" style="margin:6px 0 12px;font-size:11px">BrandAgent lee la página principal, escoge los colores y el logo, e infiere fuentes y tono. Puedes editar todo antes de guardar.</p>
      <div class="grid g2"><div class="card" style="text-align:center"><div class="lbl" style="text-align:left">Logo</div><div class="loading" style="padding:30px 0">${ic('loader')}</div></div><div><div class="lbl">Nombre comercial</div><input class="inp" value="Grupo Ejemplo" style="margin:4px 0 10px"><div class="lbl">Razón social</div><input class="inp" value="Grupo Ejemplo Agente de Seguros SA de CV" style="margin-top:4px"></div></div></div>
    <div class="card" style="margin-bottom:12px"><div class="lbl">Decks de referencia <a class="btn pri sm" href="#" ${T} style="margin-left:8px">${ic('upload')} Subir referencia</a></div><p class="sub" style="margin:6px 0">Aún no hay referencias. Sube una propuesta de ejemplo para empezar a entrenar.</p>
      <div class="lbl" style="margin-top:12px">Estilo aprendido</div><p class="sub" style="margin:6px 0">Aún no hay perfil — sube una referencia o define preferencias abajo.</p>
      <div class="lbl" style="margin-top:12px">Otras preferencias</div><p class="sub" style="margin:4px 0 8px">Siempre aplican, además de lo que aprendemos de las referencias.</p>
      <div class="grid g2"><div><div class="hint" style="font-size:11.5px;margin-bottom:4px">Incluir siempre (una por línea)</div><textarea class="inp" style="min-height:60px"></textarea></div><div><div class="hint" style="font-size:11.5px;margin-bottom:4px">Nunca incluir (una por línea)</div><textarea class="inp" style="min-height:60px"></textarea></div></div>
      <div class="hint" style="font-size:11.5px;margin:10px 0 4px">Otras preferencias</div><input class="inp"><div style="margin-top:10px"><a class="btn pri sm" href="#" ${T}>Guardar preferencias</a></div></div>
    <div class="card" style="margin-bottom:12px"><h2>Perfiles de usuario</h2><p class="sub" style="margin:0">Cuando se active, podrás crear perfiles con permisos granulares por agente y por producto, y asignarlos a tus usuarios. Mientras esté apagado, los miembros siguen solo con los roles de admin o usuario.</p></div>
    <div class="card"><h2>Campos personalizados de credenciales</h2><p class="sub" style="margin:0">Cuando se active, podrás definir campos personalizados (metadatos de gestión como clasificación, RFC, oficina) y capturarlos al conectar o editar credenciales. Mientras esté apagado, el botón "Campos personalizados" y estos campos quedan ocultos.</p></div>`;
  else if (tab === 'aseguradoras') body = `<h2>Credenciales de Aseguradoras</h2><p class="sub" style="max-width:520px">Conecta los portales de las aseguradoras para que los agentes de Handle puedan acceder por ti. Piensa en cada credencial como un conector — tus agentes la usan solo cuando la necesitan.</p>
    <div class="toolbar">${search('Buscar aseguradora...').replace('<label class="search"', '<label class="search" style="flex:1"')}</div><div class="mono" style="font-size:10.5px;color:var(--mut);margin-bottom:10px"><b style="color:var(--ink)">17</b> aseguradoras conectadas · <b style="color:var(--ink)">31</b> credenciales en total</div>
    <div class="conn">${D.aseg.map(([n, c, k, a]) => `<div class="c"><span class="lg" style="background:${c}">${n.split(' ')[0].slice(0, 3).toUpperCase()}</span><div><b>${n}</b><div class="st"><span class="ok-chip"><span class="dot" style="background:var(--grn)"></span>Conectado</span>${a ? `<span class="att-chip">⊘ ${a} requieren atención</span>` : ''}</div><small>${k} credencial${k > 1 ? 'es' : ''}</small></div><span class="gear">${ic('settings')}</span></div>`).join('')}</div>`;
  else if (tab === 'integraciones') body = `<h2>Integraciones</h2><p class="sub">Conecta servicios externos para que los agentes de Handle puedan operar en ellos por ti.<br>Piensa en cada integración como un puente — tus agentes la usan solo cuando la necesitan.</p>
    <div class="toolbar">${search('Buscar...').replace('<label class="search"', '<label class="search" style="flex:1"')}</div><div class="mono" style="font-size:10.5px;color:var(--mut);margin-bottom:10px"><b style="color:var(--ink)">4</b> conectadas · <b style="color:var(--ink)">7</b> disponibles</div>
    <div class="conn">${[['Google Drive', '#1a73e8', 1], ['Google Sheets', '#188038', 1], ['Quattro CRM', '#6b7280', 1], ['WhatsApp', '#22c55e', 1], ['APRO Sistema', '#111', 0], ['SICAS', '#475569', 0], ['WhatsApp Business (Cloud)', '#16a34a', 0]].map(([n, c, on]) => `<div class="c" style="align-items:center"><span class="lg" style="background:${c}">${n.slice(0, 2).toUpperCase()}</span><div><b>${n} ${on ? '<span class="ok-chip">● Activa</span>' : ''}</b><small>${on ? '1 cuenta' : 'No conectado'}</small></div><span class="gear">${ic('chevron-right')}</span></div>`).join('')}</div>`;
  else if (tab === 'datos') body = `<div class="card" style="border-color:#d9f99d;background:color-mix(in srgb,var(--acc) 18%,var(--card));display:flex;gap:12px;align-items:center;margin-bottom:14px"><span class="ico-btn" style="background:var(--acc);border:0;color:#365314">${ic('shield-check')}</span><div style="flex:1"><b>Cómo protegemos tu información</b><div class="sub" style="margin:2px 0 0">Conoce las medidas técnicas y operativas que usamos para mantener tu información segura — aislamiento por organización, cifrado, control de acceso, privacidad de IA, auditoría y cumplimiento.</div></div><a class="btn acc" href="#/seguridad">Conoce cómo cuidamos tus datos →</a></div>
    <div class="card" style="margin-bottom:10px"><h2>Datos</h2><p class="sub">Selecciona las verticales de negocio que deseas habilitar para tu organización.</p><label class="card" style="display:flex;gap:10px;padding:10px 12px"><input type="checkbox" checked><div><b>Seguros</b><div class="sub" style="margin:0;font-size:11px">Pólizas (con lifecycle de renovación), endosos, recibos, comisiones, facturas y clientes</div></div></label></div>
    <a class="btn sm" href="#" ${T}>Guardar</a>
    <div class="card" style="margin-top:14px"><h2>Intake por correo</h2><p class="sub" style="max-width:420px">Para aseguradoras sin portal. Reenvía sus reportes a esta dirección y los recibos entran a tus registros automáticamente.</p><div style="display:flex;gap:10px;align-items:center;margin-bottom:10px"><span class="b grn">Activo</span><u style="font-size:12px;color:var(--mut)">Desactivar</u></div><div style="display:flex;gap:8px"><span class="inp mono" style="width:auto"><b>sor.ejemplo@handle.example</b></span><a class="btn sm" href="#" ${T}>${ic('copy')} Copiar</a></div><p class="sub" style="max-width:420px;margin-top:10px;font-size:11.5px">Reenvía (o configura el auto-reenvío de) los correos de tu aseguradora aquí. Si vienen protegidos con contraseña, el sistema la toma del correo donde llega — no tienes que hacer nada.</p><div class="lbl">Aseguradoras que envían</div></div>`;
  else body = `<div class="ph">Tab "${tab}" visible en el demo, contenido no mostrado.</div>`;
  return page(`<h1>Configuración de Organización</h1>${tabs('config', [['general', 'General'], ['miembros', 'Miembros'], ['correo', 'Cuentas de Correo'], ['aseguradoras', 'Aseguradoras'], ['integraciones', 'Integraciones'], ['datos', 'Datos']], tab)}${body}`);
};

V.seguridad = () => topb(crumb('Configuración', 'Seguridad')) + `<div class="docs" style="grid-template-columns:200px 1fr"><nav><div style="display:flex;gap:6px;align-items:center;font-weight:600;padding:0 8px">Seguridad <span class="b lime">2026</span></div>${[['Introducción', ['Su información, protegida']], ['Controles', ['Aislamiento por organización', 'Cifrado', 'Control de acceso', 'Correo corporativo', 'IA y privacidad']], ['Plataforma', ['Infraestructura', 'Auditoría', 'Cumplimiento']], ['Resumen', ['Resumen', 'Contacto']]].map(([h, l], i) => `<div class="lbl">⌄ ${h}</div>${l.map((x, j) => `<a class="${!i && !j ? 'on' : ''}">${x}</a>`).join('')}`).join('')}</nav>
  <article class="sec-hero" style="max-width:720px"><div class="lbl">Seguridad en Handle · Abril 2026</div><h1>Su información, <span class="hl-acc">protegida</span></h1><p style="color:var(--ink2);line-height:1.6;max-width:520px">Cuando usted confía su operación a Handle, nos confía información de su negocio, de su equipo y de sus clientes. Esa confianza es una prioridad para nosotros. Este documento resume, en lenguaje claro, las principales medidas técnicas y operativas que usamos para proteger la información de nuestros clientes.</p>
  <div style="display:flex;gap:8px;margin:16px 0 40px"><span class="btn"><span class="tag" style="background:var(--ink);color:var(--bg)">DOC</span> Política de seguridad y privacidad</span><a class="btn pri" href="#" ${T}>${ic('shield')} Ver resumen →</a><a class="btn" href="#" ${T}>${ic('printer')} Exportar como PDF</a></div>
  <div style="border-top:1px solid var(--line);padding-top:24px"><div class="lbl">Controles</div><h2 style="font-size:26px;font-weight:500;margin:8px 0 26px">Cómo protegemos su información</h2><div class="lbl">01 · Aislamiento</div><h2 style="font-size:20px;font-weight:500;margin:6px 0">Su información pertenece a su organización</h2><p style="color:var(--ink2);line-height:1.6">Cada organización opera en un espacio aislado: sus datos, credenciales y documentos no se comparten ni se cruzan con los de otros clientes.</p></div></article></div>`;

/* ---------------- router ---------------- */
function render() {
  const h = location.hash.replace(/^#\/?/, '') || 'chat';
  const p = h.split('/');
  sidebar(h);
  const v = V[p[0]];
  $('#main').innerHTML = v ? v(p) : simple('No encontrado', h);
  $('#main').scrollTop = 0;
  if (window.lucide) lucide.createIcons();
}
applyTheme();
window.addEventListener('hashchange', render);
render();
