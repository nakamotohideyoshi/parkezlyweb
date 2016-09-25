var client = require('twilio')('ACa6bbd1a6fadaa82cb2ae65175dc7f052', '843aad89d381d13b021bea30d785a1b6');
    // Troy Live
// ACa6bbd1a6fadaa82cb2ae65175dc7f052
// 843aad89d381d13b021bea30d785a1b6
    // Troy Test
// AC87f456f011b5f96309449c6a976c28a6
// f84dd735d915ff1de90bbeed3ac7432e

/* Brett Live
    'ACf7f226de232f0af117b36cec35d15c73', 
    'b0f74f30a6c9519f4a2c47065fb3fcce'
*/
var toNum = [];
const fromNum = '';

export default function twilioMain() {
    /*
    client.calls.get(function(err, response) {
        response.calls.forEach(function(call) {
            console.log('Received call from: ' + call.from);
            console.log('Call duration (in seconds): ' + call.duration);
        });
    });

    client.calls.get({
        from:'+16513334455'
    }, function(err, response) {
        response.calls.forEach(function(call) {
            console.log('Received call from: ' + call.from);
            console.log('This call\'s unique ID is: ' + call.sid);
        });
    });
    */
    /*
    client.sms.messages.post({
        to:'+14012191065',
        from:'+14012694541',
        body:'Testing SMS'
    }, function(err, text) {
        if (err) {
            console.log(err);
        }
        if (text) {
            console.log('You sent: '+ text.body);
            console.log('Current status of this text message is: '+ text.status);
        }
    });
    */
}
