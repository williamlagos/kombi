// Development default environment variables
const config = require("../.config/project");
const name = config.codename.toLowerCase();
const path = require('path');
const Base64 = require('js-base64').Base64;

// BEWARE: Be extra careful when exposing environment vars to the client side. Expose only the extrictly mandatory.
const client = {
    IS_DEVELOPMENT: false,
    SERVER_ADDRESS: `https://wasserboxer.herokuapp.com`,
    SOCKET_SERVER_ADDRESS: `http://localhost:3000`,
    GOOGLE_MAPS_API_KEY: "AIzaSyCKMPLG8tSF78QpsScBRasCJ_B91pgvlpI",
    ONESIGNAL_APP_ID: "13c33a1e-a866-4b51-b3cf-3e3fc2ca1a45",
    GCM_SENDER_ID: "646004348894",
    FACEBOOK_CLIENT_ID: "821123338063300",
    LINKEDIN_CLIENT_ID: "",
    TWITTER_CLIENT_ID: "",
    GOOGLE_CLIENT_ID: ""
};

// On the server side, we're cool (or are we?).
const server = {
    ENV_TYPE: "local",
    HEROKU_DEPLOY_TOKEN: "af8da6d3-5dd0-4de1-b40b-6f6b31c0826c",
    MONGODB: `mongodb://localhost:27017/${config.name}local`,
    ONESIGNAL_API_KEY: "MTg2ZDRlZTItNjgwNC00OGQ1LWJmOGQtZTdiOTYzYzg1MzFh",
    SENDGRID_API_KEY: "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",
    FACEBOOK_CLIENT_SECRET: "27545f26f6e4d15a6c0b09f8a2ef4917",
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyBYFpayOEPmYnCxOHxdVdyVFQy6VnEuFZ8",
        messagingSenderId: "386114482633",
        authDomain: `${name}-dev.firebaseapp.com`,
        databaseURL: `https://${name}-dev.firebaseio.com`,
        projectId: `${name}-dev`,
        storageBucket: `${name}-dev.appspot.com`
    },
    /* MoIP */
    MOIP_BASE_URL: "https://sandbox.moip.com.br",
    MOIP_ACCOUNT_ID: "pac.leo@hotmail.com",
    MOIP_API_KEY: "8GUBYLAWTMECOZ6PTOKJDTF4EB1A8KY9TDWYCV3I",
    MOIP_SUBSCRIPTION_KEY: "EQ3CMBVK4JZUDWAEC4HDGRY2LWBZAKG9",
    MOIP_APP_ID: "APP-04FD41CG54UC",
    MOIP_APP_TOKEN: "d0fea15a939c46049e2467a59b421760_v2",
    MOIP_APP_SECRET: "8f903b0495cc4a3db899a61062ccee8c",
    MOIP_API_TOKEN: "HBND8U1YFPFTKE7DOWZZ0AARPVVJY40P",
    MOIP_PUB_KEY: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqJl7bS0vguGpo4cDuXEy
    r6eBZaGJHZzvQH2gdP94J+Peta9U5A+RRrL01X4qbqIq1J83oMOFm0JA5tNkRwhA
    V2DvTUdWcm30kg7JoLRAMyGrHQHEKIJTXtNPFAkB3MHgAneJu7PbtVidRvV+HiuT
    oYNrbcEYc+p1bYUbVHOY9EYN1Bs467icesSEDCMjXacrt6K8uiTkkBqmKSupXhhs
    uZzbzLu8tnfwoYmTx/u89QoUh8EkJ37F5LHHV2wDg5P1KV9J+2sMTQ+AVKXZHY7w
    LF/vJMHCiEt4kiEv/kmj+6mDmrgbqtXu6lZ7J2S16Lg5ZW4KOkp+QAqzD/hMjwvH
    9wIDAQAB
    -----END PUBLIC KEY-----`
};

Object.assign(server, { MOIP_BASE64: Base64.encode(`${server.MOIP_API_TOKEN}:${server.MOIP_API_KEY}`) });

client.SOCKET_SERVER_ADDRESS = process.env.SOCKET_SERVER_ADDRESS || client.SOCKET_SERVER_ADDRESS;

// Google Cloud Key...
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, `../keys/${server.ENV_TYPE}/gcloud.json`);

// And there we go!
module.exports = {
    client: Object.assign(client, config),
    server: Object.assign(server, config)
};
