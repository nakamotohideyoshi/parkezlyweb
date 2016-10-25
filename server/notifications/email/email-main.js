import axios from 'axios';
import moment from 'moment'
import sendpulse from './sendpulse.js'
import _ from 'lodash';

import {API_CONFIG} from '../../config/axios/axios-config';

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const schedule = require('node-schedule');

/*
 * https://login.sendpulse.com/settings/#api
 */
const API_USER_ID="2f787a5b8ac9e7ec6aa26f4d0f61e319"
const API_SECRET="d92cb4c2e5469b6ee54e3f3097170f2a"
const TOKEN_STORAGE="/tmp/"

/**
 * Function to log response data from email API.
 *
 * @param data
 */
let emailLogger = function emailLogger(data){
    console.log(data);
}

export default function emailMain(app) {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE);

    newPermitNotify(app);
    meterExpiredNotify(app);
    newTicketNotify(app)
    /*
    let cronj = schedule.scheduleJob('0 * * * *', function(){
        console.log('Execute cron job every hour!');
    });
    */
}

function newTicketNotify(app) {

    app.post('/api/notify-parking-ticket', function (req, res) {
        setTimeout(() => {
            let newTicket = req.body;

            function getUserList() {
                return AXIOS_INSTANCE.get(`township_users?filter=(township_code=${newTicket.township_code})`)
            }

            function getUserProfile() {
                return AXIOS_INSTANCE.get(`user_profile`)
            }

            axios.all([getUserList(), getUserProfile()])
            .then(axios.spread(function (userList, userProfileList) {

                let emailHtml = `<h1>New Parking Ticket</h1>
                                <p><h3>User Id: ${newTicket.user_id}</h3></p>
                                <p><strong>Plate Name:</strong> ${newTicket.plate_no} </p>
                                <p><strong>Township:</strong> ${newTicket.township_code} </p>
                                <p><strong>Violation Fee:</strong> ${newTicket.violation_fee} </p>
                                <p><strong>Violation Code:</strong> ${newTicket.violation_code} </p>
                                <p><strong>Violation Location:</strong> ${newTicket.violation_location} </p>
                                <p><strong>Violation Detail:</strong> ${newTicket.violation_detail} </p>
                                <p><strong>Violation Description:</strong> ${newTicket.violation_description} </p>
                                <p><strong>Hearing Location:</strong> ${newTicket.hearing_location} </p>
                                <hr>`;
                let emailAddrList = []; 
                let emailTemplate = {
                    "html" : emailHtml,
                    "text" : "Text",
                    "subject" : "ParkEZly Notification: New Parking Ticket",
                    "from" : {
                        "name" : "ParkEZly Notification Bot",
                        "email" : "blsbox17@gmail.com"
                    },
                    "to" : emailAddrList
                };

                let filteredEmails = userList.data.resource.map((user) => { 
                    let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                    let userProfile = userProfileFilter[0];

                    if (userProfile !== null & userProfile !== undefined) {
                        return {"name": "ParkEZly Admin", "email": userProfile.email}
                    }  
                });

                emailTemplate.to = filteredEmails;
                console.log(emailTemplate.to)
                
                if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                        sendpulse.smtpSendMail(emailLogger, emailTemplate);  
                }
                res.send(emailTemplate)
            }))
            .catch(function(response){
                console.log(response);
            });
        }, 3600000); // 1 hour = 3600000 ms
    });
}

function newPermitNotify(app) {
    app.post('/api/notify-parking-permit', function (req, res) {

        let newPermit = req.body;
        //console.log(req.body)

        function getUserList() {
            return AXIOS_INSTANCE.get(`township_users?filter=(township_code=${newPermit.township_code})`)
        }

        function getUserProfile() {
            return AXIOS_INSTANCE.get(`user_profile`)
        }

        axios.all([getUserList(), getUserProfile()])
        .then(axios.spread(function (userList, userProfileList) {

            let emailHtml = `<h1>New Parking Permit Approved</h1>
                            <p><h3>User Id: ${newPermit.user_id}</h3></p>
                            <p><strong>Permit Name:</strong> ${newPermit.permit_name} </p>
                            <p><strong>Township:</strong> ${newPermit.township_code} </p>
                            <p><strong>Username:</strong> ${newPermit.user_name} </p>
                            <hr>`;
            let emailAddrList = []; 
            let emailTemplate = {
                "html" : emailHtml,
                "text" : "Text",
                "subject" : "ParkEZly Notification: New Parking Permit Approved",
                "from" : {
                    "name" : "ParkEZly Notification Bot",
                    "email" : "blsbox17@gmail.com"
                },
                "to" : emailAddrList
            };

            let filteredEmails = userList.data.resource.map((user) => { 
                let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                let userProfile = userProfileFilter[0];

                if (userProfile !== null & userProfile !== undefined) {
                    return {"name": "ParkEZly Admin", "email": userProfile.email}
                }  
            });

            emailTemplate.to = filteredEmails;
            console.log(emailTemplate.to)
            
            if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                    sendpulse.smtpSendMail(emailLogger, emailTemplate);  
            }
            res.send(emailTemplate)
        }))
        .catch(function(response){
            console.log(response);
        });
    });
}

function meterExpiredNotify() {
     function getParkedCars() {
        return AXIOS_INSTANCE.get('parked_cars?filter=(notified=NO)')
    }

    function getUserList() {
        return AXIOS_INSTANCE.get('township_users') //?filter=(township_code=FDV)
    }

    function getUserProfile() {
        return AXIOS_INSTANCE.get(`user_profile`)
    }

   axios.all([getParkedCars(), getUserList(), getUserProfile()])
    .then(axios.spread(function (parkedCars, userList, userProfileList) {

        let emailHtml;
        let emailAddrList; 
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
            emailHtml = "<h1>ParkEzly Meter Expired Users</h1>";
            emailAddrList = [];

            let filteredEmails = emailMap
            .filter((parkedCar) => {
                return parkedCar.township_code == user.township_code
            })
            .map((parkedCar) => {
                let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                let userProfile = userProfileFilter[0];

                if (userProfile !== null & userProfile !== undefined) {

                    emailHtml += `<p><h3>Plate: ${parkedCar.plate}</h3></p>
                    <p><strong>Database Id:</strong> ${parkedCar.id} </p>
                    <p><strong>Township:</strong> ${parkedCar.township_code} </p>
                    <p><strong>Expired Time:</strong> ${parkedCar.expiry_time} </p>
                    <hr>`;
                    emailTemplate.html = emailHtml;

                    //AXIOS_INSTANCE.put("parked_cars?ids=" + expiredUser.id, {"notified": "YES"})
                    return {"name": "ParkEZly Admin", "email": userProfile.email}
                }
            })   
            emailTemplate.to = filteredEmails;
            if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                sendpulse.smtpSendMail(emailLogger, emailTemplate);  
            }
        });
    }));


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
