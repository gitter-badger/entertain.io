import express from 'express';
import http from 'http';
const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 8000;

export default class {

  constructor() {
    app.use('/assets', express.static(`${process.env.PWD}/dist/assets`));

    app.get('/api', (req, res) => {
      res.send('ai');
    });

    app.get('/', (req, res) => {
      res.sendFile(`${process.env.PWD}/dist/index.html`);
    });

    server.listen(PORT, () => {
      console.log(`App runs on port ${PORT}`);
    });
  }
}