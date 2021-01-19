"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Battery_1 = require("./api/Battery/Battery");
const ESwitch_1 = require("./api/ESwitch/ESwitch");
const mock_1 = require("./api/mock/mock");
const app = express_1.default();
const PORT = 3030;
const mockNodeMCU = true;
app.use(express_1.default.json());
app.use('/api/battery', Battery_1.BtryRouter);
app.use('/api/switch', ESwitch_1.ESwitchRouter);
if (mockNodeMCU) {
    app.use('/api/nodeMcu', mock_1.MockRouter);
}
app.get('/', (req, res) => {
    res.send('hello from express TS.');
});
app.listen(3030, () => {
    console.log('Server is running on 3030..');
});
