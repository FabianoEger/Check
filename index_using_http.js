const http = require('http');
const querystring = require('querystring');

const server = http.createServer(function (request, response) {
    const postData = JSON.stringify({
        variable: 'test',
        value: 1
    });
    const options = {
        hostname: 'api.tago.io',
        port: 80,
        path: '/data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': '3f276097-c197-4e74-be5a-dbcf3948fefa',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end(postData);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World!");

});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);


