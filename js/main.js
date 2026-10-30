/* пути к фото товаров: ключ из поля img → файл */
var IMG={
  "nutcracker": "img/products/nutcracker.jpg",
  "rabbit": "img/products/rabbit.jpg",
  "grapes": "img/products/grapes.jpg",
  "oranges_dish": "img/products/oranges_dish.jpg",
  "apricots": "img/products/apricots.jpg",
  "dog": "img/products/dog.jpg",
  "crab": "img/products/crab.jpg",
  "lemons_deep": "img/products/lemons_deep.jpg",
  "oranges_deep": "img/products/oranges_deep.jpg",
  "r5c5": "img/products/tumbler-tomatoes.jpg",
  "r6c5": "img/products/teacup-lemons.jpg",
  "r6c2": "img/products/vase-bird.jpg",
  "r6c3": "img/products/tile-lemons.jpg"
};
(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};

  /* ===== товары: здесь заказчица ставит метки stock/order/new/hit ===== */
  var P=[
    {id:'apelsinovyj-sad',img:'oranges_deep',name:'Тарелка «Апельсиновый сад»',cat:'tarelki',sub:'glubokie',tags:['stock','new']},
    {id:'vinograd',img:'grapes',name:'Тарелка «Виноград»',cat:'tarelki',sub:'glubokie',tags:['stock','new']},
    {id:'krab',img:'crab',name:'Тарелка «Краб»',cat:'tarelki',sub:'glubokie',tags:['order','new','hit']},
    {id:'limony',img:'lemons_deep',name:'Тарелка «Лимоны»',cat:'tarelki',sub:'glubokie',tags:['stock','hit']},
    {id:'shchelkunchik',img:'nutcracker',name:'Тарелка «Щелкунчик»',cat:'tarelki',sub:'malye',tags:['order','new']},
    {id:'apelsiny',img:'oranges_dish',name:'Блюдо «Апельсины»',cat:'tarelki',sub:'bluda',tags:['stock','hit']},
    {id:'abrikosy',img:'apricots',name:'Блюдо «Абрикосы»',cat:'tarelki',sub:'bluda',tags:['stock','new']},
    {id:'krolik',img:'rabbit',name:'Блюдо «Белый кролик»',cat:'tarelki',sub:'bluda',tags:['order','hit']},
    {id:'pes',img:'dog',name:'Блюдо «Мой пёс»',cat:'tarelki',sub:'bluda',tags:['order','hit'],desc:'Портрет вашего питомца по фотографии — роспись на заказ.'},
    {id:'stakan',img:'r5c5',name:'Стакан «Томаты»',cat:'chashki',tags:['stock','new']},
    {id:'para-limony',img:'r6c5',name:'Чайная пара «Лимоны»',cat:'chashki',tags:['stock','hit']},
    {id:'vaza-ptica',img:'r6c2',name:'Ваза «Птица в саду»',cat:'vazy',tags:['order','hit']},
    {id:'plitka-limony',img:'r6c3',name:'Плитка «Лимоны»',cat:'plitka',tags:['stock','new']}
  ];
  var CATS=[
    {slug:'all',name:'Все',title:'Каталог'},
    {slug:'tarelki',name:'Тарелки',title:'Тарелки',empty:'тарелки'},
    {slug:'chashki',name:'Чашки',title:'Чашки',empty:'чашки'},
    {slug:'vazy',name:'Вазы',title:'Вазы',empty:'вазы'},
    {slug:'plitka',name:'Плитка',title:'Плитка',empty:'плитка'},
    {slug:'shkatulki',name:'Шкатулки',title:'Шкатулки',empty:'шкатулки'},
    {slug:'igrushki',name:'Игрушки',title:'Игрушки',empty:'игрушки'}
  ];
  var SUBS={malye:'Малые',glubokie:'Глубокие',bluda:'Блюда'};
  var TYPE={malye:'Малая тарелка',glubokie:'Глубокая тарелка',bluda:'Блюдо',chashki:'Чашки и стаканы',vazy:'Ваза',plitka:'Декоративная плитка'};
  var TAG={stock:['В наличии','t-stock'],order:['Под заказ','t-order'],new:['Новинка','t-new'],hit:['Хит продаж','t-hit']};
  var byId={}; P.forEach(function(p){byId[p.id]=p; p.type=TYPE[p.sub||p.cat]; p.stock=p.tags.indexOf('stock')>=0;});
  var favs={}, cart={};
  var HEART='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>';
  function tags(p){return p.tags.map(function(t){return '<span class="tag '+TAG[t][1]+'">'+TAG[t][0]+'</span>';}).join('');}
  function card(p){
    var f=!!favs[p.id];
    return '<article class="card"><a class="card-pic" href="#product/'+p.id+'" tabindex="-1" aria-hidden="true"><img src="'+IMG[p.img]+'" alt=""><span class="badges">'+tags(p)+'</span></a>'+
      '<button type="button" class="fav" data-fav="'+p.id+'" aria-pressed="'+f+'" aria-label="'+(f?'Убрать из избранного':'Добавить в избранное')+'">'+HEART+'</button>'+
      '<div class="card-body"><a class="card-name" href="#product/'+p.id+'"><h3>'+esc(p.name)+'</h3></a><div class="meta">'+p.type+' · фарфор</div>'+
      '<div class="card-foot"><span class="price">[ЦЕНА] ₽</span><button type="button" class="add'+(p.stock?'':' ghost')+'" data-add="'+p.id+'">'+(p.stock?'В корзину':'Заказать')+'</button></div></div></article>';
  }
  function fill(el,list){el.innerHTML=list.map(card).join('');}

  /* главная */
  var homePick=['limony','apelsiny','krab','vinograd','krolik','abrikosy','shchelkunchik'];
  $('#homeGrid').innerHTML=homePick.map(function(id){return card(byId[id]);}).join('')+
    '<a class="more" href="#catalog/all"><svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="28" cy="28" r="26"/><path d="M20 28h16M30 22l6 6-6 6"/></svg><span class="hand">смотреть весь каталог</span></a>';
  /* в лентах фото повторяются — для примера объёма */
  var pick=function(ids){return ids.map(function(id){return byId[id];});};
  fill($('#trackNew'),pick(['vinograd','krab','apelsinovyj-sad','abrikosy','shchelkunchik','limony','vinograd','krab','abrikosy']));

  /* избранное, корзина, ленты */
  function setFav(id,on){favs[id]=on;$$('[data-fav="'+id+'"]').forEach(function(b){b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Убрать из избранного':'Добавить в избранное');});
    $('#favCount').textContent=Object.keys(favs).filter(function(k){return favs[k];}).length;renderFav();}
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-fav]'); if(b){setFav(b.dataset.fav,b.getAttribute('aria-pressed')!=='true');return;}
    var ad=e.target.closest('[data-add]'); if(ad){addToCart(ad.dataset.add);return;}
    var a=e.target.closest('[data-scroll]'); if(a){var t=document.getElementById(a.dataset.scroll);t.scrollBy({left:(+a.dataset.dir)*t.clientWidth*0.8,behavior:'smooth'});}
  });

  /* меню */
  var catBtn=$('#catBtn'), drop=$('#catDrop'), burger=$('#burger'), mnav=$('#mnav');
  function setDrop(o){drop.hidden=!o;catBtn.setAttribute('aria-expanded',o);}
  function setBurger(o){mnav.hidden=!o;burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Закрыть меню':'Открыть меню');$('.b-open',burger).style.display=o?'none':'';$('.b-close',burger).style.display=o?'':'none';}
  catBtn.addEventListener('click',function(e){e.stopPropagation();setDrop(drop.hidden);});
  burger.addEventListener('click',function(e){e.stopPropagation();setBurger(mnav.hidden);});
  document.addEventListener('click',function(e){if(!drop.hidden&&!drop.contains(e.target)&&e.target!==catBtn)setDrop(false);if(!mnav.hidden&&!mnav.contains(e.target)&&!burger.contains(e.target))setBurger(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){setDrop(false);setBurger(false);}});

  /* ===== окна: поиск, избранное, корзина ===== */
  var pops={search:[$('#searchBtn'),$('#searchPop')],fav:[$('#favBtn'),$('#favPop')],cart:[$('#cartBtn'),$('#cartPop')]};
  function closePops(except){Object.keys(pops).forEach(function(k){if(k!==except){pops[k][1].hidden=true;pops[k][0].setAttribute('aria-expanded','false');}});}
  function togglePop(k){var p=pops[k],open=p[1].hidden;closePops();setDrop(false);setBurger(false);p[1].hidden=!open;p[0].setAttribute('aria-expanded',open);
    if(open&&k==='search'){var i=$('#searchInput');setTimeout(function(){i.focus();},30);doSearch();}
    if(open&&k==='fav')renderFav(); if(open&&k==='cart')renderCart();}
  Object.keys(pops).forEach(function(k){pops[k][0].addEventListener('click',function(e){e.stopPropagation();togglePop(k);});});
  $$('[data-pop-close]').forEach(function(b){b.addEventListener('click',function(){closePops();});});
  document.addEventListener('click',function(e){
    if(e.target.closest('.pop')){ if(e.target.closest('.pop a[href]'))closePops(); return; }
    closePops();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePops();});
  function row(p,extra){return '<li class="pop-item"><img src="'+IMG[p.img]+'" alt=""><a href="#product/'+p.id+'"><b>'+esc(p.name)+'</b><small>'+p.type+' · [ЦЕНА] ₽</small></a>'+(extra||'')+'</li>';}
  var RM='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function renderFav(){var ids=Object.keys(favs).filter(function(k){return favs[k];});
    $('#favList').innerHTML=ids.length?ids.map(function(id){return row(byId[id],'<button type="button" class="rm" data-unfav="'+id+'" aria-label="Убрать из избранного">'+RM+'</button>');}).join(''):'<li class="pop-empty">Здесь появятся понравившиеся работы — нажмите на сердечко у товара</li>';}
  function cartCount(){return Object.keys(cart).reduce(function(a,k){return a+cart[k];},0);}
  function renderCart(){var ids=Object.keys(cart).filter(function(k){return cart[k]>0;}), n=cartCount();
    $('#cartCount').textContent=n;
    $('#cartList').innerHTML=ids.length?ids.map(function(id){return row(byId[id],'<div class="qty"><button type="button" data-qty="'+id+'" data-d="-1" aria-label="Меньше">−</button><span>'+cart[id]+'</span><button type="button" data-qty="'+id+'" data-d="1" aria-label="Больше">+</button></div>');}).join(''):'<li class="pop-empty">Корзина пока пуста</li>';
    $('#cartFoot').hidden=!ids.length; $('#cartQty').textContent=plural(n);}
  var toastT;
  function toast(t){var el=$('.toast');if(!el){el=document.createElement('div');el.className='toast';el.setAttribute('role','status');document.body.appendChild(el);}el.textContent=t;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){el.hidden=true;},1800);}
  function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();toast('«'+byId[id].name.replace(/^.*?«|»$/g,'')+'» в корзине');}
  document.addEventListener('click',function(e){
    var u=e.target.closest('[data-unfav]'); if(u){e.stopPropagation();setFav(u.dataset.unfav,false);return;}
    var q=e.target.closest('[data-qty]'); if(q){e.stopPropagation();var id=q.dataset.qty;cart[id]=Math.max(0,(cart[id]||0)+(+q.dataset.d));if(!cart[id])delete cart[id];renderCart();}
  },true);
  /* поиск по названию, виду и разделу */
  function norm(t){return String(t).toLowerCase().replace(/ё/g,'е');}
  function findProducts(q){q=norm(q).trim(); if(!q)return [];
    var words=q.split(/\s+/).map(function(w){return w.length>4?w.replace(/(ами|ями|ов|ей|ы|и|а|я|у|ю|е|о|ь)$/,''):w;});
    return P.filter(function(p){var c=CATS.filter(function(x){return x.slug===p.cat;})[0];var hay=norm(p.name+' '+p.type+' '+(c?c.name:'')+' '+(p.sub?SUBS[p.sub]:''));return words.every(function(w){return hay.indexOf(w)>=0;});});}
  function doSearch(){var q=$('#searchInput').value, r=findProducts(q);
    if(!q.trim()){$('#searchList').innerHTML='<li class="pop-empty">Начните вводить название — например, «лимоны» или «блюдо»</li>';$('#searchMore').innerHTML='';return;}
    $('#searchList').innerHTML=r.length?r.slice(0,6).map(function(p){return row(p);}).join(''):'<li class="pop-empty">Ничего не нашлось. Попробуйте другое слово</li>';
    $('#searchMore').innerHTML=r.length>6?'<a class="search-all" href="#search/'+encodeURIComponent(q.trim())+'">Показать все — '+plural(r.length)+'</a>':'';}
  $('#searchInput').addEventListener('input',doSearch);
  $('#searchForm').addEventListener('submit',function(e){e.preventDefault();var q=$('#searchInput').value.trim();if(q){closePops();location.hash='#search/'+encodeURIComponent(q);}});
  $('#checkout').addEventListener('click',function(){closePops();});

  /* формы */
  function wire(form,onDone){form.addEventListener('submit',function(e){e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}if(onDone)onDone(form);$('.js-body',form).style.display='none';$('.js-done',form).hidden=false;});}
  wire($('#orderForm'));wire($('#mcForm'));
  var STAR='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>';
  wire($('#revForm'),function(f){
    var n=f.name.value.trim(), r=+f.querySelector('input[name=rate]:checked').value, w=f.what.value.trim()||'Покупатель';
    var stars='<div class="stars" role="img" aria-label="Оценка '+r+' из 5">'+new Array(r+1).join(STAR)+'</div>';
    var fig=document.createElement('figure'); fig.className='rev fresh';
    fig.innerHTML=stars+'<blockquote>'+esc(f.text.value.trim())+'</blockquote><figcaption><span class="ava" aria-hidden="true">'+esc(n.charAt(0).toUpperCase())+'</span><span><span style="display:block">'+esc(n)+'</span><span class="meta">'+esc(w)+'</span></span></figcaption>';
    $('#revList').insertBefore(fig,$('#revList').firstChild); $('#revList').scrollLeft=0; clampReviews();
  });

  /* длинные отзывы: «Читать полностью» */
  function clampReviews(){$$('#revList .rev').forEach(function(r){var q=$('blockquote',r),b=$('.more-btn',r);
    if(b||r.classList.contains('open'))return; if(q.scrollHeight>q.clientHeight+2){b=document.createElement('button');b.type='button';b.className='more-btn';b.textContent='Читать полностью';b.setAttribute('aria-expanded','false');
      b.addEventListener('click',function(){var o=r.classList.toggle('open');b.textContent=o?'Свернуть':'Читать полностью';b.setAttribute('aria-expanded',o);});q.after(b);}});}
  window.addEventListener('load',clampReviews); setTimeout(clampReviews,300);

  /* поп-апы */
  var lastFocus=null;
  function openModal(m,setup){lastFocus=document.activeElement;var f=$('form',m);f.reset();$('.js-body',f).style.display='flex';$('.js-done',f).hidden=true;if(setup)setup(f);m.hidden=false;document.body.style.overflow='hidden';setTimeout(function(){var x=$('input:checked,input',f);if(x)x.focus();},60);}
  function closeModal(m){m.hidden=true;document.body.style.overflow='';if(lastFocus)lastFocus.focus();}
  $$('.modal').forEach(function(m){$$('[data-close]',m).forEach(function(b){b.addEventListener('click',function(){closeModal(m);});});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')$$('.modal').forEach(function(m){if(!m.hidden)closeModal(m);});});
  var d=new Date(),pad=function(n){return n<10?'0'+n:n};$('#mcDate').min=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  $$('[data-open-mc]').forEach(function(b){b.addEventListener('click',function(){openModal($('#mcModal'),function(f){var r=$('input[name=fmt][value="'+b.dataset.openMc+'"]',f);if(r)r.checked=true;});});});
  $('#openRev').addEventListener('click',function(){openModal($('#revModal'));});
  document.addEventListener('click',function(e){var a=e.target.closest('a[href="#order"]');if(!a)return;e.preventDefault();setDrop(false);setBurger(false);
    var fromCart=a.id==='checkout';
    openModal($('#orderModal'),function(f){if(fromCart){f.idea.value='Хочу заказать: '+Object.keys(cart).map(function(id){return byId[id].name+' × '+cart[id];}).join(', ');}});});
  if(location.hash==='#order'){history.replaceState(null,'',location.pathname);setTimeout(function(){openModal($('#orderModal'));},50);}

  /* ===== страница каталога ===== */
  var ALL_ICON='<svg viewBox="0 0 130 130" fill="none" stroke="#6B4426" stroke-width="2" stroke-linecap="round" aria-hidden="true"><ellipse cx="65" cy="96" rx="52" ry="16" fill="#FFFDF8"/><ellipse cx="65" cy="94" rx="32" ry="8" stroke-width="1.5"/><ellipse cx="65" cy="74" rx="44" ry="14" fill="#F2E4C2"/><ellipse cx="65" cy="72" rx="26" ry="7" stroke-width="1.5"/><path d="M42 30h46l-4 30H46z" fill="#FFFDF8"/><path d="M88 36c10 0 12 12 0 14"/><circle cx="58" cy="44" r="5" fill="#F0D48E" stroke-width="1.5"/><circle cx="72" cy="40" r="4" fill="#EDCDC4" stroke-width="1.5"/></svg>';
  function iconFor(slug){if(slug==='all')return ALL_ICON;var s=$('.cat[data-slug="'+slug+'"] .cat-pic');return s?s.innerHTML:'';}
  var strip=$('#catStrip');
  strip.innerHTML=CATS.map(function(c){return '<a class="mini" href="#catalog/'+c.slug+'" data-mini="'+c.slug+'"><span class="cat-pic">'+iconFor(c.slug)+'</span><span class="mini-name">'+c.name+'</span></a>';}).join('');
  var st={slug:'all',sub:null,f:'all',q:''};
  function plural(n){var a=n%10,b=n%100;return n+' '+(a===1&&b!==11?'товар':(a>=2&&a<=4&&(b<10||b>=20)?'товара':'товаров'));}
  var crumb=function(parts){return parts.map(function(p,i){return i===parts.length-1?'<span aria-current="page">'+p[0]+'</span>':'<a href="'+p[1]+'">'+p[0]+'</a><span aria-hidden="true">/</span>';}).join('');};
  function renderCat(){
    var c=CATS.filter(function(x){return x.slug===st.slug;})[0]||CATS[0]; st.slug=c.slug;
    $$('.mini',strip).forEach(function(m){if(m.dataset.mini===st.slug)m.setAttribute('aria-current','page');else m.removeAttribute('aria-current');});
    var act=$('.mini[aria-current]',strip); if(act&&strip.scrollWidth>strip.clientWidth) strip.scrollLeft=act.offsetLeft-16;
    var subs=$('#catSubs');
    if(st.slug==='tarelki'){subs.hidden=false;subs.innerHTML=[['','Все тарелки']].concat(Object.keys(SUBS).map(function(k){return [k,SUBS[k]];})).map(function(s){return '<a class="sub-chip" href="#catalog/tarelki'+(s[0]?'/'+s[0]:'')+'"'+((st.sub||'')===s[0]?' aria-current="page"':'')+'>'+s[1]+'</a>';}).join('');}
    else subs.hidden=true;
    var title=st.sub?SUBS[st.sub]+' тарелки':c.title; if(st.sub==='bluda')title='Блюда';
    if(st.q)title='Поиск: «'+st.q+'»';
    $('#catTitle').textContent=title;
    var cr=[['Главная','#top'],['Каталог','#catalog/all']]; if(st.slug!=='all')cr.push([c.name,'#catalog/'+c.slug]); if(st.sub)cr.push([SUBS[st.sub],'']);
    if(cr.length===2)cr[1]=['Каталог',''];
    $('#catCrumbs').innerHTML=crumb(cr);
    $$('[data-cf]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.cf===st.f);});
    var found=st.q?findProducts(st.q):null;
    var items=P.filter(function(p){ if(found&&found.indexOf(p)<0)return false;
      if(st.slug!=='all'&&p.cat!==st.slug)return false; if(st.sub&&p.sub!==st.sub)return false;
      return st.f==='all'||p.tags.indexOf(st.f)>=0;});
    var so=$('#catSort').value, score=function(p){return (so==='pop'?p.tags.indexOf('hit')>=0:so==='new'?p.tags.indexOf('new')>=0:p.stock)?0:1;};
    items=items.map(function(p,i){return [p,i];}).sort(function(a,b){return score(a[0])-score(b[0])||a[1]-b[1];}).map(function(x){return x[0];});
    fill($('#catGrid'),items);
    $('#catCount').textContent=plural(items.length);
    $('#catEmpty').hidden=items.length>0; $('#catGrid').hidden=!items.length;
    if(!items.length){$('#emptyPic').innerHTML=iconFor(st.slug);$('#emptyTitle').textContent=c.empty&&st.f==='all'?'скоро здесь появятся '+c.empty:'пока нет таких работ';}
    document.title=title+' — Mugs & Kisses';
  }
  $$('[data-cf]').forEach(function(b){b.addEventListener('click',function(){st.f=b.dataset.cf;renderCat();});});
  $('#catSort').addEventListener('change',renderCat);

  /* ===== страница товара ===== */
  var curProd=null;
  function renderProd(id){
    var p=byId[id]; if(!p){location.hash='#catalog/all';return;} curProd=p;
    var c=CATS.filter(function(x){return x.slug===p.cat;})[0];
    var cr=[['Главная','#top'],['Каталог','#catalog/all'],[c.name,'#catalog/'+c.slug]]; if(p.sub)cr.push([SUBS[p.sub],'#catalog/tarelki/'+p.sub]); cr.push([esc(p.name),'']);
    $('#prodCrumbs').innerHTML=crumb(cr);
    $('#prodImg').src=IMG[p.img]; $('#prodImg').alt=p.name;
    $('#prodTags').innerHTML=tags(p); $('#prodName').textContent=p.name; $('#prodType').textContent=p.type+' · фарфор, ручная роспись';
    $('#prodStatus').innerHTML=p.stock?'<span class="dot" style="background:#7D8F3A"></span>В наличии — отправим в течение 1–3 дней':'<span class="dot" style="background:var(--ochre)"></span>Под заказ — распишу для вас, срок [СРОК]';
    var add=$('#prodAdd'); add.textContent=p.stock?'В корзину':'Заказать'; add.dataset.add=p.id;
    var fb=$('#prodFav'); fb.dataset.fav=p.id; fb.setAttribute('aria-pressed',!!favs[p.id]);
    $('#prodDesc').textContent=p.desc||'Тонкий лёгкий фарфор и нежная акварельная роспись — такая посуда украшает и праздничный стол, и обычный завтрак.';
    var same=P.filter(function(q){return q.id!==p.id&&q.cat===p.cat&&(q.sub||'')===(p.sub||'');});
    var near=P.filter(function(q){return q.id!==p.id&&same.indexOf(q)<0&&q.cat===p.cat;});
    var rest=P.filter(function(q){return q.id!==p.id&&q.cat!==p.cat;});
    fill($('#trackRel'),same.concat(near,rest).slice(0,10)); $('#trackRel').scrollLeft=0;
    document.title=p.name+' — Mugs & Kisses';
  }

  /* ===== переходы ===== */
  var views={home:$('#viewHome'),catalog:$('#viewCatalog'),product:$('#viewProduct'),about:$('#viewAbout')};
  function show(v){Object.keys(views).forEach(function(k){views[k].hidden=k!==v;});}
  function route(){
    var h=decodeURIComponent(location.hash.slice(1)); setDrop(false); setBurger(false); closePops();
    var m;
    if((m=h.match(/^search\/(.+)$/))){show('catalog');st.slug='all';st.sub=null;st.f='all';st.q=m[1];$('#searchInput').value=m[1];renderCat();window.scrollTo(0,0);return;}
    if((m=h.match(/^catalog\/([\w-]+)(?:\/([\w-]+))?/))){
      show('catalog'); st.slug=m[1]; st.sub=null; st.f='all'; st.q='';
      if(m[2]){ if(SUBS[m[2]]&&m[1]==='tarelki') st.sub=m[2]; else if(TAG[m[2]]) st.f=m[2]; }
      renderCat(); window.scrollTo(0,0); return;
    }
    if((m=h.match(/^product\/(.+)$/))){show('product');renderProd(m[1]);window.scrollTo(0,0);return;}
    if(h==='about'){show('about');document.title='О бренде — Mugs & Kisses';window.scrollTo(0,0);return;}
    var wasHome=!views.home.hidden; show('home'); document.title='Mugs & Kisses — фарфор с акварельной росписью';
    if(h==='footer'){$('#footer').scrollIntoView();return;}
    var el=h&&h!=='top'?document.getElementById(h):null;
    if(el) el.scrollIntoView(); else window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',route); route();

  /* подпись под названием бренда растягивается ровно по ширине названия */
  function fitTagline(){var t=$('.hero-title'); if(!t||t.offsetParent===null)return; var br=$('.brand',t), sb=$('.sub',t);
    sb.style.letterSpacing='0px'; sb.style.marginRight='0px'; sb.style.fontSize='';
    var target=br.getBoundingClientRect().width, w=sb.getBoundingClientRect().width, n=sb.textContent.length-1;
    if(w>target*0.92){var fs=parseFloat(getComputedStyle(sb).fontSize)*target*0.92/w; sb.style.fontSize=fs+'px'; w=sb.getBoundingClientRect().width;}
    if(n>0&&target>w){var ls=(target-w)/n; sb.style.letterSpacing=ls+'px'; sb.style.marginRight=(-ls)+'px';}}
  fitTagline(); window.addEventListener('resize',fitTagline); window.addEventListener('load',fitTagline);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitTagline);
  window.addEventListener('hashchange',function(){setTimeout(fitTagline,0);});

  /* ===== анимированные цифры ===== */
  var nums=$$('.num[data-count]');
  function run(el){var to=+el.dataset.count,suf=el.dataset.suffix||'',t0=null,dur=1600;function step(t){if(!t0)t0=t;var k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e)+suf;if(k<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){run(en.target);io.unobserve(en.target);}});},{threshold:.6});nums.forEach(function(n){io.observe(n);});}
  else nums.forEach(run);
})();
