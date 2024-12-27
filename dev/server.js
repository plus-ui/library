import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Static dosyalar için middleware
app.use(express.static(join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Dev server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop`);
});
