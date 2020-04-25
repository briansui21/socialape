const functions = require('firebase-functions');
const app = require('express')();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');
const fbAuth = require('./util/fbAuth');

// scream routes
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postOneScream);

// users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);

exports.api = functions.https.onRequest(app);
