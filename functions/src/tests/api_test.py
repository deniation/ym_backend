import requests



##TODO: conver this to pass/fail tests and add them to github workflow...

BASE_URL = 'https://us-central1-y2m-test.cloudfunctions.net/registration'

def test_user_register(): 
    body = {
        'email' : 'fake@fake.com',
        'username': 'foo',
        'firstName': 'first', 
        'lastName': 'last', 
        'profile' : 'somefilestr'
    }
    url  = "{}/user/register".format(BASE_URL)
    res = requests.post(url, json= body, headers = {'Content-Type': 'application/json'})
    print('test_user_register\n\t STATUS CODE:{} '.format(res.status_code))
    print('\t BODY: {}'.format(res.text))

def test_taxi_register():
    body = {
        'email' : 'david.muchene@gmail.com',
        'username': 'dog_poop',
        'firstName': 'first', 
        'lastName': 'last', 
        'kenyanID': '12321431', 
        'licenseNumber': '123435',
        'licenseType': 'class D', 
        'issueDate': '2001-01-01T',
        'experienceYears' : 5,
        'phoneNumber': '+254722235445',
        'passportPhoto': 'someFileStr',
        'mvmcRegistration': 'someserial.',
        'logbookSerial': 'someserial', 
        'inspectionDone': True,
        'inspectionReportNumber': '123456', 
        'ownerFirstName': 'first',
        'ownerLastName' : 'last', 
        'ownerKenyanID': '12354123',
        'ownerPhone' : '123456',
        'ownerPassportPhoto': 'someFileStr', 
        'ownerConsent': 'somefileStr',
        'vehiclePhotos' : ['file1', 'file2'],
        'taxiStandLocation': 'a location',
        'areasServed': ['loc1', 'loc2', 'loc3']
    }
    url  = "{}/taxiUser/register".format(BASE_URL)
    res = requests.post(url, json= body, headers = {'Content-Type': 'application/json'})
    print('test_taxi_register\n\t STATUS CODE:{} '.format(res.status_code))
    print('\t BODY: {}'.format(res.text))

def test_vendor_register(): 
    body = {
        'email' : 'fake@fake.com',
        'username': 'foo',
        'firstName': 'first', 
        'lastName': 'last', 
        'phoneNumber': '12345656',
        'kenyanID': '12321431', 
        'passportPhoto': 'somefileStr',
        'businessName': 'fake business',
        'logo': 'fomeFilestr',
        'previewPhotos' : ['str1', 'str2', 'str3', 'str4', 'str5'],
        'vatRegistered' : True,
        'businessRegistered': True, 
        'vat': 'someformated#', 
        'supervisorFirstName': 'a name',
        'supervisorLastName' : 'a lastName'
    }

    url  = "{}/vendorUser/register".format(BASE_URL)
    res = requests.post(url, json= body, headers = {'Content-Type': 'application/json'})
    print('test_user_register\n\t STATUS CODE:{} '.format(res.status_code))
    print('\t BODY: {}'.format(res.text))


if __name__ == '__main__':
    test_user_register()
    test_taxi_register()
    test_vendor_register()