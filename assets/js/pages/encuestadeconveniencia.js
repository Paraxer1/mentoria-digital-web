'use strict';

const chartsData = {
  g1:{type:'bar',labels:['Smartphone','Laptop','Tablet','Consola'],data:[29,1,0,0],colors:'#009B3A'},
  g2:{type:'line',labels:['< 3h','3-6 h','7-10 h','> 10 h'],data:[5,14,6,5],colors:'#EF4444'},
  g3:{type:'pie',labels:['Redes','Tareas','Series','Juegos'],data:[21,6,1,2],colors:['#F59E0B','#10B981','#3B82F6','#EF4444']},
  g4:{type:'doughnut',labels:['Samsung','Xiaomi','Oppo','Honor','LG','Otro'],data:[9,2,1,1,0,17],colors:['#3B82F6','#F97316','#1F2937','#9CA3AF','#ffaa00','#ff00aa']},
  g5:{type:'bar',labels:['Android','iOS','Windows','macOS'],data:[16,8,5,1],colors:'#059669',horizontal:true},
  g6:{type:'bar',labels:['Laptop','Smartphone','Reloj inteligente'],data:[4,25,1],colors:'#6366F1'},
  g7:{type:'pie',labels:['TikTok','YouTube','Twitch'],data:[21,9,0],colors:['#111111','#EF4444','#FFFF00']},
  g8:{type:'pie',labels:['Sí, siempre','No, nunca','A veces'],data:[16,2,12],colors:['#EF4444','#10B981','#F59E0B']},
  g9:{type:'doughnut',labels:['Wi-Fi','Datos'],data:[30,0],colors:['#3B82F6','#9CA3AF']},
  g10:{type:'bar',labels:['Laptop','Celular','Tablet','Consola'],data:[8,14,6,2],colors:'#8B5CF6'}
};

function initializeChart(id) {
  const config = chartsData[id];
  if (!config || document.getElementById(id)?.dataset.ready === '1') return;
  const canvas = document.getElementById(id);
  if (!canvas) return;
  canvas.dataset.ready = '1';
  MentoriaCharts.create(canvas, config);
}

function initializePage() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => { item.classList.add('active'); initializeChart(item.dataset.chart); });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      initializeChart(entry.target.dataset.chart);
      observer.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '100px 0px' });
  items.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', initializePage, { once:true });
