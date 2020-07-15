const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';

const port = 3000;


const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;


    if (url === '/') {


        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My First Node App</title></head>');
        res.write('<body><form action="/message" method="POST"> <input type="text" name="message"><button type="submit">Send</button></form></body >');
        res.write('</html>');
        return res.end();

    }

    if (url === '/message' && method === 'POST') {

        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);

        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My First Node App</title></head>');
    res.write('<body><h1> Hello Welcome to my First Application</h1></body>');
    res.write('</html>');
    res.end();


});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});