(function(){try{if(window.__mfk)return;window.__mfk=1;var l=location,h=l.hostname,n=navigator,r='',q0='',p=l.pathname.slice(0,300),K='sb_publishable_UnQ35pj_GatInq-7lhFGgQ_DnRoUnDC',M=/(^|\.)mushafuk\.online$/;if(!M.test(h)||/^\/admin(\/|$)/.test(p)||n.webdriver||/bot|crawl|spider|slurp|preview|headless|lighthouse/i.test(n.userAgent))return;function S(t,o){fetch('https://isvqwafixlmusmuqqnyk.supabase.co/rest/v1/'+t,{method:'POST',keepalive:true,headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(o)}).catch(function(){})}try{r=new URL(document.referrer).hostname}catch(e){}if(M.test(r))r='';r=r||null;if(window.__mfk404){S('events',{host:h,kind:'404',path:p,ref_host:r});return}window.mfkS=function(q,c){q=String(q||'').trim().slice(0,100);if(q&&q!==q0){q0=q;S('events',{host:h,kind:'search',path:p,q:q,results:c|0})}};S('pageviews',{host:h,path:p,ref_host:r,lang:(document.documentElement.lang||n.language||'').slice(0,12),device:innerWidth<768?'mobile':'desktop'})}catch(e){}})();
(function () {
  var s = document.currentScript;
  (function () {
    var base = (s && s.src) ? s.src.replace(/turn\.js[^/]*$/, "") : "/";
    if (!document.querySelector("script[src*='read-theme.js']")) {
      var th = document.createElement("script");
      th.src = base + "read-theme.js?v=1";
      document.head.appendChild(th);
    }
  })();
  var next = s.getAttribute("data-next") || "";
  var prev = s.getAttribute("data-prev") || "";
  try { sessionStorage.removeItem("qm.tfdir"); } catch (e) {}
  document.documentElement.classList.remove("qm-turning");

  function warm(url, attr, left) {
    if (!url || left < 0) return;
    var l = document.createElement("link");
    l.rel = "prefetch";
    l.as = "document";
    l.href = url;
    document.head.appendChild(l);
    if (!left) return;
    fetch(url).then(function (r) { return r.text(); }).then(function (html) {
      var m = html.match(new RegExp(attr + '="([^"]*)"'));
      if (m && m[1]) warm(m[1], attr, left - 1);
    }).catch(function () {});
  }
  warm(next, "data-next", 2);
  warm(prev, "data-prev", 2);
  try {
    if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
      var spec = document.createElement("script");
      spec.type = "speculationrules";
      var urls = [next, prev].filter(Boolean);
      spec.textContent = JSON.stringify({
        prerender: [{ source: "list", urls: urls.slice(0, 1) }],
        prefetch: [{ source: "list", urls: urls }]
      });
      document.head.appendChild(spec);
    }
  } catch (e) {}
  if (!document.querySelector("a.home-brand")) {
    var st = document.createElement("style");
    st.textContent = "a.home-brand{display:flex;align-items:center;gap:.28rem;margin-inline-start:auto;flex:none;text-decoration:none;color:#12352c;font-weight:700;font-size:.72rem;line-height:1}a.home-brand img{width:1.05rem;height:1.05rem;border-radius:22%;display:block}";
    document.head.appendChild(st);
    var brand = document.createElement("a");
    brand.className = "home-brand";
    brand.href = "https://mushafuk.online/";
    brand.setAttribute("aria-label", "Mushafuk");
    brand.innerHTML = '<img src="https://mushafuk.online/icon.png" alt="" width="18" height="18"><span>Mushafuk</span>';
    var bar = document.querySelector(".bar");
    if (bar) bar.appendChild(brand);
  }

  var x = null, y = null, t0 = 0, lock = null, lastX = 0, lastY = 0;
  function selecting() {
    try { var s = window.getSelection(); return s && String(s).length > 0; } catch (e) { return false; }
  }
  function shouldTurn(dx, dy, dt) {
    if (window.QM_shouldTurnPage) return window.QM_shouldTurnPage(dx, dy, dt, window.innerWidth);
    if (dt >= 800 || selecting()) return 0;
    var min = Math.max(60, window.innerWidth * 0.15);
    if (Math.abs(dx) < min || Math.abs(dx) <= 1.5 * Math.abs(dy || 0)) return 0;
    return dx > 0 ? 1 : -1;
  }
  function go(dir) {
    var u = dir > 0 ? next : prev;
    if (u) location.assign(u);
  }
  function down(cx, cy, target) {
    if (target && target.closest && target.closest("a,button,input,textarea,select,label")) { x = null; return; }
    if (selecting()) { x = null; return; }
    x = cx; y = cy; t0 = performance.now(); lock = null; lastX = cx; lastY = cy;
  }
  function move(cx, cy, ev) {
    if (x == null) return;
    var dx = cx - x, dy = cy - y;
    lastX = cx; lastY = cy;
    if (!lock) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      lock = Math.abs(dx) > Math.abs(dy) * 1.5 ? "x" : "y";
    }
    if (lock === "x" && ev && ev.cancelable) ev.preventDefault();
  }
  function up() {
    if (x == null) return;
    var dx = lastX - x, dy = lastY - y, dt = performance.now() - t0, was = lock;
    x = null; lock = null;
    if (was === "y") return;
    var dir = shouldTurn(dx, dy, dt);
    if (dir) go(dir);
  }

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { x = null; lock = null; return; }
    down(e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { capture: true, passive: true });
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length !== 1) { x = null; lock = null; return; }
    if (!e.touches.length) return;
    move(e.touches[0].clientX, e.touches[0].clientY, e);
  }, { capture: true, passive: false });
  document.addEventListener("touchend", function (e) {
    if (e.touches && e.touches.length) { x = null; lock = null; return; }
    up();
  }, true);
  document.addEventListener("touchcancel", function () { x = null; lock = null; }, true);
  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    down(e.clientX, e.clientY, e.target);
  }, true);
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch" || x == null) return;
    move(e.clientX, e.clientY, e);
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (e.pointerType === "touch") return;
    up();
  }, true);
})();

;try{var qs=document.createElement("script");qs.src="https://mushafuk.online/read-shelf.js?v=3";document.head.appendChild(qs);}catch(e){}
