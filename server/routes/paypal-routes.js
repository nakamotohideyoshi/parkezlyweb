"use strict";

var paypal = require('paypal-rest-sdk');
var querystring = require('querystring');
var http = require('http');
var config = {};

exports.addFunds = function (req, res) {

    var paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {},
      "transactions": [{
        "amount": {
          "currency": "USD"
        }
      }]
    };

    paypalPayment.transactions[0].amount.total = req.body.amount;
    paypalPayment.transactions[0].description = "Add funds to ParkEzly Wallet";
    paypalPayment.redirect_urls.return_url = "http://localhost:" + (config.port ? config.port : 3000) + "/finalize-payment";
    paypalPayment.redirect_urls.cancel_url = "http://localhost:" + (config.port ? config.port : 3000) + "/payment-failure";

    paypal.payment.create(paypalPayment, {}, function (err, resp) {
      if (err) {
        res.redirect('/payment-failure?errorcode=1010');
      } else {
        if(resp.payer.payment_method === 'paypal') {
          req.session[resp.id] = {
            amount: req.body.amount,
            userId: req.body.userId,
            currentBalance: req.body.currentBalance
          };
          console.log(req.session[resp.id]);
          var redirectUrl;
          for(var i=0; i < resp.links.length; i++) {
            var link = resp.links[i];
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          res.redirect(redirectUrl);
        }
      }
    });
};

exports.saveTransaction = function(req, res) {
  var paymentId = req.body.paymentId;
  if(req.session[paymentId]) {
    var dateTime = (new Date()).toISOString().replace(/\.[\d]{3}Z$/, 'Z ');
    var ip = req.connection.remoteAddress;
    var userId = req.session[paymentId].userId;
    var amt = req.session[paymentId].amount;
    var currentBalance = parseFloat(req.session[paymentId].currentBalance) + parseFloat(amt);

    var postData = JSON.stringify({
      resource : {
        date_time: dateTime,
        paid_date: dateTime,
        user_id: userId,
        add_amt: amt,
        current_balance: currentBalance,
        ip: ip
      }
    });

    var options = {
      hostname: '100.12.26.176',
      port: '8006',
      path: '/api/v2/pzly01live7/_table/user_wallet',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'X-DreamFactory-Application-Name': 'parkezly',
        'X-DreamFactory-Api-Key': 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5'
      }
    };

    var post_req = http.request(options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) {
        delete req.session[paymentId];
        res.redirect('/my-wallet');
      });
    });

    post_req.on('error', function(e) {
      res.redirect('/payment-failure?errorcode=1011&paymentId='+paymentId);
      console.log('Could not save transaction : ' + e.message);
    });

    post_req.write(postData);
    post_req.end();
  }
};

exports.payForParking = function(req, res) {
  var paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {},
      "transactions": [{
        "amount": {
          "currency": "USD"
        }
      }]
    };

    paypalPayment.transactions[0].amount.total = req.body.amount;
    paypalPayment.transactions[0].description = "Pay for Parking";
    paypalPayment.redirect_urls.return_url = "http://localhost:" + (config.port ? config.port : 3000) + "/finalize-payment";
    paypalPayment.redirect_urls.cancel_url = "http://localhost:" + (config.port ? config.port : 3000) + "/payment-failure";

    paypal.payment.create(paypalPayment, {}, function (err, resp) {
      if (err) {
        res.redirect('/payment-failure?errorcode=1010');
      } else {
        if(resp.payer.payment_method === 'paypal') {
          req.session[resp.id] = {
            amount: req.body.amount,
            userId: req.body.userId,
            currentBalance: req.body.currentBalance
          };
          console.log(req.session[resp.id]);
          var redirectUrl;
          for(var i=0; i < resp.links.length; i++) {
            var link = resp.links[i];
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          res.redirect(redirectUrl);
        }
      }
    });
};

exports.init = function (c) {
  config = c;
  paypal.configure(c.api);
};