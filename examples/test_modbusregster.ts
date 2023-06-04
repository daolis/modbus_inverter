/**
 * Test Modbusregister to implement 
 */

import { HuaweiSDongleA } from "../index";
let ipAddress = "";
let modbusPort = 502;
let unitId = 1;
const device = new HuaweiSDongleA(ipAddress, modbusPort, unitId);

async function readMB(){
    
    let modell = await device.getModell();
    let modellId = await device.getModellID();
    let serialNr = await device.getSerialNumber();
    let unknown = await device.getUnknown();
    await console.log("Modell: " + modell);
    await console.log("ModellID: " + modellId);
    await console.log("Seriennummer: " + serialNr);
    await console.log("unknown: " + unknown);
    
    await device.close();
    return;
}
readMB();