import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import axios from 'axios';
import moment from 'moment'
import {API_CONFIG} from '../../config/axios/axios-config';

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const smtpConfig = {
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'troyedwardsjr@gmail.com',
            clientId: '994240502606-ivla0u1592pvlmouvrcunu46m1vefcdj.apps.googleusercontent.com',
            clientSecret: 'tctQNob_4rLij4Gy6nXM6LoI',
            refreshToken: '1/NyDsppjekHDFk9yX9gb8RTkbYmPzx3PhTLO7F-pSxck',
            accessToken: 'ya29.Ci9gAxHU_vFetf-p5Qk5ZSKTRo3rDnBQD7FV5R3xDry257j2wdIWnZS4EjiHytnl8Q'
        })
    }
};

export default function emailMain() {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(smtpConfig);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"ParkEZly Notifier" <parkezlynotifier@gmail.com>', // sender address
        to: '', // list of receivers
        subject: '', // Subject line
        text: '', // plaintext body
        html: '' // html body
    };
    /*
    AXIOS_INSTANCE.get('parked_cars')
    .then(function(response) {
        response.data.resource.map((data) => {
            if(data.notified !== "YES") {
                let parkedCarsData = data;
                let currentTime = moment().diff(moment(data.expiry_time), 'hours');
                if (currentTime < 0) {

                    mailOptions.subject = `Meter Expiration Notification for: ${data.plate_no}`
                    mailOptions.text = `${data.plate_no}'s meter has expired.`
                    mailOptions.html = `${data.plate_no}'s meter has expired.`

                    AXIOS_INSTANCE.get('townships_manager')
                    .then(function(response) {
                        response.data.resource.map((data) => {
                            if (data.manager_id == parkedCarsData.township_code) {
                                mailOptions.to = data.contact_email;
                                transporter.sendMail(mailOptions, function(error, info){
                                    if(error){
                                        return console.log(error);
                                    }
                                    console.log('Message sent: ' + info.response);
                                });
                                AXIOS_INSTANCE.put("parked_cars?ids=" + parkedCarsData.id, {"notified": "YES"})
                            }
                        })
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                }
            }
            
        })
    })
    .catch(function(response){
        console.log(response);
    })
    */
    
    
}
