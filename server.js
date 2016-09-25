import express from 'express'
import path from 'path'

import connect from './server/http-server'
import apiConfig from './server/api/api-config'
import apiRoutes from './server/api/api-routes'
import s3Config from './server/aws/s3.config.js'
import twilioMain from './server/notifications/twilio/twilio-main'
import emailMain from './server/notifications/email/email-main'

/* Express */
const app = express();
/* Server */
connect(app);
/*  RESTful API */
apiConfig(app);
apiRoutes(app);
s3Config(app);
/* Notifications (Every 60 seconds) */
twilioMain();
emailMain();
setInterval(() => {
    
}, 60*1000);














