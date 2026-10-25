(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Data from novagracehospital.in.net ---------- */
const DEPTS = [
  {k:'Medicine', d:'Fever, diabetes, BP, infections and chronic illness.', icon:'M12 3v18M3 12h18'},
  {k:'Surgery', d:'General and laparoscopic surgery: hernia, gallbladder, appendix, fistula.', icon:'M4 20l9-9M14 4l6 6-8 8-6-6z'},
  {k:'Gynaecology', d:'Pregnancy care, normal delivery, C-section and hysterectomy.', icon:'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 14v7M9 18h6'},
  {k:'Orthopaedics', d:'Fractures, joint pain, dislocations and implant surgery.', icon:'M7 3l3 3-4 4-3-3zM14 14l4 4M10 6l8 8M17 21l4-4'},
  {k:'Paediatrics', d:'Child health, newborn care and NICU.', icon:'M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 22l2-9h8l2 9'},
  {k:'Neurosurgery', d:'Spine and brain surgery, including lumbar discectomy.', icon:'M9 4a4 4 0 0 0-4 4c-2 1-2 5 0 6 0 3 2 5 5 5V4M15 4a4 4 0 0 1 4 4c2 1 2 5 0 6 0 3-2 5-5 5V4'},
  {k:'Chest Medicine', d:'Asthma, COPD, TB and breathing problems.', icon:'M12 3v8M8 11c-3 0-5 4-5 8 0 1 1 2 2 2 3 0 5-3 5-6M16 11c3 0 5 4 5 8 0 1-1 2-2 2-3 0-5-3-5-6'},
  {k:'Emergency Medicine', d:'24-hour trauma, poisoning, accidents and medico-legal cases.', icon:'M3 12h4l3-8 4 16 3-8h4'},
  {k:'Urology', d:'Kidney stones (PCNL), DJ stenting, prostate (TURP) and hydrocele.', icon:'M8 4c-3 2-4 6-2 10s5 4 6 2-1-4 0-8-1-5-4-4zM16 4c3 2 4 6 2 10'},
  {k:'ENT', d:'Ear, nose and throat care.', icon:'M6 9a6 6 0 1 1 12 0c0 4-4 5-4 9a3 3 0 0 1-6 0'},
  {k:'Cancer Care', d:'Onco-surgery packages and chemotherapy infusion.', icon:'M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z'},
  {k:'Physiotherapy', d:'Rehabilitation after surgery, fractures and stroke.', icon:'M13 4a2 2 0 1 0 0-.1M10 22l2-7 3 3v6M8 10l4-2 4 4 3 1'}
];
const DOCTORS = [
  ['Dr M K Singh','Medicine','MBBS, MD (Medicine)'],
  ['Dr Ajay Gautam','Medicine','MD Physician'],
  ['Dr Gyanendra Pal','Medicine','MBBS, MRSH · Sr. Physician'],
  ['Dr Jitendra Katiyar','Medicine','MBBS · General Physician'],
  ['Dr Ashok Pal','Medicine','MBBS · General Physician'],
  ['Dr Asmita','Medicine','MBBS · General Physician'],
  ['Dr Amrita Shah','Medicine','MBBS · General Physician'],
  ['Dr Hasan Ahmad','Medicine','MBBS · Physician'],
  ['Dr Swati Bajpai','Chest Medicine','MBBS, MD · Chest Physician'],
  ['Dr Dinesh Kumar Singh','Surgery','MBBS, MS · Laparoscopic & General Surgeon'],
  ['Dr Prafulla Gupta','Surgery','MS (General Surgery)'],
  ['Dr Saurabh Yadav','Surgery','MBBS · Surgeon'],
  ['Dr S K Singh','Orthopaedics','MBBS, MS (Ortho) · Orthopaedic Surgeon'],
  ['Dr S G Verma','Neurosurgery','MBBS, MS · Neurosurgery'],
  ['Dr Alka Garg','Gynaecology','MBBS · Gynae Physician'],
  ['Gynae Unit','Gynaecology','MS (Gynae) · Gynaecologist', true],
  ['Paediatrics Unit','Paediatrics','MD (Paediatrics) · Paediatrician', true],
  ['Dr A P Maurya','Surgery','MBBS · Consultant'],
  ['Dr R J Lal','Medicine','MBBS'],
  ['Dr Himanshu','Emergency Medicine','MBBS'],
  ['Dr Vinay Pratap Singh','Emergency Medicine','MBBS'],
  ['Dr Amit Gautam','Physiotherapy','BPT · Physiotherapist']
];
const TEAM = {
  'Reception':[['Arti Singh','Front Desk Manager'],['Kuldeep Kumar','Front Desk Manager · BBA'],['Chandani','Front Desk Manager'],['Adarsh Singh','Front Desk Manager · BSc'],['Divyman Kashyap','Supervisor · BSc']],
  'Nursing':[['Sakshi Rajawat','Nursing Staff · GNM'],['Sarika Sachan','Nursing Staff · GNM'],['Akriti Mishra','Nursing Staff'],['Jagrati','Nursing Staff'],['Ravindra Singh','OPD Nursing · BSc']],
  'Pathology':[['Deepak Kumar','Lab Technician · DMLT'],['Satyam Mishra','Lab Technician · DMLT'],['Manas Singh','Lab Technician · BSc']],
  'Radiology':[['Krishna Kant Patel','USG & X-ray Technician · BRIT']],
  'Operation Theatre':[['Gyan Singh','OT Assistant']],
  'Pharmacy & Support':[['Rahul Gupta','Pharmacist'],['Sohan Rav','Housekeeping']]
};
const RATES = {
  'Rooms & beds':[['General ward','per day',1050],['Semi-private room','per day',2050],['Private room','per day',3050],['ICU bed','per day',4000],['NICU bed','per day',3500],['Emergency bed','per use',500],['Nursing charges','per day',500],['Nursing charges (ICU)','per day',1000]],
  'Consultation':[['OPD consultation','per visit',500],['Doctor IPD visit','per visit',700],['Super-specialist consultation','per visit',1500],['ICU visit (specialist)','per visit',1500],['Cardiac consultation','per visit',1500],['Registration','one time',200]],
  'Radiology & cardiac':[['X-ray chest AP','per test',300],['ECG','per test',200],['USG whole abdomen','per test',600],['2D echo','per test',2500],['TMT','per test',2000],['CT head','per test',2000],['CT thorax','per test',4500],['NCCT KUB','per test',5500],['CT abdomen','per test',6500],['CECT abdomen','per test',7200],['MRI knee','per test',6500]],
  'Lab tests':[['Random blood sugar (RBS)','per test',70],['Urine routine','per test',150],['CBC','per test',300],['CRP','per test',400],['KFT','per test',650],['Biopsy / HPE','per specimen',2500]],
  'ICU support':[['Ventilator','per day',4500],['BiPAP','per day',1500],['C-PAP','per day',2500],['Phototherapy','per day',1500],['Monitor','per day',500],['Oxygen','per hour',150],['Intubation','per procedure',1500]],
  'Surgery packages':[['Normal delivery','package',12000],['Hernia (Ayushman)','package',20800],['Hysterectomy','package',20000],['Anal fistulectomy','package',25000],['Lap cholecystectomy (gallbladder)','package',26500],['Ortho surgery','package',28000],['TURP (prostate)','package',38700],['PCNL kidney stone (Ayushman)','package',45000]],
  'Other services':[['Ambulance','per trip',2000],['Dressing (normal)','per dressing',200],['Nebulization','per session',100],['IV infusion','per infusion',50],['Blood transfusion','per unit',500],['Chemotherapy infusion','per session',3000]]
};

/* ---------- Navigation ---------- */
const page = document.body.dataset.page;
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn');
document.querySelectorAll('#menu a').forEach(a => { if (a.dataset.p === page) a.setAttribute('aria-current', 'page'); });
menuBtn.addEventListener('click', () => { const o = menu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
const params = new URLSearchParams(location.search);

/* ---------- 3D: tilt ---------- */
function bindTilt(root){
  if (!fine || reduce) return;
  root.querySelectorAll('.tilt').forEach(el => {
    if (el._t) return; el._t = 1;
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg'); el.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg'); });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--rx','0deg'); el.style.setProperty('--ry','0deg'); });
  });
}

