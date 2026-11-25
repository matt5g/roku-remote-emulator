import { WebSocketServer } from 'ws';
import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import { handleInput, handleTextInput } from './control-handler.js';


const CHALLENGE_KEY = 'F3A278B8-1C6F-44A9-9D89-F1979CA4C6F1';
const bypassAuth = true
export function startWebSocket(server, device) {
    const wss = new WebSocketServer({
        server,
        path: '/ecp-session',
        handleProtocols(protocols) {
            return protocols.has('ecp-2') ? 'ecp-2' : false;
        }
    });

    let authenticatedDevices = []

    wss.on('connection', (ws) => {
        console.log('Roku ECP WebSocket connected');

        const challenge = randomBytes(16).toString('base64');

        ws.send(JSON.stringify({
            notify: 'authenticate',
            'param-challenge': challenge,
            timestamp: String(process.uptime())
        }));

        console.log('Sent authentication challenge');

        
        

        ws.on('message', async (data) => {
            let message;
            const handlers = {
                'query-device-info': (id) => queryReply('query-device-info', id, device.infoXML, { base64: true }),
                'query-media-player': (id) => queryReply('query-media-player', id, device.mediaPlayerXML),
                'query-audio-device': (id) => queryReply('query-audio-device', id, device.audioDeviceXML),
                'entity-identify': (id) => queryReply('entity-identify', id, device.entityIdentifyXML),
                'query-apps': (id) => queryReply('query-apps', id, device.appsXML),
                'query-active-app': (id) => queryReply('query-active-app', id, device.appsXML),
                

            };
            try {
                message = JSON.parse(data.toString());
            } catch {
                console.log('Invalid JSON:', data.toString());
                return;
            }


            console.log('Received:', message);
            if (message.request === 'key-press') {
                await handleInput(message)
            }
            if (message.request === 'request-events') {
                let eventsOK = {
                    response: "request-events",
                    'response-id': message['request-id'],
                    status: "200",
                    "status-msg": "OK"
                }
                ws.send(JSON.stringify(eventsOK))
            }
            const handler = handlers[message.request];
            if (handler) {
                ws.send(handler(message['request-id']));
            }
            if (message.request === 'query-info-for-voice-service') {
                ws.send(JSON.stringify({
                    response: "query-info-for-voice-service",
                    "response-id": message['request-id'],
                    status: '200',
                    'status-msg': 'OK'
                }))
            }
            if (message.request === 'query-textedit-state') {
                ws.send(JSON.stringify({
                    "content-data":
                        {
                            "textedit-state":
                            {
                                "textedit-id": "none"
                            }
                        },
                    "content-type":"application/json",
                    "response":"query-textedit-state",
                    "response-id": message['request-id'],
                    "status":"200",
                    "status-msg":"OK"
                }))
            }
            if (message.request.startsWith('query') && !handlers) {
                ws.send(JSON.stringify({
                    response: message.request,
                    "response-id": message['request-id'],
                    status: '200',
                    'status-msg': 'OK'
                }))
            }
            if (message.request === 'set-textedit-text') {
                await handleTextInput(message)
            }
            if (message.request === 'authenticate') {
                const expected = createHash('sha1')
                    .update(challenge + CHALLENGE_KEY)
                    .digest();

                const received = Buffer.from(
                    message['param-response'] || '',
                    'base64'
                );

                let authenticated =
                    received.length === expected.length &&
                    timingSafeEqual(received, expected);
                if (bypassAuth) {
                    authenticated = true
                }

                if (!authenticated) {
                    if (authenticatedDevices[0]) {
                        if (message['param-microphone-sample-rates'] == authenticatedDevices[0]['param-microphone-sample-rates']
                            && message['param-client-friendly-name'] == authenticatedDevices[0]['param-microphone-sample-rates']
                        ) {
                            
                        }

                    }
                    if (authenticatedDevices[1]) {
                        if (message['param-microphone-sample-rates'] == authenticatedDevices[1]['param-microphone-sample-rates']
                            && message['param-client-friendly-name'] == authenticatedDevices[1]['param-microphone-sample-rates']
                        ) {

                        }
                    }
                    if (!authenticatedDevices[0] && !authenticatedDevices[1]) {
                        console.log('Authentication failed');
                        ws.close(1008, 'Authentication failed');
                        return;
                    }
                }
                
                if (authenticatedDevices.length < 3) {authenticatedDevices.push(message)}
                console.log('Authentication successful');

                ws.send(JSON.stringify({
                    response: 'authenticate',
                    'response-id': message['request-id'],
                    status: '200',
                    'status-msg': 'OK'
                }));

                ws.send(JSON.stringify({
                    "notify":"textedit-opened",
                    "param-masked":"false",
                    "param-max-length":"75",
                    "param-selection-end":"0",
                    "param-selection-start":"0",
                    "param-text":"",
                    "param-textedit-id":"1",
                    "param-textedit-type":"full",
                    "timestamp":"12345.678"
                }))
                return;
            }
        });

        ws.on('close', (code, reason) => {
            
            console.log('Disconnected:', code, reason.toString());
        });

        ws.on('error', console.error);

       
    });

    

    return wss;
}
function queryReply(name, requestId, xml, { base64 = false } = {}) {
  return JSON.stringify({
    'content-data': base64 ? Buffer.from(xml, 'utf8').toString('base64') : xml,
    'content-type': 'text/xml; charset="utf-8"',
    response: name,
    'response-id': requestId,
    status: '200',
    'status-msg': 'OK',
  });
}