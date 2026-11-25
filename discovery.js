import dgram from 'node:dgram';
import os from 'node:os';

export function startDiscovery(device) {
    const socket = dgram.createSocket({
        type: 'udp4',
        reuseAddr: true
    });
    
    const interfaces = os.networkInterfaces();

    const address = Object.values(interfaces)
        .flat()
        .find(i => i && i.family === 'IPv4' && !i.internal)?.address;

    socket.on('message', (msg, remote) => {
        const request = msg.toString();
        
        if (!request.includes('roku:ecp')) return;
        
        const response = [
            'HTTP/1.1 200 OK',
            'CACHE-CONTROL: no-cache',
            'EXT:',
            'ST: roku:ecp',
            `USN: uuid:${device.uuid}`,
            `LOCATION: http://${address}:8060/`,
            'SERVER: UPnP/1.1 Roku/1.0',
            '',
            ''
        ].join('\r\n');

        /* should match the following:
            HTTP/1.1 200 OK
            Server: Roku/16.0.4 UPnP/1.0 Roku/16.0.4
            Content-Length: 1306
            Cache-Control: no-cache
            Content-Type: text/xml; charset="utf-8"
        */

        socket.send(
            response,
            remote.port,
            remote.address
        );
    });

    socket.bind(1900, () => {
        socket.addMembership('239.255.255.250');
        console.log('SSDP discovery listening');
    });
}