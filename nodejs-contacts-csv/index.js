const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const { save, read } = require('./contacts');

http.createServer((req, res) => {
    if (req.method === 'POST') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', async () => {
            const data = Buffer.concat(chunks);
            const { name, email } = qs.parse(data.toString());
            await save(name, email);
        });
    }

    fs.readFile('list.html', async (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }
        
        const contacts = await read();
        const list = contacts
            .map(contact => `<li>${contact.name} - ${contact.email}</li>`)
            .join('\n');
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data.toString().replace('{{LIST}}', list));

        return res.end();
    });
}).listen(3000);