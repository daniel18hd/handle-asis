// Datos ficticios (no reales) para la réplica as-is
(function(){
  let s = 20260707;
  const r = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
  const pick = a => a[Math.floor(r() * a.length)];
  const int = (a, b) => Math.floor(a + r() * (b - a + 1));
  const NOM = ['Ana Cristina','Claudia Lorena','Héctor Alonso','Jorge','Kristopher Yair','María del Rosario','Mónica','Orlando Antonio','Paola Itzel','Rubén','Diego','Esteban Alejo','María Fernanda','Guadalupe Omar','Luis','Pamela','Alberto','Marco Fabián','Sofía','Ricardo','Fernanda','Iván','Valeria','Rodrigo','Daniela','Emilio','Ximena','Andrés'];
  const APE = ['Reyes','Galindo','López','Magaña','Martínez','González','Huizar','Flores','Herrera','Maceda','Llaca','Loera','Macías','Hernández','Moctezuma','Morales','Aboytes','Maya','Ruiz','Robledo','Torres','Ortega','Castillo','Doriz','Parás','García','Olvera','Cantú','Salinas','Vega'];
  const EMP = ['METALMEX SA DE CV','TRANSPORTES ARIOS SA DE CV','GRUPO NORTEÑO DE LOGÍSTICA','ALIMENTOS DEL BAJÍO SA','CONSTRUCTORA PIEDRA AZUL','FARMACIAS DEL VALLE SA'];
  const INS = ['GNP','Chubb','Inbursa','Banorte','Qualitas','AXA','Mapfre','HDI','SMNYL','Zurich','Allianz','Sancor','Afirme','Ana Seguros','Plan Seguro','MetLife'];
  const name = () => `${pick(NOM)} ${pick(APE)} ${pick(APE)}`;
  const fmt = n => n.toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2});
  const pol = () => pick(['UY ','PQ ','','FK0','9']) + int(10000000, 99999999);
  const D = {fmt, int, pick, name};

  D.clientes = Array.from({length: 40}, () => {
    const corp = r() < .2; const n = corp ? pick(EMP) : name();
    return {n, tipo: corp ? 'Persona moral' : 'Persona física', rfc: (n.replace(/[^A-Z]/gi,'').slice(0,4).toUpperCase()) + int(600101, 991231) + 'XX' + int(0,9), pol: int(0, 4)};
  });
  D.polizas = Array.from({length: 40}, () => ({no: pol(), cli: name(), ins: pick(INS), tipo: pick(['Autos','GMM','Vida','Daños']), est: r() < .25 ? 'Activa' : (r() < .06 ? 'Cancelada' : 'Pendiente'), prima: int(700, 25000) + r(), vence: `${int(1,28)} ${pick(['jul','ago','sep','oct'])} 2026`}));
  D.comisiones = Array.from({length: 40}, () => { const m = int(30, 12000) + r(); const t = pick([15.44, 18, 14.85, 9.2, 21.38, 15, 0]); return {pol: pol(), rec: 'DS' + int(170000, 179999) + '-6a' + Math.floor(r()*1e10).toString(16) + 'cb', ins: pick(['axa','gnp','chubb','qualitas']), ag: 'AGT000' + int(80000, 89999), tasa: t, monto: m, iva: m * .16, usd: r() < .1, fecha: `${int(1,30)} jun 2026`}; });
  D.cotizaciones = [
    {n:'Rafael Álvarez', id:'3508_7761', est:'INICIADO', c:'0 / 0', ramo:'AUTOS', ini:'35min ago', ej:'Carlos Echavarría'},
    {n:'METALMEX SA DE CV', id:'6398_8590', est:'INICIADO', c:'0 / 0', ramo:'SIN CLASIFICAR', ini:'43min ago', ej:'Rafael Álvarez'},
    {n:'METALMEX SA DE CV', id:'4916_5923', est:'INICIADO', c:'0 / 0', ramo:'GMM - DAG', ini:'1h ago', ej:'Carlos Echavarría'},
    {n:'Luis Doriz', id:'4345_4841', est:'CERRADO · SIN COMENTARIO', c:'1 / 1', ramo:'GMM', ini:'23h ago', ej:'Luis Doriz'},
    {n:'METALMEX SA DE CV', id:'9908_4811', est:'INICIADO', c:'0 / 0', ramo:'SIN CLASIFICAR', ini:'1d ago', ej:'Rafael Álvarez'},
    {n:'Sofía Vega Ortega', id:'2210_1180', est:'COTIZADO', c:'4 / 6', ramo:'AUTOS', ini:'1d ago', ej:'Carlos Echavarría'},
    {n:'GRUPO NORTEÑO DE LOGÍSTICA', id:'7731_0042', est:'REQUIERE ATENCIÓN', c:'2 / 5', ramo:'FLOTILLA', ini:'2d ago', ej:'Rafael Álvarez'},
    {n:'Daniela Torres Salinas', id:'1093_5521', est:'INICIADO', c:'0 / 0', ramo:'VIDA', ini:'3d ago', ej:'Luis Doriz'}
  ];
  D.cotAseg = [
    {a:'Chubb', p:'AMPLIA', f:'—', e:'REQUIERE ATENCIÓN', q:1},
    {a:'Auto-Seed Test', p:'AMPLIA', f:'—', e:'REQUIERE ATENCIÓN', q:1},
    {a:'AXA Autos', p:'Amplia', f:'—', e:'REQUIERE ATENCIÓN', q:1},
    {a:'Mapfre', p:'PREMIUM', f:'2641023048706', e:'COTIZADO', q:0},
    {a:'Ana seguros Portal', p:'AMPLIA - Económico', f:'407cded76d014c91ad875ddd1e3f0c54', e:'ERROR', q:0},
    {a:'Banorte', p:'PREMIER', f:'40009409', e:'ERROR', q:0}
  ];
  D.pend = Array.from({length: 10}, () => ({cli: name().toUpperCase(), n: int(1,2), ins: pick(['GNP','Chubb','Inbursa','Banorte','SMNYL']), m: int(500, 23000) + r()}));
  D.pendTabla = Array.from({length: 12}, () => { const c = name().toUpperCase(); return {cli: c, ins: pick(['Chubb','Qualitas','GNP']), pol: pol(), end: int(180000, 220999999), serie: pick(['1/1','1/2','01/01']), rec: r() < .3 ? '0' + int(300000000, 309999999) : '', m: (r() < .2 ? '-' : '') + 'MX$' + int(700, 30000).toLocaleString('es-MX'), v: 'Hace ' + int(10, 22) + 'm'}; });
  D.cobranza = Array.from({length: 12}, () => ({cli: name().toUpperCase(), ins: pick(['QUALITAS','BANORTE','GNP']), pol: '0' + int(640000000, 649999999), rec: `${int(1,12)}/${int(1,12)}/02931${int(10000,99999)}`, est: 'SIN CONTACTO', m: int(400, 6000) + r(), int: '1 intento', ult: 'Últ. contacto hace ' + int(10, 14) + 'd', prox: 'en ' + int(1, 12) + 'd'}));
  D.siniestros = Array.from({length: 10}, (_, i) => ({f: 'SIN-' + Math.random().toString(36).slice(2,8).toUpperCase(), p: i === 0 ? '—' : (i === 5 ? 'Pendiente' : name().split(' ').slice(0,3).join(' ')), ins: i === 1 ? '*' : pick(['AXA Seguros','Seguros Atlas','GNP Seguros']), fe: i % 4 === 0 ? '—' : `${int(1,28)} ${pick(['feb','abr','may'])} 2026`, act: 'hace ' + (7 + i * 6) + 'd'}));
  D.reportes = [
    ['Vencido','Pamela Martínez','SIN-MIULI1','AXA Seguros','Víctor Manuel Escobar Galicia','02 sep 2024','02 mar 2025','492d vencido'],
    ['Vencido','Pendiente','SIN-UTQM7T','AXA Seguros','Víctor Manuel Escobar Galicia','02 sep 2024','02 mar 2025','492d vencido'],
    ['Vencido','Pendiente','SIN-UST1SS','AXA Seguros','Víctor Manuel Escobar Galicia','02 sep 2024','02 mar 2025','492d vencido'],
    ['Vigente','Alberto Parás García','SIN-X40C0A','AXA Seguros','Dra. María Fernández López','09 abr 2026','09 oct 2026','en 94d'],
    ['Vigente','Alberto Parás García','SIN-5I1GCR','AXA Seguros','Dra. María Fernández López','09 abr 2026','09 oct 2026','en 94d'],
    ['Vigente','Alberto Parás García','SIN-QRJREV','AXA Seguros','Dra. María Fernández López','09 abr 2026','09 oct 2026','en 94d'],
    ['Vigente','Alberto Parás García','SIN-NYNC0M','AXA Seguros','Dra. María Fernández López','09 abr 2026','09 oct 2026','en 94d'],
    ['Vigente','Alberto Parás García','SIN-CHN0NT','AXA Seguros','Dra. María Fernández López','09 abr 2026','09 oct 2026','en 94d'],
    ['Vigente','Marco Fabián Olvera Cantú','SIN-J0ZQ2C','Seguros Atlas','Hugo A. Valdés Marín','24 abr 2026','24 oct 2026','en 109d']
  ];
  D.provs = [['GNP Seguros',2],['Qualitas',2],['Seguros Banorte',2],['SMNYL',1],['Chubb Seguros',3],['Mapfre',1],['MetLife México',0],['HDI Seguros',1],['Ana Seguros',1],['Allianz',2],['Zurich',1],['Inbursa',1],['AXA Seguros',2],['Afirme Seguros',1],['GMX Seguros',1]];
  D.aseg = [
    ['GNP Seguros','#ef4444',2,0],['Qualitas','#7c3aed',2,0],['Seguros Banorte','#dc2626',2,2],['SMNYL','#2563eb',1,0],
    ['Chubb Seguros','#111',3,3],['Mapfre','#e11d48',1,0],['HDI Seguros','#15803d',1,1],['Ana Seguros','#ea580c',1,0],
    ['Allianz','#1d4ed8',2,0],['Zurich','#2563eb',1,0],['Inbursa','#0f172a',1,0],['AXA Seguros','#1e3a8a',2,2],
    ['Afirme Seguros','#16a34a',1,0],['Sancor Seguros','#65a30d',1,0],['Qualitas Salud','#7c3aed',2,2],['Plan Seguro','#db2777',3,0]
  ];
  D.cred = [['AXA Seguros','AXA Seguros (SOR verified 2026-07-02)'],['AXA Seguros','AXA Seguros - 12131'],['Seguros Banorte','Seguros Banorte - 3477'],['Seguros Banorte','Seguros Banorte - 18266'],['Chubb Seguros','Chubb Seguros - ALVAREZ91378'],['Chubb Seguros','Chubb Seguros - 97557'],['HDI Seguros','HDI Seguros - 115135'],['Chubb Seguros','Chubb Seguros - 97542'],['Qualitas Salud','Qualitas Salud - 11'],['Qualitas Salud','Qualitas Salud - test']];
  window.D = D;
})();