/* ---------- Departments (services page) ---------- */
const deptGrid = document.getElementById('deptGrid');
if (deptGrid) DEPTS.forEach(d => {
  const a = document.createElement('a');
  const has = DOCTORS.some(x => x[1] === d.k);
  a.className = 'card icon tilt'; a.href = has ? '/doctors?dept=' + encodeURIComponent(d.k) : '/doctors'; a.style.textDecoration = 'none';
  a.innerHTML = `<div class="i3d"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d.icon}"/></svg></div><div class="body"><h3>${d.k}</h3><p>${d.d}</p></div>`;
  deptGrid.appendChild(a);
});

/* ---------- Doctors page ---------- */
const filters = document.getElementById('filters'), docGrid = document.getElementById('docGrid');
if (docGrid) {
  const deptList = ['All', ...new Set(DOCTORS.map(d => d[1]))];
  let activeDept = deptList.includes(params.get('dept')) ? params.get('dept') : 'All', q = '';
  const initials = n => n.replace(/^Dr\.?\s*/i,'').split(/\s+/).filter(Boolean).slice(0,2).map(w => w[0]).join('').toUpperCase();
  const renderFilters = () => {
    filters.innerHTML = deptList.map(d => `<button type="button" aria-pressed="${d === activeDept}" data-d="${d}">${d}</button>`).join('') +
      `<label class="search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="docSearch" type="search" placeholder="Search doctor name" aria-label="Search doctor name"></label>`;
    filters.querySelectorAll('button').forEach(b => b.onclick = () => { activeDept = b.dataset.d; renderDocs(); });
    const s = document.getElementById('docSearch'); s.oninput = () => { q = s.value; renderDocs(); };
  };
  const renderDocs = () => {
    filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.d === activeDept));
    const list = DOCTORS.filter(d => (activeDept === 'All' || d[1] === activeDept) && d[0].toLowerCase().includes(q.trim().toLowerCase()));
    docGrid.innerHTML = list.length ? list.map(d => `<article class="doc tilt"><div class="avatar${d[3] ? ' unit' : ''}">${d[3] ? '+' : initials(d[0])}</div><span class="dept">${d[1]}</span><h3>${d[0]}</h3><p class="q">${d[2]}</p><a class="btn btn-ghost" href="/appointment?doctor=${encodeURIComponent(d[0])}">Book appointment</a></article>`).join('')
      : `<div class="empty" style="grid-column:1/-1">No doctor matches that search. Try another name or choose All.</div>`;
    bindTilt(docGrid);
  };
  renderFilters(); renderDocs();
}

