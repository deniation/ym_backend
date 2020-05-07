
import * as functions from 'firebase-functions';
//import {cors} from 'cors';
import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import { PersonalUser, VendorUser, TaxiUser } from './models/user';

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
app.post('/user/register', async (req,resp) => {
    if(!req.body.email  ||
        !req.body.username  ||
        !req.body.firstName  ||
        !req.body.lastName  ) {
            resp.status(401).send("Missing parameters check request and resend");
    }

    const user: PersonalUser = {
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

    const userRecord  = await admin.auth().createUser({
        email: user.email,
        emailVerified: false,
        displayName: `${user.firstName} ${user.lastName}`,
        disabled: false
    });
    console.log("User created ", userRecord)
    resp.json({'success': true}).send();
});

app.get('/user/:username', async (req,resp) => {
    
    const snap = await admin.database().ref("/users/" + req.params.username).once('value');
    let user:PersonalUser = snap.val();
    if(user) {
        resp.json(user).send();
    }else {
        resp.status(404).send();
    }
});

app.post('/taxiUser/register', async (req, resp) => {
    if( !req.body.email  ||
        !req.body.username  ||
        !req.body.firstName  ||
        !req.body.lastName  ||
        !req.body.kenyanID  || 
        !req.body.licenseNumber  ||
        !req.body.licenseType  ||
        !req.body.issueDate  ||
        !req.body.experienceYears  ||
        !req.body.phoneNumber  ||
        !req.body.passportPhoto  ||
        !req.body.mvmcRegistration  ||
        !req.body.logbookSerial  ||
        !req.body.inspectionDone  ||
        !req.body.inspectionReportNumber  ||
        !req.body.ownerFirstName  ||
        !req.body.ownerLastName  ||
        !req.body.ownerKenyanID  ||
        !req.body.ownerPhone  ||
        !req.body.ownerPassportPhoto  ||
        !req.body.ownerConsent ) {
            resp.status(401).send("missing parameters check request and resend");
    }

    const taxiUser : TaxiUser = {
        email : req.body.email,
        username: req.body.username ,
        firstName: req.body.firstName ,
        lastName: req.body.lastName ,
        kenyanID: req.body.kenyanID ,
        licenseNumber: req.body.licenseNumber, 
        licenseType: req.body.licenseType ,
        issueDate: req.body.issueDate ,
        experienceYears: req.body.experienceYears ,
        phoneNumber: req.body.phoneNumber ,
        passportPhoto: storeFile(req.body.passportPhoto),
        mvmcRegistration: req.body.mvmcRegistration ,
        logbookSerial: req.body.logbookSerial ,
        inspectionDone: req.body.inspectionDone ,
        inspectionReportNumber: req.body.inspectionReportNumber ,
        ownerFirstName: req.body.ownerFirstName ,
        ownerLastName: req.body.ownerLastName ,
        ownerKenyanID: req.body.ownerKenyanID ,
        ownerPhone: req.body.ownerPhone ,
        ownerPassportPhoto: req.body.ownerPassportPhoto ,
        ownerConsent: req.body.ownerConsent ,
        vehiclePhotos: req.body.vehiclePhotos? req.body.vehiclePhotos.map(storeFile): [],
        taxiStandLocation: req.body.taxiStandLocation?req.body.taxiStandLocation: '',
        areasServed : req.body.areasServed? req.body.areasServed : []
    } 
    
    const ref = admin.database().ref("/taxiUsers/" + req.body.username);
    
    await ref.set(taxiUser);

    const userRecord  = await admin.auth().createUser({
        email: taxiUser.email,
        emailVerified: false,
        phoneNumber: taxiUser.phoneNumber,
        displayName: `${taxiUser.firstName} ${taxiUser.lastName}`,
        disabled: false
    });
    console.log("Taxi User created ", userRecord)

    resp.json({'success': true}).send();  
});

app.get('/taxiUser/:username', async (req,resp) => {
    
    const snap = await admin.database().ref("/taxiUsers/" + req.params.username).once('value');
    let user:TaxiUser = snap.val();
    if(user) {
        resp.json(user).send();
    }else {
        resp.status(404).send();
    }
});

app.post('/vendorUser/register', async(req, resp) => {
    if(!req.body.email  ||
        !req.body.username  ||
        !req.body.firstName  ||
        !req.body.lastName  ||
        !req.body.phoneNumber  ||
        !req.body.kenyanID  || 
        !req.body.passportPhoto  ||
        !req.body.businessName  ||
        !req.body.previewPhotos  || 
        !req.body.vatRegistered  ||
        !req.body.businessRegistered  ||
        !req.body.supervisorFirstName  ||
        !req.body.supervisorLastName )  {
            resp.status(401).send("missing parameters check request and resend");
    }
    const vendorUser : VendorUser = {
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

    const userRecord  = await admin.auth().createUser({
        email: vendorUser.email,
        emailVerified: false,
        phoneNumber: vendorUser.phoneNumber,
        displayName: `${vendorUser.firstName} ${vendorUser.lastName}`,
        disabled: false
    });
    console.log("Vendor User created ", userRecord)
    resp.json({'success': true}).send(); 
         
});

app.get('/vendorUser/:username', async (req,resp) => {
    
    const snap = await admin.database().ref("/vendorUsers/" + req.params.username).once('value');
    let user:VendorUser = snap.val();
    if(user) {
        resp.json(user).send();
    }else {
        resp.status(404).send();
    }
});

exports.registration = functions.https.onRequest(app);
