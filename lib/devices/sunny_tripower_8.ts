/*SMA Sunny Tripower 8.0 / STP8.0-3AV-40 683 */
import {BasicSMADevice} from "../sma_device";
import {ModbusDatatype} from "../modbus_typings";

export class SunnyTripower8 extends BasicSMADevice {
    constructor(ipAddress: string, modbusPort: number, unitId: number) {
        super(ipAddress, modbusPort, unitId);
    }

    /**
     * Serialnumber
     * @returns Serialnumber from Device
     */
    async getSerialNumber(): Promise<string> {
        return await super.readModbusIR(30005, ModbusDatatype.uint32, 2);
    }

    /**
     * get Device Class
     * @returns Device Class
     */
    async getDeviceClass(): Promise<string> {
        let deviceClass: number = await super.readModbusIR(30051, ModbusDatatype.uint32, 2);
        switch (deviceClass) {
            case 8001:
                return "Solar-Wechselrichter";
            case 8002:
                return "Wind-Wechselrichter";
            case 8007:
                return "Batterie-Wechselrichter";
            case 8033:
                return "Verbraucher";
            case 8064:
                return "Sensorik allgemein";
            case 8065:
                return "Stromzähler";
            case 8128:
                return "Kommunikationsprodukte";
            default:
                return "Alle Geräte";
        }
    }

    /**
     * Total energy
     * @param unit like "Wh" or "kWh" (default: Wh)
     * @returns Total energy fed in on all outer conductors, in Wh or kWh
     */
    async getTotalPower(unit?: string): Promise<string>{
        let register: number = 30513;
        switch (unit) {
            case "W":
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
            
            case "kW":
                let value: number = await super.readModbusIR(register, ModbusDatatype.uint64, 4)*0.001;
                return await value.toFixed(3);
            
            default:                
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
        }
    }

    /**
     * Dayly energy
     * @param unit like "Wh" or "kWh" (default: Wh)
     * @returns Energy fed in for the current day, on all phases, in Wh or kWh
     */
    async getDaylyPower(unit?: string): Promise<string>{
        let register: number = 30517;
        switch (unit) {
            case "W":
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
            
            case "kW":
                let value: number = await super.readModbusIR(register, ModbusDatatype.uint64, 4)*0.001;
                return await value.toFixed(3);
            
            default:                
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
        }
    }

    /**
     * Current Power
     * @param unit like "W" or "kW" (default: W)
     * @returns Current active PV feed-in power over all phase conductors, in W
     */
    async getCurrentPower(unit?: string): Promise<string>{
        let register: number = 30775;
        let value: number = await super.readModbusIR(register, ModbusDatatype.int32, 2);
        if (value <= 0) {
            return await "0";
        }else{
            switch (unit) {
                case "W":
                    return await super.readModbusIR(register, ModbusDatatype.int32, 2);
    
                case "kW":
                    value = await super.readModbusIR(register, ModbusDatatype.int32, 2)*0.001;
                    return await value.toFixed(3);
            
                default:
                    return await super.readModbusIR(register, ModbusDatatype.int32, 2);
            }
        }
    }

    /**
     * Helth Status
     * 
     * @returns readeble device Status
     */
    async getHealthStatus():Promise<string>{
        let healthStatus: number = await super.readModbusIR(30201, ModbusDatatype.uint32, 2);

        switch (healthStatus) {
            case 307: 
                return "OK (ok)";
            case 303:
                return "Aus (off)";
            case 455:
                return "Warnung (Wrn)";
            case 35:
                return "Fehler (Error)";
            default:
                return "Undefinirter Wert (" + healthStatus + "). Bitte im Git Reposotry als Issue aufnehmen."
        }
    }

    /**
     * Inverter Status
     * 
     * @returns readeble inverter Status
     */
    async getInverterStatus():Promise<string>{
        let inverterStatus: number = await super.readModbusIR(32385, ModbusDatatype.uint32, 2);

        switch (inverterStatus) {
            case 307: 
                return "OK (ok)";
            case 303:
                return "Aus (off)";
            case 455:
                return "Warnung (Wrn)";
            case 35:
                return "Fehler (Error)";
            default:
                return "Undefinirter Wert (" + inverterStatus + "). Bitte im Git Reposotry als Issue aufnehmen."
        }
    }

    /**
     * recommended action
     * 
     * @returns recommended action
     */
    async getRecommendedAction():Promise<string>{
        let recommendedAction: number = await super.readModbusIR(32385, ModbusDatatype.uint32, 2);

        switch (recommendedAction) {
            case 336: 
                return "Hersteller kontaktieren (Contact manufacturer)";
            case 337:
                return "Installateur kontaktieren (Contact installer)";
            case 338:
                return "ungültig (invalid)";
            case 887:
                return "keine (none)";
            default:
                return "Undefinirter Wert (" + recommendedAction + "). Bitte im Git Reposotry als Issue aufnehmen."
        }
    }

    /**
     * general operating condition
     * 
     * @returns general operating condition
     */
    async getOperatingCondition():Promise<string>{
        let operatingCondition: number = await super.readModbusIR(40029, ModbusDatatype.uint32, 2);

        switch (operatingCondition) {
            case 295: 
                return "MPP (Mpp)";
            case 381:
                return "Stopp (Stop)";
            case 443:
                return "Konstantspannung (VolDCConst)";
            case 1392: 
                return "Fehler (Flt)";
            case 1393:
                return "Warte auf PV-Spannung (WaitPV)";
            case 455:
                return "Warnung (Warning)";
            case 1467:
                return "Start (Str)";
            case 1469:
                return "Herunterfahren (Shtdwn)";
            case 1480: 
                return "Warte auf EVU (WaitUtil)";
            case 2119: 
                return "Abregelung (Drt)";
            case 16777213:
                return "Information liegt nicht vor (NaNStt)";
            default:
                return "Undefinirter Wert (" + operatingCondition + "). Bitte im Git Reposotry als Issue aufnehmen."
        }
    }

    /**
     * @param unit like "W" or "kW" (default: W)
     * @returns current Power from L1, L2, L3 in W or kW
     */
    async getCurrentPower_L1_L2_L3(unit?: string):Promise<any>{
        let l1 = await super.readModbusIR(31259,ModbusDatatype.int32,2).then(function(val){
                if (unit === "kW") {
                    return val*0.001;
                }
                return val;            
            
        });        
        let l2 = await super.readModbusIR(31261,ModbusDatatype.int32,2).then(function(val){

                if (unit === "kW") {
                    return val*0.001;
                }
                return val;            
            
        });
        let l3 = await super.readModbusIR(31263,ModbusDatatype.int32,2).then(function(val){

                if (unit === "kW") {
                    return val*0.001;
                }
                return val;            
            
        });
        return await {"L1": l1, "L2": l2, "L3": l3};
    }
}