/**
 * Test Modbusregister to implement 
 */

import { ModbusDatatype, SunnyTripower8 } from "../index";

const device = new SunnyTripower8("192.168.178.123", 502, 3);

async function readMB(){
    let energy = await device.getRecommendedAction().then(console.log);
    device.close();
    return;
}
readMB();