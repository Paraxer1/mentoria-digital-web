'use strict';

(() => {
  const canvas = document.getElementById('matrixCanvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d', { alpha:true });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const glyphs = ['01','10','11','00','101','010'];
  let width=0, height=0, particles=[], frame=0, last=0;

  function resize() {
    width=innerWidth; height=innerHeight;
    canvas.width=width; canvas.height=height;
    const count=Math.min(32,Math.max(16,Math.round(width/55)));
    particles=Array.from({length:count},()=>({
      x:Math.random()*width,y:Math.random()*height,
      size:10+Math.random()*7,speed:1.08+Math.random()*1.35,
      alpha:.08+Math.random()*.2,glyph:glyphs[Math.floor(Math.random()*glyphs.length)]
    }));
  }
  function draw(now) {
    frame=0;
    if (document.hidden || reduced.matches) return;
    if (now-last<33) { frame=requestAnimationFrame(draw); return; }
    last=now; ctx.clearRect(0,0,width,height);
    ctx.font='14px ui-monospace,Consolas,monospace';
    particles.forEach((p,index)=>{
      p.x+=p.speed; p.y+=p.speed*.45;
      if(p.x>width+30||p.y>height+30){p.x=-30;p.y=Math.random()*height*.25;}
      ctx.font=`${p.size}px ui-monospace,Consolas,monospace`;
      ctx.fillStyle=index%3===0?`rgba(167,139,250,${p.alpha})`:index%3===1?`rgba(34,211,238,${p.alpha})`:`rgba(163,230,53,${p.alpha})`;
      ctx.fillText(p.glyph,p.x,p.y);
    });
    frame=requestAnimationFrame(draw);
  }
  function start(){ if(!frame&&!document.hidden&&!reduced.matches) frame=requestAnimationFrame(draw); }
  addEventListener('resize',()=>{clearTimeout(resize.timer);resize.timer=setTimeout(resize,100);},{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?(cancelAnimationFrame(frame),frame=0):start());
  reduced.addEventListener?.('change',event=>event.matches?(cancelAnimationFrame(frame),frame=0,ctx.clearRect(0,0,width,height)):start());
  resize(); start();
})();
