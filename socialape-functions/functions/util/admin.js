const admin = require('firebase-admin');
const serviceAccount = require('../socialape-1012f-firebase-adminsdk-daxpr-df834b39fd.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://socialape-1012f.firebaseio.com',
});

const db = admin.firestore();

module.exports = {admin, db};