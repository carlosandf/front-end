import fs from 'fs';

fs.writeFileSync('./.env', `VITE_API_URL=${process.env.VITE_API_URL}\n`);