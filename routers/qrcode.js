const express = require('express');
const router = express.Router();
const fs = require('fs');
const ini = require('ini');
const qrcode = require('qrcode');

const iniData = fs.readFileSync('config.ini', 'utf-8');
const parsedIni = ini.parse(iniData);
const ip = parsedIni.IP.WEBSITE_IP

const options = {
    errorCorrectionLevel: 'H',
    type: 'png',
    rendererOpts: {
        quality: 0.3,
    },
};

router.get('/:record_id', async (req, res) => {
    const recordId = req.params.record_id;
    try {
        // target url
        const url = `http://${ip}/patient/vertification/${recordId}`;
        // generate url resource
        const qrcodeDataURL = await qrcode.toDataURL(url, options);
        // set img in html
        const html = `<html><body><img src="${qrcodeDataURL}" alt="QR Code"></body></html>`;
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;