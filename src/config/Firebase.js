const admin = require('firebase-admin');
const serviceAccount = require("../../serviceAccountKey.json");
if(!admin.apps.length){

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "travel-app-34be2.appspot.com"
  });
  const bucket = admin.storage().bucket();
  module.exports = bucket;
}

