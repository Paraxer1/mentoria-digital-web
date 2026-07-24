(() => {
  'use strict';
  const charts = new Set();
  const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#64748b'];
  const clampDpr = () => Math.min(devicePixelRatio || 1, 1.5);

  function prepare(canvas) {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(240, Math.round(rect.width || canvas.parentElement?.clientWidth || 320));
    const measuredHeight = Math.round(rect.height || canvas.parentElement?.clientHeight || 240);
    const height = Math.max(180, Math.min(320, measuredHeight));
    const dpr = clampDpr();
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,width,height);
    return { ctx, width, height };
  }
  function colors(config, count) {
    const source = config.colors || palette;
    return Array.from({ length: count }, (_, i) => Array.isArray(source) ? source[i % source.length] : source);
  }
  function drawLegend(ctx, labels, cols, width, y) {
    ctx.font = '12px system-ui'; ctx.textBaseline = 'middle';
    let x = 12;
    labels.forEach((label, i) => {
      const text = String(label); const tw = ctx.measureText(text).width + 28;
      if (x + tw > width - 8) { x = 12; y += 20; }
      ctx.fillStyle = cols[i]; ctx.fillRect(x, y - 5, 10, 10);
      ctx.fillStyle = '#94a3b8'; ctx.fillText(text, x + 15, y); x += tw;
    });
  }
  function drawBars(ctx, labels, values, cols, w, h, horizontal) {
    const max = Math.max(1, ...values.map(Number));
    ctx.font='12px system-ui'; ctx.textAlign='center'; ctx.textBaseline='top';
    if (horizontal) {
      const left=82, top=16, row=(h-32)/Math.max(1,values.length);
      values.forEach((value,i)=>{ const y=top+i*row+4, bw=(w-left-24)*(Number(value)/max); ctx.fillStyle=cols[i]; ctx.fillRect(left,y,bw,Math.max(12,row-12)); ctx.fillStyle='#cbd5e1';ctx.textAlign='right';ctx.fillText(labels[i],left-8,y+2);ctx.textAlign='left';ctx.fillText(String(value),left+bw+5,y+2); });
      return;
    }
    const base=h-42, top=18, gap=10, bw=Math.max(16,(w-36-gap*(values.length-1))/Math.max(1,values.length));
    values.forEach((value,i)=>{ const bh=(base-top)*(Number(value)/max), x=18+i*(bw+gap), y=base-bh; ctx.fillStyle=cols[i];ctx.fillRect(x,y,bw,bh);ctx.fillStyle='#cbd5e1';ctx.textAlign='center';ctx.fillText(String(value),x+bw/2,Math.max(2,y-17));ctx.fillText(String(labels[i]).slice(0,14),x+bw/2,base+8); });
  }
  function drawLine(ctx, labels, values, col, w, h) {
    const max=Math.max(1,...values.map(Number)), left=28, right=w-18, top=20, bottom=h-38;
    ctx.strokeStyle=col;ctx.lineWidth=3;ctx.beginPath();
    values.forEach((v,i)=>{ const x=left+(right-left)*(i/Math.max(1,values.length-1)), y=bottom-(bottom-top)*(Number(v)/max); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.stroke();
    values.forEach((v,i)=>{ const x=left+(right-left)*(i/Math.max(1,values.length-1)), y=bottom-(bottom-top)*(Number(v)/max);ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cbd5e1';ctx.font='11px system-ui';ctx.textAlign='center';ctx.fillText(labels[i],x,bottom+9); });
  }
  function drawPie(ctx, labels, values, cols, w, h, doughnut) {
    const rawTotal=values.reduce((a,b)=>a+Number(b||0),0);
    const total=Math.max(1,rawTotal);
    const r=Math.min(92,Math.min(w,h-45)*.31), cx=w/2, cy=(h-36)/2;
    if(rawTotal<=0){
      ctx.strokeStyle='rgba(148,163,184,.28)';ctx.lineWidth=doughnut?18:2;ctx.beginPath();ctx.arc(cx,cy,Math.max(28,r-(doughnut?9:0)),0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='#94a3b8';ctx.font='600 12px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Sin datos',cx,cy);
      drawLegend(ctx,labels,cols,w,h-18);return;
    }
    let start=-Math.PI/2;
    values.forEach((value,i)=>{ const angle=Math.PI*2*(Number(value)/total);ctx.fillStyle=cols[i];ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,start+angle);ctx.closePath();ctx.fill();start+=angle; });
    if(doughnut){ctx.fillStyle='#172033';ctx.beginPath();ctx.arc(cx,cy,r*.54,0,Math.PI*2);ctx.fill();ctx.fillStyle='#e2e8f0';ctx.font='700 16px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(rawTotal),cx,cy);}
    drawLegend(ctx,labels,cols,w,h-18);
  }
  function draw(chart) {
    const { canvas, config }=chart; if (!canvas.isConnected) return;
    const {ctx,width,height}=prepare(canvas), labels=config.labels||[], values=(config.data||[]).map(v=>Number(v)||0), cols=colors(config,values.length);
    canvas.setAttribute('role','img'); canvas.setAttribute('aria-label', labels.map((l,i)=>`${l}: ${values[i]}`).join(', '));
    if(['pie','doughnut','polarArea'].includes(config.type)) drawPie(ctx,labels,values,cols,width,height,config.type==='doughnut');
    else if(config.type==='line') drawLine(ctx,labels,values,cols[0],width,height);
    else drawBars(ctx,labels,values,cols,width,height,config.horizontal||config.indexAxis==='y');
  }
  function create(canvasOrId, config={}) {
    const canvas=typeof canvasOrId==='string'?document.getElementById(canvasOrId):canvasOrId;
    if (!(canvas instanceof HTMLCanvasElement)) return null;
    const chart={canvas,config:{...config},update(next={}){this.config={...this.config,...next};draw(this);},destroy(){charts.delete(this);}};
    charts.add(chart); draw(chart); return chart;
  }
  let resizeTimer; addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>charts.forEach(draw),160);},{passive:true});
  window.MentoriaCharts=Object.freeze({create});
})();
