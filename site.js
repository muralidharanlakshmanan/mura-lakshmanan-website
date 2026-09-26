
window.__carousels=function(){const draft=document.documentElement.classList.contains('draft');
document.querySelectorAll('.carousel').forEach(c=>{const all=[...c.querySelectorAll('.ph')];const slides=all.filter(p=>draft||!p.classList.contains('empty'));
 all.forEach(p=>p.classList.remove('on'));c.classList.toggle('none',!slides.length);c.classList.toggle('single',slides.length<2);if(!slides.length)return;
 let i=0;const cap=c.querySelector('.cap');const show=()=>{slides.forEach((p,k)=>p.classList.toggle('on',k===i));if(cap){const img=slides[i].querySelector('img');cap.textContent=(i+1)+' / '+slides.length+(img&&img.alt&&!slides[i].classList.contains('empty')?' · '+img.alt:'');}};
 const [pv,nx]=c.querySelectorAll('.cnav button');if(pv&&!pv.dataset.b){pv.dataset.b=1;pv.onclick=()=>{i=(i-1+slides.length)%slides.length;show()};nx.onclick=()=>{i=(i+1)%slides.length;show()};}
 show();});};
window.addEventListener('load',()=>window.__carousels());

(function(){const h=document.querySelector('.site-head'),b=document.querySelector('.menu-btn');if(!b)return;
b.addEventListener('click',()=>{const o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});})();

(function(){
  var head=document.querySelector('.site-head'), tabs=document.querySelector('.tabs');
  if(!head||!tabs) return;
  function check(){
    if(window.innerWidth<=640) return; // small-screen CSS breakpoint already forces the menu here
    var overflowing = tabs.scrollWidth > tabs.clientWidth + 1;
    if(!overflowing) head.classList.remove('open');
    head.classList.toggle('compact', overflowing);
  }
  window.addEventListener('resize', check);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(check); }
  check();
})();

(function(){const ps=[...document.querySelectorAll('.ph')];let left=ps.length;const done=()=>{if(--left<=0&&window.__carousels)window.__carousels();};
ps.forEach(f=>{const i=f.querySelector('img');const bad=()=>{f.classList.add('empty');};
 if(!i||!i.getAttribute('src')){bad();return done();}
 if(i.complete){if(!i.naturalWidth)bad();done();}else{i.addEventListener('error',()=>{bad();done()});i.addEventListener('load',done);}});
if(!ps.length&&window.__carousels)window.__carousels();})();

