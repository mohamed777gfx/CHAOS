/* CHAOS site behavior: product sheet, bag, signup demo, hero tilt, fog canvas.
   Edit the P array below to change products and prices. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* products: garment fill + print. Sample prices, replace with real ones. */
  var P=[
    {id:'p1',name:'Emblem Tee',tag:'Black / layered',price:42,fill:'#0d0809',edge:'#2a1216',print:'layer',badge:'New'},
    {id:'p2',name:'Wordmark Tee',tag:'Blood / bone',price:42,fill:'#6e0f22',edge:'#8f2037',print:'word',word:'#f8f5f0'},
    {id:'p3',name:'Emblem Tee',tag:'Bone / blood',price:42,fill:'#ece6dd',edge:'#c9c0b4',print:'red'},
    {id:'p4',name:'Static Tee',tag:'Black / bone',price:46,fill:'#150a0c',edge:'#3a1a20',print:'white',badge:'Limited'}
  ];
  function art(p,big){
    var pr='';
    if(p.print==='layer')pr='<use href="#im-layer" transform="translate(402 332) scale(.2)"/>';
    if(p.print==='white')pr='<use href="#im-white" transform="translate(402 332) scale(.2)"/>';
    if(p.print==='red')pr='<use href="#im-red" transform="translate(402 332) scale(.2)"/>';
    if(p.print==='word')pr='<g transform="translate(500 470) scale(.2)" style="color:#2a050c" fill="'+p.word+'"><use href="#wm"/></g>';
    var sl=p.print==='word'?'<use href="#im-white" transform="translate(172 266) rotate(-27) scale(.045)"/>':(p.print==='red'?'<use href="#im-red" transform="translate(172 266) rotate(-27) scale(.045)"/>':'<use href="#im-white" transform="translate(172 266) rotate(-27) scale(.045)"/>');
    return '<svg viewBox="100 110 800 800" role="img" aria-label="'+p.name+', '+p.tag+'">'+
      '<ellipse cx="500" cy="892" rx="260" ry="22" fill="#000" opacity=".55" filter="url(#soft)"/>'+
      '<use href="#shirt" fill="'+p.fill+'"/>'+
      '<path d="M 336 152 C 385 242 615 242 664 152" fill="none" stroke="'+p.edge+'" stroke-width="18" stroke-linecap="round"/>'+
      '<path d="M 300 864 H 700 M 163 262 L 229 397 M 837 262 L 771 397" stroke="'+p.edge+'" stroke-width="2" stroke-dasharray="8 6" fill="none"/>'+
      pr+sl+'</svg>';
  }
  var rail=$('#rail');
  rail.innerHTML=P.map(function(p){
    return '<button class="card" type="button" data-id="'+p.id+'" aria-label="'+p.name+', '+p.tag+', $'+p.price+'">'+
      (p.badge?'<span class="badge mono">'+p.badge+'</span>':'')+
      '<div class="pic">'+art(p)+'</div>'+
      '<div class="meta"><div><div class="name">'+p.name+'</div><div class="tag mono">'+p.tag+'</div></div><div class="price">$'+p.price+'</div></div></button>';
  }).join('');

  /* product sheet + bag */
  var sheet=$('#sheet'),cur=null,size=null,lastFocus=null,bag=0;
  var sizes=['S','M','L','XL'];
  function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('show')},2200)}
  function open(id){
    cur=P.filter(function(p){return p.id===id})[0];size=null;lastFocus=document.activeElement;
    $('#sPic').innerHTML=art(cur,true);$('#sName').textContent=cur.name;$('#sTag').textContent='Drop 001 / '+cur.tag;$('#sPrice').textContent='$'+cur.price;
    $('#sizes').innerHTML=sizes.map(function(s){return '<button type="button" aria-pressed="false" data-s="'+s+'">'+s+'</button>'}).join('');
    sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#close').focus();
  }
  function close(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
  rail.addEventListener('click',function(e){var c=e.target.closest('.card');if(c)open(c.dataset.id)});
  $('#sizes').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b)return;size=b.dataset.s;
    [].forEach.call(this.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
  });
  $('#add').addEventListener('click',function(){
    if(!size){toast('Pick a size first');return}
    bag++;$('#bagN').textContent=bag;toast(cur.name+' / '+size+' added to bag');close();
  });
  $('#close').addEventListener('click',close);
  sheet.addEventListener('click',function(e){if(e.target===sheet)close()});
  document.addEventListener('keydown',function(e){
    if(!sheet.classList.contains('open'))return;
    if(e.key==='Escape'){close();return}
    if(e.key==='Tab'){
      var f=[].slice.call(sheet.querySelectorAll('button:not([disabled]),a[href]')).filter(function(x){return x.offsetParent!==null});
      if(!f.length)return;var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  $('#bag').addEventListener('click',function(){toast(bag?bag+' item'+(bag>1?'s':'')+' in your bag':'Your bag is empty')});

  /* demo-only form and placeholder links */
  $('#form').addEventListener('submit',function(e){
    e.preventDefault();var v=$('#email').value.trim(),n=$('#note');
    if(!/^\S+@\S+\.\S+$/.test(v)){n.textContent='Enter a valid email address.';$('#email').setAttribute('aria-invalid','true');return}
    $('#email').removeAttribute('aria-invalid');
    n.textContent='Preview only: connect an email service to collect signups.';$('#email').value='';
  });
  $('#ig').addEventListener('click',function(e){e.preventDefault();toast('Add your Instagram link here')});

  /* hero: tilt, split layers, cursor light */
  var hero=$('#hero'),em=$('#emblem');
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    hero.style.setProperty('--px',(x*100)+'%');hero.style.setProperty('--py',(y*100)+'%');
    em.style.setProperty('--rx',((x-.5)*26).toFixed(1));em.style.setProperty('--ry',((y-.5)*20).toFixed(1));
  });
  hero.addEventListener('pointerleave',function(){em.style.setProperty('--rx',0);em.style.setProperty('--ry',0)});

  /* fog and ash */
  var cv=$('#fog'),ctx=cv.getContext('2d'),W=0,H=0,blobs=[],ash=[],raf=0,visible=true;
  function resize(){
    var r=hero.getBoundingClientRect();W=cv.width=Math.max(300,Math.floor(r.width/2));H=cv.height=Math.max(300,Math.floor(r.height/2));
    blobs=[];for(var i=0;i<8;i++)blobs.push({x:Math.random()*W,y:Math.random()*H,r:(.25+Math.random()*.35)*Math.max(W,H),vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.25,a:.16+Math.random()*.22,hot:Math.random()<.45});
    ash=[];for(var j=0;j<70;j++)ash.push({x:Math.random()*W,y:Math.random()*H,s:.6+Math.random()*1.6,v:.15+Math.random()*.6,d:Math.random()*6.28,red:Math.random()<.4});
  }
  function frame(){
    ctx.globalCompositeOperation='source-over';ctx.fillStyle='#070405';ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    blobs.forEach(function(b){
      b.x+=b.vx;b.y+=b.vy;if(b.x<-b.r)b.x=W+b.r;if(b.x>W+b.r)b.x=-b.r;if(b.y<-b.r)b.y=H+b.r;if(b.y>H+b.r)b.y=-b.r;
      var g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
      var c=b.hot?'160,20,45':'90,12,28';
      g.addColorStop(0,'rgba('+c+','+b.a+')');g.addColorStop(1,'rgba('+c+',0)');ctx.fillStyle=g;ctx.fillRect(b.x-b.r,b.y-b.r,b.r*2,b.r*2);
    });
    ash.forEach(function(p){
      p.y-=p.v;p.d+=.02;p.x+=Math.sin(p.d)*.4;if(p.y<-4){p.y=H+4;p.x=Math.random()*W}
      ctx.fillStyle=p.red?'rgba(220,40,70,.7)':'rgba(248,245,240,.55)';ctx.fillRect(p.x,p.y,p.s,p.s);
    });
    if(!reduce&&visible)raf=requestAnimationFrame(frame);
  }
  resize();frame();
  addEventListener('resize',function(){resize();if(reduce)frame()});
  new IntersectionObserver(function(en){visible=en[0].isIntersecting;if(visible&&!reduce){cancelAnimationFrame(raf);raf=requestAnimationFrame(frame)}}).observe(hero);
})();
