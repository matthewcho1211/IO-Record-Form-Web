const express = require('express');
const QRCode = require('qrcode');
const app = express();

const options = {
    // 其他选项可以在官方文档中找到：https://www.npmjs.com/package/qrcode#options
    errorCorrectionLevel: 'H',
    type: 'png',
    rendererOpts: {
        quality: 0.3,
    },
};

app.get('/qrcode', async (req, res) => {
    try {
        // 要生成 QR 码的文本数据
        const data = 'https://ithelp.ithome.com.tw/articles/10298816';

        // 生成 QR 码的数据 URL
        const qrCodeDataURL = await QRCode.toDataURL(data, options);

        // 将 QR 码的数据 URL 嵌入到 HTML 页面
        const html = `<html><body><img src="${qrCodeDataURL}" alt="QR Code"></body></html>`;

        // 将 HTML 发送给客户端
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000);