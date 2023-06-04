/*SDongleA V100R001C00 */
import {BasicSMADevice} from "../devices";
import {ModbusDatatype} from "../modbus_typings";

export class HuaweiSDongleA extends BasicSMADevice {
    constructor(ipAddress: string, modbusPort: number, unitId: number) {
        super(ipAddress, modbusPort, unitId);
    }

    /**
     * Serialnumber
     * @returns Serialnumber from Device
     */
    async getSerialNumber(): Promise<string> {
        return await super.readModbusHR(30015, ModbusDatatype.string, 10);
    }

    /**
     * 
     * @returns Modell
     */
    async getModell(): Promise<string> {
        return await super.readModbusHR(30000, ModbusDatatype.string, 15);
    }

    /**
     * 
     * @returns Modell ID
     */
    async getModellID(): Promise<string> {
        return await super.readModbusHR(30070, ModbusDatatype.uint16, 1);
    }
    
    /**
     * 
     * @returns unknown Datatpoint
     */
    async getUnknown(): Promise<string> {
        return await super.readModbusHR(30055, ModbusDatatype.string, 15);
    }


}