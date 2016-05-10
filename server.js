import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import webpackConfig from './webpack.config';

import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.config.json';


const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();


// Webpack dev server
if (isDeveloping) {
  const WEBPACK_PORT = 3001;
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.listen(WEBPACK_PORT, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:'+WEBPACK_PORT);
  });
}

//  RESTful API
const publicPath = path.resolve('./dist/');
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 3000;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (request, response){
  response.sendFile(path.resolve('./dist/index.html'))
})

app.post('/api/login', function(req, res) {
      const credentials = req.body;
      if(credentials.user==='admin' && credentials.password==='password'){

        const profile = {'user': credentials.user, 'role': 'ADMIN'};
        const jwtToken = jwt.sign(profile, jwtConfig.secret, {'expiresIn' : 5*60});  // expires in 300 seconds (5 min)
        res.status(200).json({
          id_token: jwtToken
        });

        //res.json({'user': credentials.user, 'role': 'ADMIN'});   
      }else{
        res.status(401).json({'message' : 'Invalid user/password'});
      }
});

app.post('/api/logout', function(req, res) {
    res.status(200).json({'message' : 'User logged out'});   
});

// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);

server.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
}); 











// Amazon Web Service S3 Test



import uuid from 'node-uuid';

var AWS = require('aws-sdk');

/*
import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;
*/

AWS.config.credentials = new AWS.Config({
  accessKeyId: 'AKIAJNG22KFRVUAICSEA', secretAccessKey: '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'
});

AWS.config.update({
    accessKeyId: "AKIAJNG22KFRVUAICSEA",
    secretAccessKey: "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"
});

console.log(AWS.config.credentials);

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
var bucketName = 'parkezly-images';
var keyName = 'hello_world-'+ uuid.v4() + '.txt';

/*
s3.createBucket({Bucket: bucketName}, function() {
  var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
  s3.putObject(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
  });
});
*/

/*
use this in params to set file permissions:
ACL:'public-read'

*/