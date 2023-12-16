const express = require('express');
const app = express();

const nurse = require('./routers/nurse');
const patient = require('./routers/patient');
const qrcode = require('./routers/qrcode');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/nurse', nurse)
app.use('/patient', patient)
app.use('/qrcode', qrcode);

app.listen(3000);