/* ---------- Team page ---------- */
const teamGrid = document.getElementById('teamGrid');
if (teamGrid) teamGrid.innerHTML = Object.entries(TEAM).map(([dep, ppl]) =>
  `<div class="team-card"><h3>${dep}<span>${ppl.length}</span></h3><ul>${ppl.map(p => `<li><span>${p[0]}</span><small>${p[1]}</small></li>`).join('')}</ul></div>`).join('');

/* ---------- Treatment & rates page ---------- */
const tabs = document.getElementById('rateTabs'), rateBody = document.getElementById('rateBody');
if (tabs) {
  const fmt = n => n.toLocaleString('en-IN');
  const showRates = cat => {
    tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.c === cat));
    rateBody.innerHTML = RATES[cat].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="num">${fmt(r[2])}</td></tr>`).join('');
  };
  tabs.innerHTML = Object.keys(RATES).map(c => `<button type="button" role="tab" data-c="${c}">${c}</button>`).join('');
  tabs.querySelectorAll('button').forEach(b => b.onclick = () => showRates(b.dataset.c));
  showRates('Rooms & beds');
}

/* ---------- Appointment page ---------- */
const sel = document.getElementById('a-doctor');
if (sel) {
  sel.innerHTML = '<option value="">Any available doctor</option>' + DOCTORS.map(d => `<option value="${d[0]}">${d[0]} · ${d[1]}</option>`).join('');
  if (params.get('doctor')) sel.value = params.get('doctor');
  document.getElementById('a-date').min = new Date().toISOString().slice(0,10);
  document.getElementById('apptForm').addEventListener('submit', e => {
    e.preventDefault(); const f = e.target, ok = document.getElementById('apptOk'), ph = f.contact.value.replace(/\D/g,''); ok.hidden = false;
    if (!f.name.value.trim()) { ok.textContent = 'Enter the patient’s name.'; f.name.focus(); return; }
    if (ph.length < 10) { ok.textContent = 'Enter a 10-digit mobile number so we can call you back.'; f.contact.focus(); return; }
    ok.textContent = `Request ready for ${f.name.value.trim()} with ${f.doctor.value || 'any available doctor'}. Connect this form to the hospital's system to send it.`;
  });
}
const cb = document.getElementById('copyBtn');
if (cb) cb.addEventListener('click', () => {
  const selTxt = () => { const r = document.createRange(); r.selectNodeContents(document.getElementById('phone')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); cb.textContent = 'Selected'; };
  try { navigator.clipboard.writeText('+918400600546').then(() => { cb.textContent = 'Copied'; setTimeout(() => cb.textContent = 'Copy number', 1800); }).catch(selTxt); } catch(e) { selTxt(); }
});

/* ---------- Contact page ---------- */
const qf = document.getElementById('queryForm');
if (qf) qf.addEventListener('submit', e => {
  e.preventDefault(); const f = e.target, ok = document.getElementById('queryOk'); ok.hidden = false;
  if (!f.name.value.trim() || !f.message.value.trim()) { ok.textContent = 'Add your name and a message so we know how to help.'; return; }
  ok.textContent = `Thanks, ${f.name.value.trim()}. Connect this form to the hospital's inbox to send it.`;
});

bindTilt(document);

/* ---------- Home: 3D hero photo stack ---------- */
const stage = document.getElementById('stage'), s3d = document.getElementById('s3d');
if (stage && fine && !reduce) {
  stage.addEventListener('pointermove', e => { const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    s3d.style.setProperty('--sy', (-12 + x * 18).toFixed(2) + 'deg'); s3d.style.setProperty('--sx', (4 - y * 12).toFixed(2) + 'deg'); });
  stage.addEventListener('pointerleave', () => { s3d.style.setProperty('--sy','-12deg'); s3d.style.setProperty('--sx','4deg'); });
}

