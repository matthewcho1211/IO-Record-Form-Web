const express = require('express');
const app = express();

const nurse = require('./routers/nurse')
const patient = require('./routers/patient')

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/nurse', nurse)
app.use('/patient', patient)

app.listen(3000);