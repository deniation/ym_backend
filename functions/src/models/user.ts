

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
    experience: number;
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