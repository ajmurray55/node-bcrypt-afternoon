require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controller/authcontroller');
const treasureCtrl = require('./controller/treasureController')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: true, 
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('DB CONNECTED')
}).catch(err => console.log(err));

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

// TREASURE ENDPOINTS
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('api/treasure/user', treasureCtrl.getUserTreasure)


app.listen(SERVER_PORT,() => console.log(`RUNNING ON SERVER PORT ${SERVER_PORT}`))
