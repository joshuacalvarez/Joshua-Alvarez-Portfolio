(function(){
  const pre = document.getElementById('preloader');
  const fg  = document.querySelector('#logo-bar .logo.fg');
  const pct = document.getElementById('prePercent');

  const imgs = Array.from(document.images||[]);
  let total = Math.max(1, imgs.length), done = 0;
  const setProgress = p => {
    const x = Math.max(0, Math.min(100, Math.round(p)));
    fg.style.clipPath = `inset(0 ${100 - x}% 0 0)`; // reveal left→right
    pct.textContent = x + '%';
  };
  const mark = () => { done++; setProgress((done/total)*100); };

  imgs.forEach(img => img.complete ? mark() : (img.addEventListener('load',mark,{once:true}), img.addEventListener('error',mark,{once:true})));

  const MIN_SHOW_MS = 600, start = performance.now();
  function hide(){
    const wait = Math.max(0, MIN_SHOW_MS - (performance.now()-start));
    setTimeout(()=>{ pre.classList.add('hidden'); document.documentElement.classList.remove('preloading'); setTimeout(()=>pre.remove(),400); }, wait);
  }
  window.addEventListener('load', ()=>{ done = total; setProgress(100); (document.fonts?.ready||Promise.resolve()).then(hide); });
  setTimeout(hide, 8000); // safety
})();