/* Teacher E-Portfolio SPA | ตั้งค่า API_URL และ USE_MOCK_DATA ก่อนนำขึ้นใช้งานจริง */
const CONFIG = {
  USE_MOCK_DATA: false, // เปลี่ยนเป็น false เมื่อ Deploy GAS แล้ว
  API_URL: 'https://script.google.com/macros/s/AKfycbxfRJW2Zrum-otwzHrQlFs7LXwLtSiC0qXUcTD8u1a-Yq0XaGenP-LUPLOSBzw_adIv/exec',
  CACHE_KEY: 'teacher-eportfolio-data-v2',
  CACHE_MAX_AGE_MS: 10 * 60 * 1000
};

const ADMIN_SESSION_KEY = 'teacher-eportfolio-admin-session';
const state = { data: { portfolio: [], documents: [], settings: {}, schedule: [], workload: [], specialTasks: [] }, route: 'dashboard', portfolioFilter: 'ทั้งหมด', documentSearch: '', documentFilter: 'ทั้งหมด', adminSession: getAdminSession(), adminSheet: 'Portfolio', adminEditKey: null };
const icons = {
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5V20"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="m8.5 12-1.5 9 5-3 5 3-1.5-9"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.55v.09h-3v-.09A1.7 1.7 0 0 0 10.7 18.6a1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.06 15a1.7 1.7 0 0 0-1.55-1.03h-.09v-3h.09A1.7 1.7 0 0 0 7.06 9.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.55v-.09h3v.09A1.7 1.7 0 0 0 15.76 6.3a1.7 1.7 0 0 0 1.88-.34L17.7 5.9l2.1 2.1-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1.03h.09v3h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>'
};
const navGroups = [
  { label: 'PROFILE & WORKLOAD', items: [['dashboard', 'แดชบอร์ด', 'grid'], ['profile', 'ประวัติส่วนตัว', 'user'], ['teaching', 'ข้อมูลการสอน', 'book'], ['schedule', 'ตารางสอน', 'book'], ['workload', 'ภาระงานหลัก', 'file'], ['special-tasks', 'งานพิเศษ', 'award']] },
  { label: 'E-PORTFOLIO', items: [['portfolio', 'ผลงาน/นวัตกรรม', 'award'], ['portfolio', 'กิจกรรมพัฒนาผู้เรียน', 'award'], ['portfolio', 'ผลงานนักเรียน', 'award'], ['portfolio', 'เกียรติบัตรและรางวัล', 'award']] },
  { label: 'DOCUMENT HUB', adminOnly: true, items: [['academic', 'งานวิชาการ', 'file'], ['orders', 'คำสั่งโรงเรียน', 'file'], ['forms', 'แบบฟอร์มทั่วไป', 'file']] },
  { label: 'SYSTEM', adminOnly: true, items: [['settings', 'ตั้งค่า', 'settings']] }
];
const routeMeta = {
  dashboard: ['แดชบอร์ด', 'ภาพรวมแฟ้มสะสมผลงานและเอกสาร'], profile: ['ประวัติส่วนตัว', 'ข้อมูลของครูเฉลิมพล จันทร์แดง'], teaching: ['ข้อมูลการสอน', 'รายวิชาและภาระงานสอน'], schedule: ['ตารางสอน', 'ตารางสอนประจำสัปดาห์'], workload: ['ภาระงานหลัก', 'ภาระงานและบทบาทที่รับผิดชอบ'], 'special-tasks': ['งานพิเศษ', 'งานสนับสนุนและงานที่ได้รับมอบหมาย'], portfolio: ['E-Portfolio', 'รวมผลงาน กิจกรรม และความภาคภูมิใจ'], academic: ['งานวิชาการ', 'เอกสารวิชาการ'], orders: ['คำสั่งโรงเรียน', 'คำสั่งและหนังสือมอบหมายงาน'], forms: ['แบบฟอร์มทั่วไป', 'แบบฟอร์มสำหรับใช้งาน'], settings: ['ตั้งค่า', 'กำหนดรูปแบบการแสดงผลของเว็บไซต์']
};
const ADMIN_SCHEMAS = {
  Portfolio: ['ID', 'Title', 'Category', 'Description', 'Image_URL', 'Date'],
  Documents: ['ID', 'Doc_Name', 'Category', 'Recipient', 'File_URL', 'Date'],
  Schedule: ['ID', 'Day', 'Period', 'Subject', 'Class', 'Room'],
  Workload: ['ID', 'Title', 'Description', 'Type'],
  SpecialTasks: ['ID', 'Title', 'Description', 'Accent']
};

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (text = '') => String(text).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const formatDate = (date) => { if (!date) return '-'; const parsed = new Date(date); return Number.isNaN(parsed) ? date : parsed.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }); };
const DEFAULT_SETTINGS = { teacher_name: 'ครูเฉลิมพล จันทร์แดง', school_name: 'โรงเรียนบ้านไร่', teacher_role: 'ครูผู้สอน', teacher_initial: 'ช', teacher_bio: 'สร้างการเรียนรู้ สนุก ทันสมัย และเติบโตไปพร้อมผู้เรียน', subjects: 'เทคโนโลยี|วิทยาการคำนวณ|การงานอาชีพ|ต้านทุจริตศึกษา' };
function emptyData() { return { portfolio: [], documents: [], settings: { ...DEFAULT_SETTINGS }, schedule: [], workload: [], specialTasks: [] }; }
function normalizeData(data) { return { portfolio: Array.isArray(data?.portfolio) ? data.portfolio : [], documents: Array.isArray(data?.documents) ? data.documents : [], settings: { ...DEFAULT_SETTINGS, ...(data?.settings || {}) }, schedule: Array.isArray(data?.schedule) ? data.schedule : [], workload: Array.isArray(data?.workload) ? data.workload : [], specialTasks: Array.isArray(data?.specialTasks) ? data.specialTasks : [] }; }
function setting(key) { return state.data.settings?.[key] || DEFAULT_SETTINGS[key] || ''; }
function subjects() { return setting('subjects').split('|').map(subject => subject.trim()).filter(Boolean); }
function applySiteSettings() { const name = setting('teacher_name'), school = setting('school_name'); document.title = `Teacher E-Portfolio | ${name}`; $('#brand-initial').textContent = setting('teacher_initial'); $('#sidebar-name').textContent = name; $('#sidebar-school').textContent = school; $('#sidebar-profile-school').textContent = school; }
function getAdminSession() { try { return localStorage.getItem(ADMIN_SESSION_KEY) || ''; } catch { return ''; } }
function isAdmin() { return Boolean(state.adminSession); }
function syncAdminUI() { const label = $('#admin-access-label'); const button = $('#admin-access-button'); if (!label || !button) return; label.textContent = isAdmin() ? 'ออกจากระบบ Admin' : 'เข้าสู่ระบบ Admin'; button.setAttribute('aria-label', label.textContent); }
function showAdminLogin() { $('#admin-login-error').classList.add('hidden'); $('#admin-login-form').reset(); $('#admin-login-modal').classList.remove('hidden'); $('#admin-login-modal').classList.add('flex'); setTimeout(() => $('#admin-password').focus(), 0); }
function closeAdminLogin() { $('#admin-login-modal').classList.add('hidden'); $('#admin-login-modal').classList.remove('flex'); }
async function adminRequest(action, payload = {}) {
  if (CONFIG.USE_MOCK_DATA) throw new Error('Admin CMS ต้องเชื่อม Google Apps Script API จริงก่อนใช้งาน');
  if (!CONFIG.API_URL || CONFIG.API_URL.includes('PASTE_YOUR')) throw new Error('กรุณาตั้งค่า API_URL ก่อนใช้งาน Admin');
  const response = await fetch(CONFIG.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, token: state.adminSession, ...payload }), redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const result = await response.json();
  if (!result || result.status !== 'success') throw new Error(result?.message || 'บันทึกข้อมูลไม่สำเร็จ');
  return result;
}
async function loginAdmin(password) {
  const result = await adminRequest('login', { password });
  state.adminSession = result.token;
  try { localStorage.setItem(ADMIN_SESSION_KEY, result.token); } catch { /* localStorage is optional */ }
  closeAdminLogin(); syncAdminUI(); renderNavigation(); setRoute('settings'); showToast('เข้าสู่ระบบ Admin สำเร็จ', 'success');
}
async function logoutAdmin() {
  try { await adminRequest('logout'); } catch { /* session may already be expired */ }
  state.adminSession = '';
  try { localStorage.removeItem(ADMIN_SESSION_KEY); } catch { /* localStorage is optional */ }
  state.route = 'dashboard'; syncAdminUI(); renderNavigation(); renderPage(); showToast('ออกจากระบบ Admin แล้ว', 'success');
}

