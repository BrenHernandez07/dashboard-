const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/status', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
    memory: {
      total: os.totalmem(),
      free: os.freemem()
    },
    cpu: os.cpus().length
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
