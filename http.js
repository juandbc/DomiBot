const http = require('http');
var fs = require('fs');
var path = require('path');

module.exports.run = function run() {
    http.createServer(function (request, response) {
        //console.log('request ', request.url);

        var filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './img';
        }

        var extname = String(path.extname(filePath)).toLowerCase();
        var contentType = 'text/html';
        var mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpg',
        };

        contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }).listen(80);
    console.log('Http Server running');
}
