/*SDongleA V100R001C00 */
import {BasicSMADevice} from "../devices";
import {ModbusDatatype} from "../modbus_typings";

enum StorageStatus {
    OFFLINE,
    STANDBY,
    RUNNING,
    FAULT,
    SLEEP_MODE
}

enum StorageForcibleChargeDischarge {
    STOP,
    CHARGE,
    DISCHARGE
}

export class HuaweiSDongleA extends BasicSMADevice {

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
    async getModel(): Promise<string> {
        return await super.readModbusHR(30000, ModbusDatatype.string, 15);
    }

    /**
     *
     * @returns Model ID
     */
    async getModellID(): Promise<string> {
        return await super.readModbusHR(30070, ModbusDatatype.uint16, 1);
    }

    async getActivePower(): Promise<string> {
        return await super.readModbusHR(32080, ModbusDatatype.int32, 2);
    }

    async getInputPower(): Promise<string> {
        return await super.readModbusHR(32064, ModbusDatatype.int32, 2);
    }

    async getRatedPower(): Promise<string> {
        return await super.readModbusHR(30073, ModbusDatatype.uint32, 2);
    }

    async getStorageRunningStatus(): Promise<string> {
        let value = await super.readModbusHR(37762, ModbusDatatype.uint16, 1);
        return Promise.resolve(StorageStatus[value])
    }

    async getStorageChargeDischargePower(): Promise<number> {
        return await super.readModbusHR(37765, ModbusDatatype.int32, 2);
    }

    async getStorageStateOfCapacity(): Promise<number> {
        let value = await super.readModbusHR(37760, ModbusDatatype.uint16, 1);
        return value / 10;
    }

    async getStorageForcibleChargeDischarge(): Promise<string> {
        let value = await super.readModbusHR(47100, ModbusDatatype.uint16, 1);
        return Promise.resolve(StorageForcibleChargeDischarge[value])
    }

    /**
     * @returns unknown Datatpoint
     */
    async getUnknown(): Promise<string> {
        return await super.readModbusHR(30055, ModbusDatatype.string, 15);
    }
}
