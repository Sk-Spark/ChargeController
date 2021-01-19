"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.MockRouter = express_1.default.Router();
const NetworkDelay = 1000;
let relay = false;
exports.MockRouter.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send('Mock server');
});
exports.MockRouter.get('/on', (req, res) => {
    relay = true;
    res.status(200).send({ relay });
});
exports.MockRouter.get('/off', (req, res) => {
    relay = false;
    res.status(200).send({ relay });
});
exports.MockRouter.get('/status', (req, res) => {
    setTimeout(() => {
        res.status(200).send({ relay });
    }, NetworkDelay);
});
exports.MockRouter.get('/toggle', (req, res) => {
    relay = !relay;
    res.status(200).send({ relay });
});
