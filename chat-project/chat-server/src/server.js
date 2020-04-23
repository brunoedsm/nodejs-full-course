const dotenv = require('dotenv');
const http = require('http');
const WebSocketServer = require('websocket').server;

const logger = require('./utils/logger');

dotenv.config();

const history = [];
const clients = [];
const colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort((a, b) => Math.random() > 0.5);

const htmlEntities = str => {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
};

const port = process.env.PORT || 3000;

const httpServer = http.createServer((req, res) => {});
httpServer.listen(port, () => logger.info(`HTTP Server listening on port ${port}`));

const wsServer = new WebSocketServer({ httpServer });

wsServer.on('request', request => {
    logger.info(`Connection from origin ${request.origin}`);

    const connection = request.accept(null, request.origin);
    const index = clients.push(connection) - 1;

    let username = null;
    let userColor = null;

    logger.info('Connection accepted');

    if (history.length > 0) {
        connection.sendUTF(JSON.stringify({
            type: 'history',
            data: history
        }));
    }

    connection.on('message', message => {
        if (message.type === 'utf8') {
            if (!username) {
                username = htmlEntities(message.utf8Data);
                userColor = colors.shift();

                connection.sendUTF(JSON.stringify({
                    type: 'color',
                    data: userColor
                }));

                logger.info(`User is knwon as ${username} with ${userColor} color`);
            } else {
                logger.info(`Received message from ${username}: ${message.utf8Data}`);

                const msg = {
                    time: Date.now(),
                    text: htmlEntities(message.utf8Data),
                    author: username,
                    color: userColor
                };

                history.push(msg);
                history.slice(-100);

                const json = JSON.stringify({
                    type: 'message',
                    data: msg
                });

                clients.forEach(client => client.sendUTF(json));
            }
        }
    });

    connection.on('close', c => {
        if (username && userColor) {
            logger.info(`Peer ${c.origin} disconnected`);

            clients.splice(index, 1);
            colors.push(userColor);

            const msg = {
                time: Date.now(),
                text: 'Disconnected',
                author: username,
                color: userColor,
            };

            const json = JSON.stringify({
                type: 'message',
                data: msg
            });

            clients.forEach(client => client.sendUTF(json));
        }
    });
});