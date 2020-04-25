const functions = require('firebase-functions');
const app = require('express')();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');
const fbAuth = require('./util/fbAuth');

// scream routes
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postOneScream);

// users route
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);