/* ---------- Home: WebGL logo orb ---------- */
(function startOrb(){
  const c = document.getElementById('orb3d'); if (!c || !window.THREE) return;
  let r; try { r = new THREE.WebGLRenderer({canvas:c, antialias:true, alpha:true}); } catch(e) { return; }
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, 1, .1, 50); cam.position.z = 9;
  sc.add(new THREE.HemisphereLight(0xffffff, 0x5a0e31, .9));
  const k = new THREE.DirectionalLight(0xffffff, 1.3); k.position.set(3, 5, 6); sc.add(k);
  const bl = new THREE.PointLight(0x1f6fd1, 1.6, 20); bl.position.set(-4, -2, 4); sc.add(bl);
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.5, 64, 64), new THREE.MeshPhysicalMaterial({color:0xc2185b, roughness:.18, metalness:.1, clearcoat:1, clearcoatRoughness:.08}));
  sc.add(sphere);
  const s = new THREE.Shape(), a = .32, b = .95;
  s.moveTo(-a,b);s.lineTo(a,b);s.lineTo(a,a);s.lineTo(b,a);s.lineTo(b,-a);s.lineTo(a,-a);s.lineTo(a,-b);s.lineTo(-a,-b);s.lineTo(-a,-a);s.lineTo(-b,-a);s.lineTo(-b,a);s.lineTo(-a,a);s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {depth:.3, bevelEnabled:true, bevelThickness:.08, bevelSize:.08, bevelSegments:5}); g.center();
  const cross = new THREE.Mesh(g, new THREE.MeshStandardMaterial({color:0xffffff, roughness:.3})); cross.position.z = 1.55; sphere.add(cross);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, .06, 20, 140), new THREE.MeshStandardMaterial({color:0x1f6fd1, roughness:.25, metalness:.55})); ring.rotation.x = 1.15; sc.add(ring);
  const sat = new THREE.Mesh(new THREE.SphereGeometry(.18, 24, 24), new THREE.MeshStandardMaterial({color:0xffc64d, roughness:.3})); sc.add(sat);
  const fit = () => { const w = c.clientWidth, h = c.clientHeight; if (!w) return; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  new ResizeObserver(fit).observe(c); fit();
  let vis = true; new IntersectionObserver(es => vis = es[0].isIntersecting).observe(c);
  const clk = new THREE.Clock();
  const draw = () => { const t = clk.getElapsedTime(); sphere.rotation.y = Math.sin(t * .6) * .6; sphere.position.y = Math.sin(t) * .12; ring.rotation.z = t * .45;
    sat.position.set(Math.cos(t * 1.2) * 2.4, Math.sin(t * 1.2) * 2.4 * Math.cos(1.15), Math.sin(t * 1.2) * 2.4 * Math.sin(1.15)); r.render(sc, cam); };
  if (reduce) draw(); else (function loop(){ requestAnimationFrame(loop); if (vis) draw(); })();
})();

/* ---------- Home: coverflow ---------- */
const flow = document.getElementById('flow');
if (flow) {
  const slides = [...flow.querySelectorAll('.slide')], dots = document.getElementById('dots');
  let cur = 1; slides.forEach(() => dots.appendChild(document.createElement('i')));
  const layoutFlow = () => {
    const narrow = innerWidth < 600;
    slides.forEach((s, i) => { const o = i - cur, ao = Math.abs(o);
      s.style.transform = `translateX(${o * (narrow ? 62 : 58)}%) translateZ(${-ao * 170}px) rotateY(${Math.max(-50, Math.min(50, -o * 38))}deg)`;
      s.style.zIndex = 100 - ao; s.style.opacity = ao > 2 ? 0 : 1; s.style.filter = ao ? 'brightness(.7) saturate(.85)' : 'none';
      s.style.pointerEvents = ao > 2 ? 'none' : 'auto'; s.setAttribute('aria-hidden', ao ? 'true' : 'false'); });
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
  };
  const go = n => { cur = (n + slides.length) % slides.length; layoutFlow(); };
  document.getElementById('prev').onclick = () => go(cur - 1);
  document.getElementById('next').onclick = () => go(cur + 1);
  slides.forEach((s, i) => s.addEventListener('click', () => go(i)));
  flow.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });
  let sx = null; flow.addEventListener('pointerdown', e => sx = e.clientX);
  addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); });
  addEventListener('resize', layoutFlow); layoutFlow();
  const auto = reduce ? null : setInterval(() => go(cur + 1), 4500);
  flow.addEventListener('pointerenter', () => clearInterval(auto));
}
})();