(function(){
  const cv=document.getElementById('flow'); if(!cv) return; const ctx=cv.getContext('2d');
  const ratioEl=document.getElementById('ratio'); const rm=window.matchMedia('(prefers-reduced-motion: reduce)');
  let W=0,H=0,parts=[],hits=0,total=0,last=0,spawn=0,running=true;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function size(){const d=Math.min(2,window.devicePixelRatio||1);const r=cv.getBoundingClientRect();W=r.width;H=r.height;if(!W)return;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);}
  const nodes=()=>({c:{x:W*.07,y:H*.52},k:{x:W*.5,y:H*.52},o:{x:W*.93,y:H*.52}});
  function path(miss){const n=nodes(),g=10;const out=[[n.c.x,n.c.y-g],[n.k.x,n.k.y-g]],back=[[n.k.x,n.k.y+g],[n.c.x,n.c.y+g]];
    return miss?[...out,[n.o.x,n.o.y-g],[n.o.x,n.o.y+g],...back]:[...out,...back];}
  function at(p,t){let L=[],s=0;for(let i=1;i<p.length;i++){const d=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);L.push(d);s+=d}
    let q=t*s;for(let i=0;i<L.length;i++){if(q<=L[i]){const f=L[i]?q/L[i]:0;return[p[i][0]+(p[i+1][0]-p[i][0])*f,p[i][1]+(p[i+1][1]-p[i][1])*f]}q-=L[i]}return p[p.length-1];}
  function base(){const n=nodes(),ink=css('--ink'),mu=css('--muted');ctx.clearRect(0,0,W,H);ctx.strokeStyle=css('--rule');ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(n.c.x,n.c.y-10);ctx.lineTo(n.o.x,n.o.y-10);ctx.moveTo(n.c.x,n.c.y+10);ctx.lineTo(n.o.x,n.o.y+10);ctx.stroke();
    ctx.font='600 13px "Bricolage Grotesque", Arial, sans-serif';ctx.textAlign='center';
    [[n.c,'Client'],[n.k,'In-memory cache'],[n.o,'System of record']].forEach(([p,l],i)=>{ctx.fillStyle=css('--paper');ctx.strokeStyle=ink;ctx.lineWidth=i===1?2.5:1.5;
      const w=i===1?22:14;ctx.beginPath();ctx.rect(p.x-w/2,p.y-w,w,w*2);ctx.fill();ctx.stroke();ctx.fillStyle=i===1?ink:mu;ctx.fillText(l,Math.min(Math.max(p.x,60),W-60),p.y-w-12);});}
  function dot(x,y,m){ctx.fillStyle=m?css('--signal'):css('--ink');ctx.beginPath();ctx.arc(x,y,m?3.6:2.6,0,Math.PI*2);ctx.fill();}
  function frame(ts){if(!W){size();requestAnimationFrame(frame);return}const dt=last?Math.min(50,ts-last):16;last=ts;spawn+=dt;
    while(spawn>90){spawn-=90;const m=Math.random()<.06;parts.push({t:0,m,v:m?.00022:.00055*(.85+Math.random()*.3)})}
    base();parts=parts.filter(p=>{p.t+=p.v*dt;if(p.t>=1){total++;if(!p.m)hits++;return false}const[x,y]=at(path(p.m),p.t);dot(x,y,p.m);return true});
    if(total)ratioEl.textContent=(hits/total*100).toFixed(1)+'%';requestAnimationFrame(frame);}
  size();window.addEventListener('resize',size);
  if(rm.matches){base();for(let i=0;i<40;i++){const m=i%12===0;const[x,y]=at(path(m),i/40);dot(x,y,m)}ratioEl.textContent='~94%';}
  else requestAnimationFrame(frame);
  window.__flowResize=size;
})();

