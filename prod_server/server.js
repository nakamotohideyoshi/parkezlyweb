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

var dataUriToBuffer = require('data-uri-to-buffer');

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
app.use(bodyParser({limit: '500mb'}));
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




var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })

app.use(jsonParser);
app.use(urlencodedParser);
app.use(bodyParser.raw());









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


app.post('/admin/s3', function (req, res) {
  console.log("Testing Restful API");
  
  var awsURL = 'https://s3.amazonaws.com/';
  var bucketName = 'parkezly-images';
  var keyName = 'township_image-'+ uuid.v4() + '.png';

  let decoded = dataUriToBuffer(req.body.croppedImage);
  s3.createBucket({Bucket: bucketName}, function() {
    var params = {Bucket: bucketName, Key: keyName, Body: decoded, ACL: 'public-read'};
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err)

        res.status(500).json({'message' : err});  
      } 
      else {
        console.log("Successfully uploaded data to " + awsURL + bucketName + "/" + keyName);
        res.status(200).json({
          'message' : awsURL + bucketName + "/" + keyName,
        });
      }   
    });
  });

});




/*
use this in params to set file permissions:
ACL:'public-read'

*/













// We need to use basic HTTP service to proxy
// websocket requests from webpack
const server = http.createServer(app);

server.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
}); 










