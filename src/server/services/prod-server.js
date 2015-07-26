import express from 'express';
import http from 'http';
const app = express();
const server = http.Server(app);

const PORT = 8000 || process.env.PORT;

export default class {

  constructor() {
    app.use('/assets', express.static(`${process.env.PWD}/dist/assets`));

    app.all('*', (req, res) => {
      res.sendFile(`${process.env.PWD}/dist/index.html`);
    });

    server.listen(PORT, () => {
      console.log(`App runs on port ${PORT}`);
    });
  }
}
