
import * as functions from 'firebase-functions';
//import {cors} from 'cors';
import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import { PersonalUser, VendorUser } from './models/user';

admin.initializeApp(functions.config().database);

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

/**
 * Stores the file and returns a url to the stored location 
 * @param file : base64 encoded file
 */
function storeFile(file : string): string {
    return file; //TODO: add cloudstore or google store api calls
}

//handlers
app.post('/user/register', (req,resp) => {
    if(req.body.email === null ||
        req.body.username === null ||
        req.body.firstName === null ||
        req.body.lastName  === null) {
            resp.status(401).send("Missing parameters check request and resend");
    }

    let user: PersonalUser = {
        email : req.body.email,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileUrl: req.body.profile ? storeFile(req.body.profile): ''
    }
    const ref = admin.database().ref("/users/" + user.username)
    ref.set(user).then(() => {
        console.log("database write is succesful");
    }).catch(() => {
        console.log("some error occurred");
    });
    resp.json({'success': true}).send();
});

app.post('/taxiUser/register', (req, resp) => {
    if( req.body.email === null ||
        req.body.username == null ||
        req.body.firstName === null ||
        req.body.lastName === null ||
        req.body.kenyanID === null || 
        req.body.licenseType === null ||
        req.body.issueDate === null ||
        req.body.experienceYears === null) {
            resp.status(401).send("missing parameters check request and resend");
    }
    const ref = admin.database().ref("/taxiUsers/" + req.body.username)
    ref.set(req.body).then(() => {
        console.log("database write is succesful");
    }).catch(() => {
        console.log("some error occurred");
    });
    resp.json({'success': true}).send();  
});

app.post('/vendorUser/register', (req, resp) => {
    if(req.body.email === null ||
        req.body.username === null ||
        req.body.firstName === null ||
        req.body.lastName === null ||
        req.body.phoneNumber === null ||
        req.body.kenyanID === null || 
        req.body.passportPhoto === null ||
        req.body.businessName === null ||
        req.body.previewPhotos === null || 
        req.body.vatRegistered === null ||
        req.body.businessRegistered === null ||
        req.body.supervisorFirstName === null ||
        req.body.supervisorLastName === null)  {
            resp.status(401).send("missing parameters check request and resend");
    }
    let vendorUser : VendorUser = {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        phoneNumber: req.body.phoneNumber,
        kenyanID: req.body.kenyanID,
        passportPhotoUrl: storeFile(req.body.passportPhoto),
        businessName: req.body.businessName,
        logoUrl: req.body.logo? storeFile(req.body.logo ): '',
        previewPhotos: req.body.previewPhotos.map(storeFile),  
        vatRegistered: req.body.vatRegistered,
        businessRegistered: req.body.businessRegistered,  
        vat: req.body.vat ? req.body.vat: '',
        supervisorFirstName: req.body.supervisorFirstName,
        supervisorLastName: req.body.supervisorLastName,
    }
    const ref = admin.database().ref("/vendorUsers/" + req.body.username)
    ref.set(vendorUser).then(() => {
        console.log("database write is succesful");
    }).catch(() => {
        console.log("some error occurred");
    });
    resp.json({'success': true}).send(); 
         
});


exports.registration = functions.https.onRequest(app);
