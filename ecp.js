import express from 'express';
import { createServer } from 'node:http';
import { startWebSocket } from './websocket.js';


export function startECP(device) {
    const app = express();
    
    app.get('/', (req, res) => {
        res.type('application/xml');
        res.send(device.descriptionXML);
    });

    app.use(express.urlencoded({ extended: true }));

    // Device information
    app.get('/query/device-info', (req, res) => {
        res.type('application/xml').send(device.infoXML);
    });

    // Installed applications
    app.get('/query/apps', (req, res) => {
        res.type('application/xml').send(device.appsXML);
    });

    // Remote button presses
    app.post('/keypress/:key', (req, res) => {
        device.handleKey(req.params.key);
        
        res.sendStatus(200);
    });

    app.post('/keydown/:key', (req, res) => {
        device.handleKeyDown(req.params.key);
        res.sendStatus(200);
    });

    app.post('/keyup/:key', (req, res) => {
        device.handleKeyUp(req.params.key);
        res.sendStatus(200);
    });

    const server = createServer(app);

    // Attach Roku ECP WebSocket
    startWebSocket(server, device);

    server.listen(8060, '0.0.0.0', () => {
        console.log('Roku ECP listening on port 8060');
    });
}