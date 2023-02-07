const http = require('http');
const fs = require('fs');
var url = require('url');

http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname;
    let fileName = '';
    if (pathName === '/') {
        fileName = 'index.html';
    } else if (pathName === '/about') {
        fileName = 'about.html';
    } else if (pathName === '/contact-me') {
        fileName = 'contact-me.html';
    } else {
        fileName = '404.html'
    }
    fs.readFile(fileName, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
    return res.end();
    });
}).listen(8080);