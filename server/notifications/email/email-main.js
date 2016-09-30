import nodemailer from 'nodemailer';
import xoauth2 from 'xoauth2';
import axios from 'axios';
import {API_CONFIG} from '../../config/axios/axios-config';

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const smtpConfig = {
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'RouStudios@gmail.com',
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
        from: '"Troy Edwards" <troyedwardsjr@gmail.com>', // sender address
        to: 'troyedwardsjr@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world', // plaintext body
        html: '<b>Hello world 🐴</b>' // html body
    };

    /*
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
        
    */

    /*
        AXIOS_INSTANCE.get('parked_cars')
        .then(function(response) {
            //console.log(response.data);
        })
        .catch(function(response){

        })
    */
}
