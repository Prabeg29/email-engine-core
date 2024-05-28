import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import config from './config';
import routes from './routes';
import { initializeIndices } from './utils/elastic-search.util';
import { genericErrorHandler, routeNotFound } from './middlewares/error-handler.middleware';

(async function () {
  const isElasticsearchReady = await initializeIndices();

  if (isElasticsearchReady) {
    const app = express();
    const port = config.app.port;

    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());

    app.use('/api', routes);

    app.use(routeNotFound);
    app.use(genericErrorHandler);

    app.listen(port, () => console.log(`Application running on ${config.app.url}`));
  }
})();
