require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', createProxyMiddleware({
    target: process.env.TARGET_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/api': ''
    }
}));

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});