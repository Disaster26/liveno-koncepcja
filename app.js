(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function sc(){top.classList.toggle('sc',window.scrollY>8)}
  window.addEventListener('scroll',sc,{passive:true});sc();
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();lbZ()}});
  // aktywna pozycja menu
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s)});
  }
  // tory kart: przeciaganie mysza + strzalki
  var klik=false;
  document.querySelectorAll('.tor').forEach(function(tor){
    var down=false,sx=0,sl=0;
    function krok(){var k=tor.children[0];return k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||0)}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;klik=false;sx=e.clientX;sl=tor.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){klik=true;tor.classList.add('drag')}if(klik)tor.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(klik){var w=krok();tor.classList.remove('drag');tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'});setTimeout(function(){klik=false},50)}});
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    tor.addEventListener('click',function(e){if(klik){e.preventDefault();e.stopPropagation()}},true);
    var nav=document.querySelector('.nav[data-tor="'+tor.id+'"]');
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:krok()*(+b.dataset.k),behavior:'smooth'})})});
  });
  // lightbox
  var lb=document.getElementById('lb'),li=lb&&lb.querySelector('img');
  function lbZ(){if(lb){lb.classList.remove('on');li.removeAttribute('src')}}
  document.querySelectorAll('[data-lb]').forEach(function(el){el.addEventListener('click',function(){if(klik)return;li.src=el.dataset.lb;var im=el.querySelector('img');li.alt=im?im.alt:'';lb.classList.add('on');lb.querySelector('button').focus()})});
  if(lb)lb.addEventListener('click',lbZ);
  // mapa przy przewinieciu
  var m=document.getElementById('mapa');
  function load(){if(m.dataset.ok)return;m.dataset.ok=1;var f=document.createElement('iframe');f.src=m.dataset.src;f.title=m.getAttribute('aria-label')||'Mapa';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}
  if(m){if('IntersectionObserver' in window){var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();mo.disconnect()}},{rootMargin:'300px'});mo.observe(m)}else load()}
  // formularz pokazowy
  var f=document.getElementById('form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();f.classList.add('wys')});
})();
