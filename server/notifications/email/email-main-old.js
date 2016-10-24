import axios from 'axios';
import moment from 'moment'
import sendpulse from './sendpulse.js'
import _ from 'lodash';

import {API_CONFIG} from '../../config/axios/axios-config';
const AXIOS_INSTANCE = axios.create(API_CONFIG);

/*
 * https://login.sendpulse.com/settings/#api
 */
const API_USER_ID="2f787a5b8ac9e7ec6aa26f4d0f61e319"
const API_SECRET="d92cb4c2e5469b6ee54e3f3097170f2a"
const TOKEN_STORAGE="/tmp/"

export default function emailMain() {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE);

    /**
     * Function to log response data from email API.
     *
     * @param data
     */
    let emailLogger = function emailLogger(data){
        console.log(data);
    }

    function getParkedCars() {
        return AXIOS_INSTANCE.get('parked_cars?filter=(notified=NO)')
    }

    function getUserList() {
        return AXIOS_INSTANCE.get('township_users?filter=(township_code=FDV)')
    }

    function getUserProfile() {
        return AXIOS_INSTANCE.get(`user_profile`)
    }

   axios.all([getParkedCars(), getUserList(), getUserProfile()])
    .then(axios.spread(function (parkedCars, userList, userProfileList) {

        let emailHtml = "<h1>ParkEzly Meter Expired Users</h1>"
        let emailAddrList = []  
        let emailTemplate = {
            "html" : emailHtml,
            "text" : "Text",
            "subject" : "ParkEZly Notification: Meter Expired Users",
            "from" : {
                "name" : "ParkEZly Notification Bot",
                "email" : "blsbox17@gmail.com"
            },
            "to" : emailAddrList
        };

        let emailMap = parkedCars.data.resource.map((item) => {
            let parkedCarsData = item;
            let currentTime = moment().diff(moment(item.expiry_time), 'hours');

            if (currentTime < 0) {

            }

            return {
                id: item.id, 
                user_id: item.user_id, 
                plate: item.plate_no, 
                expiry_time: item.expiry_time, 
                township_code: item.township_code
            };
        });

        userList.data.resource.map((user) => { 
            emailMap.map((parkedCar) => {
                if (parkedCar.township_code == user.township_code) {
                    let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                    let userProfile = userProfileFilter[0];

                    if (userProfile !== null & userProfile != undefined) {
                        emailHtml = "<h1>ParkEzly Meter Expired Users</h1>"
                        emailHtml += 
                        `<p><h3>Plate: ${parkedCar.plate_no}</h3></p>
                        <p><strong>Expired Time:</strong> ${parkedCar.expiry_time} </p>
                        <hr>`
                        emailAddrList.push({ 
                            "name": "ParkEZly Admin",
                            "email": userProfile.email
                        })
                        emailTemplate.html = emailHtml;
                        emailTemplate.to = emailAddrList;
                    }
                }
            })    
        });
        sendpulse.smtpSendMail(emailLogger, emailTemplate);  
        //AXIOS_INSTANCE.put("parked_cars?ids=" + expiredUser.id, {"notified": "YES"})
    }));

    /*
    
    AXIOS_INSTANCE.get('parked_cars?filter=(notified=NO)')
    .then(function(response) {
        let emailHtml = "<h1>ParkEzly Meter Expired Users</h1>"
        let emailAddrList = []  
        let emailTemplate = {
            "html" : emailHtml,
            "text" : "Text",
            "subject" : "ParkEZly Notification: Meter Expired Users",
            "from" : {
                "name" : "ParkEZly Notification Bot",
                "email" : "blsbox17@gmail.com"
            },
            "to" : emailAddrList
        };

        let emailMap = response.data.resource.map((item) => {
            let parkedCarsData = item;
            let currentTime = moment().diff(moment(item.expiry_time), 'hours');
            return {id: item.id, user_id: item.user_id, plate: item.plate_no, expiry_time: item.expiry_time};
        });
        
        AXIOS_INSTANCE.get('township_users?filter=(township_code=FDV)')
        .then(function(response) {
            response.data.resource.map((userData) => {
                emailMap.map((expiredUser) => {
                    if (userData.user_id === expiredUser.user_id) {
                        AXIOS_INSTANCE.get(`user_profile?filter=(user_id=${userData.user_id})`)
                        .then(function(response) {
                            response.data.resource.map((userProfile) => {
                                emailHtml += 
                                `<p><h3>Plate: ${expiredUser.plate}</h3></p>
                                <p><strong>Expired Time:</strong> ${expiredUser.expiry_time} </p>
                                <hr>`
                                emailAddrList.push({ 
                                    "name": "ParkEZly Admin",
                                    "email": userProfile.email
                                })
                                emailTemplate.html = emailHtml;
                                emailTemplate.to = emailAddrList;
                                //console.log(emailAddrList)
                            })
                            sendpulse.smtpSendMail(emailLogger, emailTemplate);  
                            //AXIOS_INSTANCE.put("parked_cars?ids=" + expiredUser.id, {"notified": "YES"})
                        })
                        .catch(function(response){
                            console.log(response);
                        })
                    }
                })
            })
        })
        .catch(function(response){
            console.log(response);
        })
    })
    .catch(function(response){
        console.log(response);
    })
    */
}


    
    
    /*
    sendpulse.createAddressBook(emailLogger,'My Book');
    sendpulse.editAddressBook(emailLogger, 123456, 'My new book');
    sendpulse.removeAddressBook(emailLogger, 123456);
    sendpulse.getBookInfo(emailLogger,123456);
    sendpulse.getEmailsFromBook(emailLogger,123456);
    sendpulse.addEmails(emailLogger, 123456, [{email:'some@domain.com',variables:{}}]);
    sendpulse.removeEmails(emailLogger, 123456, ['some@domain.com']);
    sendpulse.getEmailInfo(emailLogger,123456,'some@domain.com');
    sendpulse.campaignCost(emailLogger,123456);
    sendpulse.listCampaigns(emailLogger,10,20);
    sendpulse.getCampaignInfo(emailLogger,123456);
    sendpulse.campaignStatByCountries(emailLogger,123456);
    sendpulse.campaignStatByReferrals(emailLogger,123456);
    sendpulse.createCampaign(emailLogger,'Alex','some@domain.com','Example subject','<h1>Example text</h1>',123456);
    sendpulse.cancelCampaign(emailLogger,123456);
    sendpulse.listSenders(emailLogger);
    sendpulse.addSender(emailLogger,'Alex','some@domain.com');
    sendpulse.removeSender(emailLogger,'some@domain.com');
    sendpulse.activateSender(emailLogger,'some@domain.com','q1q1q1q1q1q1q1q1q1q1q1');
    sendpulse.getSenderActivationMail(emailLogger,'some@domain.com');
    sendpulse.getEmailGlobalInfo(emailLogger,'some@domain.com');
    sendpulse.removeEmailFromAllBooks(emailLogger,'some@domain.com');
    sendpulse.emailStatByCampaigns(emailLogger,'some@domain.com');
    sendpulse.getBlackList(emailLogger);
    sendpulse.addToBlackList(emailLogger,'some@domain.com','Comment');
    sendpulse.removeFromBlackList(emailLogger,'some@domain.com');
    sendpulse.getBalance(emailLogger,'USD');
    sendpulse.smtpListEmails(emailLogger,10,20,undefined,undefined,undefined,'some@domain.com');
    sendpulse.smtpGetEmailInfoById(emailLogger,'a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1');
    sendpulse.smtpUnsubscribeEmails(emailLogger,[{email:'some@domain.com',comment:'Comment'}]);
    sendpulse.smtpRemoveFromUnsubscribe(emailLogger, ['some@domain.com']);
    sendpulse.smtpListIP(emailLogger);
    sendpulse.smtpListAllowedDomains(emailLogger);
    sendpulse.smtpAddDomain(emailLogger,'some@domain.com');
    sendpulse.smtpVerifyDomain(emailLogger,'some@domain.com');
    */



















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
    
    
    
}

    /*
            .filter((item) => {
            return item.notified !== "YES"
        })
        */

        /*
            testAddressesMapped = testAddresses.map((data) => {
                return {
                    "name": data.email,
                    "email": data.email,
                }
            })
        */
    //sendpulse.listAddressBooks(emailLogger);
    //sendpulse.listSenders(emailLogger);

    /*
    if (currentTime < 0) {
                    console.log(data.plate_no)
                    return `${data.plate_no}s meter has expired.`

                    /*
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
                */

                /*
                
    var email = {
            "html" : "<h1>Example text</h1>",
            "text" : "Example text",
            "subject" : "Example subject",
            "from" : {
                "name" : "Alex",
                "email" : "some@domain.com"
            },
            "to" : [
                {
                    "name" : "Piter",
                    "email" : "some@domain.net"
                },
            ],
            "bcc" : [
                {
                    "name" : "John",
                    "email" : "some@domain.info"
                },
            ]
        };
    sendpulse.smtpSendMail(emailLogger,email);
    */