(() => {
  'use strict';
  const charts = {};
  const sum = values => values.reduce((total,value)=>total+(Number(value)||0),0);
  function initCharts() {
    charts.pc = MentoriaCharts.create('pcChart',{type:'doughnut',labels:['Sí, propia','No / Compartida'],data:[0,0],colors:['#10b981','#ef4444']});
    charts.editor = MentoriaCharts.create('editorChart',{type:'bar',labels:['VS Code','IntelliJ','Otros'],data:[0,0,0],colors:['#34d399','#f87171','#fbbf24']});
    charts.satisfaction = MentoriaCharts.create('satisfaccionChart',{type:'pie',labels:['Buena','Regular','Mala'],data:[0,0,0],colors:['#38bdf8','#fbbf24','#ef4444']});
  }
  function render(data, source) {
    const pc=data.Web?.PC||{}, editors=data.Tel?.Editor||{}, satisfaction=data.Kiosco?.Materia||{};
    const pcValues=[pc.Si||0,pc.No||0], editorValues=[editors.VSCode||0,editors.IntelliJ||0,editors.Otros||0], satisfactionValues=[satisfaction.Buena||0,satisfaction.Regular||0,satisfaction.Mala||0];
    charts.pc?.update({data:pcValues}); charts.editor?.update({data:editorValues}); charts.satisfaction?.update({data:satisfactionValues});
    document.getElementById('totalCount1').textContent=String(sum(pcValues));
    document.getElementById('totalCount2').textContent=String(sum(editorValues));
    document.getElementById('totalCount3').textContent=String(sum(satisfactionValues));
    const status=document.getElementById('dashboard-source'); if(status) status.textContent=source==='server'?'Datos compartidos desde el servidor local':'Datos locales; servidor de datos no disponible';
  }
  function init(){
    initCharts();
    MentoriaSurveyData.subscribe((data,meta)=>render(data,meta.source));
    MentoriaSurveyData.onStatus(({status})=>{const label=document.getElementById('dashboard-source');if(label)label.textContent=status==='server'?'Servidor de datos conectado':'Modo local';});
    MentoriaSurveyData.connect();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