(function(){
  const cv=document.getElementById('flow2'); if(!cv) return; const ctx=cv.getContext('2d');
  const rm=window.matchMedia('(prefers-reduced-motion: reduce)');
  const btns=[...document.querySelectorAll('.modes button')];
  const elReq=document.getElementById('f2-req'), elExt=document.getElementById('f2-ext'), elMem=document.getElementById('f2-mem'), elNote=document.getElementById('f2-note');
  let mode='after',W=0,H=0,parts=[],warm=[],req=0,ext=0,mem=0,last=0,spawn=0,wspawn=0;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function size(){const d=Math.min(2,window.devicePixelRatio||1);const r=cv.getBoundingClientRect();W=r.width;H=r.height;if(!W)return;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);if(rm.matches)still();}
  const X=()=>({c:W*.07,k:W*.5,o:W*.93,y:H*.58});
  function path(kind){const n=X(),g=10,y=n.y;
    if(kind==='direct')return[[n.c,y-g],[n.o,y-g],[n.o,y+g],[n.c,y+g]];
    if(kind==='miss')return[[n.c,y-g],[n.k,y-g],[n.o,y-g],[n.o,y+g],[n.k,y+g],[n.c,y+g]];
    return[[n.c,y-g],[n.k,y-g],[n.k,y+g],[n.c,y+g]];}
  function at(p,t){let L=[],s=0;for(let i=1;i<p.length;i++){const d=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);L.push(d);s+=d}
    let q=t*s;for(let i=0;i<L.length;i++){if(q<=L[i]){const f=L[i]?q/L[i]:0;return[p[i][0]+(p[i+1][0]-p[i][0])*f,p[i][1]+(p[i+1][1]-p[i][1])*f]}q-=L[i]}return p[p.length-1];}
  function box(x,y,w,h,thick,dashed,fill){ctx.save();ctx.setLineDash(dashed?[4,4]:[]);ctx.fillStyle=css('--paper');ctx.strokeStyle=css(dashed?'--muted':'--ink');ctx.lineWidth=thick;
    ctx.beginPath();ctx.rect(x-w/2,y-h/2,w,h);ctx.fill();ctx.stroke();ctx.restore();}
  function label(t,x,y,strong,al){ctx.font=(strong?'600 ':'500 ')+'13px "Bricolage Grotesque", Arial, sans-serif';ctx.textAlign=al||'center';ctx.fillStyle=css(strong?'--ink':'--muted');ctx.fillText(t,al==='left'?Math.max(x-8,0):al==='right'?Math.min(x+8,W):x,y);}
  function base(){const n=X(),y=n.y,after=mode==='after';ctx.clearRect(0,0,W,H);ctx.strokeStyle=css('--rule');ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(n.c,y-10);ctx.lineTo(n.o,y-10);ctx.moveTo(n.c,y+10);ctx.lineTo(n.o,y+10);
    if(after){ctx.moveTo(n.k,y-34);ctx.lineTo(n.o,y-34);}ctx.stroke();
    box(n.c,y,14,34,1.5);label(W<520?'Channels':'Web, mobile, service, assistant',n.c,y-54,false,'left');
    if(after){box(n.k,y,24,48,2.5);label('Caching platform',n.k,y-54,true);box(n.o,y,14,34,1.5);label('Source of record',n.o,y-54,false,'right');}
    else{box(n.k,y,24,48,1.5,true);label('No shared data layer',n.k,y-54,false);box(n.o,y,14,34,1.5);label(W<520?'External calls':'External third-party calls',n.o,y-54,true,'right');}
    ctx.font='500 12px "Bricolage Grotesque", Arial, sans-serif';ctx.fillStyle=css('--muted');ctx.textAlign='center';
    ctx.fillText(after?'Most requests end here':'Every request travels the full distance',after?n.k:(n.c+n.o)/2,y+48);}
  function dot(x,y,c,r){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function counters(){elReq.textContent=req.toLocaleString();elExt.textContent=ext.toLocaleString();elMem.textContent=req?Math.round(mem/req*100)+'%':'—';}
  function setMode(m){mode=m;parts=[];warm=[];req=ext=mem=0;counters();btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m));
    elNote.textContent=m==='after'?'Frequently requested data is pre-positioned in memory and kept consistent with the source of record. Only misses leave the platform.':'Each request for customer or account data went out to an external provider, adding cost and latency every time.';
    if(rm.matches)still();}
  btns.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  function still(){if(!W)return;base();const n=X();const ink=css('--ink'),sig=css('--signal'),mu=css('--muted');
    for(let i=0;i<30;i++){const k=mode==='before'?'direct':(i%12===0?'miss':'hit');const[x,y]=at(path(k),i/30);dot(x,y,k==='hit'?ink:sig,k==='hit'?2.6:3.4);}
    if(mode==='after')for(let i=0;i<4;i++)dot(n.o-(n.o-n.k)*(i+.5)/4,n.y-34,mu,2.4);
    elReq.textContent='—';elExt.textContent=mode==='before'?'All':'Misses only';elMem.textContent=mode==='before'?'0%':'Most';}
  function frame(ts){if(!W){size();requestAnimationFrame(frame);return}const dt=last?Math.min(50,ts-last):16;last=ts;
    const after=mode==='after';spawn+=dt;const every=after?90:260;
    while(spawn>every){spawn-=every;let k='direct';if(after)k=Math.random()<.06?'miss':'hit';
      parts.push({t:0,k,v:k==='hit'?.00055*(.85+Math.random()*.3):k==='miss'?.00022:.00011*(.85+Math.random()*.3)});}
    if(after){wspawn+=dt;if(wspawn>520){wspawn=0;warm.push({t:0})}}
    base();const ink=css('--ink'),sig=css('--signal'),mu=css('--muted'),n=X();
    warm=warm.filter(w=>{w.t+=.0005*dt;if(w.t>=1)return false;dot(n.o-(n.o-n.k)*w.t,n.y-34,mu,2.4);return true});
    parts=parts.filter(p=>{p.t+=p.v*dt;if(p.t>=1){req++;if(p.k==='hit')mem++;else ext++;return false}
      const[x,y]=at(path(p.k),p.t);dot(x,y,p.k==='hit'?ink:sig,p.k==='hit'?2.6:3.4);return true});
    counters();requestAnimationFrame(frame);}
  size();window.addEventListener('resize',size);window.__flow2Resize=size;setMode('after');
  if(!rm.matches)requestAnimationFrame(frame);
})();
