function cargarDatos() {
  fetch('/api/status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener datos del servidor');
      }
      return response.json();
    })
    .then(data => {
      
      const total = data.memory.total;
      const free = data.memory.free;
      const used = total - free;
      const percent = Math.round((used / total) * 100);

     
      const hostEl = document.getElementById('host');
      const platformEl = document.getElementById('platform');
      const cpuEl = document.getElementById('cpu');
      const uptimeEl = document.getElementById('uptime');
      const ramBarEl = document.getElementById('ramBar');
      const ramTextEl = document.getElementById('ramText');

      if (!hostEl) return; 

      hostEl.textContent = data.hostname;
      platformEl.textContent = data.platform;
      cpuEl.textContent = data.cpu + ' núcleos';
      uptimeEl.textContent = Math.round(data.uptime / 60) + ' minutos';

      
      ramBarEl.style.width = percent + '%';
      ramTextEl.textContent = percent + '% de memoria utilizada';

      
      if (percent < 60) {
        ramBarEl.style.background = 'linear-gradient(90deg, #00ffcc, #00c6ff)';
      } else if (percent < 80) {
        ramBarEl.style.background = 'linear-gradient(90deg, #ffd000, #ff9f00)';
      } else {
        ramBarEl.style.background = 'linear-gradient(90deg, #ff4d4d, #c70000)';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

setInterval(cargarDatos, 2000);


cargarDatos();
