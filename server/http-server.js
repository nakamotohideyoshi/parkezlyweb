import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser';
import session from 'express-session';

import paypalRoutes from './routes/paypal-routes.js';
import mapRoutes from './routes/map-routes.js';

// Production bool
const port = isProduction ? (process.env.PORT || 80) : 3000;
const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

export default function connect(app) {
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
    } else {
        // Production server
        app.use(express.static(publicPath));

        const publicPath = path.resolve('./dist/');
        const server = http.createServer(app);
        server.listen(port, function (err, result) {
            if(err){
            console.log(err);
            }
            console.log('Production server running on port ' + port);
        }); 
    }

    /*  RESTful API */
     
    // This is necessary to handle React-Router URL correctly since client uses Browser History
    app.get('*', function (request, response){
        response.sendFile(path.resolve('./dist/index.html'))
    })

    app.use(bodyParser({limit: '500mb'}));
    app.use(bodyParser.json({ type: 'application/json' }));
    app.use(session({secret: '876345'}));

    var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
    var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' })

    app.use(jsonParser);
    app.use(urlencodedParser);
    app.use(bodyParser.raw());

    //Paypal Configuration
    var paypalConfig = "paypal.dev.config.json";
    if (isProduction) {
        paypalConfig = "paypal.prod.config.json";
    }
    try {
        var configJSON = fs.readFileSync(__dirname + "/config/" + paypalConfig);
        var config = JSON.parse(configJSON.toString());
    } catch(e) {
        console.error("File config.json not found or is invalid: " + e.message);
        process.exit(1);
    }
    paypalRoutes.init(config);

    app.post('/api/logout', function(req, res) {
    res.status(200).json({'message' : 'User logged out'});   
    });

    /*Paypal specific rules */
    app.post('/api/add-funds', paypalRoutes.addFunds);
    app.post('/api/save-transaction', paypalRoutes.saveTransaction);
    app.post('/api/pay-for-parking', paypalRoutes.payForParking);
    app.post('/api/confirm-parking', paypalRoutes.confirmParking);

    /*Google Places API*/
    app.post('/api/nearby', mapRoutes.getNearbyPlaces);
    app.post('/api/get-location-details', mapRoutes.getLocationDetails);
    app.post('/api/get-location-coordinates', mapRoutes.getLocationCoordinates);
    app.post('/api/get-street-view', mapRoutes.getStreetView);
}

