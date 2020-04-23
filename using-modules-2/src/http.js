const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {

    if (req.method === 'POST') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('close', () => {
            const data = Buffer.concat(chunks);
            console.log('Data', data.toString());
        });
        res.end();
    } else {
        const q = url.parse(req.url, true);
        const route = q.pathname === '/' ? 'index' : q.pathname;
        const fileName = `pages/${route}.html`;
    
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString().replace('{{NAME}}', q.query.name));
            return res.end();
        });
    }
}).listen(3000);