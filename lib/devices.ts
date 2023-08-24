import {ModbusDatatype} from "./modbus_typings";
import {ModbusConnection} from "./modbus_util";

interface Devices {
    readModbusHR(register: number, datatype: ModbusDatatype): Promise<any>;

    readModbusIR(register: number, datatype: ModbusDatatype): Promise<any>;

    getIpAddress(): string;
}

export abstract class BasicSMADevice implements Devices{
    private connection: ModbusConnection;
    private ipAddress: string;
    private unitId: number;

    constructor(ipAddress: string, modbusPort: number = 502, unitId: number = 1 ) {
        this.unitId = unitId;
        this.connection = new ModbusConnection(ipAddress, modbusPort, unitId);
        this.ipAddress = ipAddress;
    }

    getIpAddress(): string {
        return this.ipAddress;
    }

    async readModbusHR(register: number, datatype: ModbusDatatype, length?: number): Promise<any> {
        return this.connection.readModbusHR(register, datatype, length);
    }

    async readModbusIR(register: number, datatype: ModbusDatatype, length?: number): Promise<any> {
        return this.connection.readModbusIR(register, datatype, length);
    }

    close(){
        this.connection.close();
    }
}
