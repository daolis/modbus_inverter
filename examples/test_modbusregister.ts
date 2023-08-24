/**
 * Test Modbusregister to implement
 */

import { exit } from "process";
import { HuaweiSDongleA } from "../index";
let ipAddress = "127.0.0.1";
let modbusPort = 502;
let unitId = 1;
const device = new HuaweiSDongleA(ipAddress, modbusPort, unitId);


function asyncTimeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function readMB(){
    console.log("Connect to: " + device.getIpAddress());
    let model = await device.getModel();
    let modelId = await device.getModellID();
    let serialNr = await device.getSerialNumber();
    console.log("Model: " + model);
    console.log(`ModelID: ${modelId}`);
    console.log("Serial number: " + serialNr);

    for(;;) {
        let ratedPower = await device.getRatedPower();
        let activePower = await device.getActivePower();
        let inputPower = await device.getInputPower();
        let batteryStateOfCapacity = await device.getStorageStateOfCapacity();
        let storageRunningState = await device.getStorageRunningStatus();
        let storageChargeDischargePower = await device.getStorageChargeDischargePower();
        let storageForcibleChargeDischarge = await device.getStorageForcibleChargeDischarge();
        //let unknown = await device.getUnknown();
        console.log("");
        console.log(`Rated power: ${ratedPower} W`);
        console.log(`Active power: ${activePower} W`);
        console.log(`Input power: ${inputPower} W`);
        console.log(`Storage running state: ${storageRunningState}`);
        console.log(`Battery state of capacity: ${batteryStateOfCapacity} %`);
        console.log(`Battery mode: ${storageForcibleChargeDischarge}`);
        console.log(`Battery charge discharge power: ${storageChargeDischargePower} W`);
        await asyncTimeout(2000);
    }
    // console.log("unknown: " + unknown);

    await device.close();
    await exit();
}
readMB();
