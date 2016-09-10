import express from 'express';
import path from 'path';

import connect from './server/http-server';
import apiConfig from './server/api/api-config'
import apiRoutes from './server/api/api-routes'
import s3Config from './server/aws/s3.config.js'

/* Express */
const app = express();

/* Server */
connect(app);

/*  RESTful API */
apiConfig(app);
apiRoutes(app);
s3Config(app);
