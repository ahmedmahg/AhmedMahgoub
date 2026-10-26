// mobile menu
(function(){
  var b=document.querySelector('.menu-btn'), n=document.getElementById('nav');
  b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);});
  n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false);}});
})();

// LinkedIn-style durations, worked out from the dates so they never drift
(function(){
  var now=new Date();
  function parse(s){if(s==='present')return{y:now.getFullYear(),m:now.getMonth()+1};var p=s.split('-');return{y:+p[0],m:+p[1]};}
  document.querySelectorAll('[data-from]').forEach(function(el){
    var a=parse(el.dataset.from), b=parse(el.dataset.to);
    var mo=(b.y-a.y)*12+(b.m-a.m)+1, y=Math.floor(mo/12), m=mo%12, out=[];
    if(y) out.push(y+(y>1?' yrs':' yr'));
    if(m) out.push(m+(m>1?' mos':' mo'));
    el.textContent+=' · '+out.join(' ');
  });
  var yr=document.getElementById('yr'); if(yr) yr.textContent=now.getFullYear();
})();

// project videos load and play only when they scroll into view
(function(){
  var vids=document.querySelectorAll('video[data-src]');
  if(!('IntersectionObserver' in window)){vids.forEach(function(v){v.src=v.dataset.src;});return;}
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var v=e.target;
    if(e.isIntersecting){if(!v.src)v.src=v.dataset.src; if(!reduce)v.play().catch(function(){});}
    else if(v.src){v.pause();}
  });},{rootMargin:'200px 0px'});
  vids.forEach(function(v){io.observe(v);});
})();
