const url = 'https://tronpc.com/api/wp-json/wc/v3';
const authUrl = 'https://tronpc.com/api/wp-json/jwt-auth/v1/token';
const tokenVerifyUrl = 'https://tronpc.com/api/wp-json/jwt-auth/v1/token/validate';
const forgotPasswordUrl = 'https://tronpc.com/api/wp-json/bdpwr/v1';


// noinspection DuplicatedCode
export const environment = {
    production: false,
    backend_api_url: url,
    auth_url: authUrl,
    token_verify_url: tokenVerifyUrl,
    forgotPasswordUrl: forgotPasswordUrl,
    secretCode: 'dCbrUWQSjUSnfinJcsR+Tw==',
    readOnlyKeys: {
        consumer_key: 'ck_98bb1dbdb0cb80097c9b57f0a9ab027add861504',
        consumer_secret: 'cs_2f1c050e71d3b15ff9e65508a787c9337aab9879'
    },
    writableKeys: {
        consumer_key: 'ck_98bb1dbdb0cb80097c9b57f0a9ab027add861504',
        consumer_secret: 'cs_2f1c050e71d3b15ff9e65508a787c9337aab9879'
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
