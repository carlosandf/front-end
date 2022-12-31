const fs = require('fs');

fs.writeFileSync('./.env', `VITE_API_URL=${process.env.VITE_API_URL}\n`);