function renderNavigation() {
  $('#navigation').innerHTML = navGroups.filter(group => !group.adminOnly || isAdmin()).map(group => `
    <section class="mb-6"><p class="sidebar-heading mb-2 px-3 text-[10px] font-semibold tracking-wider text-slate-500">${group.label}</p>
    <div class="space-y-1">${group.items.map(([route, label, icon]) => `<button class="nav-item ${isNavActive(route, label) ? 'active' : ''} flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm" data-route="${route}" data-label="${label}" title="${label}"><span class="h-5 w-5 shrink-0">${icons[icon]}</span><span class="sidebar-label truncate">${label}</span></button>`).join('')}</div></section>`).join('');
}
function isNavActive(route, label) {
  if (route === 'portfolio') return state.route === 'portfolio' && (state.portfolioFilter === 'ทั้งหมด' || state.portfolioFilter === label);
  const categoryRoutes = { academic: 'งานวิชาการ', orders: 'คำสั่งโรงเรียน', forms: 'แบบฟอร์มทั่วไป' };
  return state.route === route && (!categoryRoutes[route] || categoryRoutes[route] === label);
}

function setRoute(route, label = '') {
  if (!isAdmin() && ['academic', 'orders', 'forms', 'settings'].includes(route)) route = 'dashboard';
  state.route = route;
  state.portfolioFilter = route === 'portfolio' && label ? label : route === 'portfolio' ? state.portfolioFilter : 'ทั้งหมด';
  state.documentFilter = ['academic', 'orders', 'forms'].includes(route) ? ({ academic: 'งานวิชาการ', orders: 'คำสั่งโรงเรียน', forms: 'แบบฟอร์มทั่วไป' }[route]) : 'ทั้งหมด';
  window.location.hash = route;
  renderNavigation(); renderPage(); closeMenu();
}

function renderPage() {
  const [title, subtitle] = routeMeta[state.route] || routeMeta.dashboard;
  $('#page-title').textContent = title;
  applySiteSettings();
  syncAdminUI();
  const views = { dashboard: renderLiveDashboard, profile: renderLiveProfile, teaching: renderLiveTeaching, schedule: renderLiveSchedule, workload: renderLiveWorkload, 'special-tasks': renderLiveSpecialTasks, portfolio: renderPortfolio, academic: renderDocuments, orders: renderDocuments, forms: renderDocuments, settings: renderLiveSettings };
  $('#content').innerHTML = views[state.route]();
  bindPageEvents();
}

