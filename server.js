require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
console.log('Target URL:', process.env.TARGET_URL);
const options = {
    key: fs.readFileSync('KEY.key'),
    cert: fs.readFileSync('CRT.crt')
};
console.log('SSL Key Path:', 'KEY.key');
console.log('SSL Cert Path:', 'CRT.crt');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', createProxyMiddleware({
    target: process.env.TARGET_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/': ''
    }
}));

https.createServer(options, app).listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});