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
    
    let testAddressesMapped;

    let testAddresses = () => {
        sendpulse.getEmailsFromBook((data) => {
            return data;
        }, 591624);
    }

    //console.log(testAddresses())
    let email = {
        "html" : "<h1>Hello world! 78900000</h1>",
        "text" : "Example text",
        "subject" : "Example subject",
        "from" : {
            "name" : "Notification Bot",
            "email" : "blsbox17@gmail.com"
        },
        "to" : testAddresses,
        "bcc" : [
            {
                "name" : "Notification Bot",
                "email" : "troyedwardsjr@gmail.com"
            },
        ]
    };
    
    
    
    AXIOS_INSTANCE.get('parked_cars')
    .then(function(response) {
        let mailArray = []

        let mailMap = response.data.resource
        .filter((item) => {
            return item.notified !== "YES"
        })
        .map((item) => {
            let parkedCarsData = item;
            let currentTime = moment().diff(moment(item.expiry_time), 'hours');
            return item;
        });
        /*
        AXIOS_INSTANCE.get('township_users')
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
        */
        console.log(mailMap)
        sendpulse.smtpSendMail(emailLogger, email);
    })
    .catch(function(response){
        console.log(response);
    })
    
    
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
}



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