function renderDashboard() {
  const portfolio = state.data.portfolio.length, documents = state.data.documents.length;
  const activityCount = state.data.portfolio.filter(item => item.Category === 'กิจกรรมพัฒนาผู้เรียน').length;
  const recent = [...state.data.portfolio].sort((a,b) => String(b.Date).localeCompare(String(a.Date))).slice(0, 3);
  return `<section class="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-400 to-rose-300 p-6 text-white shadow-soft sm:p-8"><div class="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-yellow-200/40 blur-2xl"></div><div class="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-sky-200/40 blur-2xl"></div><div class="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div class="flex items-center gap-4"><div class="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border-4 border-white/60 bg-white/20 text-3xl font-bold shadow-lg">ช</div><div><p class="text-sm font-medium text-white/80">Teacher E-Portfolio · โรงเรียนบ้านไร่</p><h2 class="mt-1 text-2xl font-semibold sm:text-3xl">ครูเฉลิมพล จันทร์แดง</h2><p class="mt-2 text-sm text-white/90">สร้างการเรียนรู้ สนุก ทันสมัย และเติบโตไปพร้อมผู้เรียน</p></div></div><div class="flex shrink-0 gap-2"><button class="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-violet-700 shadow-sm hover:bg-violet-50" data-go="portfolio">ชมผลงาน</button>${isAdmin() ? '<button class="rounded-xl border border-white/40 bg-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/25" data-go="settings">ตั้งค่าหน้าเว็บ</button>' : ''}</div></div></section>
  <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-${isAdmin() ? '5' : '4'}">
    ${statCard('แฟ้มสะสมผลงาน', portfolio, 'รายการ', 'from-sky-100 to-cyan-50 text-sky-700', '▣')}${statCard('กิจกรรมผู้เรียน', activityCount, 'กิจกรรม', 'from-amber-100 to-yellow-50 text-amber-700', '✦')}${statCard('รายวิชาที่สอน', 4, 'รายวิชา', 'from-emerald-100 to-teal-50 text-emerald-700', '◒')}${isAdmin() ? statCard('เอกสารทั้งหมด', documents, 'รายการ', 'from-fuchsia-100 to-pink-50 text-fuchsia-700', '▤') + statCard('สถานะระบบ', 'พร้อม', 'ใช้งาน', 'from-violet-100 to-purple-50 text-violet-700', '●') : statCard('ประเภทผลงาน', 4, 'หมวด', 'from-rose-100 to-pink-50 text-rose-700', '♡')}
  </section>
  <section class="mt-8 grid gap-6 xl:grid-cols-5"><div class="rounded-3xl border border-violet-100 bg-white/90 p-6 shadow-soft xl:col-span-3"><div class="flex items-center justify-between"><div><h2 class="font-semibold text-slate-800">ผลงานล่าสุด</h2><p class="mt-1 text-sm text-slate-500">อัปเดตจากแฟ้มสะสมผลงาน</p></div><button class="text-sm font-medium text-violet-600 hover:text-violet-800" data-go="portfolio">ดูทั้งหมด →</button></div><div class="mt-5 space-y-3">${recent.length ? recent.map((item, index) => `<button class="flex w-full items-center gap-4 rounded-2xl p-2 text-left hover:bg-violet-50" data-go="portfolio"><div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl ${['bg-sky-100 text-sky-600','bg-amber-100 text-amber-600','bg-pink-100 text-pink-600'][index]}">★</div><div class="min-w-0 flex-1"><p class="truncate text-sm font-medium text-slate-800">${escapeHtml(item.Title)}</p><p class="truncate text-xs text-slate-500">${escapeHtml(item.Category)} · ${formatDate(item.Date)}</p></div></button>`).join('') : emptyState('ยังไม่มีผลงาน')}</div></div>
  <aside class="rounded-3xl bg-gradient-to-br from-sky-100 via-cyan-50 to-teal-100 p-6 xl:col-span-2"><p class="text-sm font-medium text-teal-700">รายวิชาที่ดูแล</p><div class="mt-4 grid grid-cols-2 gap-3">${['เทคโนโลยี','วิทยาการคำนวณ','การงานอาชีพ','ต้านทุจริตศึกษา'].map((subject, i) => `<div class="rounded-2xl bg-white/80 p-3 text-sm font-medium text-slate-700 shadow-sm"><span class="mb-2 block text-lg">${['⌘','◈','⚙','⚖'][i]}</span>${subject}</div>`).join('')}</div><button class="mt-5 text-sm font-medium text-teal-700 hover:text-teal-900" data-go="teaching">ดูข้อมูลการสอน →</button></aside></section>`;
}
function statCard(label, value, unit, color, symbol) { return `<article class="overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br ${color} p-5 shadow-sm"><div class="flex items-start justify-between"><div><p class="text-sm text-slate-600">${label}</p><p class="mt-2 text-2xl font-semibold text-slate-800">${value}<span class="ml-1 text-sm font-normal text-slate-500">${unit}</span></p></div><span class="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-lg shadow-sm">${symbol}</span></div></article>`; }
function renderProfile() { return `<section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"><div class="h-28 bg-gradient-to-r from-brand-700 to-sky-500"></div><div class="px-6 pb-8 sm:px-10"><div class="-mt-12 grid h-24 w-24 place-items-center rounded-2xl border-4 border-white bg-brand-100 text-3xl font-bold text-brand-700 shadow-sm">ช</div><div class="mt-5"><p class="text-sm font-medium text-brand-600">Teacher Profile</p><h2 class="mt-1 text-2xl font-semibold text-slate-800">ครูเฉลิมพล จันทร์แดง</h2><p class="mt-1 text-slate-500">ครูผู้สอน · โรงเรียนบ้านไร่</p></div><dl class="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3"><div><dt class="text-xs text-slate-400">สถานศึกษา</dt><dd class="mt-1 font-medium text-slate-700">โรงเรียนบ้านไร่</dd></div><div><dt class="text-xs text-slate-400">กลุ่มสาระ/รายวิชา</dt><dd class="mt-1 font-medium text-slate-700">เทคโนโลยีและการงานอาชีพ</dd></div><div><dt class="text-xs text-slate-400">บทบาท</dt><dd class="mt-1 font-medium text-slate-700">ครูผู้สอน</dd></div></dl></div></section>`; }
function renderTeaching() { const subjects = ['เทคโนโลยี', 'วิทยาการคำนวณ', 'การงานอาชีพ', 'ต้านทุจริตศึกษา']; return `<section><p class="mb-6 text-sm text-slate-500">รายวิชาหลักที่รับผิดชอบในการจัดการเรียนรู้</p><div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">${subjects.map((subject, index) => `<article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div class="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">${['⌘','⌘','⚙','⚖'][index]}</div><h2 class="mt-5 font-semibold text-slate-800">${subject}</h2><p class="mt-2 text-sm leading-6 text-slate-500">จัดการเรียนรู้เพื่อพัฒนาทักษะที่จำเป็นของผู้เรียนในศตวรรษที่ 21</p></article>`).join('')}</div><div class="mt-7 grid gap-4 md:grid-cols-3">${quickLink('ตารางสอน', 'ดูตารางสอนประจำสัปดาห์', 'schedule', 'bg-sky-50 text-sky-700')}${quickLink('ภาระงานหลัก', 'ดูบทบาทและความรับผิดชอบ', 'workload', 'bg-violet-50 text-violet-700')}${quickLink('งานพิเศษ', 'ดูงานสนับสนุนที่ได้รับมอบหมาย', 'special-tasks', 'bg-amber-50 text-amber-700')}</div></section>`; }
function quickLink(title, description, route, color) { return `<button class="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft" data-go="${route}"><span class="grid h-10 w-10 place-items-center rounded-xl ${color}">→</span><h2 class="mt-4 font-semibold text-slate-800">${title}</h2><p class="mt-1 text-sm text-slate-500">${description}</p></button>`; }
function renderSchedule() {
  const schedule = [
    ['1', 'เทคโนโลยี', 'วิทยาการคำนวณ', 'การงานอาชีพ', 'เทคโนโลยี', 'ต้านทุจริตศึกษา'],
    ['2', 'วิทยาการคำนวณ', 'เทคโนโลยี', 'เทคโนโลยี', 'การงานอาชีพ', 'วิทยาการคำนวณ'],
    ['3', 'การงานอาชีพ', 'ต้านทุจริตศึกษา', 'วิทยาการคำนวณ', 'เทคโนโลยี', 'กิจกรรมพัฒนาผู้เรียน'],
    ['4', 'เทคโนโลยี', 'การงานอาชีพ', 'งานวางแผนการสอน', 'วิทยาการคำนวณ', 'งานเอกสาร']
  ];
  const days = ['คาบ', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
  return `<section><div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p class="text-sm text-slate-500">ตารางตัวอย่างสำหรับการจัดแสดงผล สามารถแก้ชื่อรายวิชาและคาบสอนได้ในฟังก์ชัน <code>renderSchedule()</code></p></div><span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">ประจำสัปดาห์</span></div><div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"><div class="overflow-x-auto"><table class="min-w-[760px] w-full text-sm"><thead class="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"><tr>${days.map(day => `<th class="px-5 py-4 text-left font-medium">${day}</th>`).join('')}</tr></thead><tbody>${schedule.map((row, rowIndex) => `<tr class="border-t border-slate-100 ${rowIndex % 2 ? 'bg-slate-50/70' : ''}">${row.map((cell, cellIndex) => `<td class="px-5 py-4 ${cellIndex === 0 ? 'font-semibold text-violet-700' : 'text-slate-600'}">${cellIndex === 0 ? 'คาบที่ ' + cell : `<span class="inline-flex rounded-lg bg-${['sky','violet','amber','emerald','pink'][((rowIndex + cellIndex) % 5)]}-50 px-2.5 py-1.5">${cell}</span>`}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>`;
}
function renderWorkload() {
  const tasks = [['งานจัดการเรียนรู้', 'วางแผน จัดการเรียนรู้ วัดและประเมินผลใน 4 รายวิชา', 'งานหลัก'], ['ดูแลผู้เรียน', 'ติดตาม ส่งเสริม และพัฒนาผู้เรียนรายบุคคล', 'งานหลัก'], ['งานวิชาการ', 'จัดทำเอกสารแผนการสอนและหลักฐานการเรียนรู้', 'สนับสนุน'], ['พัฒนาสื่อดิจิทัล', 'สร้างและดูแลสื่อ/ระบบเทคโนโลยีเพื่อการเรียนรู้', 'สนับสนุน']];
  return `<section><p class="mb-6 text-sm text-slate-500">สรุปบทบาทงานประจำของครูผู้สอน (ปรับรายละเอียดให้ตรงกับคำสั่งโรงเรียนได้)</p><div class="grid gap-5 md:grid-cols-2">${tasks.map((task, index) => `<article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div class="flex items-start justify-between gap-3"><span class="grid h-11 w-11 place-items-center rounded-xl ${['bg-violet-100 text-violet-700','bg-sky-100 text-sky-700','bg-emerald-100 text-emerald-700','bg-amber-100 text-amber-700'][index]}">${['⌘','♡','▤','⚙'][index]}</span><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">${task[2]}</span></div><h2 class="mt-5 font-semibold text-slate-800">${task[0]}</h2><p class="mt-2 text-sm leading-6 text-slate-500">${task[1]}</p></article>`).join('')}</div></section>`;
}
function renderSpecialTasks() {
  const tasks = [['กิจกรรมพัฒนาผู้เรียน', 'สนับสนุนการจัดกิจกรรมค่ายลูกเสือ Scout Day Camp และกิจกรรมเสริมทักษะชีวิต', 'bg-amber-100 text-amber-700'], ['ส่งเสริมเทคโนโลยีสารสนเทศ', 'ดูแลและสนับสนุนการใช้สื่อดิจิทัลในการจัดการเรียนรู้ของโรงเรียน', 'bg-sky-100 text-sky-700'], ['ต้านทุจริตศึกษา', 'ร่วมขับเคลื่อนกิจกรรมและการเรียนรู้ด้านความซื่อสัตย์สุจริต', 'bg-rose-100 text-rose-700']];
  return `<section><div class="rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 p-6 sm:p-8"><p class="text-sm font-medium text-violet-700">งานที่ได้รับมอบหมาย</p><h2 class="mt-1 text-2xl font-semibold text-slate-800">งานพิเศษและงานสนับสนุน</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">พื้นที่สำหรับรวบรวมบทบาทนอกเหนือจากการสอนประจำ ปรับเพิ่มหรือลดรายการได้ตามปีการศึกษา</p><div class="mt-6 grid gap-4 md:grid-cols-3">${tasks.map((task, index) => `<article class="rounded-2xl bg-white/90 p-5 shadow-sm"><span class="grid h-10 w-10 place-items-center rounded-xl ${task[2]}">${['✦','⌘','⚖'][index]}</span><h3 class="mt-4 font-semibold text-slate-800">${task[0]}</h3><p class="mt-2 text-sm leading-6 text-slate-500">${task[1]}</p></article>`).join('')}</div></div></section>`;
}
function renderSettings() { return `<section class="max-w-3xl"><div class="rounded-3xl border border-violet-100 bg-white p-6 shadow-soft sm:p-8"><div class="flex items-start gap-4"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700">${icons.settings}</div><div><h2 class="font-semibold text-slate-800">ตั้งค่าการแสดงผล</h2><p class="mt-1 text-sm leading-6 text-slate-500">เลือกว่าเว็บไซต์จะแสดงข้อมูลชุดใด เหมาะสำหรับตรวจสอบหน้าเว็บก่อนเผยแพร่</p></div></div><div class="mt-7 grid gap-4 sm:grid-cols-2"><button class="rounded-2xl border-2 p-5 text-left transition ${state.viewMode === 'public' ? 'border-sky-400 bg-sky-50 shadow-sm' : 'border-slate-100 hover:border-sky-200 hover:bg-sky-50'}" data-view-mode="public"><span class="grid h-10 w-10 place-items-center rounded-xl bg-sky-100 text-sky-700">◉</span><h3 class="mt-4 font-semibold text-slate-800">มุมมองบุคคลทั่วไป</h3><p class="mt-2 text-sm leading-6 text-slate-500">เห็นประวัติ ข้อมูลการสอน และผลงานเท่านั้น โดยซ่อน Document Hub และการตั้งค่าระบบ</p><span class="mt-4 inline-block text-xs font-medium ${state.viewMode === 'public' ? 'text-sky-700' : 'text-slate-400'}">${state.viewMode === 'public' ? 'กำลังใช้งาน' : 'เลือกมุมมองนี้'}</span></button><button class="rounded-2xl border-2 p-5 text-left transition ${state.viewMode === 'admin' ? 'border-violet-400 bg-violet-50 shadow-sm' : 'border-slate-100 hover:border-violet-200 hover:bg-violet-50'}" data-view-mode="admin"><span class="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700">⚙</span><h3 class="mt-4 font-semibold text-slate-800">มุมมองผู้ดูแลระบบ</h3><p class="mt-2 text-sm leading-6 text-slate-500">เห็นทุกเมนู รวมถึง Document Hub ข้อมูลเอกสารผู้รับผิดชอบ และการตั้งค่าระบบ</p><span class="mt-4 inline-block text-xs font-medium ${state.viewMode === 'admin' ? 'text-violet-700' : 'text-slate-400'}">${state.viewMode === 'admin' ? 'กำลังใช้งาน' : 'เลือกมุมมองนี้'}</span></button></div><div class="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">การตั้งค่านี้เป็นการควบคุมการแสดงผลในเบราว์เซอร์ (LocalStorage) ไม่ใช่ระบบล็อกอินหรือการป้องกันสิทธิ์เข้าถึงข้อมูลจริง หากต้องเผยแพร่ข้อมูลภายใน ควรใช้ระบบยืนยันตัวตนเพิ่มเติม</div></div></section>`; }

/* ส่วนแสดงผลด้านล่างใช้ข้อมูลจริงจาก Google Sheets ผ่าน GAS */
function renderLiveDashboard() {
  const name = escapeHtml(setting('teacher_name'));
  const school = escapeHtml(setting('school_name'));
  const initial = escapeHtml(setting('teacher_initial'));
  const bio = escapeHtml(setting('teacher_bio'));
  return renderDashboard()
    .replace('>ช</div>', `>${initial}</div>`)
    .replaceAll('ครูเฉลิมพล จันทร์แดง', name)
    .replaceAll('โรงเรียนบ้านไร่', school)
    .replace('สร้างการเรียนรู้ สนุก ทันสมัย และเติบโตไปพร้อมผู้เรียน', bio);
}

function renderLiveProfile() {
  const name = escapeHtml(setting('teacher_name'));
  const school = escapeHtml(setting('school_name'));
  const role = escapeHtml(setting('teacher_role'));
  const initial = escapeHtml(setting('teacher_initial'));
  return `<section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"><div class="h-28 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-400"></div><div class="px-6 pb-8 sm:px-10"><div class="-mt-12 grid h-24 w-24 place-items-center rounded-3xl border-4 border-white bg-violet-100 text-3xl font-bold text-violet-700 shadow-sm">${initial}</div><div class="mt-5"><p class="text-sm font-medium text-violet-600">Teacher Profile</p><h2 class="mt-1 text-2xl font-semibold text-slate-800">${name}</h2><p class="mt-1 text-slate-500">${role} · ${school}</p></div><dl class="mt-8 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3"><div><dt class="text-xs text-slate-400">สถานศึกษา</dt><dd class="mt-1 font-medium text-slate-700">${school}</dd></div><div><dt class="text-xs text-slate-400">กลุ่มสาระ/รายวิชา</dt><dd class="mt-1 font-medium text-slate-700">${subjects().map(escapeHtml).join(', ')}</dd></div><div><dt class="text-xs text-slate-400">บทบาท</dt><dd class="mt-1 font-medium text-slate-700">${role}</dd></div></dl></div></section>`;
}

function renderLiveTeaching() {
  const subjectList = subjects();
  return `<section><p class="mb-6 text-sm text-slate-500">รายวิชาหลักที่รับผิดชอบในการจัดการเรียนรู้ ข้อมูลนี้แก้ไขได้ที่ชีต <strong>Settings</strong> แถว <code>subjects</code> โดยคั่นแต่ละรายวิชาด้วยเครื่องหมาย |</p><div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">${subjectList.map((subject, index) => `<article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div class="grid h-11 w-11 place-items-center rounded-xl ${['bg-violet-100 text-violet-700','bg-sky-100 text-sky-700','bg-amber-100 text-amber-700','bg-emerald-100 text-emerald-700'][index % 4]}">${['⌘','◈','⚙','⚖'][index % 4]}</div><h2 class="mt-5 font-semibold text-slate-800">${escapeHtml(subject)}</h2><p class="mt-2 text-sm leading-6 text-slate-500">จัดการเรียนรู้เพื่อพัฒนาทักษะที่จำเป็นของผู้เรียนในศตวรรษที่ 21</p></article>`).join('')}</div><div class="mt-7 grid gap-4 md:grid-cols-3">${quickLink('ตารางสอน', 'ข้อมูลจากชีต Schedule', 'schedule', 'bg-sky-50 text-sky-700')}${quickLink('ภาระงานหลัก', 'ข้อมูลจากชีต Workload', 'workload', 'bg-violet-50 text-violet-700')}${quickLink('งานพิเศษ', 'ข้อมูลจากชีต SpecialTasks', 'special-tasks', 'bg-amber-50 text-amber-700')}</div></section>`;
}

function scheduleCellColor(index) { return ['bg-sky-50 text-sky-700', 'bg-violet-50 text-violet-700', 'bg-amber-50 text-amber-700', 'bg-emerald-50 text-emerald-700', 'bg-pink-50 text-pink-700'][index % 5]; }
function renderLiveSchedule() {
  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
  const records = state.data.schedule;
  const periods = [...new Set(records.map(row => row.Period).filter(Boolean))].sort((a, b) => Number(a) - Number(b));
  const lookup = records.reduce((map, row) => { map[`${row.Day}|${row.Period}`] = row; return map; }, {});
  return `<section><div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><p class="text-sm text-slate-500">แก้ไขตารางสอนได้ที่ชีต <strong>Schedule</strong> แล้วเว็บไซต์จะอัปเดตเมื่อ cache หมดอายุหรือรีเฟรชข้อมูล</p><span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">ประจำสัปดาห์</span></div><div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"><div class="overflow-x-auto"><table class="min-w-[760px] w-full text-sm"><thead class="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"><tr><th class="px-5 py-4 text-left font-medium">คาบ</th>${days.map(day => `<th class="px-5 py-4 text-left font-medium">${day}</th>`).join('')}</tr></thead><tbody>${periods.length ? periods.map((period, periodIndex) => `<tr class="border-t border-slate-100 ${periodIndex % 2 ? 'bg-slate-50/70' : ''}"><td class="px-5 py-4 font-semibold text-violet-700">คาบที่ ${escapeHtml(period)}</td>${days.map((day, dayIndex) => { const row = lookup[`${day}|${period}`]; return `<td class="px-5 py-4">${row ? `<span class="inline-flex flex-col rounded-lg px-2.5 py-1.5 ${scheduleCellColor(dayIndex + periodIndex)}"><span>${escapeHtml(row.Subject)}</span>${row.Class || row.Room ? `<small class="mt-0.5 opacity-75">${escapeHtml([row.Class, row.Room].filter(Boolean).join(' · '))}</small>` : ''}</span>` : '<span class="text-slate-300">-</span>'}</td>`; }).join('')}</tr>`).join('') : `<tr><td colspan="6" class="px-5 py-12 text-center text-slate-400">ยังไม่มีตารางสอน กรุณาเพิ่มข้อมูลในชีต Schedule</td></tr>`}</tbody></table></div></div></section>`;
}

function renderLiveWorkload() {
  const colors = ['bg-violet-100 text-violet-700', 'bg-sky-100 text-sky-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700'];
  return `<section><p class="mb-6 text-sm text-slate-500">รายการจากชีต <strong>Workload</strong> — แก้ไขหรือเพิ่มแถวใน Google Sheets ได้โดยตรง</p><div class="grid gap-5 md:grid-cols-2">${state.data.workload.length ? state.data.workload.map((task, index) => `<article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div class="flex items-start justify-between gap-3"><span class="grid h-11 w-11 place-items-center rounded-xl ${colors[index % colors.length]}">${['⌘','♡','▤','⚙'][index % 4]}</span><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">${escapeHtml(task.Type)}</span></div><h2 class="mt-5 font-semibold text-slate-800">${escapeHtml(task.Title)}</h2><p class="mt-2 text-sm leading-6 text-slate-500">${escapeHtml(task.Description)}</p></article>`).join('') : emptyState('ยังไม่มีข้อมูลภาระงาน กรุณาเพิ่มในชีต Workload', 'md:col-span-2')}</div></section>`;
}

function renderLiveSpecialTasks() {
  const colors = { amber: 'bg-amber-100 text-amber-700', sky: 'bg-sky-100 text-sky-700', rose: 'bg-rose-100 text-rose-700', violet: 'bg-violet-100 text-violet-700', emerald: 'bg-emerald-100 text-emerald-700' };
  return `<section><div class="rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 p-6 sm:p-8"><p class="text-sm font-medium text-violet-700">งานที่ได้รับมอบหมาย</p><h2 class="mt-1 text-2xl font-semibold text-slate-800">งานพิเศษและงานสนับสนุน</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">เพิ่ม แก้ไข หรือลบรายการได้ที่ชีต <strong>SpecialTasks</strong></p><div class="mt-6 grid gap-4 md:grid-cols-3">${state.data.specialTasks.length ? state.data.specialTasks.map((task, index) => `<article class="rounded-2xl bg-white/90 p-5 shadow-sm"><span class="grid h-10 w-10 place-items-center rounded-xl ${colors[task.Accent] || colors.violet}">${['✦','⌘','⚖'][index % 3]}</span><h3 class="mt-4 font-semibold text-slate-800">${escapeHtml(task.Title)}</h3><p class="mt-2 text-sm leading-6 text-slate-500">${escapeHtml(task.Description)}</p></article>`).join('') : emptyState('ยังไม่มีข้อมูลงานพิเศษ กรุณาเพิ่มในชีต SpecialTasks', 'md:col-span-3')}</div></div></section>`;
}

function adminRows(sheet) {
  const dataKeys = { Portfolio: 'portfolio', Documents: 'documents', Schedule: 'schedule', Workload: 'workload', SpecialTasks: 'specialTasks' };
  return state.data[dataKeys[sheet]] || [];
}
function fieldLabel(field) { return ({ ID: 'รหัส', Title: 'ชื่อผลงาน', Doc_Name: 'ชื่อเอกสาร', Category: 'หมวดหมู่', Description: 'รายละเอียด', Image_URL: 'ลิงก์รูปภาพ', Date: 'วันที่', Recipient: 'ผู้รับผิดชอบ', File_URL: 'ลิงก์เอกสาร', Day: 'วัน', Period: 'คาบ', Subject: 'รายวิชา', Class: 'ชั้น/ห้อง', Room: 'ห้องเรียน', Type: 'ประเภทงาน', Accent: 'สีการ์ด' })[field] || field; }
function renderRecordEditor(sheet, record) {
  const fields = ADMIN_SCHEMAS[sheet];
  return `<form id="admin-record-form" class="mt-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-5"><div class="flex items-center justify-between gap-3"><div><h3 class="font-semibold text-slate-800">${record ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'} · ${sheet}</h3><p class="mt-1 text-xs text-slate-500">กรอกข้อมูลแล้วกดบันทึก ระบบจะเขียนลง Google Sheets โดยตรง</p></div><button type="button" data-admin-cancel class="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white">ยกเลิก</button></div><div class="mt-5 grid gap-4 sm:grid-cols-2">${fields.map(field => `<label class="block ${field === 'Description' ? 'sm:col-span-2' : ''}"><span class="mb-1.5 block text-sm font-medium text-slate-700">${fieldLabel(field)}</span>${field === 'Description' ? `<textarea name="${field}" rows="3" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">${escapeHtml(record?.[field] || '')}</textarea>` : `<input name="${field}" value="${escapeHtml(record?.[field] || '')}" ${field === 'ID' && record ? 'readonly' : ''} class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${field === 'ID' && record ? 'text-slate-400' : ''}" />`}</label>`).join('')}</div><input type="hidden" name="sheet" value="${sheet}" /><button class="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700">บันทึกข้อมูล</button></form>`;
}
function renderAdminTable(sheet) {
  const rows = adminRows(sheet); const fields = ADMIN_SCHEMAS[sheet];
  const record = state.adminEditKey ? rows.find(row => row.ID === state.adminEditKey) : null;
  return `<div class="mt-6 rounded-2xl border border-slate-200 bg-white"><div class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 class="font-semibold text-slate-800">จัดการ ${sheet}</h3><p class="mt-1 text-sm text-slate-500">${rows.length} รายการ</p></div><button data-admin-add class="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700">+ เพิ่มรายการ</button></div><div class="overflow-x-auto"><table class="min-w-[760px] w-full text-left text-sm"><thead class="bg-slate-50 text-xs text-slate-500"><tr>${fields.slice(0, 4).map(field => `<th class="px-4 py-3 font-medium">${fieldLabel(field)}</th>`).join('')}<th class="px-4 py-3 text-right font-medium">จัดการ</th></tr></thead><tbody>${rows.length ? rows.map(row => `<tr class="border-t border-slate-100"><td class="px-4 py-3 text-slate-400">${escapeHtml(row.ID)}</td>${fields.slice(1, 4).map(field => `<td class="max-w-[260px] truncate px-4 py-3 text-slate-600">${escapeHtml(row[field])}</td>`).join('')}<td class="whitespace-nowrap px-4 py-3 text-right"><button data-admin-edit="${escapeHtml(row.ID)}" class="rounded-lg px-2.5 py-1.5 text-violet-700 hover:bg-violet-50">แก้ไข</button><button data-admin-delete="${escapeHtml(row.ID)}" class="rounded-lg px-2.5 py-1.5 text-rose-600 hover:bg-rose-50">ลบ</button></td></tr>`).join('') : `<tr><td colspan="5" class="px-5 py-10 text-center text-slate-400">ยังไม่มีรายการ</td></tr>`}</tbody></table></div></div>${state.adminEditKey !== null ? renderRecordEditor(sheet, record) : ''}`;
}
function renderLiveSettings() {
  const siteSettings = [['ชื่อครู', 'teacher_name'], ['สถานศึกษา', 'school_name'], ['ตำแหน่ง', 'teacher_role'], ['อักษรย่อ', 'teacher_initial'], ['คำเกริ่นนำ', 'teacher_bio'], ['รายวิชา (คั่นด้วย |)', 'subjects']];
  const sheets = Object.keys(ADMIN_SCHEMAS);
  return `<section class="max-w-6xl"><div class="rounded-3xl border border-violet-100 bg-white p-6 shadow-soft sm:p-8"><div class="flex items-start gap-4"><div class="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700">${icons.settings}</div><div><h2 class="font-semibold text-slate-800">ศูนย์ควบคุมเว็บไซต์</h2><p class="mt-1 text-sm leading-6 text-slate-500">แก้ไขข้อมูลเว็บไซต์จากหน้านี้ แล้วบันทึกลง Google Sheets ได้ทันที</p></div></div><form id="site-settings-form" class="mt-6 grid gap-4 sm:grid-cols-2">${siteSettings.map(([label, key]) => `<label class="block ${key === 'teacher_bio' || key === 'subjects' ? 'sm:col-span-2' : ''}"><span class="mb-1.5 block text-sm font-medium text-slate-700">${label}</span>${key === 'teacher_bio' ? `<textarea name="${key}" rows="2" class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">${escapeHtml(setting(key))}</textarea>` : `<input name="${key}" value="${escapeHtml(setting(key))}" class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />`}</label>`).join('')}<div class="sm:col-span-2"><button class="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700">บันทึกการตั้งค่าเว็บไซต์</button></div></form></div><div class="mt-7 rounded-3xl border border-violet-100 bg-white p-6 shadow-soft"><div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 class="font-semibold text-slate-800">จัดการข้อมูล</h2><p class="mt-1 text-sm text-slate-500">เพิ่ม แก้ไข หรือลบข้อมูลในฐานข้อมูล</p></div><div class="flex flex-wrap gap-2">${sheets.map(sheet => `<button data-admin-sheet="${sheet}" class="rounded-full px-3 py-2 text-sm ${sheet === state.adminSheet ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-violet-50'}">${sheet}</button>`).join('')}</div></div>${renderAdminTable(state.adminSheet)}</div></section>`;
}
function renderPortfolio() {
  const categories = ['ทั้งหมด', 'ผลงาน/นวัตกรรม', 'กิจกรรมพัฒนาผู้เรียน', 'ผลงานนักเรียน', 'เกียรติบัตรและรางวัล'];
  const items = state.data.portfolio.filter(item => state.portfolioFilter === 'ทั้งหมด' || item.Category === state.portfolioFilter);
  return `<section><div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><p class="max-w-xl text-sm leading-6 text-slate-500">บันทึกผลงาน นวัตกรรม กิจกรรม และความภาคภูมิใจในการพัฒนาผู้เรียน</p><span class="text-sm text-slate-400">${items.length} รายการ</span></div><div class="mb-6 flex gap-2 overflow-x-auto pb-1">${categories.map(cat => `<button class="whitespace-nowrap rounded-full px-4 py-2 text-sm ${cat === state.portfolioFilter ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'}" data-portfolio-filter="${cat}">${cat}</button>`).join('')}</div><div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">${items.length ? items.map(portfolioCard).join('') : emptyState('ไม่พบผลงานในหมวดหมู่นี้', 'col-span-full')}</div></section>`;
}
function portfolioCard(item) { const fallback = `https://placehold.co/800x600/eef7ff/0d6098?text=${encodeURIComponent('Teacher E-Portfolio')}`; return `<article class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"><div class="aspect-[4/3] overflow-hidden bg-slate-100"><img class="h-full w-full object-cover transition duration-500 group-hover:scale-105" src="${escapeHtml(item.Image_URL || fallback)}" alt="${escapeHtml(item.Title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"></div><div class="p-5"><div class="flex items-center justify-between gap-2"><span class="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">${escapeHtml(item.Category)}</span><time class="shrink-0 text-xs text-slate-400">${formatDate(item.Date)}</time></div><h2 class="mt-3 line-clamp-2 font-semibold text-slate-800">${escapeHtml(item.Title)}</h2><p class="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">${escapeHtml(item.Description)}</p></div></article>`; }
function renderDocuments() {
  const categories = ['ทั้งหมด', 'งานวิชาการ', 'คำสั่งโรงเรียน', 'แบบฟอร์มทั่วไป'];
  const docs = filteredDocuments();
  return `<section><div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><p class="max-w-xl text-sm leading-6 text-slate-500">ค้นหาและเปิดเอกสารจาก Google Drive ได้ทันที</p><span class="text-sm text-slate-400">${docs.length} รายการ</span></div><div class="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]"><label class="relative"><span class="sr-only">ค้นหาเอกสาร</span><span class="pointer-events-none absolute left-3 top-2.5 text-slate-400">⌕</span><input id="document-search" value="${escapeHtml(state.documentSearch)}" class="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="ค้นหาชื่อเอกสาร หรือผู้รับ..." /></label><select id="document-filter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">${categories.map(cat => `<option value="${cat}" ${cat === state.documentFilter ? 'selected' : ''}>${cat}</option>`).join('')}</select></div><div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"><div class="overflow-x-auto"><table class="w-full min-w-[700px] text-left text-sm"><thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th class="px-5 py-4 font-medium">เอกสาร</th><th class="px-5 py-4 font-medium">หมวดหมู่</th><th class="px-5 py-4 font-medium">ผู้รับผิดชอบ</th><th class="px-5 py-4 font-medium">วันที่</th><th class="px-5 py-4 text-right font-medium">จัดการ</th></tr></thead><tbody>${docs.length ? docs.map((doc, i) => `<tr class="border-t border-slate-100 ${i % 2 ? 'bg-slate-50/60' : 'bg-white'} hover:bg-brand-50/40"><td class="max-w-xs px-5 py-4 font-medium text-slate-700"><div class="flex items-center gap-3"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-500">PDF</span><span class="truncate">${escapeHtml(doc.Doc_Name)}</span></div></td><td class="px-5 py-4"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">${escapeHtml(doc.Category)}</span></td><td class="px-5 py-4 text-slate-600">${escapeHtml(doc.Recipient)}</td><td class="px-5 py-4 text-slate-500">${formatDate(doc.Date)}</td><td class="px-5 py-4 text-right">${doc.File_URL ? `<a href="${escapeHtml(doc.File_URL)}" target="_blank" rel="noopener noreferrer" class="inline-flex rounded-lg bg-brand-600 px-3 py-2 text-xs font-medium text-white hover:bg-brand-700">เปิดดูเอกสาร ↗</a>` : '<span class="text-xs text-slate-400">ยังไม่มีลิงก์</span>'}</td></tr>`).join('') : `<tr><td colspan="5" class="px-5 py-12 text-center text-slate-400">ไม่พบเอกสารที่ค้นหา</td></tr>`}</tbody></table></div></div></section>`;
}
function filteredDocuments() { const query = state.documentSearch.trim().toLowerCase(); return state.data.documents.filter(doc => (state.documentFilter === 'ทั้งหมด' || doc.Category === state.documentFilter) && (!query || [doc.Doc_Name, doc.Category, doc.Recipient].some(value => String(value || '').toLowerCase().includes(query)))); }
function emptyState(message, classes = '') { return `<div class="${classes} rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-400">${message}</div>`; }

function renderLoading() { $('#content').innerHTML = `<div class="grid gap-5 md:grid-cols-3">${Array.from({length: 6}, () => '<div class="skeleton h-64 rounded-2xl"></div>').join('')}</div>`; }
function showToast(message, type = 'error') { const toast = document.createElement('div'); toast.className = `max-w-sm rounded-xl border px-4 py-3 text-sm shadow-lg ${type === 'error' ? 'border-rose-100 bg-rose-50 text-rose-700' : 'border-emerald-100 bg-emerald-50 text-emerald-700'}`; toast.textContent = message; $('#toast-container').append(toast); setTimeout(() => toast.remove(), 5000); }
function getCache() { try { const cached = JSON.parse(localStorage.getItem(CONFIG.CACHE_KEY)); return cached && Date.now() - cached.savedAt < CONFIG.CACHE_MAX_AGE_MS ? cached.data : null; } catch { return null; } }
function saveCache(data) { try { localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data })); } catch { /* localStorage is optional */ } }
async function fetchData(forceRefresh = false) {
  renderLoading(); $('#data-status').textContent = 'กำลังโหลดข้อมูล…';
  const cached = forceRefresh ? null : getCache();
  if (cached) { state.data = normalizeData(cached); $('#data-status').textContent = 'ใช้ข้อมูลที่บันทึกไว้'; renderPage(); return; }
  try {
    const data = CONFIG.USE_MOCK_DATA ? window.MOCK_DATA : await fetch(CONFIG.API_URL, { method: 'GET', redirect: 'follow' }).then(async response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); });
    if (!data || data.status !== 'success') throw new Error(data?.message || 'รูปแบบข้อมูลจาก API ไม่ถูกต้อง');
    state.data = normalizeData(data); saveCache(state.data); $('#data-status').textContent = CONFIG.USE_MOCK_DATA ? 'โหมดข้อมูลจำลอง' : 'เชื่อมต่อข้อมูลแล้ว'; renderPage();
  } catch (error) {
    state.data = normalizeData(window.MOCK_DATA); $('#data-status').textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'; showToast(`ดึงข้อมูลไม่สำเร็จ: ${error.message} — แสดงข้อมูลจำลองแทน`); renderPage();
  }
}
function bindPageEvents() {
  document.querySelectorAll('[data-portfolio-filter]').forEach(button => button.addEventListener('click', () => { state.portfolioFilter = button.dataset.portfolioFilter; renderPage(); renderNavigation(); }));
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setRoute(button.dataset.go)));
  const search = $('#document-search'); if (search) search.addEventListener('input', event => { state.documentSearch = event.target.value; const position = event.target.selectionStart; $('#content').innerHTML = renderDocuments(); bindPageEvents(); $('#document-search').focus(); $('#document-search').setSelectionRange(position, position); });
  const filter = $('#document-filter'); if (filter) filter.addEventListener('change', event => { state.documentFilter = event.target.value; renderPage(); });
  document.querySelectorAll('[data-admin-sheet]').forEach(button => button.addEventListener('click', () => { state.adminSheet = button.dataset.adminSheet; state.adminEditKey = null; renderPage(); }));
  document.querySelectorAll('[data-admin-add]').forEach(button => button.addEventListener('click', () => { state.adminEditKey = ''; renderPage(); }));
  document.querySelectorAll('[data-admin-cancel]').forEach(button => button.addEventListener('click', () => { state.adminEditKey = null; renderPage(); }));
  document.querySelectorAll('[data-admin-edit]').forEach(button => button.addEventListener('click', () => { state.adminEditKey = button.dataset.adminEdit; renderPage(); }));
  document.querySelectorAll('[data-admin-delete]').forEach(button => button.addEventListener('click', async () => {
    if (!window.confirm('ต้องการลบรายการนี้ใช่หรือไม่? การลบจะมีผลกับ Google Sheets ทันที')) return;
    try { await adminRequest('deleteRecord', { sheet: state.adminSheet, key: button.dataset.adminDelete }); state.adminEditKey = null; await fetchData(true); showToast('ลบรายการเรียบร้อย', 'success'); }
    catch (error) { showToast(error.message); }
  }));
  const recordForm = $('#admin-record-form'); if (recordForm) recordForm.addEventListener('submit', async event => {
    event.preventDefault(); const formData = new FormData(recordForm); const record = Object.fromEntries(formData.entries());
    try { await adminRequest('saveRecord', { sheet: record.sheet, record }); state.adminEditKey = null; await fetchData(true); showToast('บันทึกรายการเรียบร้อย', 'success'); }
    catch (error) { showToast(error.message); }
  });
  const settingsForm = $('#site-settings-form'); if (settingsForm) settingsForm.addEventListener('submit', async event => {
    event.preventDefault(); const formData = new FormData(settingsForm); const records = [...formData.entries()].map(([Key, Value]) => ({ Key, Value }));
    try { await adminRequest('saveSettings', { records }); await fetchData(true); showToast('บันทึกการตั้งค่าเว็บไซต์เรียบร้อย', 'success'); }
    catch (error) { showToast(error.message); }
  });
}
function openMenu() { $('#sidebar').classList.remove('-translate-x-full'); $('#sidebar-overlay').classList.remove('hidden'); }
function closeMenu() { $('#sidebar').classList.add('-translate-x-full'); $('#sidebar-overlay').classList.add('hidden'); }
function init() {
  const hashRoute = window.location.hash.slice(1); if (routeMeta[hashRoute]) state.route = hashRoute;
  if (!isAdmin() && ['academic', 'orders', 'forms', 'settings'].includes(state.route)) state.route = 'dashboard';
  renderNavigation(); syncAdminUI(); $('#navigation').addEventListener('click', event => { const button = event.target.closest('[data-route]'); if (button) setRoute(button.dataset.route, button.dataset.label); });
  $('#menu-button').addEventListener('click', openMenu); $('#close-menu-button').addEventListener('click', closeMenu); $('#sidebar-overlay').addEventListener('click', closeMenu);
  $('#refresh-data-button').addEventListener('click', () => { fetchData(true); showToast('กำลังดึงข้อมูลล่าสุดจากฐานข้อมูล', 'success'); });
  $('#admin-access-button').addEventListener('click', () => { if (isAdmin()) logoutAdmin(); else showAdminLogin(); });
  $('#close-admin-login').addEventListener('click', closeAdminLogin);
  $('#admin-login-modal').addEventListener('click', event => { if (event.target === $('#admin-login-modal')) closeAdminLogin(); });
  $('#admin-login-form').addEventListener('submit', async event => {
    event.preventDefault(); const errorBox = $('#admin-login-error'); const submitButton = $('#admin-login-submit');
    errorBox.classList.add('hidden'); submitButton.disabled = true; submitButton.textContent = 'กำลังตรวจสอบ…';
    try { await loginAdmin($('#admin-password').value); }
    catch (error) { errorBox.textContent = error.message; errorBox.classList.remove('hidden'); }
    finally { submitButton.disabled = false; submitButton.textContent = 'เข้าสู่ระบบ'; }
  });
  $('#collapse-button').addEventListener('click', () => { document.body.classList.toggle('sidebar-collapsed'); $('#collapse-button span').textContent = document.body.classList.contains('sidebar-collapsed') ? '›' : '‹'; });
  window.addEventListener('hashchange', () => { const route = window.location.hash.slice(1); if (routeMeta[route] && route !== state.route) setRoute(route); }); fetchData();
}
document.addEventListener('DOMContentLoaded', init);
