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
exports.ESwitchRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.ESwitchRouter = express_1.default.Router();
const nodeUrl = 'http://localhost:3030/api/nodemcu/status';
let Switch = {
    url: "test",
    minBtryLevel: 20,
    maxBtryLevel: 99,
    status: false
};
// Get status of Nodemcu realy
const getNodeStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.get(nodeUrl)
        .then((res) => {
        console.log('Node:', res.data);
        Switch.status = res.data.relay;
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.ESwitchRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    yield getNodeStatus();
    console.log('Switch: ', Switch);
    res.status(200).send(Switch);
}));
