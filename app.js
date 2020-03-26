const http = require("http");

http.createServer(function (request, response) {

    // responseで返答するheader
    response.writeHead(200, { 'Content-Type': 'text/p;ain' });
    // responseで返答するbody
    response.end('Hellow World\n');
}).listen(8000);

console.log('Server running ');