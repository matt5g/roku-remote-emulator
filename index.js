import RokuDevice from './device.js';
import { startECP } from './ecp.js';
import { startDiscovery } from './discovery.js';

const device = new RokuDevice();

startECP(device);
startDiscovery(device);
export { device };