//const base= 'https://tronpc.com/api';

const base = 'https://skyblu.xyz/api';
const basewww = 'https://www.skyblu.xyz/api'; 
const url = base + '/wp-json/wc/v3';
const urlwww = basewww + '/wp-json/wc/v3';

const authUrl = base + '/wp-json/jwt-auth/v1/token';
const tokenVerifyUrl = base + '/wp-json/jwt-auth/v1/token/validate';
const forgotPasswordUrl = base + '/wp-json/bdpwr/v1';


// noinspection DuplicatedCode
export const environment = {
    production: false,
    backend_api_url: url,
    backend_api_url_www: urlwww,
    auth_url: authUrl,
    token_verify_url: tokenVerifyUrl,
    forgotPasswordUrl: forgotPasswordUrl,
    secretCode: 'dCbrUWQSjUSnfinJcsR+Tw==',
    readOnlyKeys: {
        consumer_key: 'ck_ad3309970ab3bef3aa854ec8d54b5e7a6133cd7f',
        consumer_secret: 'cs_ecb725e516d291d37f1abef28525c001142681ac'
    },
    writableKeys: {
        consumer_key: 'ck_ad3309970ab3bef3aa854ec8d54b5e7a6133cd7f',
        consumer_secret: 'cs_ecb725e516d291d37f1abef28525c001142681ac'
    },
    
    whatsapp_number: 9747968569,     // TO DO: Change to their number
    states: [
        {value: 'AN', name: 'Andaman and Nicobar Islands'},
        {value: 'AP', name: 'Andhra Pradesh'},
        {value: 'AR', name: 'Arunachal Pradesh'},
        {value: 'AS', name: 'Assam'},
        {value: 'BR', name: 'Bihar'},
        {value: 'CG', name: 'Chandigarh'},
        {value: 'CH', name: 'Chhattisgarh'},
        {value: 'DH', name: 'Dadra and Nagar Haveli'},
        {value: 'DD', name: 'Daman and Diu'},
        {value: 'DL', name: 'Delhi'},
        {value: 'GA', name: 'Goa'},
        {value: 'GJ', name: 'Gujarat'},
        {value: 'HR', name: 'Haryana'},
        {value: 'HP', name: 'Himachal Pradesh'},
        {value: 'JK', name: 'Jammu and Kashmir'},
        {value: 'JH', name: 'Jharkhand'},
        { value: 'KA', name: 'Karnataka' },
        { value: 'KL', name: 'Kerala' },
        {value: 'LD', name: 'Lakshadweep'},
        {value: 'MP', name: 'Madhya Pradesh'},
        {value: 'MH', name: 'Maharashtra'},
        {value: 'MN', name: 'Manipur'},
        {value: 'ML', name: 'Meghalaya'},
        {value: 'MZ', name: 'Mizoram'},
        {value: 'NL', name: 'Nagaland'},
        {value: 'OR', name: 'Odisha'},
        {value: 'PY', name: 'Puducherry'},
        {value: 'PB', name: 'Punjab'},
        {value: 'RJ', name: 'Rajasthan'},
        {value: 'SK', name: 'Sikkim'},
        { value: 'TN', name: 'Tamil Nadu' },
        {value: 'TS', name: 'Telangana'},
        {value: 'TR', name: 'Tripura'},
        {value: 'UK', name: 'Uttarakhand'},
        {value: 'UP', name: 'Uttar Pradesh'},
        {value: 'WB', name: 'West Bengal'}
    ]
};
