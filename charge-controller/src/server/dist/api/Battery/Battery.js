"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtryRouter = void 0;
const express_1 = __importDefault(require("express"));
const execa_1 = __importDefault(require("execa"));
exports.BtryRouter = express_1.default.Router();
let btry = {
    ChargeLevel: "",
    BatteryStatus: ""
};
// Get Current battery [For Windows]
const getBtryData = () => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    yield execa_1.default("powershell", [
        "Get-WmiObject -Class Win32_Battery | select EstimatedChargeRemaining,BatteryStatus | ConvertTo-Json",
    ])
        .then((e) => {
        let resData = JSON.parse(e.stdout);
        console.log('resData', resData);
        btry.ChargeLevel = resData.EstimatedChargeRemaining;
        btry.BatteryStatus = resData.BatteryStatus;
        data = btry;
    })
        .catch((err) => {
        console.log(err);
        data = err;
    });
    return data;
});
//Get Battery Status Rout
exports.BtryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let data;
    yield getBtryData().then((d) => {
        data = d;
        console.log(data);
    })
        .catch(err => {
        data = err;
    });
    res.status(200).send(data);
}));
