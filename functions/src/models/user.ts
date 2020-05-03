

export interface PersonalUser {
    email : string;
    username : string;
    firstName : string;
    lastName  : string;
    profileUrl : string;
}

//TODO: convert license to appropriate types
//TODO: date should be some ISO format
export interface TaxiUser {
    email: string;
    username: string;
    firstName : string;
    lastName : string;
    kenyanID : string;
    licenseNumber : string; 
    licenseType : string;
    issueDate: string; 
    experienceYears: number;
    phoneNumber : string;
    passportPhoto : string;
    mvmcRegistration : string;
    logbookSerial : string;
    inspectionDone : boolean;
    inspectionReportNumber : string;
    ownerFirstName : string;
    ownerLastName : string;
    ownerKenyanID : string;
    ownerPhone : string;
    ownerPassportPhoto : string;
    ownerConsent : string;
    vehiclePhotos : string[];
    taxiStandLocation : string;
    areasServed : string[]
}


export interface VendorUser {
    username: string;
    email : string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    kenyanID: string;
    passportPhotoUrl : string;
    businessName: string;
    logoUrl: string;
    previewPhotos : string[];
    vatRegistered: boolean;
    businessRegistered: boolean;
    vat: string;
    supervisorFirstName: string;
    supervisorLastName: string;
}